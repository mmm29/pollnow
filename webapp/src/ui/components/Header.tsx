import clsx from "clsx";
import { Link } from "react-router-dom";
import { ThemeSelector } from "./ThemeSelector";

function Logomark(_props: React.ComponentPropsWithoutRef<"svg">) {
  return <></>;
}

function Logo(_props: React.ComponentPropsWithoutRef<"svg">) {
  return <></>;
}

function GitHubIcon(_props: React.ComponentPropsWithoutRef<"svg">) {
  return <></>;
}

export default function Header() {
  const isScrolled = false;

  return (
    <>
      <header
        className={clsx(
          "sticky top-0 z-50 flex flex-none flex-wrap items-center justify-between bg-white px-4 py-5 shadow-md shadow-slate-900/5 transition duration-500 sm:px-6 lg:px-8 dark:shadow-none",
          isScrolled
            ? "dark:bg-slate-900/95 dark:backdrop-blur-sm dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75"
            : "dark:bg-transparent"
        )}
      >
        {/* <div className="mr-6 flex">
          <MobileNavigation />
        </div> */}
        <div className="relative flex grow basis-0 items-center">
          <Link to="/" aria-label="Home page">
            <Logomark className="h-9 w-9 lg:hidden" />
            <Logo className="hidden h-9 w-auto fill-slate-700 lg:block dark:fill-sky-100" />
          </Link>
        </div>
        <div className="-my-5 mr-6 sm:mr-8 md:mr-0">{/* <Search /> */}</div>
        <div className="relative flex basis-0 justify-end gap-6 sm:gap-8 md:grow">
          <ThemeSelector className="relative z-10" />
          <Link to="https://github.com" className="group" aria-label="GitHub">
            <GitHubIcon className="h-6 w-6 fill-slate-400 group-hover:fill-slate-500 dark:group-hover:fill-slate-300" />
          </Link>
        </div>
      </header>
    </>
  );
}
