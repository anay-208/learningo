"use client";

import * as React from "react";
import { useTheme } from "next-themes";

const SvgIcon = () => {
  const { resolvedTheme } = useTheme();

  const gradientColors =
    resolvedTheme === "dark"
      ? {
          paint0: { start: "#001A66", mid: "#004D40", end: "#001A66" }, // Adjusted to deeper blue and teal for better contrast
          paint1: { start: "#4A0072", mid: "#800040", end: "#805C1D" }, // Refined purple, pink, and yellow gradient
          paint2: { start: "#802200", mid: "#80312A", end: "#806B00" }, // Kept darker orange, red, and gold gradient
        }
      : {
          paint0: { start: "#001AFF", mid: "#6EE5C2", end: "#001AFF" }, // Blue and teal gradient for light mode
          paint1: { start: "#FFC83A", mid: "#FF008A", end: "#6100FF" }, // Yellow, pink, and purple gradient for light mode
          paint2: { start: "#FFC83A", mid: "#FF008A", end: "#6100FF" }, // Same as paint1 for consistency
        };

  return (
    <svg
      className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 w-screen h-auto"
      width="1171"
      fill="none"
      viewBox="0 0 1171 241"
      suppressHydrationWarning
    >
      <g filter="url(#filter0_f)" opacity="0.175">
        <path
          fill="url(#paint0_linear)"
          d="M731.735-179.55C596.571-157.762 516.36-74.181 552.576 7.132s175.148 129.569 310.311 107.781C998.051 93.125 1078.26 9.545 1042.05-71.769c-36.22-81.313-175.152-129.568-310.315-107.781"
        />
        <path
          fill="url(#paint1_linear)"
          d="M378 114.106c142.489 0 258-68.218 258-152.368 0-84.151-115.511-152.368-258-152.368S120-122.413 120-38.262s115.511 152.368 258 152.368"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="567.5"
          x2="1029.02"
          y1="1.04"
          y2="64.647"
          gradientUnits="userSpaceOnUse"
        >
          <stop suppressHydrationWarning stopColor={gradientColors.paint0.start} />
          <stop suppressHydrationWarning offset="1" stopColor={gradientColors.paint0.end} />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="155"
          x2="511.855"
          y1="-11.023"
          y2="-162.127"
          gradientUnits="userSpaceOnUse"
        >
          <stop suppressHydrationWarning stopColor={gradientColors.paint1.start} />
          <stop suppressHydrationWarning offset="0.504" stopColor={gradientColors.paint1.mid} />
          <stop suppressHydrationWarning offset="1" stopColor={gradientColors.paint1.end} />
        </linearGradient>
        <linearGradient
          id="paint2_linear"
          x1="0"
          x2="1171"
          y1="120"
          y2="120"
          gradientUnits="userSpaceOnUse"
        >
          <stop suppressHydrationWarning stopColor={gradientColors.paint2.start} />
          <stop suppressHydrationWarning offset="0.504" stopColor={gradientColors.paint2.mid} />
          <stop suppressHydrationWarning offset="1" stopColor={gradientColors.paint2.end} />
        </linearGradient>
        <filter
          id="filter0_f"
          width="1170.74"
          height="550.775"
          x="0" 

   

          
          y="-310.63"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix" 
            result="shape"
          />
          <feGaussianBlur
            result="effect1_foregroundBlur"
            stdDeviation="60"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default SvgIcon;
