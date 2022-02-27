import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import BlueBorderView from "./BlueBorderView";
import BlueView from "./BlueView";
import Text from "./Text";

export interface ButtonProps extends TouchableOpacityProps {
  selected?: boolean;
  alert?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  style,
  children,
  selected,
  alert,
  onPress,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      {selected ? (
        <BlueView
          containerStyle={[styles.blueViewContainer, style]}
          style={styles.blueView}
          orange={alert}
        >
          <Text
            style={[
              styles.text,
              selected && { color: "white", fontFamily: "semibold" },
            ]}
          >
            {children}
          </Text>
        </BlueView>
      ) : (
        <BlueBorderView
          containerStyle={style}
          style={styles.blueBorderView}
          innerContainerStyle={styles.blueBorderViewInnerContainer}
        >
          <Text style={styles.text}>{children}</Text>
        </BlueBorderView>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  blueViewContainer: {
    borderRadius: 20,
    overflow: "hidden",
  },
  blueView: {
    padding: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  blueBorderViewContainer: {
    shadowRadius: 0,
    shadowOpacity: 0,
    borderRadius: 20,
    padding: 10,
    overflow: "hidden",
  },
  blueBorderView: {
    borderRadius: 20,
    padding: 3,
    overflow: "hidden",
  },
  blueBorderViewInnerContainer: {
    padding: 6,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default Button;
