import { ReactNode } from "react";
import clsx from "clsx";

export type SectionProps = {
  last?: boolean;
  children: ReactNode;
};

export function Section({ last = false, children }: SectionProps) {
  const classes = clsx("pb-12", last ? "" : "border-b border-gray-900/10");
  return <div className={classes}>{children}</div>;
}
