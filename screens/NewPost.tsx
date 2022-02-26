import { StyleSheet, Switch, View } from "react-native";

import Button from "../components/Button";
import Card from "../components/Card";
import Chip from "../components/Chip";
import Text from "../components/Text";
import TextInput from "../components/TextInput";
import Colors from "../constants/Colors";
import { RootStackScreenProps } from "../types";

const recommendedTopics = [
  "tantrum",
  "pickeating",
  "preschool",
  "health",
  "boundary",
  "toy",
  "discipline",
  "bigfeeling",
  "bedtime",
];

const NewPostScreen: React.FC<RootStackScreenProps<"NewPost">> = ({
  navigation,
}) => {
  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Card>
        <Text>Title</Text>
        <TextInput style={styles.textInput} placeholder="Type here..." />
        <Text style={{ marginTop: 10 }}>Description</Text>
        <TextInput
          style={[styles.textInput, styles.multilineTextInput]}
          multiline
          numberOfLines={4}
          placeholder="Type here..."
        />
      </Card>
      <Card style={styles.card}>
        <Text>Select Topics</Text>
        <View style={styles.chips}>
          {recommendedTopics.map((topic) => (
            <Chip key={topic}>#{topic}</Chip>
          ))}
        </View>
      </Card>
      <Card
        style={[
          styles.card,
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          },
        ]}
      >
        <Text>Anonymous</Text>
        <Switch value={true} trackColor={{ true: Colors.orange }} />
      </Card>
      <Card style={styles.card}>
        <Text>Who Can Reply?</Text>
        <Button style={styles.button} selected>
          Everyone
        </Button>
        <Button style={styles.button}>Experts Only</Button>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.lightblue,
  },
  card: {
    marginTop: 20,
  },
  textInput: {
    backgroundColor: "#e7f8ff",
    padding: 10,
    borderRadius: 10,
    fontSize: 13,
    marginTop: 5,
  },
  multilineTextInput: {
    height: 75,
  },
  chips: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    marginTop: 10,
  },
});

export default NewPostScreen;
