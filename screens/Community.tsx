import { MaterialIcons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

import OrangeView from "../components/OrangeView";
import PostCard from "../components/PostCard";
import SearchBar from "../components/SearchBar";
import Text from "../components/Text";
import Colors from "../constants/Colors";
import { TabScreenProps } from "../types";

const CommunityScreen: React.FC<TabScreenProps<"Community">> = ({
  navigation,
}) => {
  const tabBarHeight = useBottomTabBarHeight();

  const renderPostCard = () => (
    <PostCard
      style={styles.PostCard}
      preview
      onPress={() => navigation.push("CommunityThread")}
    />
  );

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={{
        paddingHorizontal: 20,
        marginTop: 40,
        paddingBottom: tabBarHeight + 60,
      }}
      data={[
        { id: "1" },
        { id: "2" },
        { id: "3" },
        { id: "4" },
        { id: "5" },
        { id: "6" },
      ]}
      ListHeaderComponent={
        <View style={styles.listHeaderContainer}>
          <Text style={styles.greeting}>Good Morning, Emily!</Text>
          <View style={styles.affirmationShadow}>
            <OrangeView>
              <Text style={styles.affirmationText}>
                Be the parent you needed when you were younger.
              </Text>
            </OrangeView>
          </View>
          <View style={styles.filterRow}>
            <SearchBar style={styles.searchBar} />
            <TouchableOpacity style={styles.filterButton} onPress={() => {}}>
              <MaterialIcons
                name="filter-list"
                color={Colors.bluegreen}
                size={32}
              />
            </TouchableOpacity>
          </View>
        </View>
      }
      renderItem={renderPostCard}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  listHeaderContainer: {
    flex: 1,
    marginBottom: 10,
  },
  greeting: {
    fontFamily: "medium",
    color: Colors.darkgreen,
    fontSize: 24,
  },
  affirmationShadow: {
    shadowColor: Colors.bluegreen,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    marginTop: 10,
  },
  affirmationText: {
    fontFamily: "semibold-italic",
    fontSize: 18,
    color: "white",
  },
  filterRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  searchBar: {
    marginRight: 10,
    flex: 1,
  },
  filterButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    flex: 1,
    backgroundColor: Colors.lightblue,
    marginTop: -20,
  },
  PostCard: {
    marginTop: 12,
  },
});

export default CommunityScreen;
