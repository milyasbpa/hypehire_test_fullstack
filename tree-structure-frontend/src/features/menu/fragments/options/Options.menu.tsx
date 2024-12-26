"use client";
import * as React from "react";
import clsx from "clsx";

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
  const [selectedOption, setSelectedOption] = React.useState<{
    id: string;
    name: string;
  }>(options[0]);
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
            option.id === selectedOption.id ? "bg-[#1D2939]" : "bg-[white]",
            "rounded-[3rem]",
            "px-[2rem] py-[0.75rem]",
            "text-[0.875rem] font-bold",
            option.id === selectedOption.id ? "text-[white]" : "text-[#1D2939]",
            option.id === selectedOption.id
              ? "border border-[#1D2939]"
              : "border border-[#D0D5DD]"
          )}
          onClick={() => {
            setSelectedOption(option);
          }}
        >
          {option.name}
        </button>
      ))}
    </div>
  );
};
