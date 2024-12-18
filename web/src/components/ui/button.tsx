import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button">;

export const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      className="disabled:bg-purple-400 disabled:cursor-not-allowed flex h-12 items-center justify-center gap-2 rounded-lg text-sm font-medium tracking-tight outline-none ring-offset-2 ring-offset-black focus-visible:ring-2 bg-violet-500 text-violet-50 hover:bg-violet-600 ring-violet-500"
    />
  );
};
