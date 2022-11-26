import React from 'react';
import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, View, Platform } from 'react-native';
import * as Yup from 'yup';

import { AppForm, AppFormField } from '../components/formsDWI';
import AppFormSelectOne from '../components/formsDWI/AppFormSelectOne';
import FontSize from '../constants/FontSize';
import colors from '../constants/Colors';
import Text from '../components/Text'
import SubmitButton from '../components/formsDWI/SubmitButton';
import { LoginStackScreenProps } from '../types/navigation';

import firebase from '../firebase'
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from "firebase/storage"
import FormImagePicker from '../components/formsDWI/FormImagePicker';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

import { v4 } from "uuid";
import { BUCKET_NAME, REGION, ACCESSKEYID, SECRETACCESSKEY } from '../aws';
import { RNS3 } from 'react-native-aws3';
import { Amplify, Storage } from 'aws-amplify';
import awsmobile from '../src/aws-exports';
Amplify.configure(awsmobile);

const auth = getAuth();
const firebaseStorage = getStorage();

let PFPURL = null;
const uuidTemp = v4();
const AWSBASE = "https://nurtue-bucket172437-nurtueenv.s3.us-west-1.amazonaws.com/public/"

//aws config (not used by amplify)
const configAWS = {
  bucket: BUCKET_NAME,
  keyPrefix: 'pfps/',
  region: REGION,
  accessKey: ACCESSKEYID,
  secretKey: SECRETACCESSKEY,
  sucessActionStatus: 201
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
    pfp: Yup.object().required("Please upload a photo").typeError("Profile picture is a required field."),
    gender: Yup.string().required().label("Gender"),
    dynamics: Yup.string().required().label("dynamics")
})

const authorGender = [
    "Male",
    "Female",
    "Non-binary",
]
  
export const familyDynamics = [
    "Married / Partnered",
    "Divorced",
    "LGBTQ+",
    "Single Parent",
    "Adopted Child",
] 

const childGenders = [
    "Boy",
    "Girl",
    "Non-Binary Child",
    "Transgender Girl (MTF)",
    "Transgender Boy (FTM)",
]


//firebase storage (not used anymore)
async function imgToFirebase(values, navigation) {
  const resultImg = values["pfp"]

  const imgName = auth.currentUser.uid
  const storageRef = ref(firebaseStorage, `images/pfps/${imgName}`)
  
  const img = await fetch(resultImg.uri)
  const blob = await img.blob()
  const newFile = new File([blob], `${imgName}.jpeg`, { // Going from blob -> File due to Firebase SDK v9.3.0+ bug.
      type: "image/jpeg",
    });

  console.log("uploading image");
  const uploadTask = uploadBytesResumable(storageRef, newFile);

  // Listen for state changes, errors, and completion of the upload.
  await new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log('Storage error', error);
          blob.close();
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then(async (downloadURL) => {
              console.log('File available at', downloadURL);
              try {
                //await addImageReferenceToFirestore({ url: downloadURL, description }); // not yet built
                console.log("TODO: Need to add image ref to Firestore")
              } catch (err) {
                reject(err);
              }
              PFPURL = downloadURL
              resolve();
            })
            .catch((err) => reject(err));
    
          blob.close();
        },
      );
    });
}

async function imgToAWS(resultImg){
  const img = await fetch(resultImg.uri)
  const blob = await img.blob()
  const fileName = resultImg.fileName + uuidTemp;

  console.log("uploading to aws...");

  //aws amplify
  await Storage.put(fileName, blob, {
    level: "public",
    contentType: 'image/jpeg',
    progressCallback(progress){
      console.log(parseInt((progress.loaded / progress.total) * 100));
    },
  })
  .then((response) => {
    console.log(response.key);
  })
  .catch((error ) => {
    console.log(error);
  });
}

async function handleSubmit(values, navigation) {
  console.log("submitting...", values);
  if (values['pfp'] == null) return alert("Please upload a profile picture.")

  await imgToAWS(values['pfp']);

  updateProfile(auth.currentUser, {
    displayName: values["name"],
    photoURL: AWSBASE + values["pfp"].fileName + uuidTemp
  }).then(() => {
    console.log("Here is the updated user photo:", auth.currentUser.photoURL)
    navigation.push("OnboardingChild")
  }).catch((error) => {
    alert(error)
    console.log(error)
  });

  //update firestore entry for this user (michael)
  try {
    setDoc(doc(db, 'users', auth.currentUser.uid), {
      gender: values['gender'],
      dynamics: values['dynamics'],
      name: values['name'],
      photo: AWSBASE + values["pfp"].fileName + uuidTemp,
      children: [],
    })
  } catch (err) {
      alert(err);
  }
}

const OnboardingParent: React.FC<LoginStackScreenProps<"OnboardingParent">> = ({
  navigation,
  route,
}) => { 

  return (
      <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
      <ScrollView>
              
          <AppForm
              initialValues={{name: '', pfp: null, gender: '', dynamics: []}}
              onSubmit={values => handleSubmit(values, navigation)}
              validationSchema={validationSchema}
              //validator={() => ({})}
          >
              <View style={{paddingHorizontal: 20, paddingBottom: 30}}>

              <Text style={{textAlign: "center",fontFamily: "semibold", fontSize: FontSize.emphasis, color: colors.grey, marginTop: 30, marginBottom: 20}}>Tell us about yourself.</Text>
              <Text style={styles.text}>What's your name?</Text>
              <AppFormField
                  autoCapitalize="true"
                  autoCorrect={false}
                  name="name"
                  placeholder="Preferred Name"
                  color="lightblue" 
              />

              <View style={styles.pfpContainer}>
                <Text style={styles.text}>Add a profile picture!</Text>
                  <FormImagePicker name={"pfp"}/>
              </View>

              <Text style={styles.text}>You are...</Text>               
              <AppFormSelectOne 
                  array={authorGender}
                  name="gender"
              />

              <Text style={styles.text}>Select all that apply to you.</Text>
              <Text style={[styles.text, {fontSize: FontSize.caption}]}>Adding these helps all our users find relatable community posts.</Text>
              <AppFormSelectOne
                  array={familyDynamics}
                  name="dynamics"
              />

              <Text style={{color: "red", fontSize: 10, textAlign: "center", marginBottom: 5}}>NOTICE: If your app crashes when you press "Continue", try again with a smaller image.</Text>

              <SubmitButton title="Continue"/>

              </View>
          </AppForm>

      </ScrollView>
      </KeyboardAvoidingView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  chip: {
      marginBottom: 6,
      marginRight: 4,
      textAlign: "center"
  },
  container: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      flex: 1,
  },
  pfpContainer: {
      marginVertical: 20,
      justifyContent: "center",
      alignItems: "center"
  },
  text: {
      fontSize: FontSize.normal,
      color: colors.grey,
      textAlign: "center",
      marginVertical: 5,
  },
})

export default OnboardingParent;