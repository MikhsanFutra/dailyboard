import { ambilKutipan, ambilCuaca } from "./pisah/api.js";
import { simpanKeStorage, muatDariStorage } from "./pisah/storage.js";
import { initCatatan } from "./pisah/catatan.js";

// Fase 1
// Minggu 1 -> Setup Struktur
// Minggu 2 -> Seleksi & Manipulasi DOM

const app = document.getElementById("app");

const judul = document.createElement("h2");
judul.textContent = "Selamat datang di DailyBoard!";
judul.style.color = "#2563eb";
app.appendChild(judul);

const tugasSection = document.createElement("section");
tugasSection.id = "tugas";

const titleTugas = document.createElement("h3");
titleTugas.textContent = "Section Tugas";
tugasSection.appendChild(titleTugas);

const catatanSection = document.createElement("section");
catatanSection.id = "catatan";

const cuacaSection = document.createElement("section");
cuacaSection.id = "cuaca";

app.append(tugasSection, catatanSection, cuacaSection);

// Fase 2
// Minggu 3 -> Event Handling

const inputTugas = document.createElement("input");
inputTugas.type = "text";
inputTugas.placeholder = "Masukan nama tugas";

const tombolTambah = document.createElement("button");
tombolTambah.textContent = "Tambah";

tugasSection.appendChild(inputTugas);
tugasSection.appendChild(tombolTambah);

tombolTambah.addEventListener("click", () => {
  const namaTugas = inputTugas.value.trim();

  if (validasiInput(namaTugas)) {
    tambahTugas(namaTugas);
    inputTugas.value = "";
  }
});

// Fase 2
// Minggu 4 -> Fitur To-Do List Interaktif

let daftarTugas = [];

const daftar_tugas = document.createElement("ul");
daftar_tugas.id = "daftar-tugas";
tugasSection.appendChild(daftar_tugas);

// Minggu 5 -> Tambah & Hapus Tugas

let nextId = 1;
let filterAktif = "semua";

function tambahTugas(nama) {
  daftarTugas.push({
    id: nextId++,
    nama: nama,
    selesai: false
  });

  simpanKeStorage(daftarTugas);
  renderTugas();
}

function hapusTugas(id) {
  daftarTugas = daftarTugas.filter((t) => t.id !== id);

  simpanKeStorage(daftarTugas);
  renderTugas();
}

// Minggu 6 -> Tandai Selesai & Filter Tugas

const filterContainer = document.createElement("div");
filterContainer.id = "filter-container";

const btnSemua = document.createElement("button");
btnSemua.textContent = "Semua";

const btnSelesai = document.createElement("button");
btnSelesai.textContent = "Selesai";

const btnBelum = document.createElement("button");
btnBelum.textContent = "Belum Selesai";

filterContainer.append(btnSemua, btnSelesai, btnBelum);
tugasSection.appendChild(filterContainer);

function toggleSelesai(id) {
  daftarTugas = daftarTugas.map((t) =>
    t.id === id
      ? { ...t, selesai: !t.selesai }
      : t
  );

  simpanKeStorage(daftarTugas);
  renderTugas();
}

function renderTugas(filter = filterAktif) {
  filterAktif = filter;

  const list = document.getElementById("daftar-tugas");
  list.innerHTML = "";

  const tugasTersaring = daftarTugas.filter((t) => {
    if (filter === "selesai") {
      return t.selesai;
    }

    if (filter === "belum") {
      return !t.selesai;
    }

    return true;
  });

  tugasTersaring.forEach((tugas) => {
    const li = document.createElement("li");
    li.className = "tugas-item";
    li.dataset.id = tugas.id;

    const spanTeks = document.createElement("span");
    spanTeks.textContent = tugas.nama;
    spanTeks.style.textDecoration = tugas.selesai
      ? "line-through"
      : "none";

    spanTeks.style.cursor = "pointer";

    let timerClick = null;

    spanTeks.addEventListener("click", () => {
      timerClick = setTimeout(() => {
        toggleSelesai(tugas.id);
      }, 250);
    });

    spanTeks.addEventListener("dblclick", (e) => {
      e.stopPropagation();

      clearTimeout(timerClick);

      const namaBaru = prompt(
        "Edit nama tugas:",
        tugas.nama
      );

      if (namaBaru !== null) {
        editTugas(tugas.id, namaBaru);
      }
    });

    const tombolHapus = document.createElement("button");
    tombolHapus.textContent = "Hapus";

    tombolHapus.addEventListener("click", (e) => {
      e.stopPropagation();
      hapusTugas(tugas.id);
    });

    li.appendChild(spanTeks);
    li.appendChild(tombolHapus);

    list.appendChild(li);
  });

  aktifkanDragDrop();
}

btnSemua.addEventListener("click", () => {
  renderTugas("semua");
});

btnSelesai.addEventListener("click", () => {
  renderTugas("selesai");
});

btnBelum.addEventListener("click", () => {
  renderTugas("belum");
});

// Fase 3
// Minggu 7 -> Local Storage

function editTugas(id, namaBaru) {
  if (validasiInput(namaBaru)) {
    daftarTugas = daftarTugas.map((t) =>
      t.id === id
        ? { ...t, nama: namaBaru.trim() }
        : t
    );

    simpanKeStorage(daftarTugas);
    renderTugas();
  }
}

// Minggu 9 -> Validasi Input

function validasiInput(nilai) {
  if (nilai.trim() === "") {
    alert("Input tidak boleh kosong!");
    return false;
  }

  if (nilai.length > 100) {
    alert("Input maksimal 100 karakter!");
    return false;
  }

  return true;
}

daftarTugas = muatDariStorage();

if (daftarTugas.length > 0) {
  nextId =
    Math.max(...daftarTugas.map((t) => t.id)) + 1;
}

renderTugas();

initCatatan(catatanSection, validasiInput);

// Fase 4
// Minggu 10 -> Integrasi API

const statusGlobal = document.createElement("p");
statusGlobal.id = "status";
statusGlobal.style.fontWeight = "bold";

app.insertBefore(statusGlobal, app.firstChild);

const kutipanSection = document.createElement("section");
kutipanSection.id = "kutipan";

const titleKutipan = document.createElement("h3");
titleKutipan.textContent = "Kutipan Hari Ini";

const textKutipan = document.createElement("p");
textKutipan.id = "kutipan-harian";
textKutipan.textContent = "Memuat kutipan...";

kutipanSection.append(
  titleKutipan,
  textKutipan
);

const refreshKutipan = document.createElement("button");
refreshKutipan.textContent = "Refresh Kutipan";
refreshKutipan.type = "button";

kutipanSection.appendChild(refreshKutipan);
app.appendChild(kutipanSection);

// Minggu 11 -> Widget Cuaca

const titleCuaca = document.createElement("h3");
titleCuaca.textContent = "Widget Cuaca";

const inputKota = document.createElement("input");
inputKota.type = "text";
inputKota.placeholder =
  "Masukan nama kota (misal: Bandung)...";

const btnCariCuaca = document.createElement("button");
btnCariCuaca.textContent = "Cari Cuaca";

const infoCuaca = document.createElement("div");
infoCuaca.id = "info-cuaca";

cuacaSection.append(
  titleCuaca,
  inputKota,
  btnCariCuaca,
  infoCuaca
);

btnCariCuaca.addEventListener("click", () => {
  const kota = inputKota.value.trim();

  if (kota !== "") {
    ambilCuaca(kota);
  }
});

// Minggu 12 -> Memuat Semua Widget

async function muatSemuaWidget() {
  statusGlobal.textContent = "Memuat data...";
  refreshKutipan.disabled = true;

  try {
    await Promise.all([
      ambilKutipan(),
      ambilCuaca("Jakarta")
    ]);

    statusGlobal.textContent =
      "Data berhasil dimuat";
  } catch (error) {
    statusGlobal.textContent =
      "Gagal memuat data";
    console.error(error);
  } finally {
    refreshKutipan.disabled = false;
  }
}

refreshKutipan.addEventListener(
  "click",
  async () => {
    refreshKutipan.disabled = true;
    textKutipan.textContent =
      "Memuat kutipan baru...";

    try {
      await ambilKutipan();
    } catch (error) {
      console.error(error);
      textKutipan.textContent =
        "Gagal memuat kutipan.";
    } finally {
      refreshKutipan.disabled = false;
    }
  }
);

window.addEventListener(
  "DOMContentLoaded",
  muatSemuaWidget
);

// Fase 5
// Minggu 13 -> Drag & Drop

function aktifkanDragDrop() {
  const items =
    document.querySelectorAll(".tugas-item");

  items.forEach((item) => {
    item.setAttribute("draggable", true);

    item.addEventListener(
      "dragstart",
      (e) => {
        e.dataTransfer.setData(
          "text/plain",
          item.dataset.id
        );
      }
    );
  });

  const list =
    document.getElementById("daftar-tugas");

  if (!list) {
    return;
  }

  list.ondragover = (e) => {
    e.preventDefault();
  };

  list.ondrop = (e) => {
    e.preventDefault();

    const id = Number(
      e.dataTransfer.getData("text/plain")
    );

    const indexLama =
      daftarTugas.findIndex(
        (t) => t.id === id
      );

    const targetElement =
      e.target.closest(".tugas-item");

    if (
      targetElement &&
      indexLama !== -1
    ) {
      const idTarget =
        Number(targetElement.dataset.id);

      const indexBaru =
        daftarTugas.findIndex(
          (t) => t.id === idTarget
        );

      if (indexBaru !== -1) {
        const [tugasDipindah] =
          daftarTugas.splice(indexLama, 1);

        daftarTugas.splice(
          indexBaru,
          0,
          tugasDipindah
        );

        simpanKeStorage(daftarTugas);
        renderTugas();
      }
    }
  };
};

// Minggu 14 -> Dark Mode & Pencarian

const header =
  document.querySelector("header") || app;

const btnToggleTema =
  document.createElement("button");

btnToggleTema.id = "toggle-tema";
btnToggleTema.textContent =
  "Toggle Dark Mode";

header.appendChild(btnToggleTema);

const inputCari =
  document.createElement("input");

inputCari.type = "text";
inputCari.id = "cari-tugas";
inputCari.placeholder =
  "Cari tugas...";

tugasSection.insertBefore(
  inputCari,
  filterContainer
);

btnToggleTema.addEventListener(
  "click",
  () => {
    document.body.classList.toggle(
      "dark-mode"
    );

    const modeAktif =
      document.body.classList.contains(
        "dark-mode"
      );

    localStorage.setItem(
      "tema",
      modeAktif ? "gelap" : "terang"
    );
  }
);

if (
  localStorage.getItem("tema") ===
  "gelap"
) {
  document.body.classList.add(
    "dark-mode"
  );
}

inputCari.addEventListener(
  "input",
  (e) => {
    const kataKunci =
      e.target.value
        .toLowerCase()
        .trim();

    cariTugasDebounced(kataKunci);
  }
);

function renderTugasKustom(
  daftar = daftarTugas
) {
  const list =
    document.getElementById(
      "daftar-tugas"
    );

  list.innerHTML = "";

  daftar.forEach((tugas) => {
    const li =
      document.createElement("li");

    li.className = "tugas-item";
    li.dataset.id = tugas.id;

    const spanTeks =
      document.createElement("span");

    spanTeks.textContent =
      tugas.nama;

    spanTeks.style.textDecoration =
      tugas.selesai
        ? "line-through"
        : "none";

    const tombolHapus =
      document.createElement("button");

    tombolHapus.textContent =
      "Hapus";

    tombolHapus.addEventListener(
      "click",
      () => {
        hapusTugas(tugas.id);
      }
    );

    li.appendChild(spanTeks);
    li.appendChild(tombolHapus);

    list.appendChild(li);
  });

  aktifkanDragDrop();
}

// Minggu 15 -> Debounce Pencarian

function debounce(
  fn,
  delay = 300
) {
  let timer;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(
      () => fn(...args),
      delay
    );
  };
}

const cariTugasDebounced =
  debounce(
    (kataKunci) => {
      const hasil =
        daftarTugas.filter(
          (t) =>
            t.nama
              .toLowerCase()
              .includes(kataKunci)
        );

      renderTugasKustom(hasil);
    },
    500
  );