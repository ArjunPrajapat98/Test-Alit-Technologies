import React, { useEffect } from "react";

export const InputField = (props) => {
  const {
    type = "text",
    name,
    error,
    label,
    focus,
    labelClass,
    error_class = "",
    onChange,
    value,
    disabled = false,
    placeholder = '',
    className = "",
    max = 1000,
    onInput = () => {},
    maxLength = 1000,
  } = props;
  const invalid = !!(focus && error);
  const valid = !!Boolean(focus && !error);

  useEffect(() => {
    const inputFields = document.querySelectorAll("input");
    inputFields.forEach((input) => {
      input.setAttribute("autocomplete", "off");
    });
  }, []);

  return (
    <>
      <div className="relative">
        <label> {label} </label>
        <div>
          <input
            disabled={disabled}
            autoComplete="off"
            name={name}
            type={type}
            id={name}
            className={"form-control" + className}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            max={max}
            maxLength={maxLength}
            onInput={onInput}
          />
        </div>
        {error && (
          <p className={error_class + "input_drop_error"}>
            {error}
          </p>
        )}
      </div>
    </>
  );
};