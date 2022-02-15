import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";

import Colors from "../constants/Colors";
import Text from "./Text";

const ActionIconButton = ({
  name,
}: React.ComponentProps<typeof MaterialCommunityIcons>) => (
  <TouchableOpacity
    activeOpacity={0.5}
    style={{
      backgroundColor: "rgba(255, 105, 84, 0.2)",
      width: 27,
      height: 27,
      borderRadius: 13.5,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 8,
    }}
    onPress={() => {}}
  >
    <MaterialCommunityIcons name={name} color={Colors.red} size={15} />
  </TouchableOpacity>
);

const PostCard: React.FC<ViewProps> = ({ style }) => {
  return (
    <TouchableHighlight
      underlayColor="white"
      activeOpacity={0.5}
      style={[styles.container, style]}
      onPress={() => {}}
    >
      <View>
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
            <Text style={styles.actionText}>Continue Reading</Text>
            <MaterialCommunityIcons
              name="arrow-right"
              color={Colors.greengrey}
              size={15}
            />
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

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
  description: { marginTop: 5, fontSize: 12, color: Colors.greengrey },
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
});

export default PostCard;
