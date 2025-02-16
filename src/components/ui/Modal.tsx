"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import clsx from "clsx";
import { cn } from "@/lib/utils";

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  className,
}: {
  open: boolean;
  onClose?: () => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (open) setTimeout(() => setVisible(true), 100);
    else setVisible(false);
  }, [open]);
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose && onClose()}>
      <DialogContent
        ref={contentRef}
        onPointerDownOutside={(e) => {
          if (!contentRef.current) return;
          const contentRect = contentRef.current.getBoundingClientRect();
          // Detect if click actually happened within the bounds of content.
          // This can happen if click was on an absolutely positioned element overlapping content,
          // such as the 1password extension icon in the text input.
          const actuallyClickedInside =
            e.detail.originalEvent.clientX > contentRect.left &&
            e.detail.originalEvent.clientX <
              contentRect.left + contentRect.width &&
            e.detail.originalEvent.clientY > contentRect.top &&
            e.detail.originalEvent.clientY <
              contentRect.top + contentRect.height;
          if (actuallyClickedInside) {
            e.preventDefault();
          }
        }}
        className={cn(
          "transition-all duration-500 delay-100 max-h-full overflow-y-scroll",
          {
            "opacity-0": !visible,
            "opacity-100": visible,
            "blur-xl": !visible,
            "blur-none": visible,
          },
          className
        )}
        overlayClassName={clsx("transition-all duration-500", {
          "opacity-0": !visible,
          "opacity-100": visible,
        })}
        hideClose={!onClose}
      >
        <DialogHeader>
          {title && (
            <DialogTitle className="DialogTitle">
              <span className="font-semibold">{title}</span>
            </DialogTitle>
          )}

          {description && (
            <DialogDescription className="DialogDescription">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
