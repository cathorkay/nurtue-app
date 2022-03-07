import { NativeModules, StyleSheet, View } from "react-native";

import TextButton from "../components/TextButton";
import { persistor } from "../data/store";
import { ProfileStackScreenProps } from "../types/navigation";

const ProfileScreen: React.FC<ProfileStackScreenProps<"Profile">> = () => {
  const handleReset = async () => {
    await persistor.purge();
    persistor.persist();
    NativeModules.DevSettings.reload();
  };

  return (
    <View style={styles.container}>
      <TextButton onPress={handleReset}>Reset App</TextButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default ProfileScreen;
