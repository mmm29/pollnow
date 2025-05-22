import { ReactNode } from "react";
import clsx from "clsx";

export type ChildSpace = "all" | "lg" | "md";

export type ContainerProps = {
  title?: string;
  childSpace?: ChildSpace;
  children: ReactNode;
};

const spaceStyles: Record<ChildSpace, string> = {
  all: "",
  lg: "md:w-[80vh] md:mt-8 m-auto",
  md: "md:w-[50vh] md:mt-8 m-auto",
};

export function Container({
  title,
  childSpace = "all",
  children,
}: ContainerProps) {
  const childContainerStyles = clsx("", spaceStyles[childSpace]);

  return (
    <>
      <div className="py-10">
        <ContainerHeader title={title ?? "Page"} />
        <main>
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className={childContainerStyles}>{children}</div>
          </div>
        </main>
      </div>
    </>
  );
}

function ContainerHeader({ title }: { title: string }) {
  return (
    <>
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {title}
          </h1>
        </div>
      </header>
    </>
  );
}
