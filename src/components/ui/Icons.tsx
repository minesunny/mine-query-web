import { useTheme } from "next-themes";
import React from "react";

const requireAll = (
  requireContext: ReturnType<typeof require.context>,
): unknown[] => {
  return requireContext.keys().map(requireContext);
};

const req = require.context("/public/icons/jb", true, /\.svg$/);
const svgModules = requireAll(req);

requireAll(req);

export const SVG: React.FC<{
  name: string;
}> = ({ name }) => {
  const theme = useTheme();
  return (
    <svg height="1em" width="1em">
      <use xlinkHref={"#" + name + `_${theme.resolvedTheme}`} />
    </svg>
  );
};
