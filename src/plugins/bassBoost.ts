import definePlugin from "@utils/types";
import Logger from "@utils/Logger";

const logger = new Logger("Plugins/BassBoost");

export default definePlugin({
    name: "Bass Boost",
    enabled: true,
    author: "built-in",
    version: "1.0.0",
    description: "Adds a bass boost button to the player",
    awaitElementVisible: null, // no dependent elements
    entrypoint: () => {
        // add bass boost button
        const bassBoostButton = document.createElement("button");
        bassBoostButton.className = "btn btn-primary btn-sm";
        bassBoostButton.innerHTML = "Bass Boost";
        bassBoostButton.addEventListener("click", () => {
            const audio = document.querySelector("audio");
            if (audio) {
                audio.playbackRate = 1.5;
            }
        });
        document.querySelector(".player-controls").appendChild(bassBoostButton);
    }
})