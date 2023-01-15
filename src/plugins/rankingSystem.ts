// establish socket connection
import Logger from "@utils/Logger";
import definePlugin from "@utils/types";

const logger = new Logger("Socket");

const socket = new WebSocket("ws://localhost:8080");

export default definePlugin({
    name: "Ranking System",
    enabled: false,
    author: "built-in",
    version: "1.0.0",
    description: "Adds a ranking system to the player",
    entrypoint: () => {
        socket.addEventListener("open", () => {
            logger.info("Socket connection established");
        });

        socket.addEventListener("message", (event) => {
            const data = JSON.parse(event.data);
            logger.info(data);
        });

        socket.addEventListener("close", () => {
            logger.info("Socket connection closed");
        });

        socket.addEventListener("error", (error) => {
            logger.error(error);
        });
    }
})