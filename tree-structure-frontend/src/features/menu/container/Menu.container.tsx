import * as React from "react";
import clsx from "clsx";
import Tree from "@/core/ui/components/tree/Tree.component";
import { OptionsMenu } from "../fragments/options";
import { FormMenu } from "../fragments/form";
type MenuItem = {
  id: string;
  name: string;
  parentId: string | null; // `null` for root items
  depth: number;
  children?: MenuItem[]; // For nesting
};

const menuItems: MenuItem[] = [
  { id: "1", name: "System Management", parentId: null, depth: 1 },
  { id: "2", name: "Systems", parentId: "1", depth: 2 },
  { id: "3", name: "System Code", parentId: "2", depth: 3 },
  { id: "5", name: "API Lis", parentId: "1", depth: 2 },
  { id: "4", name: "Code Registration", parentId: "3", depth: 4 },
];
export const MenuContainer = () => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 lg:grid-cols-2 place-content-start place-items-start gap-[1rem]",
        "w-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full"
        )}
      >
        <OptionsMenu />
        <Tree items={menuItems} />
      </div>

      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
          "w-full"
        )}
      >
        <FormMenu />
      </div>
    </div>
  );
};
