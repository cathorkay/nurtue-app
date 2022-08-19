import React from 'react';
import { Text, StyleSheet } from 'react-native'

import FontSize from "../constants/FontSize";

const affirmations = [
    "Be what you needed when you were younger.",
    "Be a good role model.",
    "Be are confident in your parenting role.",
    "Be willing to learn and grow.",
    "Have patience.",
    "Grow together every day.",
    "Show that your love is unconditional.",
    "Make time for them.",
    "Be flexible.",
    "Tell the truth as compassionately as possible.",
    "Know your own needs and limitations.", 
    "What you do matters.",
    "Adapt your parenting to fit your child.",
    "Show up.",
    "Be involved.",
    "Show interest in their interests.",
    "Foster their independence.",
    "Be consistent.",
    "Lead by example.",
    "Respect parenting differences.",
    "Fess up when you blow it.",
    "Give specific praise.",
    "Give yourself a break.",
    "Don't accept disrespect.",
    "Exercise gratitude.",
    "Say \"I love you\" whenever you feel it, even if it's 743 times a day.",
    "Love your children equally, but treat them uniquely.",
    "Savor the moments.",
    "Inspire your child.",
    "Learn to forgive.",
    "Practice what you preach.",
    "Educate firmly and lovingly.",
]

// // ✅ read file SYNCHRONOUSLY
// function getRandomAff() {
//   var aff = affirmations[Math.floor(Math.random()*affirmations.length)]
//   console.log(aff)
//   return aff
// }

function Affirmation(props) {
    return (
        <Text style={styles.affirmationText}>Step up to the plate.</Text>
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