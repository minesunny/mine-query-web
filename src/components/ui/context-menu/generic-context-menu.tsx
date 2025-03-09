import React, { RefObject } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu/context-menu";
import { Menu } from "@/models/menu";
import { SVG } from "@/components/ui/Icons";

export const GenericContextMenu = React.forwardRef<
  React.ElementRef<typeof ContextMenuTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuTrigger> & {
    menu: Menu[] | undefined;
  }
>(({ menu }, ref) => (
  <ContextMenu>
    <ContextMenuTrigger ref={ref} />
    {menu && menu.length > 0 && (
      <ContextMenuContent className="w-64 absolute">
        {renderMenuItems(menu)}
      </ContextMenuContent>
    )}
  </ContextMenu>
));
GenericContextMenu.displayName = "TreeItemContextMenu";

const renderMenuItems = (menu: Menu[]): React.ReactNode => {
  return menu.map((item) => {
    if (item.menus) {
      return (
        <ContextMenuSub key={item.key}>
          <ContextMenuSubTrigger className="h-[24px] px-[8px] py-[4px] text-xs">
            <div className="mr-[8px] w-[16px] h-[16px]"></div>
            {item.name}
          </ContextMenuSubTrigger>
          <ContextMenuSubContent>
            {renderMenuItems(item.menus)}
          </ContextMenuSubContent>
        </ContextMenuSub>
      );
    } else {
      return (
        <>
          <ContextMenuItem
            key={item.key}
            className="h-[24px] px-[8px] py-[4px] text-xs"
            disabled={item.disable}
          >
            <div className="mr-[8px] w-[16px] h-[16px]">
              {item.iconName && <SVG name={item.iconName} />}
            </div>
            {item.name}
            {item.closeIconName && (
              <div className="absolute right-[10px]">
                <SVG name={item.closeIconName} />
              </div>
            )}
            {item.shortCutName && (
              <ContextMenuShortcut>{item.shortCutName}</ContextMenuShortcut>
            )}
          </ContextMenuItem>
          {item.separator && <ContextMenuSeparator />}
        </>
      );
    }
  });
};
