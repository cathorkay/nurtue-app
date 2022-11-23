import React from 'react';
import { View, StyleSheet, SafeAreaView, KeyboardAvoidingView, Text, ScrollView } from 'react-native';
import BlueRingView from '../components/BlueRingView';
import FormImagePicker from '../components/formsDWI/FormImagePicker';
import AppTextInput from '../components/AppTextInputDWI';
import AppFormPicker from '../components/formsDWI/AppFormPicker';
import FontSize from '../constants/FontSize';
import AppText from '../components/Text';
import { AppForm } from '../components/formsDWI';
import DatePicker from '@react-native-community/datetimepicker';
import OrangeButton from '../components/OrangeButton';
import Colors from '../constants/Colors';



const authorGender = [
    "Male",
    "Female",
    "Non-binary",
]
  
export const familyDynamics = [
    "Child",
    "Parent / Guardian"
] 

function AddFamilyMember(props) {
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView>
                <ScrollView showsVerticalScrollIndicator={false}>

                <AppForm>

                    <View style={{justifyContent: "center", alignItems: "center"}}>

                        <BlueRingView
                        style={{marginVertical: 10}}
                        borderRadius={100}
                        ringWidth={3}>
                            <FormImagePicker name={"pfp"}/>
                        </BlueRingView>
                        <Text style={styles.fieldText}>Select Profile Photo</Text>
                    
                    </View>

                    <AppText style={styles.fieldText}>Name</AppText>
                    <AppTextInput style={{fontFamily: "light", textAlign: "left", width: "100%"}} color="lightblue" placeholder="Family Member's Name"/>

                    <AppText style={styles.fieldText}>Role</AppText>
                    <AppFormPicker 
                        array={familyDynamics}
                    />

                    <AppText style={styles.fieldText}>Gender Identity</AppText>               
                    <AppFormPicker 
                        array={authorGender}
                    />

                    <AppText style={styles.fieldText}>Birthday</AppText>
                    <DatePicker value={new Date()} display="spinner"/>

                    <OrangeButton style={{marginVertical: 20}} onPress={() => console.log("Add family member in Firestore")}>Add Family Member</OrangeButton>


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