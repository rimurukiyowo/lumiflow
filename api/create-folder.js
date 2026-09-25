const { google } = require("googleapis");

export default async function handler(req, res) {
  // 1. Izinkan CORS & Method POST
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { folderName } = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};

    if (!folderName) {
      return res.status(400).json({ message: "Nama folder harus diisi" });
    }

    // 2. Format ulang Private Key agar tahan terhadap error newline Vercel
    let privateKey = process.env.GOOGLE_PRIVATE_KEY;
    if (privateKey) {
      privateKey = privateKey.replace(/^"(.*)"$/, "$1"); // Hapus tanda petik ganda luar jika ada
      privateKey = privateKey.replace(/\\n/g, "\n");     // Ubah \n teks menjadi line break asli
    }

    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const parentFolderId = process.env.GOOGLE_PARENT_FOLDER_ID;

    if (!privateKey || !clientEmail) {
      return res.status(500).json({
        message: "Environment Variables (GOOGLE_PRIVATE_KEY / GOOGLE_CLIENT_EMAIL) belum diset di Vercel!",
      });
    }

    // 3. Autentikasi Google Auth
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/drive.file"],
    });

    const drive = google.drive({ version: "v3", auth });

    // 4. Buat Folder Baru
    const fileMetadata = {
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
      parents: parentFolderId ? [parentFolderId] : [],
    };

    const folder = await drive.files.create({
      requestBody: fileMetadata,
      fields: "id, webViewLink",
    });

    // 5. Ubah Akses Folder Menjadi Akses Publik (Anyone with link)
    await drive.permissions.create({
      fileId: folder.data.id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    return res.status(200).json({
      success: true,
      folderId: folder.data.id,
      folderUrl: folder.data.webViewLink,
    });
  } catch (error) {
    console.error("Error Drive API Detail:", error);
    return res.status(500).json({
      message: "Gagal membuat folder Google Drive",
      error: error.message || error.toString(),
    });
  }
}
