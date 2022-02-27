import { LinearGradient } from "expo-linear-gradient";
import { View, ViewProps } from "react-native";

export interface BlueViewProps extends ViewProps {
  containerStyle?: ViewProps["style"];
  orange?: boolean;
}

const BlueView: React.FC<BlueViewProps> = ({
  containerStyle,
  style,
  children,
  orange,
  ...restProps
}) => {
  return (
    <View style={containerStyle} {...restProps}>
      <LinearGradient
        style={[{ justifyContent: "center" }, style]}
        start={[0, 0]}
        end={[1, 0]}
        colors={orange ? ["#FF6954", "#FFA37B"] : ["#61D3D1", "#5EC1E8"]}
      >
        {children}
      </LinearGradient>
    </View>
  );
};

export default BlueView;
