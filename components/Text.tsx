import { Text as RNText, TextProps, StyleSheet } from "react-native";

const Text: React.FC<TextProps> = (props) => {
  return <RNText style={styles.text} {...props} />;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins_600SemiBold",
  },
});

export default Text;
