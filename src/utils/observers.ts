/**
 * This file includes the various observers that are used in the application.
 * They are used to observe the state of the application and react to changes.
 * ex. when the user changes the url path, the pathObserver will call the
 * newPath function.
 * 
 * 
 */

import Logger from "@utils/Logger";
import { Observer } from "./types";
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
    new MutationObserver((mutations, observer) => {
        const playButton = document.querySelector("div.inset-center > div.buttonShine");
        if (playButton) {
            playButton.addEventListener("click", () => {
                clickedPB();
            });
        }
    }).observe(document, { childList: true, subtree: true });
};

/**
 * Function called when the user changes the url path.
 */
const newPath = (pathName) => {
    // check if the new path is the one we want
    logger.log("New path: " + pathName);
}

/**
 * Function that is called when the user clicks the play button.
 */
const clickedPB = () => {
    logger.log("Play button clicked");
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