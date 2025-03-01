"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import "./theme.css";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/Icons";
import { useContext, createContext, useEffect, useCallback } from "react";
import { Rnd } from "react-rnd";
import { Button } from "@/components/ui/button/button";
const DialogContext = createContext<{
  expanded: boolean | undefined;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  expanded: false,
  setExpanded: () => {},
});
const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const Dialog = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>
>(({ ...props }, ref) => {
  const [expanded, setExpanded] = React.useState(undefined);
  return (
    <DialogContext.Provider value={{ expanded, setExpanded }}>
      <DialogPrimitive.Root {...props} />
    </DialogContext.Provider>
  );
});
Dialog.displayName = DialogPrimitive.Root.displayName;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    draggable?: boolean;
    resizeable?: boolean;
    size?: {
      width: number | string;
      height: number | string;
    };
    position?: {
      x: number | string;
      y: number | string;
    };
  }
>(
  (
    { className, children, draggable, resizeable, size, position, ...props },
    ref,
  ) => {
    const { expanded } = useContext(DialogContext);
    const { onOpenAutoFocus, ...others } = props;
    const overLayRef =
      React.useRef<React.ElementRef<typeof DialogPrimitive.Overlay>>(null);
    const rndRef = React.useRef<React.ElementRef<typeof Rnd>>(null);
    const [dragged, setDragged] = React.useState(false);
    const [resized, setResized] = React.useState(false);
    const [defaultUpdate, setDefaultUpdate] = React.useState(false);
    const [defaultValue, setDefaultValue] = React.useState({
      width: 500,
      height: 500,
      x: 0,
      y: 0,
    });
    const memDefaultValue = useCallback(
      () => defaultValue,
      [defaultValue],
    );

    useEffect(() => {
      if (expanded) {
        if (
          rndRef.current &&
          rndRef.current.getSelfElement() &&
          overLayRef.current
        ) {
          (rndRef.current.getSelfElement() as HTMLElement).style.transition =
            "width 0.5s ease, height 0.5s ease, transform 0.5s ease";
          rndRef.current.updateSize({
            width: overLayRef.current.getBoundingClientRect().width,
            height: overLayRef.current.getBoundingClientRect().height,
          });
          rndRef.current.updatePosition({
            x: 0,
            y: 0,
          });
        }
      } else {
        if (
          rndRef.current &&
          rndRef.current.getSelfElement() &&
          overLayRef.current
        ) {
          if (expanded == false) {
            (rndRef.current.getSelfElement() as HTMLElement).style.transition =
            "width 0.5s ease, height 0.5s ease, transform 0.5s ease";
          }
          rndRef.current.updateSize({
            width: memDefaultValue().width,
            height: memDefaultValue().height,
          });
          rndRef.current.updatePosition({
            x: memDefaultValue().x,
            y: memDefaultValue().y,
          });
          expanded == false && setTimeout(() => {
            if (rndRef.current && rndRef.current.getSelfElement()) {
              (
                rndRef.current.getSelfElement() as HTMLElement
              ).style.transition = "";
            }
          }, 500);
        }
      }
    }, [expanded, memDefaultValue]);

    return (
      <DialogPortal>
        <DialogOverlay id={"overlay"} ref={overLayRef} />
        {/* Rnd里面使用DialogPrimitive.Content 会有computeStyle错误，没找到原因，用空标签包一下，就可以解决*/}
        <>
          <Rnd
            ref={rndRef}
            style={{
              zIndex: 50,
              borderRadius: "0.5rem",
            }}
            bounds={"#overlay"}
            resizeHandleComponent={{
              // DialogPrimitive.Content 自动添加resizers，起wrapper 会有aria-hidden，导致resizers不可见
              top: <div className={"h-full w-full pointer-events-auto"} />,
              right: <div className={"h-full w-full pointer-events-auto"} />,
              bottom: <div className={"h-full w-full pointer-events-auto"} />,
              left: <div className={"h-full w-full pointer-events-auto"} />,
              topRight: <div className={"h-full w-full pointer-events-auto"} />,
              bottomRight: (
                <div className={"h-full w-full pointer-events-auto"} />
              ),
              bottomLeft: (
                <div className={"h-full w-full pointer-events-auto"} />
              ),
              topLeft: <div className={"h-full w-full pointer-events-auto"} />,
            }}
            enableResizing={resizeable}
            onResize={() => {
              if (expanded) return;
              setResized(true);
            }}
            onResizeStop={(event, dir, elementRef, delta, position) => {
              if (expanded) return;
              if (rndRef.current && resized) {
                setDefaultValue({
                  width: defaultValue.width + delta.width,
                  height: defaultValue.height + delta.height,
                  x: position.x,
                  y: position.y,
                });
              }
              if (resized) {
                setResized(false);
              }
            }}
            onDrag={() => {
              if (expanded) return;
              setDragged(true);
            }}
            onDragStop={(event, data) => {
              if (expanded) return;
              if (rndRef.current && dragged) {
                setDefaultValue({
                  width: defaultValue.width,
                  height: defaultValue.height,
                  x: data.x,
                  y: data.y,
                });
              }
              if (dragged) {
                setDragged(false);
              }
            }}
          >
            <DialogPrimitive.Content
              aria-describedby={undefined}
              onOpenAutoFocus={(e) => {
                if (!defaultUpdate && overLayRef && overLayRef.current) {
                  const w = overLayRef.current.getBoundingClientRect().width;
                  const h = overLayRef.current.getBoundingClientRect().height;
                  let width: number = 500;
                  let height: number = 500;
                  if (size) {
                    width = parseSize(size.width, w);
                    height = parseSize(size.height, h);
                  }
                  if (rndRef.current) {
                    rndRef.current.updateSize({
                      width: width,
                      height: height,
                    });
                  }
                  let x = overLayRef.current.getBoundingClientRect().width / 2;
                  let y = overLayRef.current.getBoundingClientRect().height / 2;
                  if (position) {
                    x = parseSize(position.x, w);
                    y = parseSize(position.y, h);
                  }
                  x = x - width / 2;
                  y = y - height / 2;
                  if (rndRef.current) {
                    rndRef.current.updatePosition({
                      x: x,
                      y: y,
                    });
                  }
                  setDefaultUpdate(true);
                  setDefaultValue({
                    width: width,
                    height: height,
                    x: x,
                    y: y,
                  });
                } else {
                  if (rndRef.current) {
                    rndRef.current.updateSize({
                      width: defaultValue.width,
                      height: defaultValue.height,
                    });
                    rndRef.current.updatePosition({
                      x: defaultValue.x,
                      y: defaultValue.y,
                    });
                  }
                }
                if (onOpenAutoFocus) {
                  onOpenAutoFocus(e);
                }
              }}
              ref={ref}
              className={cn(
                "h-full w-full z-0 rounded-lg shadow-lg dialog-content",
              )}
              {...others}
              onInteractOutside={(e) => {
                resizeable && e.preventDefault();
              }}
            >
              {children}
            </DialogPrimitive.Content>
          </Rnd>
        </>
      </DialogPortal>
    );
  },
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogContentPanel = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    title?: string;
    draggable?: boolean;
    resizeable?: boolean;
    size?: {
      width: number | string;
      height: number | string;
    };
    position?: {
      x: number | string;
      y: number | string;
    };
  }
>(
  (
    {
      className,
      children,
      draggable,
      title,
      resizeable,
      size,
      position,
      ...props
    },
    ref,
  ) => {
    return (
      <DialogContent>
        <DialogHeader windowControl={true}>
          {title && <DialogTitle>{title}</DialogTitle>}
        </DialogHeader>
        <DialogPortal>{children}</DialogPortal>
        <DialogFooter />
      </DialogContent>
    );
  },
);
DialogContentPanel.displayName = "DialogContentPanel";

const DialogHeader = ({
  className,
  windowControl,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { windowControl?: boolean }) => {
  const { expanded, setExpanded } = useContext(DialogContext);
  const [expanding, setExpanding] = React.useState(false);
  return (
    <div
      className={cn(
        "flex text-center items-center h-7 rounded-t-lg border-b dialog-content-header",
        className,
      )}
      {...props}
    >
      {windowControl && (
        <div className={"h-[12px] flex group mx-[10px] space-x-1"}>
          <DialogPrimitive.Close
            id={"close"}
            className={"rounded-full bg-[#ED6A5F] h-[12px] w-[12px]"}
          >
            <Icons name={"CloseMini"} className={"hidden group-hover:block"} />
          </DialogPrimitive.Close>
          <button
            className={"rounded-full bg-[#606161] h-[12px] w-[12px]"}
          ></button>
          <button
            id={"expand"}
            className={"rounded-full bg-[#61C454] h-[12px] w-[12px]"}
            onClick={() => {
              if (expanding) return;
              setExpanded(!expanded);
              setTimeout(() => {
                setExpanding(false);
              }, 500);
            }}
          >
            <Icons name={"AddMini"} className={"hidden group-hover:block"} />
          </button>
        </div>
      )}
      <div className={"w-full items-center"}> {children}</div>
      {windowControl && <div className={"h-[12px] w-[36px] mx-[10px]"} />}
    </div>
  );
};
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-default-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-default-semibold text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
const parseSize = (size: number | string, refSize: number): number => {
  if ("number" === typeof size) {
    return size as number;
  }
  if (size.endsWith("px")) {
    return parseInt(size.replace("px", ""));
  }
  if (size.endsWith("%")) {
    return (refSize * parseInt(size.replace("%", ""))) / 100;
  }
  return 0;
};

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
