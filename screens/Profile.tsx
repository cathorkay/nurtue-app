import { useState } from "react";
import { NativeModules, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BlueButton from "../components/BlueButton";
import BlueRingView from "../components/BlueRingView";
import Dialog from "../components/Dialog";
import MockPhoto from "../components/MockPhoto";
import Text from "../components/Text";
import TextButton from "../components/TextButton";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import { persistor, useAppSelector } from "../data/store";
import { getChildrenDescription } from "../lib/format";
import { ProfileStackScreenProps } from "../types/navigation";
import { Parent } from "../types/state";
import { UserSelection } from "./NewAgreement";

const ProfileScreen: React.FC<ProfileStackScreenProps<"Profile">> = () => {
  const insets = useSafeAreaInsets();

  const user = useAppSelector((state) => state.profileState.profile);

  const [unimpDialogOpen, setUnimpDialogOpen] = useState(false);
  const [termsDialogOpen, setTermsDialogOpen] = useState(false);

  // this feature is unimplemented 

  const handleUnimpDialogOpen = () => {
    setUnimpDialogOpen(true);
  };

  const handleUnimpDialogClose = () => {
    setUnimpDialogOpen(false);
  };

  const handleEditPress = () => {
    handleUnimpDialogOpen();
  };

  // terms and conditions

  const handleTermsDialogOpen = () => {
    setTermsDialogOpen(true);
  };

  const handleTermsDialogClose = () => {
    setTermsDialogOpen(false);
  };

  const handleTerms = () => {
    handleTermsDialogOpen();
  };

  // privacy policy

  const handlePrivPol = () => {
    handleUnimpDialogOpen();
  };

  const handleReset = async () => {
    await persistor.purge();
    persistor.persist();
    NativeModules.DevSettings.reload();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
    >
      <BlueRingView
        style={styles.photoContainer}
        borderRadius={100}
        ringWidth={16}
      >
        <MockPhoto style={styles.photo} name={user.user.photo} />
      </BlueRingView>
      <BlueRingView borderRadius={20}>
        <View style={styles.infoContainer}>
          <Text style={styles.nameText}>{user.user.name}</Text>
          <Text>{getChildrenDescription(user.user as Parent)}</Text>
        </View>
      </BlueRingView>
      <Text style={styles.sectionText}>My Family</Text>
      {user.spouse && (
        <UserSelection style={styles.userBox} user={user.spouse} />
      )}
      {user.children?.map((c) => (
        <UserSelection style={styles.userBox} key={c.user.id} user={c} />
      ))}
      <BlueButton shadow style={styles.editButton} onPress={handleEditPress}>
        Edit
      </BlueButton>

      <View style={styles.termsPrivContainer}>
        <TextButton style={styles.resetButton} onPress={handleTerms}>
          Terms & Conditions
        </TextButton>
        <TextButton onPress={handlePrivPol}>
          Privacy Policy
        </TextButton>
      </View>

      <TextButton style={styles.resetButton} onPress={handleReset}>
        Reset App (DEV ONLY)
      </TextButton>

      <Text style={{
        marginVertical: 30,
        textAlign: 'center',
        color: Colors.bluegreen,
        flexDirection: 'row',
      }}>Copyright 2022 - Nurtue, Inc.</Text>


      <Dialog isVisible={unimpDialogOpen} title="Unimplemented" type="success">
        <Text style={styles.dialogText}>
          This feature has not been implemented.
        </Text>
        <BlueButton
          style={styles.dialogButton}
          selected
          onPress={handleUnimpDialogClose}
        >
          Ok
        </BlueButton>
      </Dialog>

      <Dialog isVisible={termsDialogOpen} title="Terms & Conditions" type="success">
        <Text style={styles.dialogText}>
          속삭여 줄래 넌 날 깨우는 déjà-vu
          Now, is it you now?
          피어날 듯해 날개 달린 신기루
          How? Is it true now?
          날 감싸 안아주는 wind
          새로 깨어나는 느낌
          나를 채워가는 눈빛 (you)
          어쩌면 꿈인 것 같아
          이 순간 dreams, dreams may come true
          넌 마치 fly like a butterfly
          날 멀리 데려갈
          Wings, wings
          이대로 fly like a butterfly
          귓가엔 바람 소리
          Wing, wing, wing
          난 닿을 듯해
          I better be around you
          Fly like a butterfly
          Fly like a butterfly
          I better be around you
          아찔해져 가 내 주위 모든 것이 blue now
          With you, you now
          접힌 종이 달 그 사이를 맴돌 듯
          I better be around you
          시작은 작은 날개짓
          이제 내 맘의 hurricane
          Been been there, never been been there
          세계가 점점 작아져 가
          데려가줘 way too far 새로워져
          이 순간 dreams, dreams may come true
          넌 마치 fly like a butterfly
          날 멀리 데려갈
          Wings, wings
          이대로 fly like a butterfly
          귓가엔 바람 소리
          Wing, wing, wing
          이대로
          난 닿을 듯해
          I better be around you
          저 끝까지
          (Fly like a butterfly)
          더 멀리까지
          Fly like a butterfly
          저 끝까지
          Fly like a butterfly
          I better be around you
          구름 위의 synchronize
          새로운 이 느낌
          Bling, bling, shine like a starlight
          숨이 멎을 듯한 time
          점점 완벽해져 가
          Let me fly right now
          (Let me fly right now)
          넌 마치 fly like a butterfly
          더 높이 날아가줘
          Wings, wings
          이대로 fly like a butterfly
          스치는 바람 소리
          Wing, wing, wing
          I better be around you
          Fly like a butterfly
          날 멀리 데려갈 (저 끝까지)
          Wings, wings (더 멀리까지)
          이대로 fly like a butterfly
          귓가엔 바람 소리
          난 닿을 듯해
          I better be around you
        </Text>
        <BlueButton
          style={styles.dialogButton}
          selected
          onPress={handleTermsDialogClose}
        >
          Ok
        </BlueButton>
      </Dialog>

      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.lightblue,
  },
  termsPrivContainer: {
    marginVertical: 5,
  },
  photoContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  photo: {
    width: 152,
    height: 152,
    borderRadius: 76,
  },
  infoContainer: {
    padding: 15,
    alignItems: "center",
  },
  nameText: {
    fontSize: FontSize.header,
    fontFamily: "semibold",
    marginBottom: 8,
    marginTop: -4,
  },
  sectionText: {
    fontFamily: "semibold",
    marginTop: 20,
  },
  editButton: {
    marginTop: 40,
  },
  resetButton: {
    marginTop: 40,
    color: 'red',
  },
  dialogText: {
    marginTop: 10,
  },
  dialogButton: {
    marginTop: 20,
  },
  userBox: {
    marginTop: 10,
  },
});

export default ProfileScreen;
