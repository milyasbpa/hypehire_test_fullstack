"use client";
import { Dropdown } from "@/core/ui/components/dropdown";
import * as React from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { RootState } from "@/core/module/app/redux/store/store.app";
import { useDispatch } from "react-redux";
import { setActiveMenu } from "@/core/module/app/redux/store/menuSlice.app";

export const ParentSelectorMenu = () => {
  const dispatch = useDispatch();
  const menuItems = useSelector((state: RootState) => state.menu.menu);
  const activeMenu = useSelector((state: RootState) => state.menu.activeMenu);

  const parentMenus = menuItems.filter((item) => !item.parentId);
  React.useEffect(() => {
    if (!!menuItems.length) {
      dispatch(setActiveMenu(parentMenus[0]));
    }
  }, [menuItems]);

  const handleSelectMenu = (data: { id: string; name: string }) => {
    const selectedMenu = menuItems.find((item) => item.id === data.id);
    if (!selectedMenu) {
      return;
    }
    dispatch(setActiveMenu(selectedMenu));
  };
  return (
    <div className={clsx("max-w-[348px] w-full")}>
      <Dropdown
        label={"Menu"}
        selected={
          !!activeMenu
            ? { id: activeMenu.id, name: activeMenu.name }
            : activeMenu
        }
        items={parentMenus}
        onSelect={handleSelectMenu}
      />
    </div>
  );
};
