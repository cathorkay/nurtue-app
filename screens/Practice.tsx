import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import BlueBorderView from "../components/BlueBorderView";
import Button from "../components/Button";
import PracticeDialog from "../components/PracticeDialog";
import Text from "../components/Text";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import { TabScreenProps } from "../types/navigation";

export default function PracticeScreen({
  navigation,
}: TabScreenProps<"Practice">) {
  const tabBarHeight = useBottomTabBarHeight();

  const handlePracticePress = () => {
    navigation.navigate("PracticePreview", { topic: "Discipline" });
  };

  const renderPracticeListItem = () => (
    <TouchableOpacity activeOpacity={0.6} onPress={handlePracticePress}>
      <LinearGradient
        style={styles.listItem}
        start={[0, 0]}
        end={[1, 1]}
        colors={["#82E4FA", "#CDF1FF"]}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <AnimatedCircularProgress
            size={65}
            width={8}
            backgroundWidth={4}
            fill={30}
            tintColor="#FFA37B"
            tintColorSecondary="#FF6954"
            backgroundColor="white"
            rotation={180}
            lineCap="round"
          />
          <View
            style={{
              position: "absolute",
              flexDirection: "row",
            }}
          >
            <Text style={{ fontFamily: "semibold" }}>30</Text>
            <Text style={{ fontSize: FontSize.caption, marginTop: 2 }}>%</Text>
          </View>
        </View>
        <Text style={styles.listItemText}>Discipline</Text>
        <MaterialCommunityIcons
          name="arrow-right"
          size={30}
          color={Colors.darkgreen}
        />
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <>
      <FlatList
        style={styles.container}
        contentContainerStyle={{
          marginTop: 25,
          paddingBottom: tabBarHeight + 70,
        }}
        data={[{ id: "1" }, { id: "2" }]}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <BlueBorderView>
              <Text style={styles.questionTitle}>Question of the Day</Text>
              <View style={styles.divider} />
              <Text style={styles.questionText}>
                Your child is crying after getting a shot at the doctor's
                office. What should you say?
              </Text>
              <Button style={styles.questionButton}>
                “This is nothing. When I was a kid, I had surgery!”
              </Button>
              <Button style={styles.questionButton}>
                “This is nothing. When I was a kid, I had surgery!”
              </Button>
              <Button selected style={styles.questionButton}>
                “This is nothing. When I was a kid, I had surgery!”
              </Button>
              <Button style={styles.questionButton}>
                “This is nothing. When I was a kid, I had surgery!”
              </Button>
              <Text style={styles.questionSource}>
                Source: Curious Parenting
              </Text>
            </BlueBorderView>
            <View style={styles.segments}>
              <Segment selected text="All" />
              <Segment text="Practicing" />
              <Segment text="Completed" />
            </View>
          </>
        }
        renderItem={renderPracticeListItem}
      />
      <PracticeDialog
        isVisible={false}
        type="success"
        primaryText="“I know it hurts. I'm here with you. You are safe.”"
        secondaryText="When we say this, kids learn they don't have to hide their true feelings."
      />
      <PracticeDialog
        isVisible={false}
        type="failure"
        primaryText="“I know it hurts. I'm here with you. You are safe.”"
        secondaryText="When we say this, kids learn they don't have to hide their true feelings."
      />
    </>
  );
}

const Segment: React.FC<{ selected?: boolean; text: string }> = ({
  selected,
  text,
}) => (
  <TouchableOpacity
    style={{
      alignItems: "center",
      width: "30%",
    }}
    activeOpacity={0.6}
    onPress={() => {}}
  >
    <Text
      style={[
        styles.segmentText,
        { color: selected ? Colors.orange : Colors.grey },
      ]}
    >
      {text}
    </Text>
    <View
      style={[
        styles.segmentDivider,
        { backgroundColor: selected ? Colors.orange : Colors.grey },
      ]}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightblue,
    padding: 20,
    marginTop: -25,
  },
  questionTitle: {
    fontFamily: "semibold",
    fontSize: FontSize.header,
    color: Colors.darkgreen,
    alignSelf: "center",
  },
  divider: {
    width: "100%",
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.lightgreen,
    alignSelf: "center",
    marginVertical: 15,
  },
  questionText: {
    fontFamily: "semibold",
    fontSize: FontSize.emphasis,
  },
  questionButton: {
    marginTop: 20,
    shadowOpacity: 0,
  },
  questionSource: {
    fontFamily: "italic",
    fontSize: FontSize.caption,
    marginTop: 20,
  },
  segmentText: {
    fontFamily: "semibold",
  },
  segmentDivider: {
    width: "100%",
    height: 3,
    borderRadius: 1.5,
    marginTop: 4,
  },
  segments: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 5,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 25,
    marginTop: 15,
  },
  listItemText: {
    flex: 1,
    fontFamily: "semibold",
    fontSize: FontSize.emphasis,
    color: Colors.darkgreen,
    marginLeft: 15,
  },
});
