import { useMemo } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { IFormTextField } from '../../types/formTextField-types';

const FormTextField: React.FC<IFormTextField> = ({
  label,
  error,
  name,
  value,
  onChange,
  required = true,
  type,
  placeholder = ' ',
  title,
  pattern,
  minLength = 3,
  maxLength = 40,
  helper,
}) => {
  const id = useMemo(() => nanoid(), []);
  return (
    <div className="relative  mb-[12px]">
      <input
        className="input"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        type={type}
        title={title}
        pattern={pattern}
        minLength={minLength}
        maxLength={maxLength}
      />
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <span className="error">{error}</span>
      <span className="helper">{helper}</span>
    </div>
  );
};

export default FormTextField;
