import { useNavigation } from '@react-navigation/core'
import React from 'react';
import { Image, KeyboardAvoidingView, ScrollView, Platform, StyleSheet, TouchableHighlight, View} from 'react-native';
import * as Yup from 'yup';

import colors from '../constants/Colors';
import {AppForm, AppFormField, SubmitButton} from '../components/formsDWI';
import OrangeButton from '../components/OrangeButton';
import SemiboldText from '../components/SemiboldText';
import Register from './Register'

//const navi = useNavigation()

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(7).label("Password")
})

function cueRegister(props) {
    console.log("HEEEY")
    //useNavigation().replace("Register")
}

function Login(props) {
    return (
    <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.view}
    >
        <View style={styles.logoNameContainer}>
            <Image source={require('../assets/images/logoName.png')} style={{ width: 240, height: 240,  marginVertical: 20}} />
        </View>
        <SemiboldText>Sign In</SemiboldText>
        <AppForm
            initialValues={{email: '', password: ''}}
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
            <OrangeButton style={{marginVertical: 20}} onPress={() => console.log("pressed login")} >Log in</OrangeButton>
        </AppForm>
        <View style={styles.registerTextContainer}>
            <SemiboldText> New to Nurtue?</SemiboldText>
            <TouchableHighlight underlayColor={null} onPress={() => cueRegister()}>
                <SemiboldText style={{ color:colors.green }}>  Sign Up </SemiboldText>
            </TouchableHighlight>
        </View>
    </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    logoNameContainer: {
        //marginTop: 80,
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
    registerTextContainer: {
        flexDirection: "row",
        paddingTop: "5%",
        justifyContent: "center",
        alignContent: "center",
    }
})

export default Login;