import React from 'react';
import { useState } from 'react';
import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

import { AppForm, AppFormField } from '../components/formsDWI';
import AppFormPicker from '../components/formsDWI/AppFormPicker'; // why??
import SemiboldText from '../components/SemiboldText';
import Chip from '../components/Chip';
import FontSize from '../constants/FontSize';
import colors from '../constants/Colors';
import AppTextInput from '../components/AppTextInputDWI';
import Text from '../components/Text'
import SubmitButton from '../components/formsDWI/SubmitButton';
import { LoginStackScreenProps } from '../types/navigation';
import Colors from '../constants/Colors';

import { getAuth, updateProfile } from "firebase/auth";

const auth = getAuth();

const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
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

function updateUserInfo(values, navigation) {
    const name = values["name"]
    console.log("name")
    updateProfile(auth.currentUser, {
        displayName: name
        //, photoURL: "https://example.com/jane-q-user/profile.jpg"
      }).then(() => {
        // Profile updated!
        console.log("Here is the updated name:", name)
        alert("Profile successfully updated")
        navigation.push("OnboardingChild")
        // ...
      }).catch((error) => {
        // An error occurred
        alert(error)
        // ...
      });
}


const OnboardingParent: React.FC<LoginStackScreenProps<"OnboardingParent">> = ({
    navigation,
    route,
}) => { 

    console.log(auth.currentUser.email)

    return (
        <KeyboardAvoidingView style={{
            backgroundColor: Colors.white, flex: 1}}>
        <ScrollView>
            <SafeAreaView style={styles.container}>
                
            <AppForm
                initialValues={{name: ''}}
                onSubmit={values => updateUserInfo(values, navigation)} 
                validationSchema={validationSchema}
            >

                <Text style={{fontFamily: "semibold", fontSize: FontSize.emphasis, color: colors.grey, marginTop: 30, marginBottom: 20}}>Tell us about yourself.</Text>
                <Text style={styles.text}>What's your name?</Text>
                {/* <AppTextInput 
                    style={{fontFamily: "light", textAlign: "left", width: "100%"}} 
                    color="lightblue" 
                    placeholder="Preferred Name"
                /> */}
                <AppFormField
                    autoCapitalize="true"
                    autoCorrect={false}
                    name="name"
                    placeholder="Preferred Name"
                    color="lightblue" 
                />

                <Text style={styles.text}>You are...</Text>               
                <AppFormPicker 
                    array={authorGender}
                />

                <Text style={styles.text}>Select all that apply to you.</Text>
                <Text style={[styles.text, {fontSize: FontSize.caption}]}>Adding these helps all our users find relatable community posts.</Text>
                <AppFormPicker 
                    array={familyDynamics}
                />

            
                <SubmitButton title="Continue"/>
            </AppForm>
            </SafeAreaView>
        </ScrollView>
        </KeyboardAvoidingView>
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
        marginHorizontal: 17,
    },
    text: {
        fontSize: FontSize.normal,
        color: colors.grey,
        textAlign: "center",
        marginVertical: 5,
    },
})

export default OnboardingParent;