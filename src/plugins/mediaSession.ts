import definePlugin from "@utils/types";
import Logger from "@utils/Logger";

const logger = new Logger("Plugins/MediaSession");

export default definePlugin({
    name: "Media Session",
    enabled: true,
    author: "built-in",
    version: "1.0.0",
    description: "Creates a media session for the player, allowing you to control it from your OS",
    awaitElementVisible: null, // no dependent elements
    entrypoint: () => {
        const metaContainer = document.querySelector("a[href^='/station']")
        const meta = {
            title: metaContainer.querySelector("p.font-medium").textContent.trim(),
            artist: metaContainer.querySelector("p.text-sm.leading-tight").textContent.trim(),
            image: metaContainer.querySelector("img").src.replace("120x120", "500x500")
        }
        const isPlaying = window.__NUXT__.state.player.playing;

        if ("mediaSession" in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: meta.title,
                artist: meta.artist,
                artwork: [
                    { src: meta.image, sizes: "500x500", type: "image/png" }
                ]
            });
            
        } 
        else {
            logger.warn("Media Session API not supported");
            return;
        }

    }
})