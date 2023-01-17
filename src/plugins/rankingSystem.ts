// establish socket connection
import Logger from "@utils/Logger";
import definePlugin from "@utils/types";

const logger = new Logger("Socket");


export default definePlugin({
    name: "Ranking System",
    enabled: true,
    author: "built-in",
    version: "1.0.0",
    description: "Adds a ranking system to the player",
    entrypoint: () => {
        const socket = new WebSocket("ws://localhost:8080");

        socket.addEventListener("open", () => {
            logger.info("Socket connection established");
        });

        socket.addEventListener("message", (event) => {
            const data = JSON.parse(event.data);
            logger.info(data);
        });

        socket.addEventListener("close", (e) => {
            logger.info("Socket connection closed. Code: %s, Reason: %s", e.code, e.reason);
            clearInterval(hb);
            clearInterval(psu);
        });

        socket.addEventListener("error", (error) => {
            logger.error(error);
            
        });

        // send heartbeat every 15 seconds
        const hb = setInterval(() => {
            logger.info("Sending heartbeat");
            socket.send(JSON.stringify({
                type: "heartbeat",
                data: {
                    timestamp: Date.now()
                }
            }));
        }, 15000);

        // each 30s send a PlayStateUpdate event
        const psu = setInterval(() => {
            logger.info("Sending play state update");
            socket.send(JSON.stringify({
                type: "PlayStateUpdate",
                data: {
                    timestamp: Date.now(),
                    discord_id: 12345678999999999999,
                    channel_id: "1",
                    listening_delta: 30,
                }
            }));
        }, 30000);
    }
})