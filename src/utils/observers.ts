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
    const plugins = window.rfmPlus.plugins;
    // check if plugin has a path constraint
    for (const [, plugin] of plugins) {
        if (plugin.pathConstraint) {
            // check if the path matches the path constraint
            if (pathName.match(plugin.pathConstraint)) {
                // path matches, so we can enable the plugin
                logger.log("Enabling plugin: " + plugin.name);
                if (plugin.injectTarget) {
                        // check if the element is visible
                        logger.log("Waiting for element to be visible");
                        awaitElementVisible(plugin.injectTarget, () => {
                            plugin.entrypoint();
                        });
                    }
                }
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

/**
 * Pub/Sub Style Observer API for the application.
 * Listens for changes in the DOM and reacts to them.
 */
export class ObserverManager {
    private observers: Observer[] = [];
    constructor(observers: Observer[]) {
        this.observers = observers;
    }

    public enableObserver(name: string) {
        const observer = this.observers.find(o => o.name === name);
        if (!observer) throw new Error(`Observer ${name} not found`);
        observer.enabled = true;
    }

    public disableObserver(name: string) {
        const observer = this.observers.find(o => o.name === name);
        if (!observer) throw new Error(`Observer ${name} not found`);
        observer.enabled = false;
    }

    public init() {
        this.observers.forEach(o => {
            if (o.enabled) o.associatedFn();
        });
    }

    public emit(name: string) {

    }

    public on(name: string, fn: (...args: any[]) => void) {
        const observer = this.observers.find(o => o.name === name);
        if (!observer) throw new Error(`Observer ${name} not found`);
        observer.associatedFn = fn;
    }
}
