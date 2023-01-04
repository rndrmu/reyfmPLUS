import { awaitElementVisible, chipCreator, openInSpotify, reyfmPlusMeta, destroyOriginalStream } from "./utils";
import { playStateObserver, pathObserver, newPath } from "./observers";
window.rfmPlusState = {
    bassBoostActive: false,
    bassBoostLevel: 0,
    audioContext: undefined,
    audioPlayer: undefined,
};


// await for the page to load
awaitElementVisible("div[data-v-733b83fc] > a > svg", (_) => {
    console.info("[REYFMPLUS] Hello from ReyfmPlus!");
    main();
});

function main() {
    console.log("[REYFMPLUS] Starting main script");
    console.log("[REYFMPLUS] Current state: " + window.__NUXT__);
    // add metadata footer so we know the script is running
    reyfmPlusMeta();
    // call immediately in case user is on a station page
    newPath(window.location.pathname);

    // check for url path changes
    pathObserver(window.location.pathname, newPath);

    // add spotify button
    //@ts-ignore
    awaitElementVisible("a[data-v-5fde3039] > div.w-max > p.akira", (element) => {
        const chip = element.parentElement;
        const chipBar = chip?.parentElement;
        const spotifyChip = chipCreator(element, "On Spotify", "#1db954", false, (e) => {
            e.preventDefault();
            openInSpotify();
        });

        chipBar.appendChild(spotifyChip);
    });

};





















export function bassBoostMenu() {
    // kill the original stream if it is still running
    window.__NUXT__.state.player.audio ? destroyOriginalStream(window.rfmPlusState.audioPlayer) : null;

    const stationName = location.pathname.split("/")[2];
    const stationId = stationMapReverse[stationName];
    console.log("[REYFMPLUS] Station ID: " + stationId);
    console.log("[REYFMPLUS] Bass boost menu for station: " + stationName);
    window.__NUXT__.state.player.currentStation = stationId;

    const streamLink = `https://listen.reyfm.de/${stationName}_320kbps.mp3`

    // spawn a modal where the user can select a bass boost preset
    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    
    const modalContent = document.createElement("div");
    modalContent.style.position = "absolute";
    modalContent.style.top = "50%";
    modalContent.style.left = "50%";
    modalContent.style.transform = "translate(-50%, -50%)";
    modalContent.style.backgroundColor = "#ffffff";
    modalContent.style.padding = "20px";
    modalContent.style.borderRadius = "10px";
    modalContent.style.width = "80%";
    modalContent.style.maxWidth = "500px";
    modalContent.style.height = "80%";
    modalContent.style.maxHeight = "500px";
    modalContent.style.overflow = "auto";
    modalContent.style.boxShadow = "0 0 10px 0 rgba(0, 0, 0, 0.5)";
    modalContent.textContent = "REYFMPlus — Bass Boost Menu";
    modalContent.style.fontSize = "20px";
    modalContent.style.fontWeight = "bold";
    modalContent.style.textAlign = "center";
    modalContent.style.marginBottom = "20px";


    document.body.appendChild(modal);

    modal.appendChild(modalContent);

    const bassBoostPresets = [
        {
            name: "Normal",
            description: "No bass boost",
            value: 0,
        },
        {
            name: "Regular Bass Boost",
            description: "A regular bass boost, nothing fancy",
            value: 1,
        },
        {
            name: "Heavy Bass Boost",
            description: "A heavy bass boost, for the bassheads",
            value: 5,
        },
        {
            name: "Bass Boost + Limiter",
            description: "A regular bass boost with a limiter to prevent clipping",
            value: 3,
        },
        {
            name: "Absolutely fucking crazy",
            description: "A heavy bass boost, why are you even using this",
            value: 15,
        },
    ];

    bassBoostPresets.forEach((preset) => {
        const presetContainer = document.createElement("div");
        presetContainer.style.display = "flex";
        presetContainer.style.flexDirection = "column";
        presetContainer.style.alignItems = "center";
        presetContainer.style.marginBottom = "20px";
        presetContainer.style.cursor = "pointer";

        const presetName = document.createElement("div");
        presetName.style.fontSize = "18px";
        presetName.style.fontWeight = "bold";
        presetName.textContent = preset.name;

        const presetDescription = document.createElement("div");
        presetDescription.style.fontSize = "14px";
        presetDescription.style.fontWeight = "normal";
        presetDescription.style.textAlign = "center";
        presetDescription.textContent = preset.description;

        presetContainer.appendChild(presetName);
        presetContainer.appendChild(presetDescription);

        presetContainer.addEventListener("click", () => {
            bassBoost(streamLink, preset.value);
            modal.remove();
        });

        modalContent.appendChild(presetContainer);
    });

    modal.style.display = "block";

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    


}


const stationMapReverse = {
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



function bassBoost(streamLink = "https://listen.reyfm.de/original_320kbps.mp3", gainValue = 1) {


    // create new audio context
    const audioCtx = new (window.AudioContext)();
    const audioElement = new Audio();
    audioElement.src = streamLink;
    audioElement.crossOrigin = "anonymous";
    const source = audioCtx.createMediaElementSource(audioElement);
    const gainNode = audioCtx.createBiquadFilter();
    gainNode.type = "lowshelf";
    gainNode.frequency.value = 1000;
    gainNode.gain.value = gainValue;
    source.connect(gainNode);

    // connect gain node to audio context destination
    gainNode.connect(audioCtx.destination);
    
    // hijack nuxt state 
    window.__NUXT__.state.player.playing = true;
    window.__NUXT__.state.player.audio ? destroyOriginalStream(audioElement) : null;

    // save in our state
    window.rfmPlusState.audioPlayer = audioElement;
    window.rfmPlusState.audioContext = audioCtx;

    window.__NUXT__.state.player.audio = audioElement;

    // play audio
    playStateObserver(audioElement);

}