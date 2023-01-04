export function chipCreator(element: HTMLElement, label: string, color: string, topMargin: boolean, callback: (e: Event) => void ) {
    const chip = element.cloneNode(true);
    chip.childNodes[0].textContent = label;
    (chip as HTMLElement).style.backgroundColor = color;
    (chip as HTMLElement).style.color = "#ffffff";
    (chip as HTMLElement).style.marginTop = topMargin ? "10px" : "0px";
    (chip as HTMLElement).style.paddingLeft = "10px";
    (chip as HTMLElement).style.paddingRight = "10px";
    (chip as HTMLElement).style.borderRadius = "10px";
    (chip as HTMLElement).style.fontSize = "12px";
    chip.addEventListener("click", callback);
    return chip;
};

export function awaitElementVisible(selector, callback) {
    new MutationObserver((mutations, observer) => {
        const element = document.querySelectorAll(selector)[0];
        if (element && element.offsetParent !== null) {
            callback(element);
            observer.disconnect();
        } 
    }).observe(document, { childList: true, subtree: true });
}

export function openInSpotify() {
    const title = document.querySelectorAll("p[data-v-5fde3039]")[0].textContent?.trim() 
    const artist = document.querySelectorAll("p[data-v-5fde3039]")[1].textContent?.trim()

    const spotifyUrl = `https://open.spotify.com/search/${title} ${artist}`

    window.open(spotifyUrl, "_blank")

}

/**
 * Injects a metadata footer in the rey.fm page
 * 
**/
export function reyfmPlusMeta() {
    const footer = document.querySelectorAll("div.base-container")[4];
    const footerElem = footer.childNodes[2];
    const clonedFooter = footerElem.cloneNode(true);

    clonedFooter.childNodes[0].textContent = "ReyfmPlus";
    //@ts-ignore
    clonedFooter.querySelector("div > a > p").textContent = "A script to enhance the rey.fm experience\n\n Version: 1.0";
    //@ts-ignore
    clonedFooter.querySelector("div > a > p").innerHTML = clonedFooter.querySelector("div > a > p").innerHTML.replace(/\n/g, "<br>");
    //@ts-ignore
    clonedFooter.querySelector("div > a").removeAttribute("href");
    footer.insertBefore(clonedFooter, footer.childNodes[5]);
}

export const externalLinkArrow = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-right" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M13.854 1.646a.5.5 0 0 1 0 .708l-9 9a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L4 10.293l9-9a.5.5 0 0 1 .708 0z"/>
<path fill-rule="evenodd" d="M15.5 1a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-1 0V2h-12a.5.5 0 0 1 0-1h12z"/>
</svg>`;

export function destroyOriginalStream(hijackedStream) {
    // pause unmodified stream
    window.__NUXT__.state.player.audio.pause()
    // remove unmodified stream
    window.__NUXT__.state.player.audio = null;

    // play hijacked stream
    window.__NUXT__.state.player.audio = hijackedStream;

    // play audio
    window.__NUXT__.state.player.audio?.play();
}