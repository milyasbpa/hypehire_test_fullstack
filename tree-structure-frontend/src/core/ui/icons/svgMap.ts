import { Submenu } from "./submenu";
import { Folder } from "./folder";
import { Chevron } from "./chevron";
import { Trailing } from "./trailing";

export const svgMap = {
  Submenu,
  Folder,
  Chevron,
  Trailing,
};

export type SVGName = keyof typeof svgMap;
