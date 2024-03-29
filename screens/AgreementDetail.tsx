import dayjs from "dayjs";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Image, 
  StyleSheet,
  View,
  ScrollView,
  TextInput as RNTextInput,
} from "react-native";

import BlueButton from "../components/BlueButton";
import BlueRingView from "../components/BlueRingView";
import BlueView from "../components/BlueView";
import ConfirmationDialog from "../components/ConfirmationDialog";
import IconButton from "../components/IconButton";
import MockPhoto from "../components/MockPhoto";
import Text from "../components/Text";
import TextButton from "../components/TextButton";
import TextInput from "../components/TextInput";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import { deleteAgreement, editAgreement } from "../data/agreement";
import { useAppDispatch, useAppSelector } from "../data/store";
import { RootStackScreenProps } from "../types/navigation";

import { db } from '../firebase';
import { updateDoc, doc, getDoc, deleteDoc, DocumentData } from 'firebase/firestore';

const AgreementDetailScreen: React.FC<
  RootStackScreenProps<"AgreementDetail">
> = ({ navigation, route }) => {
  const agreementId = route.params.agreementId;

  const dispatch = useAppDispatch();
  /*const agreement = useAppSelector(
    (state) => state.agreementState.agreements
  ).find((i) => i.id === agreementId)!;*/

  const [agreement, setAgreement] = useState<DocumentData>();
  const [person1, setPerson1] = useState<DocumentData>();
  const [person2, setPerson2] = useState<DocumentData>();

  useEffect(() => {
    getDoc(doc(db, "resolutions", agreementId)).then((agreementSnap) => {
      getDoc(doc(db, "users", agreementSnap.data().user)).then((userSnap) => {
        if(userSnap.data().name === agreementSnap.data().people[0]) setPerson1(userSnap.data());
        if(userSnap.data().spouse.name === agreementSnap.data().people[0]) setPerson1(userSnap.data().spouse);
        
        if(userSnap.data().name === agreementSnap.data().people[1]) setPerson2(userSnap.data());
        if(userSnap.data().spouse.name === agreementSnap.data().people[1]) setPerson2(userSnap.data().spouse);

        userSnap.data().children.forEach((c) => {
          if(c.name === agreementSnap.data().people[0]) setPerson1(c);
          if(c.name === agreementSnap.data().people[1]) setPerson2(c);
        })
      });
      setAgreement(agreementSnap.data());
      setSummary(agreementSnap.data().summary);
    });
  }, [agreementId]);

  const textInputRef = useRef<RNTextInput>(null);

  const [editing, setEditing] = useState(false);
  const [discardDialogOpen, setDiscardDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [summary, setSummary] = useState(agreement?.summary);

  const handleDiscardDialogOpen = () => {
    setDiscardDialogOpen(true);
  };

  const handleDiscardDialogClose = () => {
    setDiscardDialogOpen(false);
  };

  const handleDiscardOk = () => {
    handleDiscardDialogClose();
    setEditing(false);
  };

  const handleDiscardCancel = () => {
    handleDiscardDialogClose();
  };

  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    handleDeleteDialogClose();
  };

  const handleDeleteOk = () => {
    handleDeleteDialogClose();
    setTimeout(() => {
      navigation.goBack();
      setTimeout(() => {
        dispatch(
          deleteAgreement({
            agreementId,
          })
        );
      }, 1000);
    }, 500);
  };

  const handleDeleteFirebase = () => {
    handleDeleteDialogClose();
    setTimeout(() => {
      navigation.goBack();
      setTimeout(() => {
        deleteDoc(doc(db, "resolutions", agreementId));
      }, 1000);
    }, 500);
  }

  const handleEditPress = () => {
    setEditing(true);
    setTimeout(() => textInputRef.current?.focus(), 500);
  };

  const handleSaveFirebase = useCallback(() => {
    updateDoc(doc(db, "resolutions", agreementId), {
      summary: summary,
    });
    setEditing(false);
  }, [agreement, agreementId, summary]);

  const handleSave = useCallback(() => {
    dispatch(
      editAgreement({
        agreementId,
        agreement: {
          ...agreement,
          summary,
        },
      })
    );
    setEditing(false);
  }, [agreement, agreementId, dispatch, summary]);

  useLayoutEffect(() => {
    if (editing) {
      navigation.setOptions({
        headerLeft: () => (
          <IconButton
            style={{
              marginLeft: 20,
            }}
            onPress={handleDiscardDialogOpen}
            name="close"
            size={30}
            color={Colors.bluegreen}
          />
        ),
        headerRight: () => (
          <TextButton
            style={{
              marginRight: 20,
            }}
            onPress={handleSaveFirebase}
          >
            Save
          </TextButton>
        ),
      });
    } else {
      navigation.setOptions({
        headerLeft: () => (
          <IconButton
            style={{
              marginLeft: 10,
            }}
            onPress={navigation.goBack}
            name="chevron-left"
            size={36}
            color={Colors.bluegreen}
          />
        ),
        headerRight: () => null,
      });
    }
  }, [editing, handleSaveFirebase, navigation]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.photos}>
        <BlueView
          borderRadius={40}
          ringWidth={16}
          style={styles.avatarContainer}
        >
          {person1 ?
            <Image style={styles.image} source={{ uri: `${person1?.photo}` }}/>
          :
            <MockPhoto name={null} style={styles.image}/>
          }

        </BlueView>
        <BlueView
          borderRadius={40}
          ringWidth={16}
          style={styles.avatarContainer}
        >
          {person2 ?
            <Image style={styles.image} source={{ uri: `${person2?.photo}` }}/>
          :
            <MockPhoto name={null} style={styles.image}
            />
          }

        </BlueView>
      </View>
      <BlueRingView borderRadius={20} ringWidth={4}>
        <View style={styles.innerContainer}>
          <View style={styles.titleSection}>
            <Text style={styles.emoji}>{agreement?.emoji}</Text>
            <View style={styles.text}>
              <Text style={styles.title}>{agreement?.title}</Text>
              <Text style={styles.date}>
                {dayjs(agreement?.createdAt).format("MM/DD/YYYY")}
              </Text>
            </View>
          </View>
          {editing ? (
            <TextInput
              ref={textInputRef}
              style={styles.content}
              value={summary}
              onChangeText={setSummary}
              multiline
            />
          ) : (
            <Text style={styles.content}>{agreement?.summary}</Text>
          )}
        </View>
      </BlueRingView>
      {!editing && (
        <View style={styles.buttons}>
          <BlueButton shadow style={styles.button} onPress={handleEditPress}>
            Edit
          </BlueButton>
          <BlueButton
            shadow
            style={styles.button}
            onPress={handleDeleteDialogOpen}
          >
            Delete
          </BlueButton>
        </View>
      )}
      <ConfirmationDialog
        isVisible={discardDialogOpen}
        title="Exit"
        text="Are you sure you want to exit? The changes will be discarded."
        onOk={handleDiscardOk}
        onCancel={handleDiscardCancel}
      />
      <ConfirmationDialog
        isVisible={deleteDialogOpen}
        title="Delete"
        text="Are you sure you want to delete this agreement? This action cannot be undone."
        onOk={handleDeleteFirebase}
        onCancel={handleDeleteCancel}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightblue,
    padding: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  photos: {
    flexDirection: "row",
    marginBottom: 18,
    justifyContent: "center",
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  innerContainer: {
    padding: 20,
    paddingTop: 10,
  },
  titleSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  emoji: {
    fontSize: 48,
  },
  text: {
    flex: 1,
    marginLeft: 20,
  },
  title: {
    fontFamily: "semibold",
    fontSize: FontSize.emphasis,
  },
  date: {
    marginTop: 2,
    color: Colors.greengrey,
  },
  content: {
    marginTop: 10,
  },
  buttons: {
    marginTop: 20,
  },
  button: {
    marginBottom: 10,
  },
});

export default AgreementDetailScreen;
