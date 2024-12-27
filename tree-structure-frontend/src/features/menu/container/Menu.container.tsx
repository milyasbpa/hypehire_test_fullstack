"use client";
import * as React from "react";
import clsx from "clsx";
import { OptionsMenu } from "../fragments/options";
import { FormMenu } from "../fragments/form";
import { ParentSelectorMenu } from "../fragments/parent_selector";
import { TreeMenu } from "../fragments/tree";

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
        <ParentSelectorMenu />
        <OptionsMenu />
        <TreeMenu />
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
