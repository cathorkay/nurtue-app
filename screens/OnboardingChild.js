import React from 'react';
import { useState } from 'react';
import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import * as Yup from 'yup';
import DatePicker from '@react-native-community/datetimepicker';

import { AppForm, AppFormField } from '../components/formsDWI';
import AppFormSelectOne from '../components/formsDWI/AppFormSelectOne'; // why??
import SemiboldText from '../components/SemiboldText';
import Chip from '../components/Chip';
import FontSize from '../constants/FontSize';
import colors from '../constants/Colors';
import AppTextInput from '../components/AppTextInputDWI';
import Text from '../components/Text'
import OrangeButton from '../components/OrangeButton';
import { LoginStackScreenProps } from '../types/navigation';
import Colors from '../constants/Colors';
import SubmitButton from '../components/formsDWI/SubmitButton';


const childGenders = [
    "Female",
    "Male",
    "Non-binary",
    "Trans Female (MTF)",
    "Trans Male (FTM)",
    "Other",
]

const validationSchema = Yup.object().shape({
    childName: Yup.string().required().label("Name"),
    childGender: Yup.string().required().label("Gender"),
})

function handleSubmit(values, navigation) {
    console.log("TODO: Set child's name in Firestore")
    console.log("TODO: Set child's gender in Firestore")
    console.log("TODO: Set child's birthday in Firestore")
    navigation.push("Tabs")
}

const OnboardingChild: React.FC<LoginStackScreenProps<"OnboardingChild">> = ({
    navigation,
    route,
}) => { 
    return (
        <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView>
        <ScrollView>

            <AppForm
                initialValues={{childName: '', childGender: ''}}
                onSubmit={values => handleSubmit(values, navigation)} 
                validationSchema={validationSchema}
            >

                <View style={{paddingHorizontal: 20, paddingBottom: 30}}>


                <Text style={{textAlign: "center", fontFamily: "semibold", fontSize: FontSize.emphasis, color: colors.grey, marginTop: 30, marginBottom: 20}}>Tell us about your child.</Text>
                <Text style={[styles.text, {fontSize: FontSize.caption}]}>Let's start with one for now. {'\n'} You can always add more later.</Text>
                <Text style={styles.fieldText}>Name</Text>
                <AppTextInput style={{fontFamily: "light", textAlign: "left", width: "100%"}} color="lightblue" placeholder="Child's Name"/>

                <Text style={styles.fieldText}>Gender</Text>
                <AppFormSelectOne array={childGenders} name="childGender"/>

                <Text style={styles.fieldText}>Birthday</Text>
                <DatePicker value={new Date()} display="spinner"/>
                <SubmitButton  style={{marginVertical: 20}} title="Continue"/> 

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
    text: {
        fontSize: FontSize.normal,
        color: colors.grey,
        textAlign: "center",
        marginVertical: 5,
    },
    fieldText: {
        fontSize: FontSize.caption,
        fontFamily: "semibold",
        color: colors.grey,
        marginVertical: 5,
    },
})

export default OnboardingChild;