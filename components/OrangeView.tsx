import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, ViewProps } from "react-native";

const OrangeView: React.FC<ViewProps> = ({ children, ...restProps }) => {
  return (
    <View {...restProps}>
      <LinearGradient
        style={styles.container}
        start={[0, 0]}
        end={[1, 0]}
        colors={["#FF6954", "#F58D7F", "#FFA37B", "#FF6954"]}
      >
        {children}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.45)",
  },
});

export default OrangeView;
