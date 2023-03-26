export * from "./Logger";
export * as constants from "./consts";
export * from "./types";
export * from "./observers";



export function clone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

