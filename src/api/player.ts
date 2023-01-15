export const play = (url: string) => {
    const audio = new Audio(url);
    audio.play();
    return audio;
}