import { StyleSheet, View } from "react-native";

import Colors from "../constants/Colors";
import { RootTabScreenProps } from "../types";

export default function PracticeScreen({
  navigation,
}: RootTabScreenProps<"Practice">) {
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
