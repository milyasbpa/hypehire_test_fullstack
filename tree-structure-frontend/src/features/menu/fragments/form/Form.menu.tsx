"use client";
import * as React from "react";
import clsx from "clsx";
import { Textfield } from "@/core/ui/components/textfield";
import { MenuIdMenu } from "../../components/menu_id";

export const FormMenu = () => {
  const [parentData, setParentData] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");

  const handleChangeParentData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParentData(e.currentTarget.value);
  };
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
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
          "w-full max-w-[262px]"
        )}
      >
        <Textfield
          id="depth"
          label={"Depth"}
          value={3}
          type="number"
          disabled
        />
        <Textfield
          id="parent_data"
          label={"Parent Data"}
          value={parentData}
          onChange={handleChangeParentData}
        />
        <Textfield
          id="name"
          label={"Name"}
          value={name}
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
      >
        {"Save"}
      </button>
    </div>
  );
};
