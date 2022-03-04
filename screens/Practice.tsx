import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

import BlueButton from "../components/BlueButton";
import BlueRingView from "../components/BlueRingView";
import CircularProgress from "../components/CircularProgress";
import PracticeDialog from "../components/PracticeDialog";
import SearchBar from "../components/SearchBar";
import Text from "../components/Text";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import { TabScreenProps } from "../types/navigation";

export default function PracticeScreen({
  navigation,
}: TabScreenProps<"Practice">) {
  const tabBarHeight = useBottomTabBarHeight();

  const handleSearchBarPress = () => {
    navigation.navigate("SearchStack", {
      screen: "Search",
      params: { type: "agreements" },
    } as any);
  };

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
        <CircularProgress progress={30} />
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
          paddingBottom: tabBarHeight + 65,
        }}
        data={[{ id: "1" }, { id: "2" }]}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <BlueRingView borderRadius={20} ringWidth={4}>
              <View style={styles.innerContainer}>
                <Text style={styles.questionTitle}>Question of the Day</Text>
                <View style={styles.divider} />
                <Text style={styles.questionText}>
                  Your child is crying after getting a shot at the doctor's
                  office. What should you say?
                </Text>
                <BlueButton
                  style={styles.questionButton}
                  textStyle={styles.questionButtonText}
                >
                  “This is nothing. When I was a kid, I had surgery!”
                </BlueButton>
                <BlueButton
                  style={styles.questionButton}
                  textStyle={styles.questionButtonText}
                >
                  “This is nothing”
                </BlueButton>
                <BlueButton
                  selected
                  style={styles.questionButton}
                  textStyle={styles.questionButtonText}
                >
                  “This is nothing”
                </BlueButton>
                <BlueButton
                  style={styles.questionButton}
                  textStyle={styles.questionButtonText}
                >
                  “This is nothing”
                </BlueButton>
                <Text style={styles.questionSource}>
                  Source: Curious Parenting
                </Text>
              </View>
            </BlueRingView>
            <SearchBar
              style={styles.searchBar}
              inputDisabled
              onPress={handleSearchBarPress}
            />
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
  innerContainer: {
    padding: 15,
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
    marginVertical: 10,
  },
  questionText: {
    fontFamily: "semibold",
    fontSize: FontSize.emphasis,
    marginVertical: 5,
  },
  questionButton: {
    marginTop: 10,
  },
  questionButtonText: {
    fontSize: FontSize.caption,
  },
  questionSource: {
    fontFamily: "italic",
    fontSize: FontSize.caption,
    marginTop: 15,
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
  searchBar: {
    marginTop: 15,
    marginBottom: 0,
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
