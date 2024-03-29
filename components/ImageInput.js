import React, { useEffect } from 'react';
import { Image, View, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import Colors from '../constants/Colors';


function ImageInput({ imageUri, onChangeImage }) {
    useEffect(() => {
        requestPermission()
    }, [])

    const requestPermission = async () => {
        const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (!granted)
          alert('You need to enable permission to access the library.')
    }

    // const handlePress = () => {
    //     if (!imageUri) selectImage()
    //     else 
    //         Alert.alert('Delete', 'Are you sure you want to delete this image?', [
    //             { text: 'Yes', onPress: () => onChangeImage(null)},
    //             { text: 'No'},
    //     ])
    // }

    const selectImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0
            })
        if (!result.canceled)
            onChangeImage(result)
        } catch (error) {
            console.log("Error reading an image")
        }
  }
    
    return (
        <TouchableWithoutFeedback 
        onPress={() => selectImage()}
        >
        <View style={styles.container}>
            {!imageUri && <MaterialCommunityIcons color={"grey"} name={"camera"} size={40} />}
            {imageUri && <Image source={{uri: imageUri}} style={styles.image} />}
        </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.lightblue,
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
        height: 120,
        width: 120,
        overflow: "hidden"
    },
    image: {
        width: '100%',
        height: '100%',
    }
})

export default ImageInput;