import React from 'react';
import { Text, StyleSheet } from 'react-native'

import FontSize from "../constants/FontSize";
import affirmations from "../constants/Affirmations"

function getRandomAff() {
  return affirmations[Math.floor(Math.random()*affirmations.length)]
}

function Affirmation(props) {
    return (
        <Text style={styles.affirmationText}>{`${getRandomAff()}`}</Text>
    );
}

const styles = StyleSheet.create({
    affirmationText: {
        fontFamily: "semibold-italic",
        fontSize: FontSize.normal,
        color: "white",
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
})

export default Affirmation;