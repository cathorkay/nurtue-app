import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View, ScrollView } from "react-native";

import BlueBorderView from "../components/BlueBorderView";
import Button from "../components/Button";
import Text from "../components/Text";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";

const AgreementDetailScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <BlueBorderView>
        <View style={styles.titleSection}>
          <MaterialCommunityIcons name="food" size={40} />
          <View style={styles.text}>
            <Text style={styles.title}>Eat more veggies</Text>
            <Text style={styles.date}>06/15/2022</Text>
          </View>
        </View>
        <Text style={styles.content}>
          Dad will give Braedon options to choose what veggies he wants to eat.
          Dad and Braedon will cook delicious vegetables together that everyone
          in the family can enjoy.
        </Text>
      </BlueBorderView>
      <Button style={styles.button}>Edit</Button>
      <Button style={styles.button}>Delete</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightblue,
    padding: 20,
  },
  titleSection: {
    flexDirection: "row",
    alignItems: "center",
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
    marginTop: 5,
    color: Colors.grey,
  },
  content: {
    marginTop: 12,
  },
  button: {
    marginTop: 10,
  },
});

export default AgreementDetailScreen;
