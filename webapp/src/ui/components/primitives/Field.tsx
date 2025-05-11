import * as Headless from "@headlessui/react";
import { ReactNode } from "react";

export type FieldProps = {
  label?: string;
  description?: string;
  children?: ReactNode;
};

export function Field({ label, description, children }: FieldProps) {
  return (
    <Headless.Field>
      {label && (
        <Headless.Label className="text-sm/6 font-medium text-gray-900">
          {label}
        </Headless.Label>
      )}
      {description && (
        <Headless.Description className="text-sm/6 text-gray-500">
          {description}
        </Headless.Description>
      )}
      {children}
    </Headless.Field>
  );
}
