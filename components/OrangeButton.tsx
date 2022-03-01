import {
  StyleSheet,
  TextProps,
  TouchableHighlight,
  TouchableHighlightProps,
} from "react-native";

import FontSize from "../constants/FontSize";
import OrangeRingView from "./OrangeRingView";
import OrangeView from "./OrangeView";
import Text from "./Text";
import Touchable from "./Touchable";

export interface OrangeButtonProps extends TouchableHighlightProps {
  ring?: boolean;
  textStyle?: TextProps["style"];
  borderRadius?: number;
  disabled?: boolean;
}

const OrangeButton: React.FC<OrangeButtonProps> = ({
  style,
  textStyle,
  children,
  ring,
  borderRadius,
  disabled,
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
        disabled && {
          opacity: 0.4,
        },
      ]}
      disabled={disabled}
      onPress={onPress}
    >
      {ring ? (
        <OrangeRingView borderRadius={radius}>
          <Text style={[styles.text, textStyle]}>{children}</Text>
        </OrangeRingView>
      ) : (
        <OrangeView borderRadius={radius}>
          <Text style={[styles.text, { padding: 14 + 4 }, textStyle]}>
            {children}
          </Text>
        </OrangeView>
      )}
    </Touchable>
  );
};

const styles = StyleSheet.create({
  text: {
    padding: 15,
    fontFamily: "medium",
    textAlign: "center",
    fontSize: FontSize.emphasis,
    color: "white",
  },
});

export default OrangeButton;
