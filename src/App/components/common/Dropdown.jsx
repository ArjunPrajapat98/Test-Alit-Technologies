import React from "react";
import Select from "react-select";

const Dropdown = (props) => {
  const {
    placeholder,
    options,
    selectedOption,
    setSelectedOption,
    valueText,
    labelText,
    error,
    focus,
    boxClass,
    className,
    classNamePrefix,
    isMulti = false,
    formatOptionLabel={},
    isClearable = false,
    isSearchable = false,
    hideIndicator = false,
  } = props;
  const invalid = !!(focus && error);
  const valid = !!(focus && !error);

  return (
    <div className='dropdown_select'>
      <Select
        formatOptionLabel={formatOptionLabel}
        components={hideIndicator ? { DropdownIndicator: () => null, IndicatorSeparator: () => null } : false}
        isMulti={isMulti}
        className={className + " " + 'selec_dropdown'}
        isClearable={isClearable}
        isSearchable={isSearchable}
        classNamePrefix={classNamePrefix}
        value={
          typeof selectedOption === "object"
            ? selectedOption
            : options?.find((item) => item[valueText] === selectedOption)
        }
        onChange={setSelectedOption}
        options={
          valueText === "value" && labelText === "label"
            ? options
            : options?.map((item) => ({
              value: item[valueText],
              label: item[labelText],
              data: item,
            }))
        }
        placeholder={placeholder}
      />
      {error && (
        <p className="input_drop_error">
          {error}
        </p>
      )}
    </div>
  );
};

export default Dropdown;
