// overwrite window object
export const a = 1;

declare global {
    interface Window {
        rfmPlusState: rfmPlusState;
        __NUXT__: WebpackedNuxt;
    }
};

type rfmPlusState = {
    bassBoostActive: boolean,
    bassBoostLevel: number,
    audioContext?: AudioContext,
    audioPlayer?: HTMLAudioElement,
};

type WebpackedNuxt = {
    config: any
    data: any
    error?: any
    fetch: any
    layout: string
    routePath: string
    serverRendered: true,
    state: NuxtState
}

type NuxtState = {
    __ob__: any
    main: MainState,
    player: PlayerState,
}

type MainState = {
    __ob__: any,
    currentStation: string,
    data: RfmApiData,
};

type PlayerState = {
    audio: HTMLAudioElement,
    currentStation: Station,
    loading?: boolean,
    playing: boolean,
    volume: number,
    quality: PlayerQuality,
}

type PlayerQuality = {
    __ob__: any,
    name: string,
    value: number,
}

enum Station {
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

type RfmApiData = {
    __ob__: any,
    all_listeners: number,
    channels: RfmChannels,
    sequence: Array<string>,
    weather: Array<any>,
}

type RfmChannels = {
    [key: number]: RfmChannel,
}

type RfmChannel = {
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

type RfmChannelDetails = {
    [key: number]: RfmChannelDetailsItem,
}

type RfmChannelDetailsItem = {
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

type RfmPlayerTime = {
    __ob__: any,
    end: boolean | string, 
    start: boolean | string,
}

type RfmChannelCoverUrls = {
    "500x500": string
    "240x240": string,
    "120x120": string
}


type RfmChannelStreamUrls = {
    high: string,
    mid: string,
    low: string,
    mobile: string,
}