import React, { forwardRef, Ref } from 'react';

type Props = {
  disabled?: boolean;
  placeholder?: string;
  type?: string;
  id: string;
  maxLength?: number;
  onEnterUp?: () => void;
  uppercase?: boolean;
};

const Input = forwardRef(function Input(
  { disabled, placeholder, type, id, maxLength, onEnterUp, uppercase }: Props,
  ref: Ref<HTMLInputElement>
) {
  return (
    <input
      className={`p-2 text-black ${uppercase && 'uppercase'}`}
      disabled={disabled}
      placeholder={placeholder}
      ref={ref}
      type={type}
      id={id}
      maxLength={maxLength}
      onKeyUp={event => {
        if (onEnterUp && event.key === 'Enter') {
          onEnterUp();
        }
      }}
    />
  );
});

export default Input;
