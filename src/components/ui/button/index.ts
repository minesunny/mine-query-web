import dynamic from "next/dynamic";
// solve Prop `xlinkHref` did not match. Server: "#remove_undefined" Client: "#remove_dark";

const DynamicSVGButton = dynamic(
  async () => {
    const { SVGButton } = await import("@/components/ui/button/button");
    return SVGButton;
  },
  { ssr: false },
);
export {
  Button,
  buttonVariants,
  SVGButton,
} from "@/components/ui/button/button";
export { DynamicSVGButton };
