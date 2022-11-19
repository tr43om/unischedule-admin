import React, { InputHTMLAttributes } from "react";
import { TextField, Box, FormHelperText } from "@mui/material";

// react-hook-form
import {
  UseControllerProps,
  FieldValues,
  useController,
  Path,
} from "react-hook-form";

const FormInput = <TFormValues extends FieldValues>(
  props: FormInputProps<TFormValues>
) => {
  const {
    field: { onChange, value },
    formState: { errors },
  } = useController(props);

  const errorMessage = errors[props.name]?.message?.toString();

  return (
    <Box>
      <TextField
        id={props.name}
        placeholder={props.placeholder || "Type a new value..."}
        onChange={(e: React.ChangeEvent) => onChange(e)}
        value={value}
        type={props.type}
      />
      {errors[props.name]?.message && (
        <FormHelperText>{errorMessage}</FormHelperText>
      )}
    </Box>
  );
};

interface FormInputProps<TFormValues extends FieldValues>
  extends UseControllerProps<TFormValues>,
    Omit<InputHTMLAttributes<HTMLInputElement>, "defaultValue"> {
  name: Path<TFormValues>;
}

export default FormInput;
