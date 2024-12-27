"use client";
import * as React from "react";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/core/module/app/redux/store/store.app";
import {
  setExpandedNodes,
  setMenuOption,
} from "@/core/module/app/redux/store/menuSlice.app";
import { filterFlatList } from "@/core/utils/tree";

const options = [
  {
    id: "expand",
    name: "Expand All",
  },
  {
    id: "collapse",
    name: "Collapse All",
  },
];
export const OptionsMenu = () => {
  const dispatch = useDispatch();
  const menuItems = useSelector((state: RootState) => state.menu.menu);
  const menuOption = useSelector((state: RootState) => state.menu.menuOption);
  const activeMenu = useSelector((state: RootState) => state.menu.activeMenu);

  React.useEffect(() => {
    if (!!activeMenu) {
      const sortedData = [...menuItems].sort((a, b) => {
        // First, compare by depth to ensure the hierarchy level is respected.
        if (a.depth !== b.depth) {
          return a.depth - b.depth;
        }

        // If depth is the same, compare by parentId (null or valid parent).
        if (a.parentId !== b.parentId) {
          return (a.parentId || "").localeCompare(b.parentId || "");
        }

        // Finally, compare by id when both depth and parentId are the same.
        return a.id.localeCompare(b.id);
      });
      const treeFilteredMenu = filterFlatList(activeMenu.id, sortedData);
      const menuIds = treeFilteredMenu.map((item) => item.id);
      const obj = menuIds.reduce((acc, item) => {
        return {
          ...acc,
          [`${item}`]: true,
        };
      }, {});
      dispatch(setExpandedNodes(obj));
      dispatch(setMenuOption(options[0]));
    }
  }, [activeMenu]);

  if (!activeMenu) {
    return;
  }

  const sortedData = [...menuItems].sort((a, b) => {
    // First, compare by depth to ensure the hierarchy level is respected.
    if (a.depth !== b.depth) {
      return a.depth - b.depth;
    }

    // If depth is the same, compare by parentId (null or valid parent).
    if (a.parentId !== b.parentId) {
      return (a.parentId || "").localeCompare(b.parentId || "");
    }

    // Finally, compare by id when both depth and parentId are the same.
    return a.id.localeCompare(b.id);
  });
  const treeFilteredMenu = filterFlatList(activeMenu.id, sortedData);

  const handleSelectOption = (data: { id: string; name: string }) => {
    if (data.id === "expand") {
      const menuIds = treeFilteredMenu.map((item) => item.id);
      const obj = menuIds.reduce((acc, item) => {
        return {
          ...acc,
          [`${item}`]: true,
        };
      }, {});
      dispatch(setExpandedNodes(obj));
    } else {
      dispatch(setExpandedNodes({}));
    }
    dispatch(setMenuOption(data));
  };

  return (
    <div
      className={clsx(
        "grid grid-flow-col items-center content-center justify-start justify-items-start gap-[0.5rem]",
        "w-full"
      )}
    >
      {options.map((option, optionIndex) => (
        <button
          key={optionIndex}
          className={clsx(
            option.id === menuOption?.id ? "bg-[#1D2939]" : "bg-[white]",
            "rounded-[3rem]",
            "px-[2rem] py-[0.75rem]",
            "text-[0.875rem] font-bold",
            option.id === menuOption?.id ? "text-[white]" : "text-[#1D2939]",
            option.id === menuOption?.id
              ? "border border-[#1D2939]"
              : "border border-[#D0D5DD]"
          )}
          onClick={() => handleSelectOption(option)}
        >
          {option.name}
        </button>
      ))}
    </div>
  );
};
