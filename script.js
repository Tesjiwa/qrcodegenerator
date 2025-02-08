import QRCodeStyling from "https://cdn.jsdelivr.net/npm/qr-code-styling/lib/qr-code-styling.min.js";

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

let qrCode;

generateBtn.addEventListener("click", () => {
  const text = qrInput.value.trim();
  if (!text) return;

  qrCode = new QRCodeStyling({
    width: Number(sizeSelect.value),
    height: Number(sizeSelect.value),
    dotsOptions: { color: colorPicker.value },
    backgroundOptions: { color: "#ffffff" },
    image: logoUpload.files[0] ? URL.createObjectURL(logoUpload.files[0]) : undefined,
  });

  qrCode.append(qrCanvas);
  document.querySelector(".qr-section").style.display = "block";

  // Tambahkan ke riwayat
  const historyItem = document.createElement("li");
  historyItem.textContent = text;
  historyItem.onclick = () => qrInput.value = text;
  historyList.appendChild(historyItem);
});

downloadPNG.addEventListener("click", () => qrCode.download({ extension: "png" }));
downloadSVG.addEventListener("click", () => qrCode.download({ extension: "svg" }));

shareBtn.addEventListener("click", () => {
  const url = encodeURIComponent(qrInput.value);
  const whatsapp = `https://wa.me/?text=${url}`;
  window.open(whatsapp, "_blank");
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️ Mode Terang" : "🌙 Mode Gelap";
});