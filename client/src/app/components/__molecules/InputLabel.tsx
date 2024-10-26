"use client";
import { TextField } from "@mui/material";
import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";

interface MuiInputLabel {
  labelName: string;
  name: string;
  id: string;
  value: any;
  touched: any;
  errors: any;
  onChange: React.ChangeEventHandler;
  onBlur: React.ChangeEventHandler;
  inputType: string;
  change?: boolean;
}

const MuiInputWithLabel = (props: MuiInputLabel) => {
  const {
    labelName,
    name,
    id,
    value,
    errors,
    touched,
    onChange,
    onBlur,
    inputType,
    change,
  } = props;

  const [isText, setIsText] = useState(true);

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor="" className="text-[#696868] text-lg font-[700]">
        {labelName}
      </label>
      <div className="relative">
        <TextField
          className={
            errors && touched
              ? "w-full border border-[#FF3939] rounded-[8px]  focus:outline-none focus:ring-1 focus:ring-[#633CFF] focus:shadow-inputFocus hover:shadow-inputFocus transition-shadow duration-200 ease-in-out"
              : "w-full border border-[#D9D9D9] rounded-[8px]  focus:outline-none focus:ring-1 focus:ring-[#633CFF] focus:shadow-inputFocus hover:shadow-inputFocus transition-shadow duration-200 ease-in-out"
          }
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          id={id}
          name={name}
          label=""
          variant="outlined"
          type={isText ? "text" : "password"}
        />

        {change && (
          <div
            className="absolute right-5 top-5"
            onClick={() => {
              setIsText(!isText);
            }}
          >
            <IoEyeSharp width={50} height={50} />
          </div>
        )}
      </div>
      {errors && touched && (
        <p className="text-[#FF3939] text-[16px] font-[400]">{errors}</p>
      )}
    </div>
  );
};

export default MuiInputWithLabel;
