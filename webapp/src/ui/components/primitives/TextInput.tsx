import { Description, Field, Input, Label, Textarea } from "@headlessui/react";
import clsx from "clsx";
import { ChangeEvent } from "react";

type InputChangeHandler = (value: string) => void;

type TextInputProps = {
  name: string;
  description?: string;
  placeholder?: string;
  value?: string;
  textarea?: boolean;
  onChange?: InputChangeHandler;
};

const STYLES = clsx(
  "mt-2 mb-2 block w-full min-w-0 grow py-1.5 px-3 text-gray-900 placeholder:text-gray-400 sm:text-sm/6",
  "rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
);

export function TextInput({
  name,
  description,
  placeholder,
  value,
  textarea,
  onChange,
}: TextInputProps) {
  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { value } = e.target;
    if (onChange) {
      onChange(value);
    }
  }

  return (
    <Field>
      <Label className="text-sm/6 font-medium text-gray-900">{name}</Label>
      {description && (
        <Description className="text-sm/6 text-gray-500">
          {description}
        </Description>
      )}
      {textarea ? (
        <Textarea
          className={STYLES}
          placeholder={placeholder}
          value={value}
          rows={3}
          onChange={handleChange}
        />
      ) : (
        <Input
          className={STYLES}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      )}
    </Field>
  );
}
