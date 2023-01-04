import { bassBoostMenu } from "./index";
import { awaitElementVisible, chipCreator, destroyOriginalStream } from "./utils";


export function playStateObserver(audio) {       
    new MutationObserver((mutations, observer) => {

        const isPlaying = window.__NUXT__.state.player.playing;
        if (isPlaying) {
            window.__NUXT__.state.player.audio ? destroyOriginalStream(window.rfmPlusState.audioPlayer) : null;
            // set volume 
            audio.volume = window.__NUXT__.state.player.volume / 100;
        } else {
            window.__NUXT__.state.player.audio ? destroyOriginalStream(audio) : null;
            window.__NUXT__.state.player.audio = null;
            window.rfmPlusState.audioPlayer?.pause();
            window.__NUXT__.state.player.audio?.pause()
            // for safety's sake :^)
            audio.volume = window.__NUXT__.state.player.volume / 100;

        }

    }).observe(document, { childList: true, subtree: true });

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
        awaitElementVisible("div.name", (element) => {
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


            // if bass boost is active, add a chip to the chipbar
            if (!window.rfmPlusState.bassBoostActive) {

                const bassBoostActiveChip = chipCreator(element, "Bass Boost Active (Lvl: " + window.rfmPlusState.bassBoostLevel + ")", "#ff0000", true, () => {
                    console.log("clicked boost active chip");
                });
                chipBar.appendChild(bassBoostActiveChip);
            }

        });
         
    }

    else if (new URLSearchParams(window.location.search).get("rfmPlusSettings")) {
        console.log(new URLSearchParams(window.location.search));
        // inject a koishi into dom
        const documentBody = document.getElementsByTagName("body")[0];
        const nucularRaven = document.createElement("img");
        nucularRaven.src = "https://i.redd.it/wisxmib7ho9a1.png";
        nucularRaven.style.position = "fixed";
        nucularRaven.style.top = "0";
        nucularRaven.style.left = "0";
        nucularRaven.style.width = "10%";
        nucularRaven.style.height = "10%";
        nucularRaven.style.zIndex = "9999999999999999";

        documentBody.appendChild(nucularRaven);

        const text = document.createElement("p");
        text.style.position = "fixed";
        text.textContent = "there isn't anything here yet, click the okuu in the top left to go back";
        text.style.top = "10%";
        text.style.left = "10%";
        text.style.zIndex = "9999999999999999";
        text.style.color = "white";
        text.style.fontSize = "2em";
    }

}