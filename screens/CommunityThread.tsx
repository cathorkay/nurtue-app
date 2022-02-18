import { FlatList, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import PostCard from "../components/PostCard";
import Colors from "../constants/Colors";
import { RootStackScreenProps } from "../types";

const CommunityThreadScreen: React.FC<
  RootStackScreenProps<"CommunityThread">
> = () => {
  const insets = useSafeAreaInsets();

  const renderPostCard = () => (
    <PostCard style={styles.postCard} preview={false} />
  );

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={{
        paddingBottom: insets.bottom * 2 + 40,
      }}
      data={[{ id: "1" }, { id: "2" }, { id: "3" }]}
      ListHeaderComponent={
        <PostCard
          style={styles.postCard}
          title="My son is playing video games instead of completing his homework."
          topics={["discipline", "screentime"]}
        />
      }
      renderItem={renderPostCard}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: Colors.lightblue,
    padding: 20,
    marginTop: -20,
    paddingTop: 40,
  },
  postCard: {
    marginTop: 12,
  },
});

export default CommunityThreadScreen;
