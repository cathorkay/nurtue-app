import {
  StyleSheet,
  TextProps,
  TouchableHighlight,
  TouchableHighlightProps,
} from "react-native";

import FontSize from "../constants/FontSize";
import BlueRingView from "./BlueRingView";
import BlueView from "./BlueView";
import Text from "./Text";
import Touchable from "./Touchable";

export interface BlueButtonProps extends TouchableHighlightProps {
  selected?: boolean;
  textStyle?: TextProps["style"];
  borderRadius?: number;
}

const BlueButton: React.FC<BlueButtonProps> = ({
  style,
  textStyle,
  children,
  selected,
  borderRadius,
  onPress,
}) => {
  const radius = borderRadius ?? 40;

  return (
    <Touchable
      style={[
        {
          borderRadius: radius,
        },
        style,
      ]}
      onPress={onPress}
    >
      {selected ? (
        <BlueView borderRadius={radius}>
          <Text
            style={[
              styles.text,
              { color: "white", padding: 14 + 4, fontFamily: "medium" },
              textStyle,
            ]}
          >
            {children}
          </Text>
        </BlueView>
      ) : (
        <BlueRingView borderRadius={radius}>
          <Text style={[styles.text, textStyle]}>{children}</Text>
        </BlueRingView>
      )}
    </Touchable>
  );
};

const styles = StyleSheet.create({
  text: {
    padding: 15,
    textAlign: "center",
  },
});

export default BlueButton;
