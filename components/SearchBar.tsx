import { MaterialIcons } from "@expo/vector-icons";
import { useRef } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  TextInput as RNTextInput,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

import Colors from "../constants/Colors";
import Text from "./Text";
import TextInput from "./TextInput";

export interface SearchBarProps extends TouchableOpacityProps {
  inputDisabled?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  inputDisabled,
  style,
  onPress,
}) => {
  const textInputRef = useRef<RNTextInput>(null);

  const handlePress = (e: GestureResponderEvent) => {
    if (!inputDisabled) {
      textInputRef.current?.focus();
    } else {
      onPress?.(e);
    }
  };

  return (
    <TouchableOpacity
      style={style}
      activeOpacity={inputDisabled ? 0.6 : 1}
      onPress={handlePress}
    >
      <View style={styles.container}>
        <MaterialIcons name="search" color={Colors.bluegreen} size={16} />
        {inputDisabled ? (
          <Text style={styles.text}>Search</Text>
        ) : (
          <TextInput
            ref={textInputRef}
            style={styles.text}
            placeholderTextColor={Colors.greengrey}
            placeholder="Search"
          />
        )}
      </View>
    </TouchableOpacity>
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
    fontSize: 14,
    color: Colors.darkgreen,
    marginLeft: 5,
  },
});

export default SearchBar;
