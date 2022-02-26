import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, ViewProps, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";

export interface FloatingActionButtonProps extends ViewProps {
  onPress?: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  style,
  onPress,
  ...restProps
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[styles.container, style]}
      onPress={onPress}
      {...restProps}
    >
      <MaterialCommunityIcons name="plus" color="white" size={54} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: Colors.orange,
    shadowColor: Colors.bluegreen,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FloatingActionButton;
