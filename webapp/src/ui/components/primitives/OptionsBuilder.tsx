import { ReactNode, useState } from "react";
import { Button } from "./Button";
import { TextInput } from "./TextInput";
import * as Headless from "@headlessui/react";
import clsx from "clsx";

export type PollOption = {
  text: string;
};

type OptionProps = {
  editing: boolean;
  option: PollOption;
  onEdit?: VoidFunction;
  onUpdate?: (value: string) => void;
  onDelete?: VoidFunction;
  onCancel?: VoidFunction;
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

function Option({
  editing,
  option,
  onEdit,
  onUpdate,
  onDelete,
  onCancel,
}: OptionProps) {
  // TODO: fix UI
  const [value, setValue] = useState(option.text);

  function handleUpdate() {
    setValue(option.text);
    if (onUpdate) {
      onUpdate(value);
    }
  }

  function handleCancel() {
    setValue(option.text);
    if (onCancel) {
      onCancel();
    }
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
            <OptionButton onClick={onEdit}>Edit</OptionButton>
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
  const [editing, setEditing] = useState<string | null>(null);
  const editingIdx = options.findIndex((opt) => opt.text == editing) ?? null;

  function handleUpdate(idx: number, value: string) {
    setEditing(null);

    if (onUpdate) {
      onUpdate(idx, value);
    }
  }

  function handleDelete(idx: number) {
    if (onDelete) {
      onDelete(idx);
    }
  }

  return (
    <div className="mt-2">
      <div className="w-full grid gap-y-4">
        {options.map((option, idx) => (
          <div>
            <Option
              key={option.text}
              editing={idx == editingIdx}
              option={option}
              onEdit={() => setEditing(option.text)}
              onUpdate={(value) => handleUpdate(idx, value)}
              onCancel={() => setEditing(null)}
              onDelete={() => handleDelete(idx)}
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
