import * as React from "react";
import clsx from "clsx";
import Image from "next/image";
import SVGIcon from "@/core/ui/icons";
import { SidebarApp } from "../fragments/sidebar";

export interface AppContainerProps {
  children?: React.ReactNode;
}

export const AppContainer = ({ children }: AppContainerProps) => {
  return (
    <main
      className={clsx(
        "grid grid-cols-1 sm:grid-cols-[240px_1fr]",
        "w-full",
        "px-[1.5rem] py-[1.5rem]"
      )}
    >
      {/* Sidebar */}
      <SidebarApp />
      {/* Children */}
      <div className={clsx("w-full")}>
        {/* Breadcrumb */}
        <div
          className={clsx(
            "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]",
            "w-full",
            "px-[3rem] py-[30px]"
          )}
        >
          <SVGIcon
            name="Folder"
            className={clsx("w-[1.5rem] h-[1.5rem]", "fill-[#D0D5DD]")}
          />
          <p className={clsx("text-[#D0D5DD] text-[0.875rem] font-normal")}>
            {"/"}
          </p>
          <p className={clsx("text-[#101828] text-[0.875rem] font-medium")}>
            {"Menus"}
          </p>
        </div>
        {/* Menu Title */}
        <div
          className={clsx(
            "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[1rem]",
            "w-full",
            "px-[3rem] py-[1rem]"
          )}
        >
          <div
            className={clsx(
              "flex items-center justify-center",
              "w-[52px] h-[52px]",
              "bg-[#253BFF]",
              "rounded-[50%]"
            )}
          >
            <SVGIcon
              name="Submenu"
              className={clsx("w-[1.5rem] h-[1.5rem]", "fill-[white]")}
            />
          </div>

          <p className={clsx("text-[#101828] text-[2rem] font-extrabold")}>
            {"Menus"}
          </p>
        </div>

        {/* Children */}
        <div className={clsx("w-full", "px-[3rem] py-[30px]")}>{children}</div>
      </div>
    </main>
  );
};
