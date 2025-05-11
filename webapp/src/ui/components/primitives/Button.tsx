import * as Headless from "@headlessui/react";
import React, { forwardRef } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "soft";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
}

const VARIANT_STYLES = {
  primary:
    "bg-indigo-600 text-sm text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
  secondary: "text-sm/6 text-gray-900 hover:bg-gray-200/50",
  soft: "text-sm/6 text-gray-900 bg-gray-200/50 hover:bg-gray-300/50",
};

export const Button = forwardRef(function Button(
  { variant = "primary", className, children, ...rest }: ButtonProps,
  ref: React.ForwardedRef<HTMLElement>
) {
  const mergedClassName = clsx(
    "py-2 px-3 font-semibold rounded-md relative isolate inline-flex items-center justify-center gap-x-2",
    VARIANT_STYLES[variant],
    className
  );

  return (
    <Headless.Button className={mergedClassName} {...rest} ref={ref}>
      {children}
    </Headless.Button>
  );
});
