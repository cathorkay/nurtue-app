import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import Chip from "../components/Chip";
import IconButton from "../components/IconButton";
import PostCard from "../components/PostCard";
import SearchBar from "../components/SearchBar";
import Text from "../components/Text";
import Colors from "../constants/Colors";
import mock from "../data/mock";
import { useAppSelector } from "../data/store";
import { SearchStackScreenProps } from "../types/navigation";
import { Post } from "../types/state";

const postFuseOptions: Fuse.IFuseOptions<Post> = {
  keys: ["title", "content", "topics", "replies.content"],
};

const SearchScreen: React.FC<SearchStackScreenProps<"Search">> = ({
  navigation,
  route,
}) => {
  const posts = useAppSelector((state) => state.postState.posts);

  const [query, setQuery] = useState("");
  const [postResults, setPostResults] = useState<Post[]>([]);

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleChipPress = (query: string) => {
    setQuery(query);
  };

  useEffect(() => {
    if (query) {
      const fuse = new Fuse(posts, postFuseOptions);
      setPostResults(fuse.search(query).map((i) => i.item));
    }
  }, [posts, query]);

  const renderPostCard: ListRenderItem<Post> = ({ item }) => (
    <PostCard
      style={styles.postCard}
      preview
      post={item}
      onPress={() => navigation.push("CommunityThread", { postId: item.id })}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <IconButton
          name="close"
          size={30}
          color={Colors.bluegreen}
          onPress={handleCancel}
        />
        <SearchBar
          style={styles.searchBar}
          value={query}
          onChangeText={setQuery}
        />
      </View>
      {!query && route.params.type === "posts" && (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={390}>
          <ScrollView>
            <View style={styles.sectionContainer}>
              <Text>Recommended Topics</Text>
              <View style={styles.chips}>
                {mock.recommendedTopics.map((topic) => (
                  <Chip key={topic} onPress={() => setQuery(topic)}>
                    #{topic}
                  </Chip>
                ))}
              </View>
            </View>
            <View style={styles.sectionContainer}>
              <Text>Trending Now</Text>
              <View style={styles.chips}>
                {mock.trendingTopics.map((topic) => (
                  <Chip key={topic} onPress={() => setQuery(topic)}>
                    #{topic}
                  </Chip>
                ))}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
      {query ? (
        <FlatList
          style={styles.list}
          contentContainerStyle={{
            marginTop: -20,
          }}
          data={postResults}
          renderItem={renderPostCard}
          keyExtractor={(item) => item.id}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.lightblue,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  searchBar: {
    flex: 1,
    marginLeft: 15,
  },
  sectionContainer: {
    marginTop: 10,
    padding: 10,
  },
  chips: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  postCard: {
    marginBottom: 15,
  },
  list: {
    paddingTop: 40,
    paddingHorizontal: 20,
    marginHorizontal: -20,
  },
});

export default SearchScreen;
