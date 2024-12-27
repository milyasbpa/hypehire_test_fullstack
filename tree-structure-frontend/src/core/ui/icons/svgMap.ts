import { Submenu } from "./submenu";
import { Folder } from "./folder";
import { Chevron } from "./chevron";

export const svgMap = {
  Submenu,
  Folder,
  Chevron,
};

export type SVGName = keyof typeof svgMap;
