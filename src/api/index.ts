import { PlayerQuality, RfmApiData, Station } from "@utils/types";

export * from "./player";
export * from "./notification";
export * from "./modal";

/**
 * General API Definitions
 */
export class NuxtStoreGetters {
    private _getters: any;
    constructor() {
        this._getters = window.$nuxt.$store.getters;
    }

    get getters() {
        return this._getters;
    }

    get currentStationInView(): Station {
        return this._getters["main/getCurrentStation"];
    }

    get currentPlayingStation(): Station {
        return this._getters["player/getCurrentStation"];
    }

    get data(): RfmApiData {
        return this._getters["main/getData"];
    }

    get allListeners(): number {
        return this.data.all_listeners;
    }

    get audio(): HTMLAudioElement {
        return this._getters["player/getAudio"];
    }

    get loading(): boolean {
        return this._getters["player/getLoading"];
    }

    get playing(): boolean {
        return this._getters["player/getPlaying"];
    }

    get volume(): number {
        return Number(this._getters["player/getVolume"]);
    }

    get quality(): PlayerQuality {
        return this._getters["player/getQuality"];
    }
}

/**
 * HTTP Client - aka hijacking the axios instance
 */
export class HttpClient {
    private _axios: any;
    private _config: any = {
        baseURL: "https://api.reyfm.de/v4"
    }
    constructor() {
        this._axios = window.$nuxt.$axios;
    }

    get axios() {
        return this._axios;
    }

    setBaseUrl(url: string) {
        this._config.baseURL = url;
    }

    get(url: string, config?: any) {
        return this._axios.get(url, config);
    }

    post(url: string, data?: any, config?: any) {
        return this._axios.post(url, data, config);
    }

    put(url: string, data?: any, config?: any) {
        return this._axios.put(url, data, config);
    }

    delete(url: string, config?: any) {
        return this._axios.delete(url, config);
    }

    head(url: string, config?: any) {
        return this._axios.head(url, config);
    }

    options(url: string, config?: any) {
        return this._axios.options(url, config);
    }

    patch(url: string, data?: any, config?: any) {
        return this._axios.patch(url, data, config);
    }
}

interface IApi {
    getters: NuxtStoreGetters;
    http: HttpClient;
}


export const Api: IApi = {
    getters: new NuxtStoreGetters(),
    http: new HttpClient(),
};


/**
 * Initialize the Menu Button - Originally this just redirects to the homepage but now it toggles the menu
 */
function init() {
    const VUE_INSTANCE = Array.from(document.getElementsByTagName('a')).find(e => e.__vue__).__vue__; // get vue instance from DOM
    // take og element and replace its on: click event with a new one, preserving the original svg element
    const og = VUE_INSTANCE.$el as HTMLElement;
    const paths = og.getElementsByTagName('path');


    // create a new element
    VUE_INSTANCE.$options.render = (h) => h('div', {
        on: {
            click: () => {
                Object.assign(VUE_INSTANCE.$store)

            }
        }
    }, [
        h('svg', {
            attrs: {
                xmlns: 'http://www.w3.org/2000/svg',
                viewBox: '0 0 854.5 852.61',
            },
            class: 'h-10 w-auto text-white',
            style: {
                fill: 'currentColor',
                stroke: 'currentColor',
                color: 'white'
            },
        },
            Array.from(paths).map(p => h('path', {
                attrs: {
                    d: p.getAttribute('d')
                }
            }))
        )
    ]);
}

function menuModal() {
    // create a new modal and append it to the body and set its open state to window.$nuxt.$store.state.menu.open
    const modal = document.createElement('div');
    modal.id = 'menu-modal';
    const modalStyle: Partial<CSSStyleDeclaration> = {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: '999',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'all 0.3s ease-in-out',
        opacity: '0',
        pointerEvents: 'none'
    }

    Object.assign(modal.style, modalStyle);

    const modalContent = document.createElement('div');

    const modalContentStyle: Partial<CSSStyleDeclaration> = {
        backgroundColor: 'white',
        width: '80vw',
        height: '80vh',
        borderRadius: '1rem',
        boxShadow: '0 0 1rem black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
        position: 'relative',
        overflow: 'hidden'
    }

    Object.assign(modalContent.style, modalContentStyle);

    const modalClose = document.createElement('div');
    const modalCloseStyle: Partial<CSSStyleDeclaration> = {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        fontSize: '2rem',
        cursor: 'pointer'
    }

    Object.assign(modalClose.style, modalCloseStyle);

    modalClose.innerHTML = 'X';

    modalClose.addEventListener('click', () => {
        window.$nuxt.$store.state.menu.open = false;
    })

    modalContent.appendChild(modalClose);

    modal.appendChild(modalContent);

    document.body.appendChild(modal);

    // add a watcher to the menu state, console.log it and set the modal's open state to the menu state


}
