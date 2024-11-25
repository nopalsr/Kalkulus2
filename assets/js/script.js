// Inisialisasi canvas jika ada
const canvas = document.getElementById("linearChart");
const ctx = canvas ? canvas.getContext("2d") : null;

// Fungsi menggambar sumbu
function drawAxes() {
  if (!ctx || !canvas) return; // Pastikan canvas tersedia
  const width = canvas.width;
  const height = canvas.height;
  const originX = width / 2;
  const originY = height / 2;

  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();

  // Sumbu X
  ctx.moveTo(0, originY);
  ctx.lineTo(width, originY);

  // Sumbu Y
  ctx.moveTo(originX, 0);
  ctx.lineTo(originX, height);

  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.font = "12px Arial";
  ctx.fillStyle = "black";

  // Angka pada sumbu
  const scale = 40;
  for (let i = -10; i <= 10; i++) {
    const px = originX + i * scale;
    const py = originY - i * scale;

    // Sumbu X
    ctx.fillText(i, px - 5, originY + 15);
    ctx.beginPath();
    ctx.moveTo(px, originY - 5);
    ctx.lineTo(px, originY + 5);
    ctx.stroke();

    // Sumbu Y
    ctx.fillText(i, originX + 5, py + 5);
    ctx.beginPath();
    ctx.moveTo(originX - 5, py);
    ctx.lineTo(originX + 5, py);
    ctx.stroke();
  }
}

// Fungsi menggambar garis pada hitung.html
function drawLineM(m, c) {
  if (!ctx || !canvas) return;
  const width = canvas.width;
  const height = canvas.height;
  const originX = width / 2;
  const originY = height / 2;
  const scale = 40;

  ctx.beginPath();
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 2;

  // Dua titik untuk menggambar garis
  const x1 = -10;
  const y1 = m * x1 + c;
  const x2 = 10;
  const y2 = m * x2 + c;

  // Konversi koordinat ke piksel
  const px1 = originX + x1 * scale;
  const py1 = originY - y1 * scale;
  const px2 = originX + x2 * scale;
  const py2 = originY - y2 * scale;

  // Menggambar garis
  ctx.moveTo(px1, py1);
  ctx.lineTo(px2, py2);
  ctx.stroke();
}

// Fungsi menggambar garis pada hitung2.html
function drawLineABC(a, b, c) {
  if (!ctx || !canvas) return;
  const width = canvas.width;
  const height = canvas.height;
  const originX = width / 2;
  const originY = height / 2;
  const scale = 40;

  ctx.beginPath();
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 2;

  // Dua titik untuk menggambar garis
  const y1 = (-c - a * -10) / b;
  const y2 = (-c - a * 10) / b;

  // Konversi koordinat ke piksel
  const px1 = originX + -10 * scale;
  const py1 = originY - y1 * scale;
  const px2 = originX + 10 * scale;
  const py2 = originY - y2 * scale;

  // Menggambar garis
  ctx.moveTo(px1, py1);
  ctx.lineTo(px2, py2);
  ctx.stroke();
}

// Fungsi utama untuk hitung.html
function initializeCalculator1() {
  document.getElementById("calculateButton").addEventListener("click", () => {
    const m = parseFloat(document.getElementById("m").value);
    const c = parseFloat(document.getElementById("c").value);
    const x = parseFloat(document.getElementById("inputX").value);

    if (isNaN(m) || isNaN(c)) {
      alert("Masukkan nilai m dan c yang valid!");
      return;
    }

    drawAxes();
    drawLineM(m, c);

    const equation = `y = ${m}x + ${c}`;
    document.getElementById("result").textContent = `Persamaan: ${equation}`;

    if (!isNaN(x)) {
      const y = m * x + c;
      const steps = `
        Langkah-langkah:
        1. Gunakan persamaan: y = mx + c
        2. Substitusi nilai: m = ${m}, x = ${x}, c = ${c}
        3. Hasil: y = ${y.toFixed(2)}
      `;
      document.getElementById("steps").innerHTML = `<pre>${steps}</pre>`;
    } else {
      document.getElementById("steps").innerHTML = "Masukkan nilai x untuk melihat langkah pengerjaan.";
    }
  });

  document.getElementById("resetButton").addEventListener("click", () => {
    document.getElementById("m").value = "";
    document.getElementById("c").value = "";
    document.getElementById("inputX").value = "";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAxes();
    document.getElementById("result").textContent = "";
    document.getElementById("steps").innerHTML = "";
  });

  drawAxes();
}

// Fungsi utama untuk hitung2.html
function initializeCalculator2() {
  document.getElementById("calculateButton").addEventListener("click", () => {
    const a = parseFloat(document.getElementById("a").value);
    const b = parseFloat(document.getElementById("b").value);
    const c = parseFloat(document.getElementById("c").value);
    const x = parseFloat(document.getElementById("inputX").value);

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      alert("Masukkan nilai a, b, dan c yang valid!");
      return;
    }

    drawAxes();
    drawLineABC(a, b, c);

    const equation = `${a}x + ${b}y + ${c} = 0`;
    document.getElementById("result").textContent = `Persamaan: ${equation}`;

    if (!isNaN(x)) {
      const y = (-c - a * x) / b;
      const steps = `
        Langkah-langkah:
        1. Gunakan persamaan: ${a}x + ${b}y + ${c} = 0
        2. Substitusi nilai: x = ${x}
        3. Hasil: y = ${y.toFixed(2)}
      `;
      document.getElementById("steps").innerHTML = `<pre>${steps}</pre>`;
    } else {
      document.getElementById("steps").innerHTML = "Masukkan nilai x untuk melihat langkah pengerjaan.";
    }
  });

  document.getElementById("resetButton").addEventListener("click", () => {
    document.getElementById("a").value = "";
    document.getElementById("b").value = "";
    document.getElementById("c").value = "";
    document.getElementById("inputX").value = "";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAxes();
    document.getElementById("result").textContent = "";
    document.getElementById("steps").innerHTML = "";
  });

  drawAxes();
}

// Deteksi halaman dan inisialisasi
if (document.getElementById("m") && document.getElementById("c")) {
  initializeCalculator1();
} else if (document.getElementById("a") && document.getElementById("b") && document.getElementById("c")) {
  initializeCalculator2();
}
