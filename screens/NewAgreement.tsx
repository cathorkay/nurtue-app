import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { TouchableOpacity } from "react-native-gesture-handler";

import BlueButton from "../components/BlueButton";
import BlueRadiusBackground from "../components/BlueRadiusBackground";
import FloatingActionButton from "../components/FloatingActionButton";
import ProgressBar from "../components/ProgressBar";
import Text from "../components/Text";
import TextInput from "../components/TextInput";
import TimerBackground from "../components/TimerBackground";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import { AgreementStackScreenProps } from "../types/navigation";

const steps = [
  {
    id: "1",
    prompt: "{person1}, explain your point of view. Why do you feel this way?",
    tips: [
      "{person1}, remember to focus on the task at hand, rather than get carried away by emotions.",
      "{person2}, remember not to interrupt. Inquire, listen, and try to understand {person1}'s concerns.",
    ],
  },
  {
    id: "2",
    prompt: "{person2}, explain your point of view. Why do you feel this way?",
    tips: [
      "{person2}, remember to focus on the task at hand, rather than get carried away by emotions.",
      "{person1}, remember not to interrupt. Inquire, listen, and try to understand {person2}'s concerns.",
    ],
  },
  {
    id: "3",
    prompt:
      "{person1}, restate {person2}'s point of view using objective language.",
    tips: ["Consider what {person2} needs from you and why."],
  },
  {
    id: "4",
    prompt:
      "{person2}, restate {person1}'s point of view using objective language.",
    tips: ["Consider what {person1} needs from you and why."],
  },
  {
    id: "5",
    prompt:
      "Do your best to reach an agreement. You will log it on the next page!",
    tips: [
      "What support does {person2} need?\nWhat support does {person1} need?\nHow might we compromise?",
    ],
  },
];

const emojis = [
  "👚",
  "🍱",
  "🏀",
  "📱",
  "🛏",
  "🐶",
  "🥾",
  "🎧",
  "🚪",
  "🛁",
  "🎒",
  "🎮",
  "🚨",
  "🛏",
  "💅",
  "😍",
  "🎨",
  "🚙",
  "🌟",
  "📚",
];

const gradientHeight = 425;

const NewAgreementScreen: React.FC<
  AgreementStackScreenProps<"NewAgreement">
> = ({ navigation, route }) => {
  const currentStep = route.params.step;
  const timerLength = 2 * 60;

  const timerRef = useRef<NodeJS.Timer>();

  const [second, setSecond] = useState(timerLength);

  const handleNextPress = () => {
    handleTimerStop();
    navigation.push("NewAgreement", { step: currentStep + 1 });
  };

  const handlePrevPress = () => {
    navigation.pop();
  };

  const handleTimerStart = () => {
    timerRef.current = setInterval(
      () => setSecond((second) => second - 1),
      1000
    );
    setSecond((second) => second - 1);
  };

  const handleTimerStop = () => {
    timerRef.current && clearInterval(timerRef.current);
  };

  useEffect(() => {
    if (second <= 0) {
      handleTimerStop();
    }
  }, [second]);

  useEffect(() => {
    return () => {
      handleTimerStop();
    };
  }, []);

  return (
    <>
      <BlueRadiusBackground
        style={styles.gradient}
        height={
          currentStep === 0 || currentStep === 5
            ? gradientHeight - 60
            : currentStep === 7
            ? gradientHeight - 220
            : gradientHeight
        }
      />
      <View style={styles.container}>
        <ProgressBar progress={currentStep / 7} />
        <View
          style={[
            styles.upperContainer,
            {
              height:
                currentStep === 0 || currentStep === 5
                  ? gradientHeight - 60 - 70 - 80
                  : currentStep === 7
                  ? gradientHeight - 220
                  : gradientHeight - 70 - 80,
            },
          ]}
        >
          {currentStep === 0 && (
            <Text style={styles.conflictTitle}>
              Who is this conflict between?
            </Text>
          )}
          {currentStep === 5 && (
            <Text style={styles.conflictTitle}>
              How can we work together to solve the problem?
            </Text>
          )}
          {currentStep === 6 && (
            <View>
              <View>
                <View>
                  <Text>6</Text>
                </View>
                <Text>Log Your Agreement</Text>
              </View>
              <Text>Title</Text>
              <TextInput />
              <Text>Summary</Text>
              <TextInput placeholder="Summarize your agreement" />
            </View>
          )}
          {currentStep === 7 && (
            <View>
              <Text>Congratulations!</Text>
              {/* <Image /> */}
              <BlueButton>Finish</BlueButton>
            </View>
          )}
          {currentStep >= 1 && currentStep <= 4 && (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={handleTimerStart}
              style={styles.timerContainer}
            >
              {second === timerLength ? (
                <TimerBackground />
              ) : (
                <AnimatedCircularProgress
                  style={styles.circularProgress}
                  size={177}
                  width={15}
                  backgroundWidth={7}
                  fill={(second / timerLength) * 100}
                  tintColor="#FFA37B"
                  tintColorSecondary="#FF6954"
                  backgroundColor="white"
                  rotation={0}
                  lineCap="round"
                />
              )}
              <View style={styles.timer}>
                {second === timerLength ? (
                  <>
                    <View style={styles.timeContainer}>
                      <Text style={styles.timeText}>
                        {new Date(timerLength * 1000)
                          .toISOString()
                          .substr(15, 4)}
                      </Text>
                      <Text style={styles.timeUnit}>min</Text>
                    </View>
                    <Text style={styles.timerHint}>Start Timer</Text>
                  </>
                ) : (
                  <Text style={styles.countdown}>
                    {new Date(second * 1000).toISOString().substr(14, 5)}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.lowerContainer}>
          {currentStep === 0 && (
            <>
              <BlueButton style={styles.personButton}>Brandon</BlueButton>
              <BlueButton style={styles.personButton}>James</BlueButton>
              <BlueButton style={styles.personButton}>Christina</BlueButton>
            </>
          )}
          {currentStep === 6 && (
            <>
              <Text style={styles.emojiText}>
                Select an emoji for the agreement
              </Text>
              <View style={styles.emojis}>
                <View style={styles.emojiRow}>
                  {emojis.slice(0, 4).map((emoji) => (
                    <View key={emoji} style={styles.emojiContainer}>
                      <Text style={styles.emoji}>{emoji}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.emojiRow}>
                  {emojis.slice(4, 8).map((emoji) => (
                    <View key={emoji} style={styles.emojiContainer}>
                      <Text style={styles.emoji}>{emoji}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.emojiRow}>
                  {emojis.slice(8, 12).map((emoji) => (
                    <View key={emoji} style={styles.emojiContainer}>
                      <Text style={styles.emoji}>{emoji}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.emojiRow}>
                  {emojis.slice(12, 16).map((emoji) => (
                    <View key={emoji} style={styles.emojiContainer}>
                      <Text style={styles.emoji}>{emoji}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </>
          )}
          {currentStep > 0 && currentStep <= 5 && (
            <>
              <View style={styles.roundBackground}>
                <Text style={styles.stepText}>{currentStep}</Text>
              </View>
              <Text style={styles.stepPrompt}>
                {steps[currentStep - 1].prompt
                  .replaceAll("{person1}", "Dad")
                  .replaceAll("{person2}", "Braedon")}
              </Text>
              <View style={styles.tipLabelContainer}>
                <View style={styles.roundBackground}>
                  <MaterialCommunityIcons name="lightbulb" size={28} />
                </View>
                <Text style={styles.tipLabel}>Tips</Text>
              </View>
              <View style={styles.tips}>
                {steps[currentStep - 1].tips.map((tip) => (
                  <Text key={tip} style={styles.tipText}>
                    {tip
                      .replaceAll("{person1}", "Dad")
                      .replaceAll("{person2}", "Braedon")}
                  </Text>
                ))}
              </View>
              {currentStep === 5 && (
                <>
                  <View style={styles.tipLabelContainer}>
                    <View style={styles.roundBackground}>
                      <MaterialCommunityIcons name="lightbulb" size={28} />
                    </View>
                    <Text style={styles.tipLabel}>Examples of Needs</Text>
                  </View>
                  <View style={styles.tips}>
                    <Text style={styles.tipText}>
                      Love, boundaries, communication, sleep, play time, food,
                      assistance, connection, autonomy.
                    </Text>
                  </View>
                </>
              )}
            </>
          )}
        </View>
      </View>
      {currentStep !== 7 && (
        <FloatingActionButton
          style={styles.nextButton}
          name="arrow-right"
          onPress={handleNextPress}
        />
      )}
      {currentStep !== 0 && currentStep !== 7 && (
        <FloatingActionButton
          style={styles.prevButton}
          name="arrow-left"
          onPress={handlePrevPress}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 70,
  },
  upperContainer: {
    paddingVertical: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  conflictTitle: {
    fontFamily: "semibold",
    fontSize: FontSize.title,
    textAlign: "center",
  },
  lowerContainer: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  personButton: {
    marginVertical: 10,
  },
  nextButton: {
    right: 20,
    bottom: 30,
    position: "absolute",
  },
  prevButton: {
    left: 20,
    bottom: 30,
    position: "absolute",
  },
  timerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  circularProgress: {
    position: "absolute",
  },
  timer: {
    position: "absolute",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  timeText: {
    fontFamily: "semibold",
    fontSize: FontSize.header,
  },
  timeUnit: {
    fontSize: FontSize.emphasis,
    marginBottom: 2,
    marginLeft: 5,
  },
  timerHint: {
    fontFamily: "semibold",
    fontSize: FontSize.emphasis,
  },
  countdown: {
    fontFamily: "semibold",
    fontSize: FontSize.title,
  },
  roundBackground: {
    backgroundColor: "#9aeaef",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  stepText: {
    fontSize: FontSize.header,
    fontFamily: "semibold",
  },
  stepPrompt: {
    fontSize: FontSize.emphasis,
    fontFamily: "semibold",
    marginTop: 10,
  },
  tipLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  tipLabel: {
    marginLeft: 15,
    fontSize: FontSize.emphasis,
    fontFamily: "semibold",
  },
  tips: {
    marginTop: 10,
  },
  tipText: {
    fontFamily: "italic",
    marginBottom: 5,
  },
  emojiText: {
    fontFamily: "semibold",
    fontSize: FontSize.emphasis,
    marginTop: 20,
  },
  emojis: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  emojiRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  emojiContainer: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: Colors.bluegreen,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  emoji: {
    fontSize: 30,
  },
});

export default NewAgreementScreen;
