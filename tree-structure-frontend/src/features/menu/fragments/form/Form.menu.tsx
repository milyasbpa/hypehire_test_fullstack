"use client";
import * as React from "react";
import clsx from "clsx";
import { Textfield } from "@/core/ui/components/textfield";
import { MenuIdMenu } from "../../components/menu_id";
import { useSelector } from "react-redux";
import { RootState } from "@/core/module/app/redux/store/store.app";
import { useDispatch } from "react-redux";
import {
  setMenu,
  setNewMenu,
} from "@/core/module/app/redux/store/menuSlice.app";
import { v4 as uuidV4 } from "uuid";

export const FormMenu = () => {
  // const [parentData, setParentData] = React.useState<string>("");
  // const [name, setName] = React.useState<string>("");
  const dispatch = useDispatch();
  const menuItems = useSelector((state: RootState) => state.menu.menu);
  const newMenu = useSelector((state: RootState) => state.menu.newMenu);
  if (!newMenu) {
    return <div>Click Add Toggle if you want add menu</div>;
  }

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setNewMenu({
        ...newMenu,
        name: e.currentTarget.value,
      })
    );
  };

  const handleClickSave = () => {
    dispatch(
      setMenu([
        ...menuItems,
        {
          ...newMenu,
          id: uuidV4(),
        },
      ])
    );
    dispatch(setNewMenu(null));
  };
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
        "w-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.25rem]",
          "w-full"
        )}
      >
        <MenuIdMenu
          label="Menu ID"
          value="56320ee9-6af6-11ed-a7ba-f220afe5e4a9"
        />
      </div>

      <div
        className={clsx(
          "grid grid-cols-1 place-content-start place-items-start gap-[1.25rem]",
          "w-full sm:max-w-[262px]"
        )}
      >
        <Textfield
          id="depth"
          label={"Depth"}
          value={newMenu.depth}
          type="number"
          disabled
        />
        <Textfield
          id="parent_data"
          label={"Parent Data"}
          disabled
          value={
            menuItems.find((item) => item.id === newMenu.parentId)?.name ?? ""
          }
        />
        <Textfield
          id="name"
          label={"Name"}
          value={newMenu.name}
          onChange={handleChangeName}
        />
      </div>

      <button
        className={clsx(
          "flex items-center justify-center",
          "w-[264px] h-[52px]",
          "rounded-[3rem]",
          "bg-[#253BFF]",
          "text-[0.875rem] text-[#FFFFFF] font-bold"
        )}
        onClick={handleClickSave}
      >
        {"Save"}
      </button>
    </div>
  );
};
