/**
 * This file includes the various observers that are used in the application.
 * They are used to observe the state of the application and react to changes.
 * ex. when the user changes the url path, the pathObserver will call the
 * newPath function.
 * 
 * 
 */

import Logger from "@utils/Logger";
import { PLAY_BUTTON_SELECTOR } from "@utils/consts";
import { Observer } from "./types";
import { awaitElementVisible } from "utils";
const logger = new Logger("Observer");

const pathObserver = () => {
    // check for url path changes
    let pathName = window.location.pathname;
    new MutationObserver((mutations, observer) => {
        if (window.location.pathname !== pathName) {
            pathName = window.location.pathname;
            newPath(pathName);
        }
    }).observe(document, { childList: true, subtree: true });
};

const playButtonClicked = () => {
    // path: "div.inset-center > div.buttonShine"
    document.querySelector(PLAY_BUTTON_SELECTOR).addEventListener("click", () => {
        clickedPB();
    });
};

/**
 * Function called when the user changes the url path.
 */
const newPath = (pathName) => {
    // check if the new path is the one we want
    logger.log("New path: " + pathName);
    // get plugins
    if (!pathName.startsWith("/station/")) return;
    const plugins = window.rfmPlus.plugins;
    for (const [pName, pFn] of plugins) {
        if (pFn.injectTarget) {
            // check if the element is visible
            awaitElementVisible(pFn.injectTarget, () => {
                pFn.entrypoint();
            });
        }
    }
}

/**
 * Function that is called when the user clicks the play button.
 */
const clickedPB = () => {
    const sitePlayer = window.__NUXT__.state.player.audio;
    const rfmPlusPlayer = window.rfmPlus.state.audioPlayer;
    if (sitePlayer && rfmPlusPlayer) {
        // player is paused
        logger.log("Resuming");
        window.__NUXT__.state.player.audio = rfmPlusPlayer;
        window.__NUXT__.state.player.playing = true;
    } else if (!sitePlayer && rfmPlusPlayer) {
        logger.log("Pausing");
        sitePlayer?.pause();
        window.__NUXT__.state.player.audio = null;
        window.__NUXT__.state.player.playing = false;
        rfmPlusPlayer.pause(); // for safety's sake
    }
}

export default <Observer[]>[
    {
        name: "pathObserver",
        associatedFn: pathObserver,
        enabled: true
    },
    {
        name: "playButtonClicked",
        associatedFn: playButtonClicked,
        enabled: true
    }
]

