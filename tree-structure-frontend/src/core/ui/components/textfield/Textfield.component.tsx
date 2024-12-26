import * as React from "react";
import clsx from "clsx";

export type TextfieldProps = React.HTMLProps<HTMLInputElement>;

export const Textfield = (props: TextfieldProps) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
        "w-full"
      )}
    >
      <label
        htmlFor={props.id}
        className={clsx("text-[0.875rem] text-[#475467] font-normal")}
      >
        {props.label}
      </label>

      <input
        {...props}
        className={clsx(
          "rounded-[1rem]",
          "px-[1rem] py-[1.125rem]",
          "bg-[#F9FAFB] disabled:bg-[#EAECF0]",
          "w-full",
          "text-[#101828] disabled:text-[#475467] text-[1rem] font-normal"
        )}
      />
    </div>
  );
};
