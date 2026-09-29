// layout.js - Sidebar Drawer Responsif HP + Toggle Desktop & Animasi Modern
document.addEventListener("DOMContentLoaded", () => {
  // Ambil nama file halaman saat ini dengan bersih
  let currentPath = window.location.pathname.split("/").filter(Boolean).pop() || "index.html";
  if (!currentPath.includes(".html")) {
    currentPath = "index.html";
  }

  // Sisipkan CSS Keyframes & styling khusus sekali saja
  if (!document.getElementById("kimi-layout-styles")) {
    const styleEl = document.createElement("style");
    styleEl.id = "kimi-layout-styles";
    styleEl.innerHTML = `
      @keyframes pulseSlow {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(1.1); }
      }
      .animate-pulse-slow {
        animation: pulseSlow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
    `;
    document.head.appendChild(styleEl);
  }

  const isActive = (target) => currentPath.toLowerCase().includes(target.toLowerCase());

  // 1. Sidebar HTML (Drawer di HP, Toggleable di Desktop)
  const sidebarHTML = `
  <!-- Overlay Backdrop HP -->
  <div id="mobileBackdrop" onclick="toggleSidebar()" class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 hidden opacity-0 transition-opacity duration-300 md:hidden"></div>

  <!-- Sidebar Aside -->
  <aside id="mainSidebar" class="fixed md:static inset-y-0 left-0 w-64 bg-white/95 backdrop-blur-md border-r border-slate-200/80 flex flex-col justify-between shrink-0 min-h-screen z-50 transform -translate-x-full md:translate-x-0 transition-all duration-300 ease-in-out shadow-xl md:shadow-none">
    <div>
      <!-- Brand Header -->
      <div class="h-16 flex items-center justify-between px-5 border-b border-slate-100/90">
        <a href="./index" class="flex items-center gap-3 group">
          <div class="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/25 group-hover:scale-105 transition-transform duration-200">
            <iconify-icon icon="heroicons:sparkles-20-solid" class="text-lg"></iconify-icon>
          </div>
          <div class="leading-tight">
            <span class="font-extrabold text-base tracking-tight text-slate-800 group-hover:text-emerald-700 transition-colors">Kimi Suite</span>
            <span class="block text-[9px] uppercase tracking-widest font-bold text-emerald-600">Workspace</span>
          </div>
        </a>
        
        <!-- Close Button Mobile -->
        <button onclick="toggleSidebar()" class="md:hidden text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-1.5 rounded-xl transition-all">
          <iconify-icon icon="heroicons:x-mark-20-solid" class="text-xl"></iconify-icon>
        </button>
      </div>

      <!-- Navigation Links -->
      <nav class="p-3.5 space-y-1.5">
        <!-- Dashboard -->
        <a href="./index" class="group flex items-center justify-between px-3.5 py-2.5 rounded-xl ${
          isActive("index")
            ? "bg-emerald-50 text-emerald-800 font-semibold shadow-sm shadow-emerald-500/10 border border-emerald-200/50"
            : "text-slate-600 hover:text-emerald-700 hover:bg-slate-50 font-medium hover:translate-x-1"
        } text-xs transition-all duration-200">
          <div class="flex items-center gap-3">
            <iconify-icon icon="heroicons:home" class="text-base ${isActive("index") ? "text-emerald-600" : "text-slate-400 group-hover:text-emerald-600"}"></iconify-icon>
            <span>Dashboard</span>
          </div>
          ${isActive("index") ? '<span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>' : ""}
        </a>

        <!-- Section Divider -->
        <div class="pt-4 pb-1 px-3 flex items-center justify-between text-[10px] font-bold text-slate-400 tracking-wider uppercase">
          <span>Modul Utama</span>
          <span class="text-[9px] font-medium text-slate-300">v3.0</span>
        </div>

        <!-- Bagi Job -->
        <a href="./bagi-job" class="group flex items-center justify-between px-3.5 py-2.5 rounded-xl ${
          isActive("bagi-job")
            ? "bg-emerald-50 text-emerald-800 font-semibold shadow-sm shadow-emerald-500/10 border border-emerald-200/50"
            : "text-slate-600 hover:text-emerald-700 hover:bg-slate-50 font-medium hover:translate-x-1"
        } text-xs transition-all duration-200">
          <div class="flex items-center gap-3">
            <iconify-icon icon="heroicons:clipboard-document-list" class="text-base ${isActive("bagi-job") ? "text-emerald-600" : "text-slate-400 group-hover:text-emerald-600"}"></iconify-icon>
            <span>Bagi Job & Drive</span>
          </div>
          ${isActive("bagi-job") ? '<span class="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-bold">Aktif</span>' : ""}
        </a>

        <!-- Brief Splitter -->
        <a href="./brief-parser" class="group flex items-center justify-between px-3.5 py-2.5 rounded-xl ${
          isActive("brief-parser")
            ? "bg-emerald-50 text-emerald-800 font-semibold shadow-sm shadow-emerald-500/10 border border-emerald-200/50"
            : "text-slate-600 hover:text-emerald-700 hover:bg-slate-50 font-medium hover:translate-x-1"
        } text-xs transition-all duration-200">
          <div class="flex items-center gap-3">
            <iconify-icon icon="heroicons:scissors" class="text-base ${isActive("brief-parser") ? "text-emerald-600" : "text-slate-400 group-hover:text-emerald-600"}"></iconify-icon>
            <span>Brief Splitter</span>
          </div>
          ${isActive("brief-parser") ? '<span class="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-bold">Aktif</span>' : ""}
        </a>

        <!-- Duplicate -->
        <a href="./duplicate" class="group flex items-center justify-between px-3.5 py-2.5 rounded-xl ${
          isActive("duplicate")
            ? "bg-emerald-50 text-emerald-800 font-semibold shadow-sm shadow-emerald-500/10 border border-emerald-200/50"
            : "text-slate-600 hover:text-emerald-700 hover:bg-slate-50 font-medium hover:translate-x-1"
        } text-xs transition-all duration-200">
          <div class="flex items-center gap-3">
            <iconify-icon icon="heroicons:document-duplicate" class="text-base ${isActive("duplicate") ? "text-emerald-600" : "text-slate-400 group-hover:text-emerald-600"}"></iconify-icon>
            <span>Duplicate File</span>
          </div>
          ${isActive("duplicate") ? '<span class="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-bold">Aktif</span>' : ""}
        </a>

        <!-- Drive Link (Disesuaikan dengan file drive-link.html) -->
        <a href="./upload-drive" class="group flex items-center justify-between px-3.5 py-2.5 rounded-xl ${
          isActive("upload-drive")
            ? "bg-emerald-50 text-emerald-800 font-semibold shadow-sm shadow-emerald-500/10 border border-emerald-200/50"
            : "text-slate-600 hover:text-emerald-700 hover:bg-slate-50 font-medium hover:translate-x-1"
        } text-xs transition-all duration-200">
          <div class="flex items-center gap-3">
            <iconify-icon icon="heroicons:cloud-arrow-up" class="text-base ${isActive("drive-link") ? "text-emerald-600" : "text-slate-400 group-hover:text-emerald-600"}"></iconify-icon>
            <span>Cek Drive</span>
          </div>
          ${isActive("upload-drive") ? '<span class="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-bold">Aktif</span>' : ""}
        </a>
      </nav>
    </div>

    <!-- Sidebar Footer -->
    <div class="p-3.5 border-t border-slate-100">
      <div class="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50/80 border border-slate-200/60 hover:bg-slate-100/70 transition-all">
        <div class="relative">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-black flex items-center justify-center text-xs shadow-sm">
            KT
          </div>
          <span class="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full animate-pulse-slow"></span>
        </div>
        <div class="leading-tight truncate flex-1">
          <p class="text-xs font-bold text-slate-800 truncate">@kimii_team</p>
          <span class="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
            <iconify-icon icon="heroicons:check-badge-20-solid" class="text-xs"></iconify-icon>
            Active Work
          </span>
        </div>
      </div>
    </div>
  </aside>`;

  // 2. Navbar Atas (Toggle Sidebar untuk HP & Desktop)
  const navbarHTML = `
  <header class="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 transition-all">
    <div class="flex items-center gap-3">
      <button onclick="toggleSidebar()" class="group text-slate-600 hover:text-emerald-700 p-2 rounded-xl border border-slate-200/80 hover:border-emerald-200 hover:bg-emerald-50/50 flex items-center justify-center transition-all active:scale-95 shadow-sm" title="Toggle Sidebar">
        <iconify-icon icon="heroicons:bars-3-bottom-left-20-solid" class="text-xl transition-transform group-hover:scale-110"></iconify-icon>
      </button>

      <div class="hidden sm:flex items-center gap-2 text-slate-400 bg-slate-50 border border-slate-200/80 px-3 py-1.5 rounded-xl w-64 focus-within:w-72 focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/10 transition-all">
        <iconify-icon icon="heroicons:magnifying-glass-20-solid" class="text-slate-400 text-sm"></iconify-icon>
        <input type="text" placeholder="Cari modul atau menu..." class="w-full text-xs bg-transparent text-slate-700 placeholder-slate-400 focus:outline-none" />
      </div>
    </div>

    <div class="flex items-center gap-3">
      <div class="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200/70 px-3 py-1 rounded-xl text-xs font-semibold text-slate-600">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span class="text-slate-500 font-medium">Sistem:</span>
        <span class="text-emerald-700 font-bold">Online</span>
      </div>

      <div class="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/70 flex items-center justify-center font-extrabold text-xs shadow-sm hover:scale-105 transition-transform cursor-pointer">
        K
      </div>
    </div>
  </header>`;

  // 3. Footer Bawah
  const footerHTML = `
  <footer class="py-6 text-center text-xs text-slate-400 space-y-1">
    <p class="font-medium text-slate-500">Kimi Suite v3.0 • Automated Dispatch & Workspace</p>
    <p class="text-[11px] text-slate-400">© 2026 Kimi Team. Hak cipta dilindungi undang-undang.</p>
  </footer>`;

  const sidebarTarget = document.getElementById("app-sidebar");
  const navbarTarget = document.getElementById("app-navbar");
  const footerTarget = document.getElementById("app-footer");

  if (sidebarTarget) sidebarTarget.outerHTML = sidebarHTML;
  if (navbarTarget) navbarTarget.outerHTML = navbarHTML;
  if (footerTarget) footerTarget.outerHTML = footerHTML;
});

// Fungsi Toggle Buka-Tutup Menu (Responsif HP & Desktop)
window.toggleSidebar = function () {
  const sidebar = document.getElementById("mainSidebar");
  const backdrop = document.getElementById("mobileBackdrop");
  if (!sidebar) return;

  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    const isClosed = sidebar.classList.contains("-translate-x-full");
    if (isClosed) {
      sidebar.classList.remove("-translate-x-full");
      backdrop.classList.remove("hidden");
      setTimeout(() => backdrop.classList.remove("opacity-0"), 10);
    } else {
      sidebar.classList.add("-translate-x-full");
      backdrop.classList.add("opacity-0");
      setTimeout(() => backdrop.classList.add("hidden"), 300);
    }
  } else {
    const isHiddenDesktop = sidebar.classList.contains("md:hidden");
    if (isHiddenDesktop) {
      sidebar.classList.remove("md:hidden");
    } else {
      sidebar.classList.add("md:hidden");
    }
  }
};
