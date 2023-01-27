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
        const bottomPlayerBar = document.querySelector("div.space-y-1[data-v-5946bf68]") ;
        const sleepTimerButton = document.createElement("button");
        sleepTimerButton.className = "fmplus sleep-timer-button";
        sleepTimerButton.style.width = "100px";
        sleepTimerButton.style.margin = "0.25rem";
        sleepTimerButton.style.backgroundColor = "#1e1e1e";
        sleepTimerButton.style.color = "#fff";
        sleepTimerButton.style.border = "1px solid #1e1e1e";
        sleepTimerButton.style.borderRadius = "0.25rem";
        sleepTimerButton.style.padding = "0.25rem";
        sleepTimerButton.style.fontSize = "12px";
        sleepTimerButton.style.fontWeight = "bold";
        sleepTimerButton.style.textAlign = "center";
        sleepTimerButton.style.cursor = "pointer";
        sleepTimerButton.style.lineHeight = "1.5";
        sleepTimerButton.innerHTML = "Sleep Timer";
        sleepTimerButton.addEventListener("click", () => {
            let notification = showNotification("Sleep Timer", "Started sleep timer for 5 minutes", true);
            // update notification text
            let notificationMessage = notification.querySelector("p.fmplus.notification-message");
            // update notification text as countdown
            let timeLeft = `0:20`;
            // update notification text every second
            let interval = setInterval(() => {
                let timeLeftSeconds = Number(timeLeft.split(":")[1]);
                let timeLeftMinutes = Number(timeLeft.split(":")[0]);
                if (timeLeftSeconds === 0 && timeLeftMinutes === 0) {
                    clearInterval(interval);
                    notificationMessage.innerHTML = `Sleep timer engaged. Good night!`;
                    // stop playback
                    window.__NUXT__.state.player.audio.pause(); // pause audio
                    window.__NUXT__.state.player.playing = false; // set playing state to false
                    window.__NUXT__.state.player.audio = null; // set audio to null
                    window.rfmPlus.state.audioPlayer.pause(); // pause audio
                    window.rfmPlus.state.audioPlayer = null; // set audio to null

                    notificationMessage.innerHTML = `Sleep timer engaged. Good night!`;
                    return;
                }
                if (timeLeftSeconds === 0) {
                    timeLeftSeconds = 59;
                    timeLeftMinutes--;
                } else {
                    timeLeftSeconds--;
                }
                timeLeft = `${timeLeftMinutes}:${timeLeftSeconds < 10 ? "0" + timeLeftSeconds : timeLeftSeconds}`;
                notificationMessage.innerHTML = `Sleep timer engaging in ${timeLeft}`;
            }, 1000);
        });

        bottomPlayerBar.appendChild(sleepTimerButton);
    }
});