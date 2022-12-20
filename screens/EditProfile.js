import React from 'react';
import { View, StyleSheet, SafeAreaView, KeyboardAvoidingView, Text } from 'react-native';
import BlueRingView from '../components/BlueRingView';
import FormImagePicker from '../components/formsDWI/FormImagePicker';
import AppTextInput from '../components/AppTextInputDWI';
import AppFormPicker from '../components/formsDWI/AppFormSelectOne';
import FontSize from '../constants/FontSize';
import AppText from '../components/Text';
import { AppForm } from '../components/formsDWI';
import OrangeButton from '../components/OrangeButton';
import Colors from '../constants/Colors';
import { ProfileStackScreenProps } from '../types/navigation';
import { ProfileStack } from '../navigation/Profile';
import { ScrollView } from 'react-native';


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

function handleBack(navigation) {
    console.log("Go back to the profile page")
}

const EditProfile: React.FC<ProfileStackScreenProps<"EditProfile">> = ({
    navigation,
    route,
}) => { 
    return (
        <ScrollView style={styles.container}>
            <KeyboardAvoidingView>

                <AppForm>
                    <View style={{justifyContent: "center", alignItems: "center"}}>
                        <FormImagePicker name={"pfp"}/>
                        <Text style={styles.fieldText}>Change Profile Photo</Text>
                    </View>

                    <AppText style={styles.fieldText}>My Name</AppText>
                    <AppTextInput style={{fontFamily: "light", textAlign: "left", width: "100%"}} color="lightblue" placeholder="Preferred Name"/>

                    <AppText style={styles.fieldText}>I identify as...</AppText>               
                    <AppFormPicker 
                        array={authorGender}
                    />

                    <AppText style={styles.fieldText}>My Family Dynamics</AppText>
                    <AppText style={[styles.fieldText, {fontSize: 12, marginBottom: 15}]}>Select all that apply.</AppText>
                    <AppFormPicker 
                        array={familyDynamics}
                    />

                    <OrangeButton style={{marginTop: 20}} onPress={() => handleBack(navigation)}>Looks Good</OrangeButton>

                </AppForm>

            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    fieldText: {
        fontSize: FontSize.caption,
        fontFamily: "semibold",
        color: Colors.grey,
        marginVertical: 5,
    },
})

export default EditProfile;