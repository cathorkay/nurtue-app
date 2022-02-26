import { StyleSheet, View } from "react-native";

import Colors from "../constants/Colors";
import BlueView from "./BlueView";
import Text from "./Text";

export interface ChipProps {
  selected?: boolean;
}

const Chip: React.FC<ChipProps> = ({ children, selected }) => {
  const text = (
    <Text
      style={[
        styles.text,
        selected && { color: "white", fontFamily: "semibold" },
      ]}
    >
      {children}
    </Text>
  );

  return selected ? (
    <BlueView containerStyle={styles.gradientContainer} style={styles.gradient}>
      {text}
    </BlueView>
  ) : (
    <View style={styles.container}>{text}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: Colors.blue,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 8,
    marginVertical: 4,
  },
  gradientContainer: {
    borderRadius: 16,
    backgroundColor: Colors.blue,
    marginRight: 8,
    marginVertical: 4,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  text: {
    color: Colors.greengrey,
    fontSize: 12,
  },
});

export default Chip;
