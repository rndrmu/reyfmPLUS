// webpack search entry point 

import Logger from "@utils/Logger";


const modules = {} as any;
const exports = {} as any;

type WebpackInstance = typeof window.webpackJsonp;

const logger = new Logger("Webpack");

export let wreq: WebpackInstance;
export let cache: WebpackInstance["c"];

export type FilterFn = (mod: any) => boolean;

export const filters = {
    byProps: (...props: string[]): FilterFn =>
        props.length === 1
            ? m => m[props[0]] !== void 0
            : m => props.every(p => m[p] !== void 0),

    byCode: (...code: string[]): FilterFn => m => {
        if (typeof m !== "function") return false;
        const s = Function.prototype.toString.call(m);
        for (const c of code) {
            if (!s.includes(c)) return false;
        }
        return true;
    },
    byStoreName: (name: string): FilterFn => m =>
        m.constructor?.displayName === name
};


async function _initWebpack(instance: typeof window.webpackJsonp) {
    wreq = instance.push([[], { __reyfm_plus__: (module, exports, req) => exports.default = req }, [["__reyfm_plus__"]]]).default;
    cache = wreq.c;

    instance.pop()
}

/**
 * Find the first module that matches the filter
 */
export function findModule(filter: FilterFn, getDefault = true, isWaitFor = false): any {
    if (typeof filter !== "function")
    throw new Error("Invalid filter. Expected a function got " + typeof filter);

for (const key in cache) {
    const mod = cache[key];
    if (!mod?.exports) continue;

    if (filter(mod.exports)) {
        return isWaitFor ? [mod.exports, Number(key)] : mod.exports;
    }

    if (typeof mod.exports !== "object") continue;

    if (mod.exports.default && filter(mod.exports.default)) {
        const found = getDefault ? mod.exports.default : mod.exports;
        return isWaitFor ? [found, Number(key)] : found;
    }

    // the length check makes search about 20% faster
    for (const nestedMod in mod.exports) if (nestedMod.length <= 3) {
        const nested = mod.exports[nestedMod];
        if (nested && filter(nested)) {
            return isWaitFor ? [nested, Number(key)] : nested;
        }
    }
}

if (!isWaitFor) {
    const err = new Error("Didn't find module matching this filter");
    logger.error(err);
}

return isWaitFor ? [null, null] : null;
}

export function findAll(filter: FilterFn, getDefault = true) {
    if (typeof filter !== "function")
        throw new Error("Invalid filter. Expected a function got " + typeof filter);

    const ret = [] as any[];
    for (const key in cache) {
        const mod = cache[key];
        if (!mod?.exports) continue;

        if (filter(mod.exports))
            ret.push(mod.exports);
        else if (typeof mod.exports !== "object")
            continue;

        if (mod.exports.default && filter(mod.exports.default))
            ret.push(getDefault ? mod.exports.default : mod.exports);
        else for (const nestedMod in mod.exports) if (nestedMod.length <= 3) {
            const nested = mod.exports[nestedMod];
            if (nested && filter(nested)) ret.push(nested);
        }
    }

    return ret;
}

function findModuleId(code: string) {
    for (const id in wreq.m) {
        if (wreq.m[id].toString().includes(code)) {
            return Number(id);
        }
    }

    const err = new Error("Didn't find module with code:\n" + code);
        logger.warn(err);

    return null;
}


/**
 * Find the first module that has the specified properties
 */
export function findByProps(...props: string[]) {
    return find(filters.byProps(...props));
}

/**
 * Search modules by keyword. This searches the factory methods,
 * meaning you can search all sorts of things, displayName, methodName, strings somewhere in the code, etc
 * @param filters One or more strings or regexes
 * @returns Mapping of found modules
 */
export function search(...filters: Array<string | RegExp>) {
    const results = {} as Record<number, Function>;
    const factories = wreq.m;
    outer:
    for (const id in factories) {
        const factory = factories[id].original ?? factories[id];
        const str: string = factory.toString();
        for (const filter of filters) {
            if (typeof filter === "string" && !str.includes(filter)) continue outer;
            if (filter instanceof RegExp && !filter.test(str)) continue outer;
        }
        results[id] = factory;
    }

    return results;
}

function find(filter: FilterFn, getDefault = true, isWaitFor = false) {
    if (typeof filter !== "function")
        throw new Error("Invalid filter. Expected a function got " + typeof filter);

    for (const key in cache) {
        const mod = cache[key];
        if (!mod?.exports) continue;

        if (filter(mod.exports)) {
            return isWaitFor ? [mod.exports, Number(key)] : mod.exports;
        }

        if (typeof mod.exports !== "object") continue;

        if (mod.exports.default && filter(mod.exports.default)) {
            const found = getDefault ? mod.exports.default : mod.exports;
            return isWaitFor ? [found, Number(key)] : found;
        }

        // the length check makes search about 20% faster
        for (const nestedMod in mod.exports) if (nestedMod.length <= 3) {
            const nested = mod.exports[nestedMod];
            if (nested && filter(nested)) {
                return isWaitFor ? [nested, Number(key)] : nested;
            }
        }
    }

    if (!isWaitFor) {
        const err = new Error("Didn't find module matching this filter");
            logger.warn(err);
    }

    return isWaitFor ? [null, null] : null;
}