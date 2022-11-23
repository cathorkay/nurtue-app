import React from 'react';
import { ImageBackground, Text, View, StyleSheet, Image, TouchableWithoutFeedback} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../constants/Colors'
import OrangeButton from '../components/OrangeButton';

function LetsGo(props) {

    return (

        <View style = {styles.background}>

            {/* //<Image style = {styles.logo} source = {require('../assets/logoName')}/> */}

           

            <View style = {styles.title}>

                <Text style = {styles.titleText}> Get ready to be a better parent than ever before.</Text>

            </View>

           

            <FontAwesome style = {styles.icon1} name="gears" size={24} color="black" />

            <FontAwesome style = {styles.icon2} name="gears" size={27} color="black" />

            <FontAwesome style = {styles.icon3} name="gears" size={27} color="black" />

           

            <View style = {styles.infoContainer}>

                <View style = {styles.miniContainer}>

                    <Text style = {styles.miniTitle}> Need parenting advice?</Text>

                    <Text style = {styles.description}>Join our supportive community that centers the voices of experts.</Text>

                </View>

 

                <View style = {styles.miniContainer}>

                    <Text style = {styles.miniTitle}> Have disagreements with your child?</Text>

                    <Text style = {styles.description}>Let us guide you through a step-by-step conflict resolution process and keep all your agreements in one place.</Text>

                </View>

 

                <View style = {styles.miniContainer}>

                    <Text style = {styles.miniTitle}> Want to connect better as a family?</Text>

                    <Text style = {styles.description}>Try our interactive communication exercises to approach your child's well-being with care.</Text>

                </View>

            </View>

           

           

            {/* <View style = {styles.buttonContainer}> */}

                <OrangeButton>

                    <Text style={styles.buttonText}>Let's Go!</Text>

                </OrangeButton>

            {/* </View> */}

        </View>

    );

}

 

const styles = StyleSheet.create({

    background: {

        flex: 1,

        justifyContent: "flex-end",

        alignItems: "center",

        backgroundColor: Colors.blue

    },

 

    buttonText: {

        color: "#fff",

        fontSize: 13,

       

    },

 

    buttonContainer: {

        width: "70%",

        height: 40,

        borderRadius: 50,

        backgroundColor: "#ff9966",

        position: "absolute",

        bottom: 40,

        alignItems: "center",

        justifyContent: "center"

    },

 

    description: {

        width: 250,

        marginBottom: 30,

  

    },

 

    icon1: {

        position: "absolute",

        top: 280,

        left: 32

 

    },

 

    icon2: {

        position: "absolute",

        top: 360,

        left: 32

 

    },

 

    icon3: {

        position: "absolute",

        top: 460,

        left: 32

 

    },

 

    infoContainer: {

        position: "absolute",

        top: 280,

        left: 70,

        flexDirection: "column",

        alignContent: "space-between",

    },

 

    logo: {

        width: 100,

        height: 100,

        position: "absolute",

        top: 70,

        borderRadius: 50

    },

 

    miniContainer: {

        flexDirection: "column",

       

    },

   

    miniTitle: {

        fontWeight: "bold",

        fontSize: 15,

        marginLeft: -3

    },

 

    title: {

        position: "absolute",

        top: 190,

        width: 226,

       

       

    },

 

    titleText: {

        textAlign: "center",

        fontSize: 20,

        fontWeight: "bold",

        lineHeight: 25,

        justifyContent: "flex-start"

    }

   

})

export default LetsGo;