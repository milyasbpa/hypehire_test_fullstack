"use client";
import * as React from "react";
import clsx from "clsx";
import SVGIcon from "@/core/ui/icons";
import { useOnClickOutside } from "usehooks-ts";
import { MenuItemComponent } from "../../redux/store/menuSlice.app";

export interface AccordionMenuAppProps {
  menuItem?: MenuItemComponent;
  submenuItems?: MenuItemComponent[];
}

export const AccordionMenuApp = ({
  menuItem = {
    id: "",
    name: "",
    parentId: null,
    depth: 1,
    createdAt: "",
    updatedAt: "",
  },
  submenuItems = [],
}: AccordionMenuAppProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  const handleClickAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  useOnClickOutside(ref, () => {
    setIsOpen(false);
  });

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0px]",
        "w-full",
        isOpen && "py-[0.5rem] bg-[#1D2939]",
        "rounded-[1rem]"
      )}
      ref={ref}
    >
      <button
        className={clsx(
          "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[1rem]",
          "w-full",
          "px-[0.75rem] py-[0.75rem]"
        )}
        onClick={handleClickAccordion}
      >
        <SVGIcon
          name="Folder"
          className={clsx("w-[1.5rem] h-[1.5rem]", "fill-[white]")}
        />
        <p className={clsx("text-[#FFFFFF] text-[0.875rem] font-bold")}>
          {menuItem.name}
        </p>
      </button>
      {isOpen && (
        <div
          className={clsx(
            "grid grid-cols-1 place-content-start place-items-start gap-[0px]",
            "w-full"
          )}
        >
          {submenuItems.map((submenu, submenuIndex) => (
            <button
              key={submenuIndex}
              className={clsx(
                "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[1rem]",
                "w-full",
                "px-[0.75rem] py-[0.75rem]"
              )}
            >
              <SVGIcon
                name="Submenu"
                className={clsx("w-[1.5rem] h-[1.5rem]", "stroke-[white]")}
              />
              <p className={clsx("text-[#667085] text-[0.875rem] font-bold")}>
                {submenu.name}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
