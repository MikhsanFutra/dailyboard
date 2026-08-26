// Fase 3 -> LocalStorage & Fitur Catatan
// Minggu 7 - Local Storage
export function simpanKeStorage(list) {
  localStorage.setItem("daftarTugas", JSON.stringify(list));
}

export function muatDariStorage() {
  const data = localStorage.getItem("daftarTugas");
  return data ? JSON.parse(data) : [];
}