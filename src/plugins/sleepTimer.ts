import { showNotification, showToast } from "@api/notification";
import Logger from "@utils/Logger";
import definePlugin from "@utils/types";

const logger = new Logger("Plugins/SleepTimer");

export default definePlugin({
    name: "Sleep Timer",
    enabled: true,
    description: "Automatically stops playback after a set amount of time",
    version: "1.0.0",
    author: "built-in",
    pathConstraint: RegExp("\/station\/"), // only load on channel pages
    injectTarget: "div.name", // channel name, only available when a channel page is loaded => safe to assume that we can inject our button
    entrypoint: () => {
        var bottomPlayerBar = document.querySelector("div.space-y-1[data-v-5946bf68]") ;
        var sleepTimerButton = document.createElement("button");
        sleepTimerButton.className = "fmplus sleep-timer-button";
        sleepTimerButton.style.width = "100px";
        sleepTimerButton.style.margin = "0.25rem";
        sleepTimerButton.style.backgroundColor = "#1e1e1e";
        sleepTimerButton.style.color = "#fff";
        sleepTimerButton.style.border = "1px solid #1e1e1e";
        sleepTimerButton.style.borderRadius = "0.25rem";
        sleepTimerButton.style.padding = "0.25rem";
        sleepTimerButton.style.fontSize = "0.75rem";
        sleepTimerButton.innerHTML = "Sleep Timer";
        sleepTimerButton.addEventListener("click", () => {
            showToast("Not implemented yet :(");
            // show a persistent notification showing the current time in HH:MM:SS
            showNotification("Current Time", new Date().toLocaleTimeString(), true);
        });
        bottomPlayerBar.appendChild(sleepTimerButton);
    }
});