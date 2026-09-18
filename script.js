const colorPicker = document.getElementById("colorPicker");
const colorPreview = document.getElementById("colorPreview");
const hexValue = document.getElementById("hexValue");
const hexText = document.getElementById("hexText");
const rgbText = document.getElementById("rgbText");
const palette = document.getElementById("palette");

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  return {
    r: parseInt(value.substring(0, 2), 16),
    g: parseInt(value.substring(2, 4), 16),
    b: parseInt(value.substring(4, 6), 16)
  };
}

function updateColor(hex) {
  const rgb = hexToRgb(hex);
  const rgbValue = `${rgb.r}, ${rgb.g}, ${rgb.b}`;

  colorPreview.style.background = hex;
  hexValue.textContent = hex.toUpperCase();
  hexText.textContent = hex.toUpperCase();
  rgbText.textContent = rgbValue;
}

function randomHex() {
  return "#" + Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");
}

function createPalette() {
  palette.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const color = randomHex();
    const item = document.createElement("div");

    item.className = "palette-color";
    item.style.background = color;
    item.textContent = color.toUpperCase();

    item.addEventListener("click", async () => {
      await navigator.clipboard.writeText(color.toUpperCase());
      item.textContent = "Copié !";
      setTimeout(() => {
        item.textContent = color.toUpperCase();
      }, 900);
    });

    palette.appendChild(item);
  }
}

colorPicker.addEventListener("input", (event) => {
  updateColor(event.target.value);
});

document.getElementById("randomButton").addEventListener("click", () => {
  const color = randomHex();
  colorPicker.value = color;
  updateColor(color);
});

document.getElementById("paletteButton").addEventListener("click", createPalette);

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const element = document.getElementById(button.dataset.copy);
    await navigator.clipboard.writeText(element.textContent);
    button.textContent = "Copié !";

    setTimeout(() => {
      button.textContent = "Copier";
    }, 900);
  });
});

updateColor(colorPicker.value);
createPalette();