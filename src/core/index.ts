import Logger from "@utils/Logger";

export function injectPlayerControls() {
    // hijack mini station player play buttons
    // this will need to be run on every path change to the index page
    Array.from(document.querySelectorAll('div.station-small')).forEach((e: VueEnhancedElement) => {
        hijackPlayButton(e.__vue__)
    });
    // hijack main player
    hijackPlayButton((document.querySelector("div.fixed[data-v-5fde3039]") as VueEnhancedElement).__vue__)
}

/**
 * Type alias for a HTMLElement with a \_\_vue\_\_ property
 */
type VueEnhancedElement = HTMLElement & { __vue__: Vue }

/**
 * Type alias for a Vue instance
 */
type Vue = {
    $vnode: {
        key: string
    },
    play: (id?: string) => void,
    playerTogglePlay: (id?: string) => void,
    playerStop: (id?: string) => void,
    $store: {
        state: {
            player: {
                playing: boolean,
                currentStation: string,
                volume: number
            }
        }
    }
}



// mutation functions
export function setPlayerPlaying(playing: boolean) {
    window.__NUXT__.state.player.playing = playing
    window.$nuxt.$store.state.player.playing = playing
}

export function setPlayerCurrentStation(stationId: number) {
    window.__NUXT__.state.player.currentStation = stationId
}

export function setPlayerVolume(volume: number) {
    window.__NUXT__.state.player.volume = volume
}

export function setPlayerAudio(audio: HTMLAudioElement) {
    window.rfmPlus.state.audioPlayer = audio
}






/// Abstracted function for the playbutton hijack
function hijackPlayButton(vueInstance) {
    const logger = new Logger("rfmplus/core")
    vueInstance.playerTogglePlay = function (id: string) {
        // log metadata of the station (accessible at $vnode.key)
        console.log(this)
        const isPlaying = window.$nuxt.$store.state.player.playing || false
        logger.debug(`Toggling play for station ${id} (isPlaying: ${isPlaying})`)
        if (isPlaying) {
            this.playerStop(id) 
            const currentStation = String(window.__NUXT__.state.player.currentStation)
            if (currentStation === id) {
                // should stop the player - noop
                return
            } else {
                // user clicked on a different station - play that one
                this.play(id) 
            }
           // this.play(id)
        } else {
            this.play(id)

        }
    }

    vueInstance.play = function(channelId) {
    // we'll use mutations here to give a more native feel
    setPlayerCurrentStation(channelId)
    const player = new Audio()
    player.src = window.__NUXT__.state.main.data.channels[channelId].stream_urls["high"]
    player.volume = Number(window.$nuxt.$store.state.player.volume) / 100
    setPlayerAudio(player)
    setPlayerPlaying(true)

    window.rfmPlus.state.audioPlayer.play()
}

    vueInstance.playerStop = function (id = window.__NUXT__.state.player.currentStation ) {
        const currentStation = this.$vnode.key ? this.$vnode.key : window.__NUXT__.state.player.currentStation
        logger.debug(`Stopping player for station ${currentStation}`)
        setPlayerPlaying(false)
        logger.debug(`Pausing custom audio playe`)
        window.rfmPlus.state.audioPlayer.pause()
        logger.debug(`Setting audio player to null`)
        window.rfmPlus.state.audioPlayer = null
    }

    vueInstance.playerPlay = function (id = window.__NUXT__.state.player.currentStation) {
        const currentStation = this.$vnode.key ? this.$vnode.key : window.__NUXT__.state.player.currentStation
        logger.debug(`Playing station ${currentStation}`)
        setPlayerPlaying(true)
        window.rfmPlus.state.audioPlayer.play()
    }
}



