import { Description, Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
import { ChangeEvent } from "react";

// TODO: display of errors

type InputChangeHandler = (value: string) => void;

type TextInputProps = {
  name: string;
  description?: string;
  placeholder?: string;
  value?: string;
  onChange?: InputChangeHandler;
};

export function TextInput({
  name,
  description,
  placeholder,
  value,
  onChange,
}: TextInputProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    if (onChange) {
      onChange(value);
    }
  }

  return (
    <div className="w-full max-w-md px-4">
      <Field>
        <Label className="text-sm/6 font-medium text-black">{name}</Label>
        {description && (
          <Description className="text-sm/6 text-black/50">
            {description}
          </Description>
        )}
        <Input
          className={clsx(
            "mt-3 block w-full rounded-lg bg-white/5 px-3 py-1.5 text-sm/6 text-black",
            "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25 shadow"
          )}
          value={value}
          onChange={handleChange}
        />
      </Field>
    </div>
  );
}
