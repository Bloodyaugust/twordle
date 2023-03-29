import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';

type Option = {
  value: string;
  id: string;
};

type Props = {
  name: string;
  onSelect?: (value: Option | undefined) => void;
  options: Option[];
  defaultValue?: Option;
  disabled?: boolean;
};

const SingleChoice = forwardRef(function SingleChoice({ defaultValue, disabled, name, onSelect, options }: Props, ref) {
  const [value, setValue] = useState<Option | undefined>(defaultValue);
  const [open, setOpen] = useState(false);

  const onValueClicked = useCallback(() => {
    if (!disabled) {
      setOpen(!open);
    }
  }, [open]);

  const onOptionClicked = useCallback((option: Option) => {
    setValue(option);
    setOpen(false);
  }, []);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (onSelect && !disabled) {
      onSelect(value);
    }
  }, [value]);

  useEffect(() => {
    if (disabled) {
      setOpen(false);
    }
  }, [disabled]);

  useImperativeHandle(
    ref,
    () => ({
      get value() {
        return value;
      },
    }),
    [value]
  );

  return (
    <div className="flex w-32 flex-col gap-1 bg-slate-700">
      <span
        onClick={onValueClicked}
        className={`flex justify-between p-2 hover:cursor-pointer ${
          !disabled && 'bg-slate-600 text-white hover:bg-slate-300'
        } ${disabled && 'bg-slate-900'}`}>
        <span>{value?.value || name}</span>
        {open && <span>&and;</span>}
        {!open && <span>&or;</span>}
      </span>
      {open &&
        !disabled &&
        options.map(option => (
          <span
            onClick={() => {
              onOptionClicked(option);
            }}
            className="bg-slate-600 p-2 text-white hover:cursor-pointer hover:bg-slate-300"
            key={option.id}>
            {option.value}
          </span>
        ))}
    </div>
  );
});

export default SingleChoice;
