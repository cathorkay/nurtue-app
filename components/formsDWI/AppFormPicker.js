import React, { useState } from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';

import Chip from '../Chip';
import Text from "../Text";


function AppFormPicker({array, ...otherProps}) {
    
    let chipArr = [] 

    for (let i = 0; i < array.length; i++) {
        chipArr.push(
            <Chip 
                key={i}
                style={styles.chip}
                onPress={() => console.log("I pressed an item")}
            >{array[i]}</Chip> 
        )
    }
    
    return (
        <View style={styles.chips}>
            {chipArr}
        </View>
    );
}

const styles = StyleSheet.create({
    chips: {
        marginBottom: 20,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center"
    },
    chip: {
        marginBottom: 6,
        marginRight: 4,
    },
})

export default AppFormPicker;