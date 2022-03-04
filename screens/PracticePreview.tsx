import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BlueButton from "../components/BlueButton";
import BlueRingView from "../components/BlueRingView";
import CircularProgress from "../components/CircularProgress";
import OrangeButton from "../components/OrangeButton";
import Text from "../components/Text";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import { RootStackScreenProps } from "../types/navigation";

export default function PracticePreviewScreen({
  navigation,
  route,
}: RootStackScreenProps<"PracticePreview">) {
  const topic = route.params.topic;

  const insets = useSafeAreaInsets();

  const handleStartPress = () => {
    navigation.navigate("PracticeQuestion", {
      topic,
    });
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 60 }]}>
      <BlueRingView borderRadius={20} ringWidth={4}>
        <View style={styles.innerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Discipline</Text>
            <CircularProgress
              progress={90}
              backgroundColor={Colors.greengrey}
            />
          </View>
          <Text style={styles.content}>
            Discipline, rather than punishment, allows us to validate our kids'
            feelings, set clear expectations, and teach them how to make healthy
            decisions on their own.
          </Text>
          <Text style={styles.source}>Source: Verywell Family</Text>
        </View>
      </BlueRingView>
      <View style={styles.info}>
        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <MaterialCommunityIcons name="head-question" size={30} />
          </View>
          <Text style={styles.infoNumber}>15</Text>
          <Text>multiple choice questions</Text>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoIcon}>
            <MaterialCommunityIcons name="timer" size={30} />
          </View>
          <Text style={styles.infoNumber}>30</Text>
          <Text style={{ flex: 1 }}>min estimate</Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <OrangeButton
          style={styles.button}
          textContainerStyle={styles.buttonTextContainer}
          ring
          shadow
          onPress={handleStartPress}
        >
          Resume Practice
        </OrangeButton>
        <BlueButton
          shadow
          style={styles.button}
          textContainerStyle={styles.buttonTextContainer}
        >
          View Questions
        </BlueButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightblue,
    padding: 20,
  },
  innerContainer: {
    padding: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "semibold",
    fontSize: FontSize.title,
  },
  content: {
    marginVertical: 15,
  },
  source: {
    fontFamily: "italic",
    fontSize: FontSize.caption,
  },
  info: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  infoIcon: {
    backgroundColor: Colors.lightgreen,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  infoNumber: {
    color: Colors.orange,
    fontSize: FontSize.title,
    marginLeft: 12,
    width: 40,
  },
  buttons: {
    marginTop: "auto",
  },
  button: {
    marginTop: 15,
  },
  buttonTextContainer: {
    height: 54,
  },
});
