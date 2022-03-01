import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BlueBorderView from "../components/BlueBorderView";
import Button from "../components/Button";
import ConfirmationDialog from "../components/ConfirmationDialog";
import IconButton from "../components/IconButton";
import Text from "../components/Text";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import { RootStackScreenProps } from "../types/navigation";

export default function PracticeQuestionScreen({
  navigation,
  route,
}: RootStackScreenProps<"PracticeQuestion">) {
  const insets = useSafeAreaInsets();

  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const handleExit = () => {
    setConfirmationVisible(true);
  };

  const handleConfirmationCancel = () => {
    setConfirmationVisible(false);
  };

  const handleConfirmationOk = () => {
    setConfirmationVisible(false);
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          style={{
            marginLeft: 10,
          }}
          name="close"
          size={30}
          color={Colors.bluegreen}
          onPress={handleExit}
        />
      ),
    });
  }, []);

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 60 }]}>
      <BlueBorderView>
        <Text style={styles.question}>
          Your kids are fighting over a toy. What should you say?
        </Text>
        <Text style={styles.source}>Source: Verywell Family</Text>
      </BlueBorderView>
      <View style={styles.buttons}>
        <Button style={styles.button}>
          “If you don't stop fighting right now, no one gets the toy!”
        </Button>
        <Button style={styles.button}>
          “If you don't stop fighting right now, no one gets the toy!”
        </Button>
        <Button style={styles.button}>
          “If you don't stop fighting right now, no one gets the toy!”
        </Button>
        <Button style={styles.button}>
          “If you don't stop fighting right now, no one gets the toy!”
        </Button>
      </View>
      <ConfirmationDialog
        isVisible={confirmationVisible}
        title="Exit"
        text="Do you want to exit the practice? All progress will be lost."
        onCancel={handleConfirmationCancel}
        onOk={handleConfirmationOk}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightblue,
    padding: 20,
  },
  question: {
    fontFamily: "semibold",
    fontSize: FontSize.header,
  },
  source: {
    marginTop: 20,
    fontFamily: "italic",
    fontSize: FontSize.caption,
  },
  buttons: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    marginVertical: 10,
    shadowOpacity: 0,
  },
});
