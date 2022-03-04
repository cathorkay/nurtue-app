import { StyleSheet } from "react-native";

import BlueButton from "./BlueButton";
import Dialog, { DialogProps } from "./Dialog";
import OrangeButton from "./OrangeButton";
import Text from "./Text";

export type PracticeDialogProps = Omit<
  DialogProps & {
    primaryText: string;
    secondaryText: string;
    finish?: boolean;
  },
  "title"
>;

const PracticeDialog: React.FC<PracticeDialogProps> = ({
  type,
  primaryText,
  secondaryText,
  finish,
  ...restProps
}) => {
  return (
    <Dialog
      {...restProps}
      type={type}
      title={type === "success" ? "Nice Job!" : "Let's Reconsider."}
    >
      <Text style={styles.primary}>{primaryText}</Text>
      <Text style={styles.secondary}>{secondaryText}</Text>
      {type === "failure" ? (
        <OrangeButton style={styles.button}>Try Again</OrangeButton>
      ) : (
        <BlueButton style={styles.button} selected>
          {finish ? "Finish" : "Continue"}
        </BlueButton>
      )}
    </Dialog>
  );
};

const styles = StyleSheet.create({
  primary: {
    fontFamily: "semibold",
  },
  secondary: {
    marginTop: 8,
  },
  button: {
    marginTop: 15,
  },
});

export default PracticeDialog;
