import React from 'react';
import { useState } from 'react';
import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import * as Yup from 'yup';
import DatePicker from '@react-native-community/datetimepicker';

import { AppForm, AppFormField } from '../components/formsDWI';
import AppFormPicker from '../components/formsDWI/AppFormPicker'; // why??
import SemiboldText from '../components/SemiboldText';
import Chip from '../components/Chip';
import FontSize from '../constants/FontSize';
import colors from '../constants/Colors';
import AppTextInput from '../components/AppTextInputDWI';
import Text from '../components/Text'
import OrangeButton from '../components/OrangeButton';


const childGenders = [
    "Female",
    "Male",
    "Non-binary",
    "Trans Female (MTF)",
    "Trans Male (FTM)",
    "Other",
]

function Onboarding(props) {
    return (
        <KeyboardAvoidingView>
        <ScrollView>
            <SafeAreaView style={styles.container}>

                <Text style={{textAlign: "center", fontFamily: "semibold", fontSize: FontSize.emphasis, color: colors.grey, marginTop: 30, marginBottom: 20}}>Tell us about your child.</Text>
                <Text style={[styles.text, {fontSize: FontSize.caption}]}>Let's start with one for now. {'\n'} You can always add more later.</Text>
                <Text style={styles.fieldText}>Name</Text>
                <AppTextInput style={{fontFamily: "light", textAlign: "left", width: "100%"}} color="lightblue" placeholder="Child's Name"/>

                <Text style={styles.fieldText}>Gender</Text>
                <AppFormPicker array={childGenders}/>

                <Text style={styles.fieldText}>Birthday</Text>
                <DatePicker value={new Date()} display="spinner"/>
                <OrangeButton style={{marginVertical: 20}}>Continue</OrangeButton>

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
        marginHorizontal: 17
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

export default Onboarding;