import React from "react";

export const Trailing = (props: React.HTMLAttributes<SVGElement>) => {
  return (
    <svg
      {...props}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        {...props}
        d="M6.99996 2.91667V11.0833M2.91663 7H11.0833"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
