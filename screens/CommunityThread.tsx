import { FlatList, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import IconButton from "../components/IconButton";
import PostCard from "../components/PostCard";
import TextInput from "../components/TextInput";
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
    <>
      <FlatList
        style={styles.list}
        contentContainerStyle={{
          marginTop: -20,
          paddingBottom: 10 + insets.bottom * 2 + 40,
        }}
        data={[{ id: "1" }, { id: "2" }, { id: "3" }]}
        ListHeaderComponent={
          <PostCard
            title="My son is playing video games instead of completing his homework."
            topics={["discipline", "screentime"]}
          />
        }
        renderItem={renderPostCard}
        keyExtractor={(item) => item.id}
      />
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={27 + insets.bottom}
      >
        <View
          style={[
            styles.inputArea,
            {
              paddingBottom: 10 + insets.bottom,
            },
          ]}
        >
          <TextInput
            style={styles.textInput}
            placeholder="Add a reply..."
            placeholderTextColor={Colors.greengrey}
            multiline
            numberOfLines={5}
          />
          <IconButton name="send" color={Colors.greengrey} size={24} />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: Colors.lightblue,
    padding: 20,
    paddingTop: 40,
  },
  postCard: {
    marginTop: 12,
  },
  inputArea: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textInput: {
    flex: 1,
    marginRight: 20,
    maxHeight: 100,
  },
});

export default CommunityThreadScreen;
