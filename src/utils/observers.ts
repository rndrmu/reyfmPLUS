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
const logger = new Logger("core/Observer");


export function awaitElementVisible(selector, callback) {
    new MutationObserver((mutations, observer) => {
        const element = document.querySelectorAll(selector)[0];
        if (element && element.offsetParent !== null) {
            callback(element);
            observer.disconnect();
        } 
    }).observe(document, { childList: true, subtree: true });
}


const pathObserver = () => {
    // check for url path changes
    window.addEventListener("popstate", () => {
        logger.log("Path changed to " + window.location.pathname);
        newPathFn(window.location.pathname);
    });
};

const volumeObserver = () => {
    // react to volume changes
    window.$nuxt.$watch(() => window.$nuxt.$store.state.player.volume, (newVal) => {
        if (window.rfmPlus.state.audioPlayer) {
            window.rfmPlus.state.audioPlayer.volume = (newVal / 100)
        }
    })
}



/**
 * Function called when the user changes the url path.
 */
export const newPathFn = (pathName) => {
    // check if the new path is the one we want
    logger.log("New path: " + pathName);
    // get plugins
    const plugins = window.rfmPlus.plugins;
    // check if plugin has a path constraint
    for (const [, plugin] of plugins) {
        if (plugin.pathConstraint) {
            // check if the path matches the path constraint
            if (pathName.match(plugin.pathConstraint)  && plugin.enabled /* check if the plugin is enabled */ ) {
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





export default <Observer[]>[
    {
        name: "pathObserver",
        associatedFn: pathObserver,
        enabled: true
    },
    {
        name: "volumeObserver",
        associatedFn: volumeObserver,
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


