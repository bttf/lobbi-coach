import TextareaAutosize from "react-textarea-autosize";
import { RefObject } from "react";
import { cn } from "@/lib/utils";
export default function Textarea({
  value,
  onChange,
  className,
  name,
  id,
  required = false,
  placeholder = "",
  textareaRef,
  minRows,
}: {
  value: string | null;
  onChange: (val: string) => void;
  name?: string;
  className?: string;
  id?: string;
  placeholder?: string;
  required?: boolean;
  textareaRef?: RefObject<HTMLTextAreaElement>;
  minRows?: number;
}) {
  return (
    <TextareaAutosize
      value={value || ""}
      onChange={(e) => onChange(e.currentTarget.value)}
      name={name}
      className={cn(
        "bg-transparent text-foreground px-2 py-1 border border-muted rounded-lg outline-none",
        className
      )}
      id={id}
      ref={textareaRef}
      required={required}
      placeholder={placeholder}
      minRows={minRows}
    />
  );
}
