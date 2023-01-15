// plugin map
import { Plugin } from "@utils/types";

export const plugins = new Map<string, Plugin>();

// load meta from plugin properties
import bassBoost from "./bassBoost";
import rankingSystem from "./rankingSystem";

// add plugins to map
plugins.set(bassBoost.name, bassBoost);
plugins.set(rankingSystem.name, rankingSystem);