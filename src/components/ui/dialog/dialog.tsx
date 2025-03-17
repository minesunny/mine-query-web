"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import "./theme.css";
import { cn } from "@/lib/utils";
import { useContext, createContext, useEffect, useCallback } from "react";
import { Rnd } from "react-rnd";
const DialogContext = createContext<{
  expanded: boolean | undefined;
  setExpanded: React.Dispatch<React.SetStateAction<boolean | undefined>>;
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
  const [expanded, setExpanded] = React.useState<boolean | undefined>(
    undefined,
  );
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
    minWidth?: number | string;
    minHeight?: number | string;
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
      resizeable,
      size,
      minWidth,
      minHeight,
      position,
      ...props
    },
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
    const memDefaultValue = useCallback(() => defaultValue, [defaultValue]);

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
          expanded == false &&
            setTimeout(() => {
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
            minWidth={minWidth}
            minHeight={minHeight}
            style={{
              zIndex: 50,
              borderRadius: "0.5rem",
            }}
            bounds={"#overlay"}
            resizeHandleComponent={{
              // DialogPrimitive.Content 自动添加resizers，起wrapper 会有aria-hidden，导致resizers不可见
              top: <div className={"pointer-events-auto h-full w-full"} />,
              right: <div className={"pointer-events-auto h-full w-full"} />,
              bottom: <div className={"pointer-events-auto h-full w-full"} />,
              left: <div className={"pointer-events-auto h-full w-full"} />,
              topRight: <div className={"pointer-events-auto h-full w-full"} />,
              bottomRight: (
                <div className={"pointer-events-auto h-full w-full"} />
              ),
              bottomLeft: (
                <div className={"pointer-events-auto h-full w-full"} />
              ),
              topLeft: <div className={"pointer-events-auto h-full w-full"} />,
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
                "dialog-content z-0 flex h-full w-full flex-col rounded-lg shadow-lg",
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
    minWidth?: number | string;
    minHeight?: number | string;
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
      minHeight,
      minWidth,
      ...props
    },
    ref,
  ) => {
    return (
      <DialogContent minHeight={minHeight} minWidth={minWidth}>
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
        "dialog-content-header flex h-7 items-center rounded-t-lg border-b text-center",
        className,
      )}
      {...props}
    >
      {windowControl && (
        <div className={"group mx-[10px] flex h-[12px] space-x-1"}>
          <DialogPrimitive.Close
            id={"close"}
            className={"h-[12px] w-[12px] rounded-full bg-[#ED6A5F]"}
          >
            {/*<Icons name={"CloseMini"} className={"hidden group-hover:block"} />*/}
          </DialogPrimitive.Close>
          <button
            className={"h-[12px] w-[12px] rounded-full bg-[#606161]"}
          ></button>
          <button
            id={"expand"}
            className={"h-[12px] w-[12px] rounded-full bg-[#61C454]"}
            onClick={() => {
              if (expanding) return;
              setExpanded(!expanded);
              setTimeout(() => {
                setExpanding(false);
              }, 500);
            }}
          >
            {/*<Icons name={"AddMini"} className={"hidden group-hover:block"} />*/}
          </button>
        </div>
      )}
      <div className={"flex h-8 w-full items-center justify-center"}>
        {children}
      </div>
      {windowControl && <div className={"mx-[10px] h-[12px] w-[36px]"} />}
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
    className={cn("text-muted-foreground text-default-semibold", className)}
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
