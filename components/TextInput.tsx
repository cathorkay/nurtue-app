import { forwardRef } from "react";
import {
  TextInput as RNTextInput,
  TextInputProps,
  StyleSheet,
} from "react-native";

const TextInput: React.FC<
  TextInputProps & { innerRef: React.ForwardedRef<RNTextInput> }
> = ({ style, innerRef, ...restProps }) => {
  return (
    <RNTextInput ref={innerRef} style={[styles.text, style]} {...restProps} />
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "regular",
  },
});

export default forwardRef<RNTextInput, TextInputProps>((props, ref) => (
  <TextInput innerRef={ref} {...props} />
));
