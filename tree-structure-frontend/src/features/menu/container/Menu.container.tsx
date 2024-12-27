"use client";
import * as React from "react";
import clsx from "clsx";
import Tree from "@/core/ui/components/tree/Tree.component";
import { OptionsMenu } from "../fragments/options";
import { FormMenu } from "../fragments/form";
import { useSelector } from "react-redux";
import { RootState } from "@/core/module/app/redux/store/store.app";

export const MenuContainer = () => {
  const menuItems = useSelector((state: RootState) => state.menu.menu);
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
