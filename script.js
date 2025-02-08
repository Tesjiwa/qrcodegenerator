// Gunakan versi UMD dari QRCodeStyling (bisa dipakai langsung di browser)
const qrCode = new QRCodeStyling();

const qrInput = document.getElementById("qr-input");
const generateBtn = document.getElementById("generate-btn");
const qrCanvas = document.getElementById("qr-canvas");
const sizeSelect = document.getElementById("size-select");
const colorPicker = document.getElementById("color-picker");
const logoUpload = document.getElementById("logo-upload");
const downloadPNG = document.getElementById("download-png");
const downloadSVG = document.getElementById("download-svg");
const shareBtn = document.getElementById("share-btn");
const historyList = document.getElementById("history-list");
const themeToggle = document.getElementById("theme-toggle");

generateBtn.addEventListener("click", async () => {
  const text = qrInput.value.trim();
  if (!text) {
    showNotification("Gagal: Masukkan teks atau URL!", "error");
    return;
  }

  const size = Number(sizeSelect.value);
  const color = colorPicker.value;

  let logoUrl = undefined;
  if (logoUpload.files.length > 0) {
    logoUrl = await getBase64(logoUpload.files[0]);
  }

  // Hapus QR sebelumnya
  qrCanvas.innerHTML = "";

  // Konfigurasi QR Code
  const qrCodeConfig = {
    width: size,
    height: size,
    data: text,
    dotsOptions: { color: color },
    backgroundOptions: { color: "#ffffff" },
    image: logoUrl,
    imageOptions: { crossOrigin: "anonymous", margin: 5 }
  };

  // Buat QR Code baru
  qrCode.update(qrCodeConfig);
  qrCode.append(qrCanvas);
  
  document.querySelector(".qr-section").style.display = "block";
  showNotification("QR Code berhasil dibuat!", "success");

  // Tambahkan ke riwayat
  const historyItem = document.createElement("li");
  historyItem.textContent = text;
  historyItem.onclick = () => qrInput.value = text;
  historyList.appendChild(historyItem);
});

// Fungsi untuk mengubah file logo ke Base64
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

// Fungsi notifikasi
function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerText = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Download QR Code
downloadPNG.addEventListener("click", () => qrCode.download({ extension: "png" }));
downloadSVG.addEventListener("click", () => qrCode.download({ extension: "svg" }));

// Bagikan ke WhatsApp
shareBtn.addEventListener("click", () => {
  const url = encodeURIComponent(qrInput.value);
  const whatsapp = `https://wa.me/?text=${url}`;
  window.open(whatsapp, "_blank");
});

// Mode gelap/terang
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️ Mode Terang" : "🌙 Mode Gelap";
});
