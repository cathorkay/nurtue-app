import React from 'react';
import { Text, StyleSheet } from 'react-native'

import FontSize from "../constants/FontSize";
import Affirmations from "../assets/affirmations.txt";


function Affirmation(props) {
    return (
        <Text style={styles.affirmationText}>Deez nuts!</Text>
    );
}

const styles = StyleSheet.create({
    affirmationText: {
        fontFamily: "semibold-italic",
        fontSize: FontSize.emphasis,
        color: "white",
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
})

export default Affirmation;