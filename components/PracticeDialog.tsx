import { StyleSheet } from "react-native";

import Button from "./Button";
import Dialog, { DialogProps } from "./Dialog";
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
      <Button alert={type === "failure"} selected style={styles.button}>
        {finish ? "Finish" : type === "failure" ? "Try Again" : "Continue"}
      </Button>
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
