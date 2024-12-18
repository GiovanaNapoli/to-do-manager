import type { ComponentProps } from "react";

type InputProps = ComponentProps<"input">;

export const Input = (props: InputProps) => {
  return (
    <input
      {...props}
      className="px-4 h-12 bg-neutral-950 border border-zinc-900 rounded-lg placeholder-zinc-400 outline-none text-sm hover:border-zinc-800 focus-visible:border-pink-500 focus-visible:ring-4 ring-pink-500/10"
    />
  );
};
