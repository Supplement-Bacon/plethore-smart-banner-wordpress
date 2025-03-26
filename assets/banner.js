document.addEventListener("DOMContentLoaded", async function () {
    try {
        // Check if the user is on a mobile device
        if (window.innerWidth > 768) {
            return;
        }

        // Check if banner has been closed before
        if (localStorage.getItem("plethore-banner-closed") === "true") {
            return;
        }

        const templateResponse = await fetch(PlethoreBannerData.templateUrl);
        const html = await templateResponse.text();

        const dataResponse = await fetch(PlethoreBannerData.dataUrl);
        const data = await dataResponse.json();

        const banner = document.createElement("div");
        banner.innerHTML = html;

        const titleElement = banner.querySelector(".plethore-banner-title");
        titleElement.innerText = data.title;
        const subtitleElement = banner.querySelector(".plethore-banner-subtitle");
        subtitleElement.innerText = data.subtitle;

        // Close event listener - save state in local storage
        banner.querySelector("#banner-close").addEventListener("click", function () {
            localStorage.setItem("plethore-banner-closed", "true");
            const bannerElement = banner.querySelector("#plethore-banner");
            bannerElement.style.display = "none";
        });

        // Render the banner
        document.body.prepend(banner);
    } catch (error) {
        console.error("Plethore Smart Banner error:", error);
    }
});
