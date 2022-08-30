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
import OrangeButton from '../components/OrangeButton';
import { LoginStackScreenProps } from '../types/navigation';


// const validationSchema = Yup.object().shape({
//     name: Yup.string().required().label("Name"),
// })

const authorRoles = [
    "Mom",
    "Dad",
    "Parent",
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


const OnboardingParent: React.FC<LoginStackScreenProps<"OnboardingParent">> = ({
    navigation,
    route,
}) => { 
    return (
        <KeyboardAvoidingView>
        <ScrollView>
            <SafeAreaView style={styles.container}>

                <Text style={{fontFamily: "semibold", fontSize: FontSize.emphasis, color: colors.grey, marginTop: 30, marginBottom: 20}}>Tell us about yourself.</Text>
                <Text style={styles.text}>What's your name?</Text>
                <AppTextInput style={{fontFamily: "light", textAlign: "left", width: "100%"}} color="lightblue" placeholder="Preferred Name"/>

                <Text style={styles.text}>You are a...</Text>               
                <AppFormPicker array={authorRoles}/>

                <Text style={styles.text}>Select all that apply to you.</Text>
                <Text style={[styles.text, {fontSize: FontSize.caption}]}>Adding these helps all our users find relatable community posts.</Text>
                <AppFormPicker array={familyDynamics}/>

            
                <OrangeButton style={{marginVertical: 20}} onPress={() => navigation.push("OnboardingChild")}>Continue</OrangeButton>

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
        marginHorizontal: 17
    },
    text: {
        fontSize: FontSize.normal,
        color: colors.grey,
        textAlign: "center",
        marginVertical: 5,
    },
})

export default OnboardingParent;