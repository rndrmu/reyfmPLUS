/**
 * @fileoverview File exposing "API" Endpoints (functions) for power users
 */

import { stationMap, StreamQuality, Station } from "@utils/types";
import { destroyOriginalStream } from "./utils";
import { playStateObserver } from "./observers";
import { APIFunctions } from "consts";

// impl of APIFunctions
const api: APIFunctions = {
    getStation: async (station: string) => {
        const stations = await api.getStations();
        const stationMap = stations
        return stationMap[station];
    },

    getStations: async () => {
        //return window.__NUXT__.state.main.data.channels;
        return new Promise((resolve, reject) => {
            const stations = window.__NUXT__.state.main.data.channels;
            if (stations) {
                resolve(stations);
            } else {
                reject("Could not get stations");
            }
        });
    },

    playBoosted: async (station: Station, quality: StreamQuality): Promise<void> => {
        // kill the original stream if it is still running
        window.__NUXT__.state.player.audio ? destroyOriginalStream(window.rfmPlus.state.audioPlayer) : null;

        // set the bass boost to active
        window.rfmPlus.state.bassBoostActive = true;

        // play the boosted stream
        playStream(station, quality);
    },

    playOriginal: async (station: Station, quality: StreamQuality): Promise<void> => {
        // kill the original stream if it is still running
        window.__NUXT__.state.player.audio ? destroyOriginalStream(window.rfmPlus.state.audioPlayer) : null;

        // set the bass boost to inactive
        window.rfmPlus.state.bassBoostActive = false;

        // play the boosted stream
        playStream(station, quality);
    }
}

export default api;

export function playStream(station: Station, quality: StreamQuality) {
    // get the audio element
    const audio = window.__NUXT__.state.player.audio;

    // set the current station
    window.__NUXT__.state.player.currentStation = station;

    // set the audio source
    audio.src = `https://listen.reyfm.de/${station}_${quality}kbps.mp3`;

    // play the stream
    audio.play();
}