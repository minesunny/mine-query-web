import React from "react";
import { Icons } from "@/components/ui/Icons";

export enum ButtonType {
  All,
  CloseOnly,
  NoCollapse,
  NoExpand,
}
export type MacOSWindowButtonProps = {
  type: ButtonType;
  close: () => void;
  collapse?: () => void;
  expand?: () => void;
};
const MacOSWindowButton: React.FC<MacOSWindowButtonProps> = (buttonProps) => {
  return (
    <div className={"h-[12px] w-[52px] flex justify-around group"}>
      <button
        id={"close"}
        className={`rounded-full bg-[#606161] group-hover:bg-[#ED6A5F] h-[12px] w-[12px]`}
      >
        <Icons name={"CloseMini"} className={`hidden group-hover:block`} />
      </button>
      <button
        id={"collapse"}
        className={`rounded-full ${buttonProps.type == ButtonType.NoCollapse || buttonProps.type == ButtonType.CloseOnly ? "bg-[#606161]" : "bg-[#606161] group-hover:bg-[#FFBB2E]"}  h-[12px] w-[12px]`}
      >
        {/*<Icons name={"CloseSmall"} className={`hidden group-hover:block`} />*/}
      </button>
      <button
        id={"expand"}
        className={`rounded-full ${buttonProps.type == ButtonType.NoExpand || buttonProps.type == ButtonType.CloseOnly ? "bg-[#606161]" : "bg-[#606161] group-hover:bg-[#61C454]"}  h-[12px] w-[12px]`}
      >
        <Icons name={"AddMini"} className={`hidden group-hover:block`} />
      </button>
    </div>
  );
};

export default MacOSWindowButton;
