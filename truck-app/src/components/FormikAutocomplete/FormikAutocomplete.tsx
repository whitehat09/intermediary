import { Box, FormControl } from "@material-ui/core";
import { ErrorMessage } from "formik";
import Select from "react-select";
interface IProps {
  options: any;
  field: any;
  form: any;
  Multi: boolean;
  label: string;
}
export const FormikAutocomplete = ({
  options,
  field,
  form,
  Multi,
  label,
}: IProps) => {
  return (
    <>
      <FormControl fullWidth>
        <label style={{ margin: "10px 0", color: "#757590" }} htmlFor="Select">
          {label}
        </label>
        <ErrorMessage
          name={field.name}
          render={(message) => <Box style={{ color: "red" }}>{message}</Box>}
        />
        <Select
          id="Select"
          // defaultValue={[colourOptions[2], colourOptions[3]]}
          defaultValue
          isMulti={Multi}
          options={options}
          placeholder={`Nhập ${label}`}
          value={
            options
              ? options.find((option: any) => option.value === field.value)
              : ""
          }
          onChange={(value: any) => {
            if (Multi) {
              form.setFieldValue(
                field.name,
                value.map((item: any) => item.value)
              );
            } else {
              form.setFieldValue(field.name, value.value);
            }
          }}
        />
      </FormControl>
    </>
  );
};
