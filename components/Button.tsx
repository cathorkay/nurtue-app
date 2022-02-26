import { StyleSheet, ViewProps } from "react-native";

import BlueBorderView from "./BlueBorderView";
import BlueView from "./BlueView";
import Text from "./Text";

export interface ButtonProps extends ViewProps {
  selected?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  style,
  children,
  selected,
  ...restProps
}) => {
  return selected ? (
    <BlueView
      containerStyle={[styles.blueViewContainer, style]}
      style={styles.blueView}
    >
      <Text style={selected && { color: "white", fontFamily: "semibold" }}>
        {children}
      </Text>
    </BlueView>
  ) : (
    <BlueBorderView
      containerStyle={style}
      style={styles.blueBorderView}
      innerContainerStyle={styles.blueBorderViewInnerContainer}
    >
      <Text>{children}</Text>
    </BlueBorderView>
  );
};

const styles = StyleSheet.create({
  blueViewContainer: {
    borderRadius: 20,
    overflow: "hidden",
  },
  blueView: {
    padding: 10,
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
    padding: 4,
    overflow: "hidden",
  },
  blueBorderViewInnerContainer: {
    padding: 6,
    borderRadius: 50,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Button;
