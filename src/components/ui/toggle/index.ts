import dynamic from "next/dynamic";

export { Toggle, toggleVariants } from "@/components/ui/toggle/toggle";
const DynamicToggle = dynamic(
  async () => {
    const { Toggle } = await import("@/components/ui/toggle/toggle");
    return Toggle;
  },
  { ssr: false },
);
export { DynamicToggle };
