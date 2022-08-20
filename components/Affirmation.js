import React from 'react';
import { Text, StyleSheet } from 'react-native'

import FontSize from "../constants/FontSize";
import affirmations from "../constants/Affirmations"

function getRandomAff() {
  var aff = affirmations[Math.floor(Math.random()*affirmations.length)]
  console.log(aff)
  return aff
}

function Affirmation(props) {
    return (
        //<Text style={styles.affirmationText}>Step up to the plate.</Text>
        // <Text style={styles.greeting}>{`${getRandomAff()}, ${
        //     user.name
        //   }!`}</Text>
        <Text style={styles.affirmationText}>{`${getRandomAff()}`}</Text>
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