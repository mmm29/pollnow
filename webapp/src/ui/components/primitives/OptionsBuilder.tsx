import { TextInput } from "./TextInput";
import * as Headless from "@headlessui/react";
import clsx from "clsx";
import { useState } from "react";

export type PollOption = {
  text: string;
};

type OptionProps = {
  option: PollOption;
  onUpdate?: (value: string) => void;
  onDelete?: VoidFunction;
};

export function OptionButton({
  children,
  ...rest
}: React.ComponentPropsWithoutRef<"button">) {
  const mergedClassName = clsx(
    "py-0 px-3 font-semibold rounded-md relative isolate inline-flex items-center justify-center gap-x-2",
    "text-sm/6 text-gray-900 bg-gray-200/50 hover:bg-gray-300/50"
  );

  return (
    <Headless.Button className={mergedClassName} {...rest}>
      {children}
    </Headless.Button>
  );
}

function Option({ option, onUpdate, onDelete }: OptionProps) {
  // TODO: fix UI
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(option.text);

  function handleUpdate() {
    setValue(option.text);
    onUpdate?.(value);
    setEditing(false);
  }

  function handleCancel() {
    setValue(option.text);
    setEditing(false);
  }

  function handleEdit() {
    setEditing(true);
  }

  return (
    <div className="flex">
      {editing ? (
        <>
          <TextInput
            value={value}
            onChange={(value) => setValue(value)}
          ></TextInput>
          <div className="ml-2">
            <OptionButton onClick={handleUpdate}>Save</OptionButton>
          </div>
          <div className="ml-2">
            <OptionButton onClick={handleCancel}>Cancel</OptionButton>
          </div>
        </>
      ) : (
        <>
          <span className="text-sm w-full">{option.text}</span>
          <div className="ml-2">
            <OptionButton onClick={handleEdit}>Edit</OptionButton>
          </div>
          <div className="ml-2">
            <OptionButton onClick={onDelete}>Delete</OptionButton>
          </div>
        </>
      )}
    </div>
  );
}

type OptionsBuilderProps = {
  options: PollOption[];
  onOptionAdd?: VoidFunction;
  onDelete?: (idx: number) => void;
  onUpdate?: (idx: number, value: string) => void;
};

export function OptionsBuilder({
  options,
  onOptionAdd,
  onDelete,
  onUpdate,
}: OptionsBuilderProps) {
  return (
    <div className="mt-2">
      <div className="w-full grid gap-y-2">
        {options.map((option, idx) => (
          <div>
            <Option
              key={option.text}
              option={option}
              onUpdate={(value) => onUpdate?.(idx, value)}
              onDelete={() => onDelete?.(idx)}
            />
          </div>
        ))}
      </div>
      <div className="w-full flex justify-end mt-2">
        <OptionButton onClick={onOptionAdd}>Add</OptionButton>
      </div>
    </div>
  );
}
