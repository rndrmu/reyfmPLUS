import { LogLevel, showNotification } from "@api/notification";
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

        const styles: Partial<CSSStyleDeclaration> = {
            width: "100px",
            margin: "0.25rem",
            backgroundColor: "#1e1e1e",
            color: "#fff",
            border: "1px solid #1e1e1e",
            borderRadius: "0.25rem",
            padding: "0.25rem",
            fontSize: "12px",
            fontWeight: "bold",
            textAlign: "center",
            cursor: "pointer",
            lineHeight: "1.5",
        }

        Object.assign(sleepTimerButton.style, styles);

        sleepTimerButton.innerHTML = "Sleep Timer";
        sleepTimerButton.addEventListener("click", () => {
            // show selection menu for sleep timer duration
            const sleepTimerMenu = document.createElement("div");
            sleepTimerMenu.className = "fmplus sleep-timer-menu";
    

            const styles: Partial<CSSStyleDeclaration> = {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                zIndex: "9999",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                padding: "1rem",
                boxSizing: "border-box",
                cursor: "pointer",
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            }

            Object.assign(sleepTimerMenu.style, styles);

            sleepTimerMenu.addEventListener("click", (e) => {
                e.stopPropagation();
                // if clicked outside of menu, close menu
                if (e.target !== sleepTimerMenu) {
                    sleepTimerMenu.remove();
                    return;
                }
            });
            // 30 minutes, 1 hour, 2 hours, 4 hours, 8 hours, 12 hours, 24 hours
            const sleepTimerMenuOptions = [
                { label: "30 minutes", value: 30 },
                { label: "1 hour", value: 60 },
                { label: "2 hours", value: 120 },
                { label: "4 hours", value: 240 },
                { label: "8 hours", value: 480 },
                { label: "12 hours", value: 720 },
                { label: "24 hours", value: 1440 },
                { label: "Exit", value: "0"}
            ];

            sleepTimerMenuOptions.forEach((option) => {
                const sleepTimerMenuOption = document.createElement("button");
                // glassmorphism effect

                const styles: Partial<CSSStyleDeclaration> = {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    borderRadius: "0.25rem",
                    padding: "0.5rem",
                    margin: "0.25rem",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textAlign: "center",
                    cursor: "pointer",
                    lineHeight: "1.5",
                    minWidth: "250px",
                    color: "#fff",
                }

                Object.assign(sleepTimerMenuOption.style, styles);

                sleepTimerMenuOption.innerHTML = option.label;
                sleepTimerMenuOption.addEventListener("click", (e) => {
                    e.stopPropagation();
                    // if exit button, close menu
                    if (option.value === "0") {
                        sleepTimerMenu.remove();
                        return;
                    }
                    logger.info(`Sleep timer started for ${option.value} minutes`);
                    // start sleep timer
                    sleepTimer(
                        // the timer ticks in seconds, so we need to convert the value to seconds
                        Number(option.value)
                    );
                    // close menu
                    logger.info("Sleep timer menu closed");
                    showNotification(`Sleep timer started for ${option.value} minutes`, "Sleep Timer", false, LogLevel.INFO);
                    
                });
                sleepTimerMenu.appendChild(sleepTimerMenuOption);
            });
            // add sleep timer menu to page
            document.body.appendChild(sleepTimerMenu);
        });
        bottomPlayerBar.appendChild(sleepTimerButton);
    }
});


async function sleepTimer(minutes: number) {
    let notification = showNotification(`Sleep timer started for ${minutes} minutes`, "Sleep Timer", true, LogLevel.INFO);
     let notificationMessage = notification.querySelector("p.fmplus.notification-message");
     let minutesAsSeconds = minutes * 60; 
     const endDate = new Date().getTime() + minutesAsSeconds * 1000; // millisedconds?? cringe.
     let interval = setInterval(() => {
         if (minutesAsSeconds === 0) {
             clearInterval(interval);
             notificationMessage.innerHTML = `Sleep timer engaged. Good night!`;
             // stop playback
             window.__NUXT__.state.player.audio.pause(); // pause audio
             window.__NUXT__.state.player.playing = false; // set playing state to false
             window.__NUXT__.state.player.audio = null; // set audio to null
             window.rfmPlus.state.audioPlayer.pause(); // pause audio
             window.rfmPlus.state.audioPlayer = null; // set audio to null
             return;
         }
         minutesAsSeconds--;
         logger.debug("Time remaining", minutesAsSeconds)
         // format into hh:mm:ss format
         let hours = Math.floor(minutesAsSeconds / 3600),
            minutes = Math.floor((minutesAsSeconds - (hours * 3600)) / 60),
            seconds = minutesAsSeconds - (hours * 3600) - (minutes * 60);
            //@ts-ignore
            if (hours < 10) {hours = "0"+hours;}
            //@ts-ignore
            if (minutes < 10) {minutes = "0"+minutes;}
            //@ts-ignore
            if (seconds < 10) {seconds = "0"+seconds;}
         notificationMessage.innerHTML = `Time remaining: ${hours}:${minutes}:${seconds}`;
         // update notification text
     }, 1000);
}