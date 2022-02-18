import { StyleSheet, View } from "react-native";

import Colors from "../constants/Colors";
import { TabScreenProps } from "../types";

export default function PracticeScreen({
  navigation,
}: TabScreenProps<"Practice">) {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.lightblue,
  },
});
