import { Text as RNText, TextProps, StyleSheet } from "react-native";

import FontSize from "../constants/FontSize";
import colors from '../constants/Colors';

const Text: React.FC<TextProps> = ({ style, ...restProps }) => {
  return <RNText style={[styles.text, style]} {...restProps} />;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "semibold",
    fontSize: FontSize.caption,
    color: colors.grey,
  },
});

export default Text;
