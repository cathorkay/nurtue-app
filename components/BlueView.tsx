import { LinearGradient } from "expo-linear-gradient";
import { View, ViewProps } from "react-native";

export interface BlueViewProps extends ViewProps {
  containerStyle?: ViewProps["style"];
}

const BlueView: React.FC<BlueViewProps> = ({
  containerStyle,
  style,
  children,
  ...restProps
}) => {
  return (
    <View style={containerStyle} {...restProps}>
      <LinearGradient
        style={style}
        start={[0, 0]}
        end={[1, 0]}
        colors={["#61D3D1", "#5EC1E8"]}
      >
        {children}
      </LinearGradient>
    </View>
  );
};

export default BlueView;
