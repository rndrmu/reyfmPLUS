import { RfmChannels, Station, StreamQuality } from "@utils/types";
import { playStream } from "api";
import { destroyOriginalStream } from "utils";


export const getStations = async (): Promise<RfmChannels> => {
    return new Promise((resolve, reject) => {
        const stations = window.__NUXT__.state.main.data.channels;
        if (stations) {
            resolve(stations);
        } else {
            reject("Could not get stations");
        }
    });
}

export const getStation = async (station: string): Promise<Station> => {
    const stations = await getStations();
    const stationMap = stations
    return stationMap[station];
}

export const playBoosted = async (station: Station, quality: StreamQuality): Promise<void> => {
    // kill the original stream if it is still running
    window.__NUXT__.state.player.audio ? destroyOriginalStream(window.rfmPlus.state.audioPlayer) : null;

    // set the bass boost to active
    window.rfmPlus.state.bassBoostActive = true;

    // play the boosted stream
    playStream(station, quality);
}

export const playOriginal = async (station: Station, quality: StreamQuality): Promise<void> => {
    // kill the original stream if it is still running
    window.__NUXT__.state.player.audio ? destroyOriginalStream(window.rfmPlus.state.audioPlayer) : null;

    // set the bass boost to inactive
    window.rfmPlus.state.bassBoostActive = false;

    // play the boosted stream, private function
    playStream(station, quality);
}

