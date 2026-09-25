import { google } from "googleapis";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Gagal memproses unggahan file" });
    }

    try {
      // 1. Ambil Private Key dan Client Email dari Environment Variables
      let privateKey = process.env.GOOGLE_PRIVATE_KEY;
      if (privateKey) {
        privateKey = privateKey.replace(/^"(.*)"$/, "$1").replace(/\\n/g, "\n");
      }
      const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
      const parentFolderId = process.env.GOOGLE_PARENT_FOLDER_ID;

      if (!privateKey || !clientEmail) {
        throw new Error("GOOGLE_PRIVATE_KEY atau GOOGLE_CLIENT_EMAIL belum diset di Environment Variables Vercel.");
      }

      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: clientEmail,
          private_key: privateKey,
        },
        scopes: ["https://www.googleapis.com/auth/drive"],
      });

      const drive = google.drive({ version: "v3", auth });

      const folderName = Array.isArray(fields.folderName)
        ? fields.folderName[0]
        : fields.folderName || `Job ${new Date().toLocaleDateString("id-ID")}`;
      
      const duplicateCountVal = Array.isArray(fields.duplicateCount)
        ? fields.duplicateCount[0]
        : fields.duplicateCount;
      const duplicateCount = parseInt(duplicateCountVal) || 1;

      const uploadedFile = Array.isArray(files.file)
        ? files.file[0]
        : files.file;

      // 2. Buat Folder Baru DI DALAM Parent Folder milik pengguna (agar tidak kena batas kuota bot)
      const folderMetadata = {
        name: folderName,
        mimeType: "application/vnd.google-apps.folder",
        parents: parentFolderId ? [parentFolderId] : [],
      };

      const folderResponse = await drive.files.create({
        requestBody: folderMetadata,
        fields: "id, webViewLink",
      });

      const folderId = folderResponse.data.id;
      const folderUrl = folderResponse.data.webViewLink;

      // Ubah Akses Folder agar Publik (Anyone with link can view)
      await drive.permissions.create({
        fileId: folderId,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });

      // 3. Unggah & Duplikat File ke Dalam Folder Baru Tersebut
      if (uploadedFile) {
        const originalName = uploadedFile.originalFilename || "File.png";
        
        const fileMetadata = {
          name: originalName,
          parents: [folderId], // PENTING: Disimpan ke folder baru, bukan root Drive bot
        };

        const media = {
          mimeType: uploadedFile.mimetype || "application/octet-stream",
          body: fs.createReadStream(uploadedFile.filepath),
        };

        const mainFile = await drive.files.create({
          requestBody: fileMetadata,
          media: media,
          fields: "id, name",
        });

        const baseName = originalName.includes(".")
          ? originalName.substring(0, originalName.lastIndexOf("."))
          : originalName;
        const extension = originalName.includes(".")
          ? originalName.substring(originalName.lastIndexOf("."))
          : "";

        // Duplikat file jika diminta lebih dari 1
        for (let i = 2; i <= duplicateCount; i++) {
          await drive.files.copy({
            fileId: mainFile.data.id,
            requestBody: {
              name: `${baseName}_${i}${extension}`,
              parents: [folderId],
            },
          });
        }
      }

      return res.status(200).json({
        success: true,
        folderUrl: folderUrl,
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Gagal menghubungkan ke Google Drive: " + (error.message || error.toString()),
      });
    }
  });
}
