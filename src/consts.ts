import { playStream } from "./api";
import { destroyOriginalStream } from "./utils";
import { rfmPlusState, WebpackedNuxt, stationMap, Station, StreamQuality, RfmChannel, RfmChannels, Plugin } from "@utils/types";
import { NuxtStoreGetters } from "@api/index";
// overwrite window object
export const a = 1;

declare global {
    interface Window {
        rfmPlus: {
            state: rfmPlusState;
            api: APIFunctions;
            plugins: Map<string, Plugin>;
        },
        // just for typing, not used in production
        __NUXT__: WebpackedNuxt;
        $nuxt: any; // TODO: type this :^)

    }
};

// default global state
type rfmPlus = {
    state: rfmPlusState;
    api: APIFunctions;
    plugins: Map<string, Plugin>;
};

export const defaultState: rfmPlus = {
    state: {
        bassBoostActive: false,
        bassBoostLevel: 0,
        audioContext: undefined,
        audioPlayer: undefined,
    },
    api: {
        getStation: async (station: string) => {
            const stations = await window.rfmPlus.api.getStations();
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
    },
    plugins: new Map<string, Plugin>(),
    
}

export interface APIFunctions {
    getStation: (station: string) => Promise<RfmChannel>;
    getStations: () => Promise<RfmChannels>;
    playBoosted: (station: Station, quality: StreamQuality) => Promise<void>;
    playOriginal: (station: Station, quality: StreamQuality) => Promise<void>;
}



