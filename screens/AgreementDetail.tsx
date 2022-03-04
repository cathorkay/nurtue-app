import { StyleSheet, View, ScrollView } from "react-native";

import BlueButton from "../components/BlueButton";
import BlueRingView from "../components/BlueRingView";
import BlueView from "../components/BlueView";
import MockPhoto from "../components/MockPhoto";
import Text from "../components/Text";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";

const AgreementDetailScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.photos}>
        <BlueView
          borderRadius={40}
          ringWidth={16}
          style={styles.avatarContainer}
        >
          <MockPhoto name="dad" style={styles.image} />
        </BlueView>
        <BlueView
          borderRadius={40}
          ringWidth={16}
          style={styles.avatarContainer}
        >
          <MockPhoto name="kid" style={styles.image} />
        </BlueView>
      </View>
      <BlueRingView borderRadius={20} ringWidth={4}>
        <View style={styles.innerContainer}>
          <View style={styles.titleSection}>
            <Text style={styles.emoji}>🍱</Text>
            <View style={styles.text}>
              <Text style={styles.title}>Eat more veggies</Text>
              <Text style={styles.date}>06/15/2022</Text>
            </View>
          </View>
          <Text style={styles.content}>
            Dad will give Braedon options to choose what veggies he wants to
            eat. Dad and Braedon will cook delicious vegetables together that
            everyone in the family can enjoy.
          </Text>
        </View>
      </BlueRingView>
      <View style={styles.buttons}>
        <BlueButton shadow style={styles.button}>
          Edit
        </BlueButton>
        <BlueButton shadow style={styles.button}>
          Delete
        </BlueButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightblue,
    padding: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  photos: {
    flexDirection: "row",
    marginBottom: 18,
    justifyContent: "center",
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  innerContainer: {
    padding: 20,
    paddingTop: 10,
  },
  titleSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  emoji: {
    fontSize: 48,
  },
  text: {
    flex: 1,
    marginLeft: 20,
  },
  title: {
    fontFamily: "semibold",
    fontSize: FontSize.emphasis,
  },
  date: {
    marginTop: 4,
    color: Colors.greengrey,
  },
  content: {
    marginTop: 10,
  },
  buttons: {
    marginTop: 20,
  },
  button: {
    marginBottom: 10,
  },
});

export default AgreementDetailScreen;
