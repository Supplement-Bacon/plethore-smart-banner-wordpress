document.addEventListener("DOMContentLoaded", async function () {
    try {
        const localStorageKey = "plethore-banner-closed-at";

        // Check if the user is on a mobile device
        if (window.innerWidth > 768) {
            return;
        }

        // Check if banner has been closed before
        const closedAt = localStorage.getItem(localStorageKey);
        if (closedAt && !isNaN(closedAt)) {
            const closedTimestamp = Number(closedAt);
            const sixMonthsAgo = Date.now() - 6 * 30 * 24 * 60 * 60 * 1000; // approximate date 6 months ago
            if (closedTimestamp > sixMonthsAgo) {
                // Hide the banner if it has been closed less than 6 months ago
                return;
            }
        }

        const templateResponse = await fetch(PlethoreBannerData.templateUrl);
        const html = await templateResponse.text();

        const dataResponse = await fetch(PlethoreBannerData.dataUrl);
        const initialData = await dataResponse.json();

        const dataToMerge = {
            iconUrl:
                "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/5b/b0/fb/5bb0fb13-4afa-c92d-7f23-afb06645e0bb/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/230x0w.webp",
            buttonUrl: "https://google.fr",
            buttonLabel: "Download",
        };

        const data = { ...initialData, ...dataToMerge };

        const banner = document.createElement("div");
        banner.innerHTML = html;

        //Icon url injection
        const iconElement = banner.querySelector(".plethore-banner-app-icon");
        iconElement.src = data.iconUrl;

        //Title and subtitle injection
        const titleElement = banner.querySelector(".plethore-banner-title");
        titleElement.innerText = data.title;
        const subtitleElement = banner.querySelector(".plethore-banner-subtitle");
        subtitleElement.innerText = data.subtitle;

        //Buton label and url injection
        const buttonElement = banner.querySelector(".plethore-banner-button");
        buttonElement.innerText = data.buttonLabel;
        buttonElement.href = data.buttonUrl;

        // Close event listener injection - save state in local storage
        banner.querySelector("#plethore-banner-close").addEventListener("click", function () {
            localStorage.setItem(localStorageKey, Date.now());
            const bannerElement = banner.querySelector("#plethore-banner");
            bannerElement.style.display = "none";
        });

        // Render the banner
        document.body.prepend(banner);
    } catch (error) {
        console.error("Plethore Smart Banner error:", error);
    }
});
