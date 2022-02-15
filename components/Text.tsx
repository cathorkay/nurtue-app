import { Text as RNText, TextProps, StyleSheet } from "react-native";

const Text: React.FC<TextProps> = ({ style, ...restProps }) => {
  return <RNText style={[styles.text, style]} {...restProps} />;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "regular",
  },
});

export default Text;
