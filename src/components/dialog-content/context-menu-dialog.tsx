import * as React from "react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Dialog } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

type ContextMenuDialogProps = {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  dialog?: React.ForwardRefExoticComponent<React.RefAttributes<any>>;
  children?: ContextMenuDialogProps[];
};
const ContextMenuDialog = React.forwardRef<
  React.ElementRef<typeof ContextMenuTrigger>,
  React.ComponentPropsWithoutRef<typeof DialogContent> & {
    menu: ContextMenuDialogProps[];
  }
>(({ children, menu, size, ...props }, ref) => {
  const dialogRef = React.useRef<React.ElementRef<typeof DialogTrigger>>(null);
  const [dialogData, setDialogData] =
    React.useState<ContextMenuDialogProps | null>();
  return (
    <Dialog>
      <ContextMenu>
        <ContextMenuTrigger>Right click</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Open</ContextMenuItem>
          <ContextMenuItem>Download</ContextMenuItem>
          <DialogTrigger asChild>
            <ContextMenuItem>
              <span>Delete</span>
            </ContextMenuItem>
          </DialogTrigger>
        </ContextMenuContent>
      </ContextMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this file from our servers?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
ContextMenuDialog.displayName = "ContextMenuDialog";
export { ContextMenuDialog };
export type { ContextMenuDialogProps };
