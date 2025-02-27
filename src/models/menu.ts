import { z } from "zod";

/**
 * Menu
 */
export type Menu = {
  key: string;
  order: number;
  method: string;
  name: string;
  uri: string;
  iconName: string;
  shortCutName: string;
  closeIconName: string;
  disable: boolean;
  menus?: Menu[];
  separator: boolean;
};
