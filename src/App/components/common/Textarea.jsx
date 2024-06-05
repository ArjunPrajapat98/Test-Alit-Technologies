import React from "react";

const TextArea = (props) => {
  const {
    name,
    error,
    label,
    focus,
    error_class = "",
    onChange,
    value,
    disabled = false,
    max = 1000,
    placeholder = "",
    className = "",
  } = props;
  const invalid = !!(focus && error);
  const valid = !!Boolean(focus && !error);

  return (
    <>
      <div>
        <div>
          <textarea
            disabled={disabled}
            autoComplete="off"
            name={name}
            id={name}
            rows="3"
            class="form-control"
            placeholder={placeholder ? placeholder : label}
            onChange={onChange}
            value={value}
            maxLength={max}
          />
        </div>
        {error && (
          <p className="input_drop_error">
            {error}
          </p>
        )}
      </div>
    </>
  );
};

export default TextArea;
