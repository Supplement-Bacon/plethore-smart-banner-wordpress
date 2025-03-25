document.addEventListener("DOMContentLoaded", async function () {
    try {
        // Charger la template HTML
        const templateResponse = await fetch(PlethoreBannerData.templateUrl);
        const html = await templateResponse.text();

        const dataResponse = await fetch(PlethoreBannerData.dataUrl);
        const data = await dataResponse.json();

        const banner = document.createElement("div");
        banner.innerHTML = html;

        const titleElement = banner.querySelector("#plethore-banner-title");
        titleElement.innerText = data.title;
        const subtitleElement = banner.querySelector("#plethore-banner-subtitle");
        subtitleElement.innerText = data.subtitle;

        document.body.prepend(banner);

        // Faire la requête AJAX
    } catch (error) {
        console.error("Plethore Smart Banner error:", error);
    }
});
