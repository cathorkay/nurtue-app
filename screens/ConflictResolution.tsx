import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import dayjs from "dayjs";
import groupBy from "lodash.groupby";
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { ListRenderItem, SectionList, StyleSheet, RefreshControl} from "react-native";

import AgreementCard from "../components/AgreementCard";
import FloatingActionButton from "../components/FloatingActionButton";
import IconButton from "../components/IconButton";
import SearchBar from "../components/SearchBar";
import Text from "../components/Text";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import { useAppSelector } from "../data/store";
import { TabScreenProps } from "../types/navigation";
import { Agreement } from "../types/state";

import { getAuth } from "firebase/auth";
import { db } from '../firebase';
import { updateDoc, doc, getDoc, addDoc, where, getDocs, collection, DocumentData, query, orderBy } from 'firebase/firestore';

const ConflictResolutionScreen: React.FC<TabScreenProps<"Community">> = ({
  navigation,
}) => {
  const tabBarHeight = useBottomTabBarHeight();

  /*const originalAgreements = useAppSelector(
    (state) => state.agreementState.agreements
  );*/

  const auth = getAuth();
  const [originalAgreements, setOriginalAgreements] = useState<DocumentData[]>([]);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getDocs(query(
      collection(db, "resolutions"), 
      where("user", "==", auth.currentUser?.uid)
    )).then(resolutionSnap => {
      let resolutions: DocumentData[] = [];
      resolutionSnap.forEach((doc) => {
        resolutions.push(doc.data());
      });      
      
      setOriginalAgreements([...resolutions]);
    })
  }, [auth]);

  const agreements = useMemo(() => {
    const agreementsByMonth = Object.values(
      groupBy(originalAgreements, (a) => dayjs(a.createdAt).format("YYYY-MM"))
    );
    return agreementsByMonth.map((i) => ({
      title:
        dayjs(i[0].createdAt).month() === dayjs().month()
          ? ""
          : dayjs(i[0].createdAt).date(1).fromNow(),
      data: i,
    }));
  }, [originalAgreements]);

  const handleSearchBarPress = () => {
    navigation.navigate("SearchStack", {
      screen: "Search",
      params: { type: "agreements" },
    } as any);
  };

  const handleSettingsPress = useCallback(() => {
    navigation.navigate("AgreementSettings");
  }, [navigation]);

  const handleNewAgreementPress = () => {
    navigation.navigate("AgreementStack");
  };

  const handleAgreementPress = (agreementId: string) => {
    navigation.navigate("AgreementDetail", { agreementId });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          name="cog"
          style={{
            marginRight: 10,
          }}
          size={24}
          color={Colors.bluegreen}
          onPress={handleSettingsPress}
        />
      ),
    });
  }, [handleSettingsPress, navigation]);

  const renderAgreementCard: ListRenderItem<Agreement> = ({ item }) => (
    <AgreementCard
      style={{ marginTop: 15 }}
      agreement={item}
      onPress={() => handleAgreementPress(item.id)}
    />
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getDocs(query(
      collection(db, "resolutions"), 
      where("user", "==", auth.currentUser?.uid)
    )).then(resolutionSnap => {
      let resolutions: DocumentData[] = [];
      resolutionSnap.forEach((doc) => {
        resolutions.push(doc.data());
      });      
      
      setOriginalAgreements([...resolutions]);
      setRefreshing(false);
    })
  }, []);

  return (
    <>
      <SectionList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
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
        renderItem={renderAgreementCard}
        renderSectionHeader={({ section: { title } }) =>
          title ? <Text style={styles.header}>{title}</Text> : null
        }
        keyExtractor={(item) => item.id}
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
});

export default ConflictResolutionScreen;
