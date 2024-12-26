import * as React from "react";
import clsx from "clsx";
import Image from "next/image";
import SVGIcon from "@/core/ui/icons";
import { AccordionMenuApp } from "../../components/accordion_menu";

type MenuItem = {
  id: string;
  name: string;
  parentId: string | null; // `null` for root items
  depth: number;
  children?: MenuItem[]; // For nesting
};

const menuItems: MenuItem[] = [
  { id: "1", name: "Systems", parentId: null, depth: 1 },

  { id: "2", name: "System Code", parentId: "1", depth: 2 },
  { id: "3", name: "Code Registration", parentId: "2", depth: 3 },

  { id: "4", name: "Code Registration-2", parentId: "1", depth: 2 },
  { id: "5", name: "Properties", parentId: "1", depth: 2 },

  { id: "6", name: "Menus", parentId: "1", depth: 2 },
  { id: "7", name: "MenusRegistration", parentId: "6", depth: 3 },

  { id: "8", name: "API List", parentId: "1", depth: 2 },
  { id: "9", name: "API Registration", parentId: "8", depth: 3 },
  { id: "10", name: "API Edit", parentId: "8", depth: 3 },

  { id: "11", name: "Users & Groups", parentId: null, depth: 1 },

  { id: "12", name: "Users", parentId: "11", depth: 2 },
  { id: "13", name: "User Account Registration", parentId: "12", depth: 3 },

  { id: "14", name: "Group", parentId: "11", depth: 2 },
  { id: "15", name: "User Group Registration", parentId: "14", depth: 3 },

  { id: "16", name: "사용자 승인", parentId: "11", depth: 2 },
  { id: "17", name: "사용자 승인 상세", parentId: "16", depth: 3 },
];

export const SidebarApp = () => {
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
