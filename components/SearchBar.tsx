import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View, ViewProps } from "react-native";

import Colors from "../constants/Colors";
import Text from "./Text";

const SearchBar: React.FC<ViewProps> = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      <MaterialIcons name="search" color={Colors.bluegreen} size={16} />
      <Text style={styles.text}>Search</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 83, 95, 0.1)",
    borderRadius: 100,
    padding: 10,
  },
  text: {
    fontFamily: "light",
    fontSize: 12,
    color: Colors.bluegreen,
    marginLeft: 5,
  },
});

export default SearchBar;
