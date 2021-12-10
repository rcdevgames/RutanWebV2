import { Form } from "antd";
const FormItem = Form.Item;

export const makeField =
  (Component, props) =>
  ({ style, input, meta, children, hasFeedback, label, ...rest }) => {
    const hasError = meta.touched && meta.invalid;
    return (
      <FormItem
        validateStatus={hasError ? "error" : "success"}
        hasFeedback={hasFeedback && hasError}
        help={hasError && meta.error}
      >
        <Component {...props} {...input} {...rest} children={children} />
      </FormItem>
    );
  };
