import type { Plugin } from "@yarnpkg/core";
import { SelectiveInstall } from "./SelectiveInstall";

const plugin: Plugin = { commands: [SelectiveInstall] };

export default plugin;
