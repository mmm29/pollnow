import { ReactNode } from "react";

export type ContainerProps = {
  title?: string;
  children: ReactNode;
};

export function Container({ title, children }: ContainerProps) {
  return (
    <>
      <div className="py-10">
        <ContainerHeader title={title ?? "A"} />
        <main>
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
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
