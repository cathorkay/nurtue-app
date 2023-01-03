import React from 'react';
import { View, StyleSheet, SafeAreaView, KeyboardAvoidingView, Text, ScrollView } from 'react-native';
import BlueRingView from '../components/BlueRingView';
import FormImagePicker from '../components/formsDWI/FormImagePicker';
import AppTextInput from '../components/AppTextInputDWI';
import FontSize from '../constants/FontSize';
import AppText from '../components/Text';
import { AppForm, AppFormField} from '../components/formsDWI';
import DatePicker from '@react-native-community/datetimepicker';
import OrangeButton from '../components/OrangeButton';
import SubmitButton from '../components/formsDWI/SubmitButton';
import Colors from '../constants/Colors';
import DatePickerField from '../components/formsDWI/DatePickerField';
import AppFormSelectOne from '../components/formsDWI/AppFormSelectOne';
//import AppFormSelectMultiple from '../components/formsDWI/AppFormSelectMultiple';

import { getAuth, updateProfile } from "firebase/auth";
import { collection, updateDoc, doc, arrayUnion, setDoc } from "firebase/firestore"; 
import { db } from '../firebase';

import { v4 } from "uuid";

import { Amplify, Storage } from 'aws-amplify';
import awsmobile from '../src/aws-exports';
Amplify.configure(awsmobile);

const auth = getAuth();
const uuidTemp = v4();
const AWSBASE = "https://nurtue-bucket172437-nurtueenv.s3.us-west-1.amazonaws.com/public/"

const authorGender = [
    "Male",
    "Female",
    "Non-binary",
]
  
export const familyDynamics = [
    "Child",
    "Spouse"
] 

async function imgToAWS(resultImg){
    const img = await fetch(resultImg.uri)
    const blob = await img.blob()
    const fileName = resultImg.fileName + uuidTemp;
  
    console.log("uploading to aws...");
  
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

async function handleAdd (values){
    console.log("submitting...", values);
    //return to home screen after submit (navigation things)

    await imgToAWS(values['pfp']);

    try {
        if(values['dynamics'] === 'Child'){
            updateDoc(doc(db, 'users', auth.currentUser.uid), {
                children: arrayUnion({
                    birthday: values['birthday'],
                    gender: values['gender'],
                    name: values['name'],
                    photo: AWSBASE + values["pfp"].fileName + uuidTemp,
                })
            });
        } else {
            updateDoc(doc(db, 'users', auth.currentUser.uid), {
                spouse: arrayUnion({
                    birthday: values['birthday'],
                    gender: values['gender'],
                    name: values['name'],
                    photo: AWSBASE + values["pfp"].fileName + uuidTemp,
                })
            });
        }
    } catch (err) {
        alert(err);
    }
}

function AddFamilyMember(props) {
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView>
                <ScrollView showsVerticalScrollIndicator={false}>

                <AppForm
                    initialValues={{name: '', pfp: null, gender: '', dynamics: [], birthday: null}}
                    onSubmit={values => handleAdd(values)}
                >
                    <View style={{justifyContent: "center", alignItems: "center"}}>
                        <FormImagePicker name={"pfp"}/>
                        <Text style={styles.fieldText}>Add a Photo</Text>
                    </View>

                    <AppText style={styles.fieldText}>Name</AppText>
                    <AppFormField
                        autoCapitalize="true"
                        autoCorrect={false}
                        style={{fontFamily: "light", textAlign: "left", width: "100%"}} 
                        name="name"
                        placeholder="Family Member's Name"
                        color="lightblue" 
                    />

                    <AppText style={styles.fieldText}>Role</AppText>
                    <AppFormSelectOne 
                        array={familyDynamics}
                        name={"dynamics"}
                    />

                    <AppText style={styles.fieldText}>Gender Identity</AppText>               
                    <AppFormSelectOne 
                        array={authorGender}
                        name={"gender"}
                    />

                    <AppText style={styles.fieldText}>Birthday</AppText>
                    <DatePickerField 
                        value={new Date()} 
                        display="spinner"
                        name="birthday"
                    />

                    <SubmitButton title="Add Family Member" style={{marginVertical: 20}}></SubmitButton>
                </AppForm>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    fieldText: {
        fontSize: FontSize.caption,
        fontFamily: "semibold",
        color: Colors.grey,
        marginVertical: 5,
    },
})

export default AddFamilyMember;