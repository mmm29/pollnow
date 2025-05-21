import { ReactNode } from "react";

export function AlignRight({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6 flex items-center justify-end gap-x-6">{children}</div>
  );
}
