import { StyleSheet, View } from "react-native";

import Chip from "../components/Chip";
import Text from "../components/Text";
import { RootStackScreenProps } from "../types/navigation";

const FilterScreen: React.FC<RootStackScreenProps<"Filter">> = ({
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <View style={styles.ageInfoContainer}>
          <Text>Child's Age</Text>
          <Text>3 - 8 y/o</Text>
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <Text>Child's Gender</Text>
        <View style={styles.chips}>
          <Chip>Female</Chip>
          <Chip>Male</Chip>
          <Chip>Non-binary</Chip>
          <Chip>Trans Female (MTF)</Chip>
          <Chip>Trans Male (FTM)</Chip>
          <Chip>Other</Chip>
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <Text>Author</Text>
        <View style={styles.chips}>
          <Chip>Mothers</Chip>
          <Chip>Fathers</Chip>
          <Chip>Non-binary Parents</Chip>
          <Chip selected>Certified Experts</Chip>
          <Chip>Other</Chip>
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <Text>Family Dynamic</Text>
        <View style={styles.chips}>
          <Chip selected>Straight</Chip>
          <Chip>Gay</Chip>
          <Chip>Lesbian</Chip>
          <Chip>Single Parent</Chip>
          <Chip>Adopted Child</Chip>
          <Chip>Other</Chip>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  ageInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionContainer: {
    marginBottom: 30,
    padding: 10,
  },
  chips: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default FilterScreen;
