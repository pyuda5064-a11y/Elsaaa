console.log("Website Dusun Permai berhasil dimuat!");

document.querySelectorAll("a").forEach(function(link) {
    link.addEventListener("click", function() {
        console.log("Membuka halaman:", link.getAttribute("href"));
    });
});
