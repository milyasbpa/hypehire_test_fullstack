import { Submenu } from "./submenu";
import { Folder } from "./folder";

export const svgMap = {
  Submenu,
  Folder,
};

export type SVGName = keyof typeof svgMap;
