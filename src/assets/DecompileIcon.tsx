import React from "react";

const DecompileIcon = () => {
  return (
    <svg
      width={200}
      height={200}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <mask
        id="mask0_30_361"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={200}
        height={200}
      >
        <rect width={200} height={200} fill="url(#pattern0)" />
      </mask>
      <g mask="url(#mask0_30_361)">
        <rect x={-10} y={12} width={225} height={177} fill="#FFB900" />
      </g>
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <use xlinkHref="#image0_30_361" transform="scale(0.005)" />
        </pattern>
        <image
          id="image0_30_361"
          width={200}
          height={200}
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default DecompileIcon;
