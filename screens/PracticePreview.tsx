import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BlueBorderView from "../components/BlueBorderView";
import OrangeView from "../components/OrangeView";
import Text from "../components/Text";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import { RootStackScreenProps } from "../types";

export default function PracticePreviewScreen({
  navigation,
  route,
}: RootStackScreenProps<"PracticePreview">) {
  const insets = useSafeAreaInsets();

  const handleStartPress = () => {
    navigation.navigate("PracticeQuestion");
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 60 }]}>
      <BlueBorderView>
        <Text style={styles.title}>Discipline</Text>
        <Text style={styles.content}>
          Discipline, rather than punishment, allows us to validate our kids'
          feelings, set clear expectations, and teach them how to make healthy
          decisions on their own.
        </Text>
        <Text style={styles.source}>Source: Verywell Family</Text>
      </BlueBorderView>
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
      <TouchableOpacity
        style={{ marginTop: "auto" }}
        activeOpacity={0.6}
        onPress={handleStartPress}
      >
        <OrangeView>
          <Text
            style={{
              fontFamily: "semibold",
              color: "white",
              textAlign: "center",
            }}
          >
            Start Practice
          </Text>
        </OrangeView>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightblue,
    padding: 20,
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
    marginTop: 30,
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
    marginLeft: 20,
    width: 45,
  },
});
