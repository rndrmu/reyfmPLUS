import { showNotification } from "@api/notification";
import { bassBoostMenu } from "./index";
import { awaitElementVisible, chipCreator, destroyOriginalStream } from "./utils";


export function playStateObserver(audio) {       

    destroyOriginalStream(window.__NUXT__.state.player.audio);
    window.__NUXT__.state.player.audio = audio;
    window.__NUXT__.state.player.playing = true;
    window.__NUXT__.state.player.audio.play();

}

export function pathObserver(path, callback) {
    // check for url path changes
    let pathName = window.location.pathname;
    new MutationObserver((mutations, observer) => {
        if (window.location.pathname !== pathName) {
            pathName = window.location.pathname;
            newPath(pathName);
        }
    }).observe(document, { childList: true, subtree: true });
}

export function newPath(pathName) {
    // check if the new path is the one we want
    console.log("[REYFMPLUS] New path: " + pathName);
    if (pathName.startsWith("/station/")) {
        awaitElementVisible("div.name", (element: HTMLElement) => {
            const chipBar = element.parentElement;
            // copy station name chip
            const brandingChip = element;
            // add "- ReyfmPlusEnhanced" to the station name
            brandingChip.childNodes[0].textContent = brandingChip.childNodes[0].textContent + " — ReyfmPlusEnhanced";

            const bassBoostChip = chipCreator(element, "Bass Boost Menu", "#ff0000", true, () => {
                console.log("clicked boost chip");
                bassBoostMenu();
            });
            chipBar.appendChild(bassBoostChip);


            if (!window.rfmPlus.state.bassBoostActive) {

                const bassBoostActiveChip = chipCreator(element, "Bass Boost Active (Lvl: " + window.rfmPlus.state.bassBoostLevel + ")", "#ff0000", true, () => {
                    console.log("clicked boost active chip");
                    showNotification("Bass Boost", "Bass boost is already active. Click the Bass Boost Menu chip to change the level.")
                });
                chipBar.appendChild(bassBoostActiveChip);
            }

        });
         
    }


}