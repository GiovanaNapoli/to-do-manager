import type { ComponentProps } from "react";

export function Label(props: ComponentProps<"label">) {
  return (
    <label
      {...props}
      className="font-medium text-sm tracking-tight leading-normal"
    />
  );
}
