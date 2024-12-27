"use client";
import * as React from "react";
import clsx from "clsx";
import Image from "next/image";
import { AccordionMenuApp } from "../../components/accordion_menu";
import { RootState } from "../../redux/store/store.app";
import { useSelector } from "react-redux";

export const SidebarApp = () => {
  const menuItems = useSelector((state: RootState) => state.menu.menu);
  const orderedMenus = menuItems.filter((menu) => menu.depth <= 2);
  const parentMenuItems = orderedMenus.filter((menu) => !menu.parentId);
  return (
    <aside
      className={clsx(
        "bg-[#101828]",
        "w-[240px]",
        "min-h-[calc(100vh-1.5rem-1.5rem)] h-max",
        "rounded-[1.5rem]"
      )}
    >
      <div
        className={clsx(
          "flex items-center justify-between",
          "w-full",
          "px-[2rem] py-[2rem]"
        )}
      >
        <Image src={"/logo/logo.svg"} width={71} height={20} alt={"logo"} />
        <Image
          src={"/icons/menu_open.svg"}
          width={24}
          height={24}
          alt={"menu_open"}
        />
      </div>

      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
          "w-full",
          "px-[1rem] py-[0.625rem]"
        )}
      >
        {parentMenuItems.map((menu, menuIndex) => {
          const menuItem = menu;
          const submenuItems = orderedMenus
            .filter((item) => item.depth === 2)
            .filter((item) => item.parentId === menu.id);

          return (
            <AccordionMenuApp
              key={menuIndex}
              menuItem={menuItem}
              submenuItems={submenuItems}
            />
          );
        })}
      </div>
    </aside>
  );
};
