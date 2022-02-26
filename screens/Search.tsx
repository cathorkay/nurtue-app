import { StyleSheet, View } from "react-native";

import Chip from "../components/Chip";
import SearchBar from "../components/SearchBar";
import Text from "../components/Text";
import TextButton from "../components/TextButton";
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

const trendingTopics = [
  "learning",
  "pandemic",
  "screentime",
  "anxiety",
  "family",
  "sleep",
  "patience",
  "sharing",
  "divorce",
];

const SearchScreen: React.FC<RootStackScreenProps<"Search">> = ({
  navigation,
}) => {
  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <SearchBar style={styles.searchBar} />
        <TextButton onPress={handleCancel}>Cancel</TextButton>
      </View>
      <View style={styles.sectionContainer}>
        <Text>Recommended Topics</Text>
        <View style={styles.chips}>
          {recommendedTopics.map((topic) => (
            <Chip key={topic}>#{topic}</Chip>
          ))}
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <Text>Trending Now</Text>
        <View style={styles.chips}>
          {trendingTopics.map((topic) => (
            <Chip key={topic}>#{topic}</Chip>
          ))}
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
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchBar: {
    flex: 1,
    marginRight: 10,
  },
  sectionContainer: {
    marginTop: 30,
    padding: 10,
  },
  chips: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default SearchScreen;
