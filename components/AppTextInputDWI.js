import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons'

import colors from '../constants/Colors'

function AppTextInput({ icon, ...otherProps }) {
    return (
        <View style={styles.container}>
            {icon && <MaterialCommunityIcons name={icon} size={17} color={colors.greengrey} style={styles.icon} />}
            <TextInput style={styles.textInput} clearButtonMode="while-editing" {...otherProps} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: "white",
        borderRadius: 25,
        width: '100%',
        padding: 15,
        marginVertical: 10,
    },
    icon: {
        //marginRight: 10, 
    },
    textInput: {
        fontFamily: "light",
        textAlign: "left",
        width: "85%", // these needs to be done in a better way! not hardcoded
    }
})

export default AppTextInput;