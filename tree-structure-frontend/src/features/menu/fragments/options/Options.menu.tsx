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
import { getChildren } from "@/core/utils/tree";

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
      const treeFilteredMenu = getChildren(activeMenu, menuItems);
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

  const treeFilteredMenu = getChildren(activeMenu, menuItems);

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
