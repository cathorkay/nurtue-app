import React from 'react';
import { Image, KeyboardAvoidingView, ScrollView, Platform, StyleSheet, TouchableHighlight, View} from 'react-native';
import * as Yup from 'yup';
import Constants from 'expo-constants'

import colors from '../constants/Colors';
import {AppForm, AppFormField, SubmitButton} from '../components/formsDWI';
import OrangeButton from '../components/OrangeButton';
import SemiboldText from '../components/SemiboldText';
import Login from './Login';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(7).label("Password"),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
})

function Register(props) {
    return (
    <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.view}
    >
        <ScrollView showsVerticalScrollIndicator={false} >
            <View style={styles.logoNameContainer}>
                <Image source={require('../assets/images/logoName.png')} style={{ width: 240, height: 240,  marginVertical: 20}} />
            </View>
            <SemiboldText>Sign Up</SemiboldText>
            <AppForm
                initialValues={{email: '', password: '', confirmPassword: ''}}
                onSubmit={values => console.log(values)}
                validationSchema={validationSchema}
            >
                <AppFormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="email"
                    keyboardType="email-address"
                    name="email"
                    placeholder="Email"
                    textContentType="emailAddress"
                />
                <AppFormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="lock"
                    name="password"
                    placeholder="Password"
                    secureTextEntry={true}
                    textContentType="password"
                />
                <AppFormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="check-bold"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    textContentType="password"
                />
                <OrangeButton style={{marginVertical: 20}} onPress={() => console.log("pressed login")} >Get Started →</OrangeButton>
            </AppForm>
            <View style={styles.insteadTextContainer}>
                <SemiboldText> Already have an account?</SemiboldText>
                <TouchableHighlight underlayColor={null} onPress={() => console.log("sign up pressed")}>
                    <SemiboldText style={{ color:colors.green }} onPress={() => console.log("cue login")}>  Log In </SemiboldText>
                </TouchableHighlight>
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    logoNameContainer: {
        marginTop: Constants.statusBarHeight,
        justifyContent: "center",
        alignItems: "center",
    },
    view: {
        paddingLeft: '9%',
        paddingRight: '9%',
        flex:1,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: colors.blue,
    },
    insteadTextContainer: {
        flexDirection: "row",
        paddingTop: "5%",
        justifyContent: "center",
        alignContent: "center",
        marginBottom: 50,
    }
})

export default Register;