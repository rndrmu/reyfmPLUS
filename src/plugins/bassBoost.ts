import definePlugin from "@utils/types";

export default definePlugin({
    name: "Bass Boost",
    enabled: false,
    author: "built-in",
    version: "1.0.0",
    description: "Adds a bass boost button to the player",
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