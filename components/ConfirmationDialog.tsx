import { StyleSheet, View } from "react-native";

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
        <Button style={styles.button} onPress={onOk}>
          Ok
        </Button>
        <Button alert selected onPress={onCancel}>
          Cancel
        </Button>
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
});

export default ConfirmationDialog;
