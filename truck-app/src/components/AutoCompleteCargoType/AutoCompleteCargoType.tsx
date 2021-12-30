import { Box } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { ErrorMessage } from "formik";
import * as React from "react";
interface IProps {
  data: any;
  fieldName: string;
  fullWidth?: boolean;
  required?: boolean;
  label: string;
}
export const AutoCompleteCargoType = ({
  data,
  fieldName,
  fullWidth,
  required,
  label,
}: IProps) => {
  const defaultProps = {
    options: data,
    getOptionLabel: (option: any) => option?.cargoType,
  };
  const flatProps = {
    options: data?.map((option: any) => option?.cargoType),
  };


  return (
    <Stack spacing={1} sx={{ width: 300 }}>
        <ErrorMessage
                  name={fieldName}
                  render={(message) => (
                    <Box style={{ color: "red" }}>{message}</Box>
                  )}
                />
      <Autocomplete
        {...defaultProps}
        id="clear-on-escape"
        clearOnEscape
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={`Nhập ${label}`}
            name={fieldName}
            fullWidth={fullWidth}
            required={required}
            variant="standard"
          />
        )}
      />
    </Stack>
  );
};
