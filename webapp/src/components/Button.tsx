import * as Headless from "@headlessui/react";

type OnButtonClick = () => void;

type ButtonProps = {
  text: string;
  onClick?: OnButtonClick;
};

export function Button({ text, onClick }: ButtonProps) {
  function handleClick() {
    if (onClick) {
      onClick();
    }
  }

  return (
    <Headless.Button
      className="rounded bg-sky-600 px-4 py-2 text-sm text-white data-active:bg-sky-700 data-hover:bg-sky-500"
      onClick={handleClick}
    >
      {text}
    </Headless.Button>
  );
}
