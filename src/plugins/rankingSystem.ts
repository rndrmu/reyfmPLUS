// establish socket connection
import { LogLevel, showNotification, showToast } from "@api/notification";
import Logger from "@utils/Logger";
import definePlugin from "@utils/types";

const logger = new Logger("Plugins/RankingSystem");

/**
 * Socket data type
 * @typedef {Object} SocketData
 * @property {string} type - Type of the message (heartbeat, PlayStateUpdate, LevelUpBroadcast, heartbeatACK)
 * @property {Object} data - Data of the message
 * @property {number} data.timestamp - Timestamp of the message
 * @property {number} [data.discord_id] - Discord ID of the user
 * @property {string} [data.username] - Username of the user
 * @property {string} [data.channel_id] - Channel ID of the user
 * @property {number} [data.listening_delta] - Listening delta of the user (will always be 30)
 * @property {number} [data.level] - Level of the user
 * @property {number} [data.xp] - XP of the user
 */
type SocketData = {
    /**
     * Type of the message (heartbeat, PlayStateUpdate, LevelUpBroadcast, heartbeatACK)
     * @type {"heartbeat" | "PlayStateUpdate" | "LevelUpBroadcast" | "heartbeatACK"}
     * @memberof SocketData
     */
    type: "heartbeat" | "PlayStateUpdate" | "LevelUpBroadcast" | "heartbeatACK";
    data: {
        /**
         * The Current Unix Timestamp of when the message was sent
         */
        timestamp: number;
        /**
         * The Discord ID of the user, BigInt since its a i64 in the backend and on discord
         */
        discord_id?: bigint;
        /**
         * The Username of the user
         * @type {string}
         * @memberof SocketData
        */
        username?: string;
        /**
         * The Channel ID of the user, Corresponds to the channel the user is listening to. Used to show the user what channel they are listening to the most.
         */
        channel_id?: string;
        /**
         * The Listening Delta of the user, will always be 30, since we send it each 30 seconds
         */
        listening_delta?: number;
        /**
         * The Level of the user
         * Only available for LevelUpBroadcast
         */
        level?: number;
    }
}

export default definePlugin({
    name: "Ranking System",
    enabled: true,
    author: "built-in",
    version: "1.0.0",
    description: "Adds a ranking system to the player",
    awaitElementVisible: null, // no dependent elements
    entrypoint: () => {
        const socket = new WebSocket("ws://localhost:8080");
        const lastHeartbeat = Date.now();

        // create worker to send playstate updates concurrently



        socket.addEventListener("open", () => {
            logger.info("Socket connection established");
        });

        socket.addEventListener("message", (event: MessageEvent<SocketData>) => {
            switch (event.data.type) {
                case "heartbeatACK":
                    logger.info("Received heartbeat ACK");
                    break;
                case "LevelUpBroadcast":
                    showToast(`User ${event.data.data.username} has leveled up to level ${event.data.data.level}!`);
                    break;
                default:
                    logger.warn("Received unknown message type: %s", event.data.type);
                    break;
            }
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
            if (Date.now() - lastHeartbeat > 30000) {
                logger.error("Heartbeat timeout exceeded. Closing socket connection.");
                showNotification("Heartbeat timeout exceeded. Closing socket connection.", "", false, LogLevel.ERROR);
                socket.close(4000, "Heartbeat timeout");
            }
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