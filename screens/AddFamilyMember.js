import React from 'react';
import { View, StyleSheet, SafeAreaView, KeyboardAvoidingView, Text, ScrollView } from 'react-native';
import BlueRingView from '../components/BlueRingView';
import FormImagePicker from '../components/formsDWI/FormImagePicker';
import AppTextInput from '../components/AppTextInputDWI';
import FontSize from '../constants/FontSize';
import AppText from '../components/Text';
import { AppForm } from '../components/formsDWI';
import DatePicker from '@react-native-community/datetimepicker';
import OrangeButton from '../components/OrangeButton';
import Colors from '../constants/Colors';
import AppFormSelectOne from '../components/formsDWI/AppFormSelectOne';
//import AppFormSelectMultiple from '../components/formsDWI/AppFormSelectMultiple';



const authorGender = [
    "Male",
    "Female",
    "Non-binary",
]
  
export const familyDynamics = [
    "Child",
    "Parent / Guardian"
] 

const handleAdd = () => {
    console.log("TODO: Add new family member in Firestore") // async
    // when that's done... go back
}

function AddFamilyMember(props) {
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView>
                <ScrollView showsVerticalScrollIndicator={false}>

                <AppForm>

                    <View style={{justifyContent: "center", alignItems: "center"}}>

                        <FormImagePicker name={"pfp"}/>
                        <Text style={styles.fieldText}>Add a Photo</Text>
                    
                    </View>

                    <AppText style={styles.fieldText}>Name</AppText>
                    <AppTextInput style={{fontFamily: "light", textAlign: "left", width: "100%"}} color="lightblue" placeholder="Family Member's Name"/>

                    <AppText style={styles.fieldText}>Role</AppText>
                    <AppFormSelectOne 
                        array={familyDynamics}
                    />

                    <AppText style={styles.fieldText}>Gender Identity</AppText>               
                    <AppFormSelectOne 
                        array={authorGender}
                    />

                    <AppText style={styles.fieldText}>Birthday</AppText>
                    <DatePicker value={new Date()} display="spinner"/>

                    <OrangeButton style={{marginVertical: 20}} onPress={handleAdd}>Add Family Member</OrangeButton>


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