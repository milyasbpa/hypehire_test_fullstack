import React from "react";

export const Chevron = (props: React.HTMLAttributes<SVGElement>) => {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        {...props}
        // stroke="#475467"
        d="M6 9L12 15L18 9"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
