const fs = require("fs");
const { createCanvas } = require("canvas");

const images = [
  { name: "trading-bot", color: "#6366f1" },
  { name: "data-analyst", color: "#8b5cf6" },
  { name: "content-gen", color: "#ec4899" },
  { name: "market-research", color: "#06b6d4" },
  { name: "social-media", color: "#14b8a6" },
  { name: "code-assistant", color: "#8b5cf6" },
];

const width = 800;
const height = 450;

images.forEach(({ name, color }) => {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Fill background
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);

  // Add text
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 48px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(name.replace("-", " ").toUpperCase(), width / 2, height / 2);

  // Save image
  const buffer = canvas.toBuffer("image/jpeg");
  fs.writeFileSync(`public/images/${name}.jpg`, buffer);
});
