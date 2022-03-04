import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { SectionList, StyleSheet, TouchableOpacity, View } from "react-native";

import FloatingActionButton from "../components/FloatingActionButton";
import SearchBar from "../components/SearchBar";
import Text from "../components/Text";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import { TabScreenProps } from "../types/navigation";

const agreements = [
  {
    title: "",
    data: ["Pizza", "Burger", "Risotto"],
  },
  {
    title: "Last Month",
    data: ["French Fries", "Onion Rings", "1", "2", "3", "4"],
  },
];

const ConflictResolutionScreen: React.FC<TabScreenProps<"Community">> = ({
  navigation,
}) => {
  const tabBarHeight = useBottomTabBarHeight();

  const handleSearchBarPress = () => {
    navigation.navigate("SearchStack", {
      screen: "Search",
      params: { type: "agreements" },
    } as any);
  };

  const handleNewAgreementPress = () => {
    navigation.navigate("AgreementStack");
  };

  const handleAgreementPress = () => {
    navigation.navigate("AgreementDetail");
  };

  const renderListItem = () => (
    <TouchableOpacity activeOpacity={0.6} onPress={handleAgreementPress}>
      <LinearGradient
        style={styles.listItem}
        start={[0, 0]}
        end={[1, 1]}
        colors={["#82E4FA", "#CDF1FF"]}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.emoji}>🍱</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>No video games on school nights</Text>
          <View style={styles.caption}>
            <Text style={styles.people}>Mom & Braedon</Text>
            <Text style={styles.date}> • Yesterday</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <>
      <SectionList
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: tabBarHeight + 60 + 75,
        }}
        stickySectionHeadersEnabled={false}
        sections={agreements}
        ListHeaderComponent={
          <SearchBar
            style={styles.searchBar}
            inputDisabled
            onPress={handleSearchBarPress}
          />
        }
        renderItem={renderListItem}
        renderSectionHeader={({ section: { title } }) =>
          title ? <Text style={styles.header}>{title}</Text> : null
        }
        keyExtractor={(item) => item}
      />
      <FloatingActionButton
        name="plus"
        style={{ position: "absolute", right: 15, bottom: 15 + tabBarHeight }}
        onPress={handleNewAgreementPress}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightblue,
    paddingHorizontal: 20,
    paddingTop: 40,
    marginTop: -20,
  },
  searchBar: {
    flex: 1,
  },
  header: {
    fontSize: FontSize.header,
    color: Colors.greengrey,
    marginTop: 30,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 15,
  },
  emoji: {
    fontSize: 42,
  },
  content: {
    marginLeft: 15,
    flex: 1,
  },
  title: {
    fontFamily: "semibold",
    fontSize: FontSize.emphasis,
  },
  caption: {
    flexDirection: "row",
    marginTop: 5,
  },
  people: {},
  date: {
    color: Colors.greengrey,
  },
});

export default ConflictResolutionScreen;
