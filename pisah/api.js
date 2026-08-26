// Minggu 10
export async function ambilKutipan() {
  try {
    const res = await fetch("https://dummyjson.com/quotes/random");
    if (!res.ok) throw new Error("API gagal");
    const data = await res.json();
    document.getElementById("kutipan-harian").textContent = `"${data.quote}" — ${data.author}`;
  } catch (error) {
    console.warn("Kutipan gagal:", error);
    document.getElementById("kutipan-harian").textContent = "Gagal memuat kutipan.";
  }
}

// Minggu 11
export async function ambilCuaca(kota) {
  const apiKey = "5432308cb36cebd46e38de28dfd4116c";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${kota}&units=metric&appid=${apiKey}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Kota tidak ditemukan");
    const data = await res.json();
    document.getElementById("info-cuaca").innerHTML = `
      <p>${data.name}: ${data.main.temp}°C</p>
      <p>${data.weather[0].description}</p>
    `;
  } catch (error) {
    document.getElementById("info-cuaca").textContent = error.message;
  }
}