// Minggu 8 -> Fitur Catatan Cepat (Notes)
export function initCatatan(section, validasi) {
  const titleCatatan = document.createElement("h3");
  titleCatatan.textContent = "Section Catatan";

  const inputCatatan = document.createElement("textarea");
  inputCatatan.placeholder = "Tulis catatan di sini...";

  const tombolTambahCatatan = document.createElement("button");
  tombolTambahCatatan.textContent = "Tambah Catatan";

  const listCatatan = document.createElement("div");
  listCatatan.id = "daftar-catatan";

  section.append(titleCatatan, inputCatatan, tombolTambahCatatan, listCatatan);

  let daftarCatatan = [];

  function muatCatatanDariStorage() {
    const data = localStorage.getItem("daftarCatatan");
    daftarCatatan = data ? JSON.parse(data) : [];
  }

  function simpanCatatanKeStorage() {
    localStorage.setItem("daftarCatatan", JSON.stringify(daftarCatatan));
  }

  function renderCatatan() {
    const container = document.getElementById("daftar-catatan");
    container.innerHTML = "";

    daftarCatatan.forEach((catatan) => {
      const div = document.createElement("div");
      div.className = "catatan-item";

      div.innerHTML = `
        <p>${catatan.isi}</p>
        <small>${catatan.tanggal}</small>
        <button class="btn-hapus">Hapus</button>
      `;

      div.querySelector("p").addEventListener("dblclick", () => {
        const teksBaru = prompt("Edit catatan:", catatan.isi);
        if (teksBaru !== null) editCatatan(catatan.id, teksBaru);
      });

      div.querySelector(".btn-hapus").addEventListener("click", () => {
        hapusCatatan(catatan.id);
      });

      container.appendChild(div);
    });
  }

  function tambahCatatan(isi) {
    daftarCatatan.push({
      id: Date.now(),
      isi,
      tanggal: new Date().toLocaleDateString("id-ID")
    });
    simpanCatatanKeStorage();
    renderCatatan();
  }

  function hapusCatatan(id) {
    daftarCatatan = daftarCatatan.filter((c) => c.id !== id);
    simpanCatatanKeStorage();
    renderCatatan();
  }

  function editCatatan(id, teksBaru) {
    if (validasi(teksBaru)) {
      daftarCatatan = daftarCatatan.map((c) =>
        c.id === id ? { ...c, isi: teksBaru.trim() } : c
      );
      simpanCatatanKeStorage();
      renderCatatan();
    }
  }

  tombolTambahCatatan.addEventListener("click", () => {
    const teksCatatan = inputCatatan.value.trim();
    if (validasi(teksCatatan)) {
      tambahCatatan(teksCatatan.trim());
      inputCatatan.value = "";
    }
  });

  muatCatatanDariStorage();
  renderCatatan();
}
