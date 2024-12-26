import * as React from "react";
import clsx from "clsx";

export interface MenuIdMenuProps {
  label?: string;
  value?: string;
}

export const MenuIdMenu = ({ label = "", value = "" }: MenuIdMenuProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
        "w-full"
      )}
    >
      <p className={clsx("text-[0.875rem] text-[#475467] font-normal")}>
        {label}
      </p>

      <div
        className={clsx(
          "rounded-[1rem]",
          "px-[1rem] py-[1.125rem]",
          "bg-[#F9FAFB]",
          "w-full",
          "text-[#667085] text-[1rem] font-normal"
        )}
      >
        {value}
      </div>
    </div>
  );
};
