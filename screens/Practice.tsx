import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useCallback, useMemo, useState } from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";

import BlueButton from "../components/BlueButton";
import BlueRingView from "../components/BlueRingView";
import Dialog from "../components/Dialog";
import PracticeCard from "../components/PracticeCard";
import PracticeDialog from "../components/PracticeDialog";
import SearchBar from "../components/SearchBar";
import Text from "../components/Text";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import { setQotdFinished } from "../data/practice";
import { useAppDispatch, useAppSelector } from "../data/store";
import { TabScreenProps } from "../types/navigation";
import { Practice } from "../types/state";

const extraTopics = [
  "Big Feelings",
  "Boundaries",
  "Praise",
  "Encouragement",
  "Sex Education",
  "Gender Inclusivity",
  "Self Care",
];

export default function PracticeScreen({
  navigation,
}: TabScreenProps<"Practice">) {
  const tabBarHeight = useBottomTabBarHeight();

  const dispatch = useAppDispatch();
  const questionOfTheDay = useAppSelector((state) => state.practiceState.qotd);
  const qotdFinished = useAppSelector(
    (state) => state.practiceState.qotdFinished
  );
  const practices = useAppSelector((state) => state.practiceState.practices);
  const progress = useAppSelector((state) => state.practiceState.progress);

  const [correct, setCorrect] = useState(false);
  const [primaryText, setPrimaryText] = useState("");
  const [secondaryText, setSecondaryText] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSearchBarPress = () => {
    navigation.navigate("SearchStack", {
      screen: "Search",
      params: { type: "practices" },
    } as any);
  };

  const handlePracticePress = (practiceId: string, topic: string) => {
    navigation.navigate("PracticePreview", { practiceId, topic });
  };

  const handleQotdPress = (index: number) => {
    if (index === questionOfTheDay.answerIndex) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
    setPrimaryText(questionOfTheDay.choices[index].content);
    setSecondaryText(questionOfTheDay.choices[index].explanation);
  };

  const handleQotdOk = () => {
    setPrimaryText("");
    setSecondaryText("");
    if (correct) {
      dispatch(setQotdFinished());
    }
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleExtraTopicPress = useCallback(() => {
    handleDialogOpen();
  }, []);

  const renderPracticeListItem: ListRenderItem<Practice> = ({ item }) => (
    <PracticeCard
      style={{ marginTop: 15 }}
      practice={item}
      progress={progress[item.id]}
      onPress={() => handlePracticePress(item.id, item.topic)}
    />
  );

  const footer = useMemo(
    () => (
      <>
        {extraTopics.map((topic, index) => (
          <PracticeCard
            key={topic}
            style={{ marginTop: 15 }}
            practice={
              {
                topic: extraTopics[index],
              } as any
            }
            progress={0}
            progressPercent={Math.floor(Math.random() * 100)}
            onPress={handleExtraTopicPress}
          />
        ))}
      </>
    ),
    [handleExtraTopicPress]
  );

  return (
    <>
      <FlatList
        style={styles.container}
        contentContainerStyle={{
          marginTop: 25,
          paddingBottom: tabBarHeight + 65,
        }}
        data={practices}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            {!qotdFinished && (
              <BlueRingView
                style={{ marginBottom: 15 }}
                borderRadius={20}
                ringWidth={4}
              >
                <View style={styles.innerContainer}>
                  <Text style={styles.questionTitle}>Question of the Day</Text>
                  <View style={styles.divider} />
                  <Text style={styles.questionText}>
                    {questionOfTheDay.question}
                  </Text>
                  {questionOfTheDay.choices.map((c, i) => (
                    <BlueButton
                      key={c.content}
                      style={styles.questionButton}
                      textStyle={styles.questionButtonText}
                      textContainerStyle={{ minHeight: 48 }}
                      onPress={() => handleQotdPress(i)}
                    >
                      {c.content}
                    </BlueButton>
                  ))}
                  <Text style={styles.questionSource}>
                    Source: Curious Parenting
                  </Text>
                </View>
              </BlueRingView>
            )}
            <SearchBar
              style={styles.searchBar}
              inputDisabled
              onPress={handleSearchBarPress}
            />
          </>
        }
        ListFooterComponent={footer}
        renderItem={renderPracticeListItem}
      />
      <PracticeDialog
        isVisible={!!primaryText}
        type={correct ? "success" : "failure"}
        primaryText={primaryText}
        secondaryText={secondaryText}
        finish
        onOk={handleQotdOk}
      />
      <Dialog isVisible={dialogOpen} title="Unimplemented" type="success">
        <Text style={styles.dialogText}>
          This feature has not been implemented.
        </Text>
        <BlueButton
          style={styles.dialogButton}
          selected
          onPress={handleDialogClose}
        >
          Ok
        </BlueButton>
      </Dialog>
    </>
  );
}

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
  searchBar: {
    marginBottom: 0,
  },
  dialogText: {
    marginTop: 10,
  },
  dialogButton: {
    marginTop: 20,
  },
});
