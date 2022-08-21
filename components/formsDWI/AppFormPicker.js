import React from 'react';
import { View, StyleSheet } from 'react-native';

import Chip from '../Chip';
import Text from "../Text";

const familyDynamics = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
] 

function AppFormPicker({array, ...otherProps}) {
    let chipArr = [] 

    for (let i = 0; i < array.length; i++) {
        chipArr.push(
            <Chip 
                key={i}
                style={styles.chip}
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