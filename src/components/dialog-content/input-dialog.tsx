import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";

const InputDialog = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger> & {
    name: string;
    title: string;
    value?: string;
    confirm?: (value: string) => void;
    cancel?: (value: string) => void;
  }
>(({ name, title, value, confirm, cancel, children, ...props }, ref) => {
  const [inputValue, setInputValue] = React.useState(value || "");
  const [open, setOpen] = React.useState(false);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && confirm) {
      confirm(inputValue);
      setOpen(false);
      setInputValue("");
    }
  };
  const onOpenChange = (open: boolean) => {
    if (!open && cancel) {
      cancel(inputValue);
    }
    setOpen(open);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger ref={ref}>{children}</DialogTrigger>
      <DialogContent
        onPointerDownOutside={() => {
          if (cancel) {
            cancel(inputValue);
          }
          setOpen(false);
        }}
        resizeable={false}
        size={{
          width: 345,
          height: 80,
        }}
      >
        <DialogHeader windowControl={false}>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div
          className={"bg-panel-bg-dialog-content w-full px-4 py-1 rounded-b-lg"}
        >
          <input
            type="Text"
            value={inputValue}
            placeholder="Name"
            onKeyDown={handleKeyDown}
            onChange={(e) => setInputValue(e.target.value)}
            className={
              "w-full bg-panel-bg-dialog-content focus-visible:outline-none text-text text-sm"
            }
          />
        </div>
      </DialogContent>
    </Dialog>
  );
});
InputDialog.displayName = "InputDialog";

export { InputDialog };
