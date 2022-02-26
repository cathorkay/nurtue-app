import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  TouchableHighlight,
  TouchableHighlightProps,
  TouchableOpacity,
  View,
} from "react-native";

import Colors from "../constants/Colors";
import BlueBorderView from "./BlueBorderView";
import Chip from "./Chip";
import Text from "./Text";

export interface PostCardProps extends TouchableHighlightProps {
  preview?: boolean;
  title?: string;
  topics?: string[];
}

const PostCard: React.FC<PostCardProps> = ({
  style,
  preview,
  title,
  topics,
  ...restProps
}) => {
  const view = (
    <View>
      {title && <Text style={styles.title}>{title}</Text>}
      {topics && (
        <View style={styles.topicContainer}>
          {topics.map((topic) => (
            <Chip key={topic}>#{topic}</Chip>
          ))}
        </View>
      )}
      <View style={styles.userRow}>
        <View style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.username}>Robert</Text>
          <Text style={styles.description}>
            Father of 11 y/o boy, 13 y/o girl
          </Text>
        </View>
        <Text style={styles.time}>10 min ago</Text>
      </View>
      <Text style={styles.content}>
        My son is playing video games instead of completing his homework.
      </Text>
      <View style={styles.toolBar}>
        <View style={styles.action}>
          <ActionIconButton name="heart-outline" />
          <Text style={styles.actionText}>47</Text>
        </View>
        <View style={styles.action}>
          <ActionIconButton name="comment-outline" />
          <Text style={styles.actionText}>47</Text>
        </View>
        <View style={styles.continueReading}>
          {preview ? (
            <>
              <Text style={styles.actionText}>Continue Reading</Text>
              <MaterialCommunityIcons
                name="arrow-right"
                color={Colors.greengrey}
                size={15}
              />
            </>
          ) : (
            <MaterialCommunityIcons
              name="dots-horizontal"
              color={Colors.greengrey}
              size={15}
            />
          )}
        </View>
      </View>
    </View>
  );

  return title ? (
    <BlueBorderView
      containerStyle={[styles.container, { padding: 0 }, style]}
      {...restProps}
    >
      {view}
    </BlueBorderView>
  ) : (
    <TouchableHighlight
      underlayColor="white"
      activeOpacity={0.5}
      style={[styles.container, style]}
      {...restProps}
    >
      {view}
    </TouchableHighlight>
  );
};

const ActionIconButton = ({
  name,
}: React.ComponentProps<typeof MaterialCommunityIcons>) => (
  <TouchableOpacity
    activeOpacity={0.5}
    style={styles.iconButtonContainer}
    onPress={() => {}}
  >
    <MaterialCommunityIcons name={name} color={Colors.red} size={15} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    shadowColor: Colors.bluegreen,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 30,
  },
  title: {
    fontFamily: "semibold",
    fontSize: 14,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    borderRadius: 20,
    width: 40,
    height: 40,
    backgroundColor: Colors.darkgreen,
  },
  userInfo: {
    marginHorizontal: 12,
  },
  username: {
    fontSize: 14,
  },
  description: {
    marginTop: 5,
    fontSize: 12,
    color: Colors.greengrey,
  },
  time: {
    marginLeft: "auto",
    fontSize: 12,
    color: Colors.greengrey,
    alignSelf: "flex-start",
  },
  content: {
    fontSize: 13,
    marginTop: 10,
  },
  toolBar: {
    marginTop: 10,
    flexDirection: "row",
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  actionText: {
    marginRight: 8,
    fontSize: 12,
    color: Colors.greengrey,
  },
  continueReading: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  iconButtonContainer: {
    backgroundColor: "rgba(255, 105, 84, 0.2)",
    width: 27,
    height: 27,
    borderRadius: 13.5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  topicContainer: {
    flexDirection: "row",
    marginTop: 6,
    marginBottom: 12,
  },
});

export default PostCard;
