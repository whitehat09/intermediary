import { ErrorMessage, Field } from "formik";
import { Box, TextField } from "@material-ui/core";

interface IProps {
  fieldName: string;
  fullWidth?: boolean;
  required?: boolean;
  label: string;
}

export const TextFieldComponent = ({
  fieldName,
  fullWidth,
  required,
  label,
}: IProps) => {
  return (
    <>
      <ErrorMessage
        name={fieldName}
        render={(message) => <Box style={{ color: "red" }}>{message}</Box>}
      />
      <Field
        as={TextField}
        label={label}
        placeholder={`Nhập ${label}`}
        name={fieldName}
        fullWidth={fullWidth}
        required={required}
      />
    </>
  );
};
