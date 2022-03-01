import { StyleSheet, View } from "react-native";
import BlueButton from "./BlueButton";

import Button from "./Button";
import Dialog, { DialogProps } from "./Dialog";
import Text from "./Text";

export type ConfirmationDialogProps = Omit<
  DialogProps & {
    text: string;
    onCancel?: () => void;
    onOk?: () => void;
  },
  "type"
>;

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  text,
  onOk,
  onCancel,
  ...restProps
}) => {
  return (
    <Dialog {...restProps} type="success">
      <Text style={styles.text}>{text}</Text>
      <View style={styles.buttons}>
        <BlueButton
          style={styles.button}
          textStyle={styles.buttonText}
          onPress={onOk}
        >
          Ok
        </BlueButton>
        <BlueButton textStyle={styles.buttonText} selected onPress={onCancel}>
          Cancel
        </BlueButton>
      </View>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  text: {
    marginVertical: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 15,
  },
  button: {
    marginRight: 15,
  },
  buttonText: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: 90,
  },
});

export default ConfirmationDialog;
