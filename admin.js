/* =========================================
   DATA
========================================= */

let galeri = JSON.parse(localStorage.getItem("galeri")) || [];

let berita = JSON.parse(localStorage.getItem("berita")) || [];

let pesan = JSON.parse(localStorage.getItem("pesan")) || [];


/* =========================================
   LOGIN
========================================= */

const loginPage = document.getElementById("loginPage");
const adminPage = document.getElementById("adminPage");

document.getElementById("loginForm").addEventListener("submit", function(e) {

    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "12345") {

        localStorage.setItem("adminLogin", "true");

        tampilkanAdmin();

    } else {

        document.getElementById("loginError").innerText =
            "Username atau password salah!";

    }

});


function tampilkanAdmin() {

    loginPage.style.display = "none";

    adminPage.classList.add("show");

    tampilkanSemua();

}


/* =========================================
   CEK LOGIN
========================================= */

if (localStorage.getItem("adminLogin") === "true") {

    tampilkanAdmin();

}


/* =========================================
   MENU
========================================= */

const menu = document.querySelectorAll(".menu");

const sections = document.querySelectorAll(".content-section");

const pageTitle = document.getElementById("pageTitle");


menu.forEach(item => {

    item.addEventListener("click", function(e) {

        e.preventDefault();

        menu.forEach(m => m.classList.remove("active"));

        this.classList.add("active");

        sections.forEach(section => {
            section.classList.remove("active");
        });

        const sectionName = this.dataset.section;

        document.getElementById(sectionName).classList.add("active");

        pageTitle.innerText =
            this.innerText.replace(/[^\w\s]/gi, "").trim();

    });

});


/* =========================================
   PROFIL
========================================= */

function simpanProfil() {

    const nama = document.getElementById("namaWebsite").value;

    const deskripsi =
        document.getElementById("deskripsiWebsite").value;

    const alamat =
        document.getElementById("alamatWebsite").value;

    const telepon =
        document.getElementById("teleponWebsite").value;


    const profil = {
        nama,
        deskripsi,
        alamat,
        telepon
    };


    localStorage.setItem(
        "profilWebsite",
        JSON.stringify(profil)
    );


    alert("Profil berhasil disimpan!");


}


/* =========================================
   LOAD PROFIL
========================================= */

function loadProfil() {

    const profil =
        JSON.parse(localStorage.getItem("profilWebsite"));


    if (!profil) return;


    document.getElementById("namaWebsite").value =
        profil.nama || "";

    document.getElementById("deskripsiWebsite").value =
        profil.deskripsi || "";

    document.getElementById("alamatWebsite").value =
        profil.alamat || "";

    document.getElementById("teleponWebsite").value =
        profil.telepon || "";

}


/* =========================================
   GALERI
========================================= */

function tambahFoto() {

    const judul =
        document.getElementById("judulFoto").value.trim();

    const url =
        document.getElementById("urlFoto").value.trim();


    if (judul === "" || url === "") {

        alert("Judul dan URL foto harus diisi!");

        return;
    }


    galeri.push({

        id: Date.now(),

        judul: judul,

        url: url

    });


    localStorage.setItem(
        "galeri",
        JSON.stringify(galeri)
    );


    document.getElementById("judulFoto").value = "";

    document.getElementById("urlFoto").value = "";


    tampilkanGaleri();

    updateDashboard();


    alert("Foto berhasil ditambahkan!");

}


/* =========================================
   TAMPILKAN GALERI
========================================= */

function tampilkanGaleri() {

    const container =
        document.getElementById("galeriList");


    container.innerHTML = "";


    if (galeri.length === 0) {

        container.innerHTML = `
            <div class="empty">
                Belum ada foto galeri.
            </div>
        `;

        return;
    }


    galeri.forEach((item, index) => {

        container.innerHTML += `

            <div class="gallery-item">

                <img
                    src="${item.url}"
                    alt="${item.judul}"
                    onerror="this.src='https://via.placeholder.com/600x400?text=Foto+Tidak+Ditemukan'"
                >

                <div class="gallery-info">

                    <h3>${item.judul}</h3>

                    <button
                        class="delete-btn"
                        onclick="hapusFoto(${index})"
                    >
                        🗑️ Hapus
                    </button>

                </div>

            </div>

        `;

    });

}


/* =========================================
   HAPUS FOTO
========================================= */

function hapusFoto(index) {

    if (!confirm("Yakin ingin menghapus foto ini?")) {
        return;
    }


    galeri.splice(index, 1);


    localStorage.setItem(
        "galeri",
        JSON.stringify(galeri)
    );


    tampilkanGaleri();

    updateDashboard();

}


/* =========================================
   BERITA
========================================= */

function tambahBerita() {

    const judul =
        document.getElementById("judulBerita").value.trim();

    const isi =
        document.getElementById("isiBerita").value.trim();


    if (judul === "" || isi === "") {

        alert("Judul dan isi berita harus diisi!");

        return;
    }


    berita.push({

        id: Date.now(),

        judul: judul,

        isi: isi,

        tanggal: new Date().toLocaleDateString(
            "id-ID",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        )

    });


    localStorage.setItem(
        "berita",
        JSON.stringify(berita)
    );


    document.getElementById("judulBerita").value = "";

    document.getElementById("isiBerita").value = "";


    tampilkanBerita();

    updateDashboard();


    alert("Berita berhasil ditambahkan!");

}


/* =========================================
   TAMPILKAN BERITA
========================================= */

function tampilkanBerita() {

    const container =
        document.getElementById("beritaList");


    container.innerHTML = "";


    if (berita.length === 0) {

        container.innerHTML = `
            <div class="empty">
                Belum ada berita.
            </div>
        `;

        return;
    }


    berita.slice().reverse().forEach((item, reverseIndex) => {

        const index =
            berita.length - 1 - reverseIndex;


        container.innerHTML += `

            <div class="news-item">

                <h3>${item.judul}</h3>

                <div class="news-date">
                    📅 ${item.tanggal}
                </div>

                <div class="news-content">
                    ${item.isi}
                </div>

                <button
                    class="delete-btn"
                    onclick="hapusBerita(${index})"
                >
                    🗑️ Hapus
                </button>

            </div>

        `;

    });

}


/* =========================================
   HAPUS BERITA
========================================= */

function hapusBerita(index) {

    if (!confirm("Yakin ingin menghapus berita ini?")) {
        return;
    }


    berita.splice(index, 1);


    localStorage.setItem(
        "berita",
        JSON.stringify(berita)
    );


    tampilkanBerita();

    updateDashboard();

}


/* =========================================
   PESAN
========================================= */

function tampilkanPesan() {

    const container =
        document.getElementById("pesanList");


    container.innerHTML = "";


    if (pesan.length === 0) {

        container.innerHTML = `
            <div class="empty">
                📩 Belum ada pesan masuk.
            </div>
        `;

        return;
    }


    pesan.slice().reverse().forEach((item, reverseIndex) => {

        const index =
            pesan.length - 1 - reverseIndex;


        container.innerHTML += `

            <div class="message-item">

                <h3>${item.nama || "Pengunjung"}</h3>

                <div class="message-email">
                    ✉️ ${item.email || "-"}
                </div>

                <div class="message-text">
                    ${item.pesan || item.message || ""}
                </div>

                <br>

                <button
                    class="delete-btn"
                    onclick="hapusPesan(${index})"
                >
                    🗑️ Hapus
                </button>

            </div>

        `;

    });

}


/* =========================================
   HAPUS PESAN
========================================= */

function hapusPesan(index) {

    if (!confirm("Yakin ingin menghapus pesan?")) {
        return;
    }


    pesan.splice(index, 1);


    localStorage.setItem(
        "pesan",
        JSON.stringify(pesan)
    );


    tampilkanPesan();

    updateDashboard();

}


/* =========================================
   DASHBOARD
========================================= */

function updateDashboard() {

    document.getElementById("totalFoto").innerText =
        galeri.length;


    document.getElementById("totalBerita").innerText =
        berita.length;


    document.getElementById("totalPesan").innerText =
        pesan.length;

}


/* =========================================
   TAMPILKAN SEMUA
========================================= */

function tampilkanSemua() {

    loadProfil();

    tampilkanGaleri();

    tampilkanBerita();

    tampilkanPesan();

    updateDashboard();

}


/* =========================================
   LOGOUT
========================================= */

document.getElementById("logoutBtn")
    .addEventListener("click", function() {

        if (!confirm("Yakin ingin logout?")) {
            return;
        }


        localStorage.removeItem("adminLogin");


        adminPage.classList.remove("show");

        loginPage.style.display = "flex";


        document.getElementById("username").value = "";

        document.getElementById("password").value = "";

    });
