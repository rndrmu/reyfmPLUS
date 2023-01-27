export type rfmPlusState = {
    bassBoostActive: boolean,
    bassBoostLevel: number,
    audioContext?: AudioContext,
    audioPlayer?: HTMLAudioElement,
};

export type WebpackedNuxt = {
    config: any
    data: any
    error?: any
    fetch: any
    layout: string
    routePath: string
    serverRendered: true,
    state: NuxtState
}

export type NuxtState = {
    __ob__: any
    main: MainState,
    player: PlayerState,
}

export type MainState = {
    __ob__: any,
    currentStation: string,
    data: RfmApiData,
};

export type PlayerState = {
    audio: HTMLAudioElement,
    currentStation: Station,
    loading?: boolean,
    playing: boolean,
    volume: number,
    quality: PlayerQuality,
}

export type PlayerQuality = {
    __ob__: any,
    name: string,
    value: number,
}

export enum Station {
    original = 1,
    nightlife = 2,
    raproyal = 3,
    usrap = 4,
    hitsonly = 5,
    gaming = 6,
    houseparty = 7,
    chillout = 8,
    lofi = 9,
    oldschool = 10,
    mashup = 11,
    charts = 12,
    partyhard = 13,
    bass = 14,
    kpop = 15,
    xmas = 20, // seasonal
}

export type RfmApiData = {
    __ob__: any,
    all_listeners: number,
    channels: RfmChannels,
    sequence: Array<string>,
    weather: Array<any>,
}

export type RfmChannels = {
    [key: number]: RfmChannel,
}

export type RfmChannel = {
    __ob__: any,
    color: string,
    description: string,
    history: RfmChannelDetails,
    id: string,
    last_updated: Date,
    listeners: number,
    live: boolean,
    name: string,
    next: RfmChannelDetails,
    now: RfmChannelDetails,
    stream_urls: RfmChannelStreamUrls,
}

export type RfmChannelDetails = {
    [key: number]: RfmChannelDetailsItem,
}

export type RfmChannelDetailsItem = {
    __ob__: any,
    artist: string,
    cover_urls: RfmChannelCoverUrls,
    id: string,
    info: {
        __ob__: any,
        duration: string,
        genre: string,
        last_played: Date,
    },
    played_at: string,
    preview: string,
    time: RfmPlayerTime,
    title: string,
}

export type RfmPlayerTime = {
    __ob__: any,
    end: boolean | string, 
    start: boolean | string,
}

export type RfmChannelCoverUrls = {
    "500x500": string
    "240x240": string,
    "120x120": string
}


export type RfmChannelStreamUrls = {
    high: string,
    mid: string,
    low: string,
    mobile: string,
}

export enum StreamQuality {
    high = "320kbps",
    mid = "192kbps",
    low = "128kbps",
    mobile = "64kbps",
}

export const stationMap = {
    original: 1,
    nightlife: 2,
    raproyal: 3,
    usrap: 4,
    hitsonly: 5,
    gaming: 6,
    houseparty: 7,
    chillout: 8,
    lofi: 9,
    oldschool: 10,
    mashup: 11,
    charts: 12,
    partyhard: 13,
    bass: 14,
    kpop: 15,
    xmas: 20, // seasonal
}

export interface Plugin {
    /** The name of the plugin. */
    name: string;
    /** Whether the plugin is enabled. */
    enabled: boolean;
    /** 
     * The author of the plugin. 
     * @example
     * author: "John Doe"
     */
    author: string;
    /** 
     * The version of the plugin. Should be 1.0.0 on release 
     * @example
     * version: "1.0.0"
     * */
    version: string;
    /**
     *  A short description of the plugin. 
     * @example
     * description: "A simple plugin that logs 'Hello world!' to the console"
     * */
    description: string;
    /** 
     * The plugin's entrypoint function. 
     * @example
     * // A simple plugin that logs "Hello world!" to the console
     * entrypoint: () => console.log("Hello world!")
     * */
    entrypoint: Function;
    /** 
     * If the plugin should only be loaded on a certain page, specify the path here. Regex to be able to have it fine-tuned. 
     * @example
     * // Only load on the home page
     * pathConstraint: /^\/$/
     * */
    pathConstraint?: RegExp;
    /**
     * Constraint to limit injection if certain elements are present.
     * Can be used to prevent injection on certain pages, but for that case it's better to use pathConstraint.
     * @example
     * // Inject only if the element with id "my-element" is present
     * injectConstraint: "#my-element"
     */
    injectTarget?: string;
}

/**
 * 
 * Plugin definition function.
 * @example Example plugin
 * export default definePlugin({
 *    name: "Example Plugin",
 *   enabled: true,
 * author: "John Doe",
 * description: "A simple plugin that logs 'Hello world!' to the console",
 * version: "1.0.0",
 * entrypoint: () => console.log("Hello world!"),
 * pathConstraint: /^\/$/
 * })
 */
export default function definePlugin<P extends Plugin>(p: P & Record<string, any>) {
    return p;
}

export type Observer = {
    name: string,
    associatedFn: Function,
    enabled: boolean,
}