import React, { useState } from 'react';
import { useFormikContext } from 'formik';
import { View } from 'react-native';

import ErrorMessage from './ErrorMessage'
import ImageInput from '../ImageInput';
import BlueRingView from '../BlueRingView';

function FormImagePicker({ name }) { // passing in name of value in values
    const { errors, setFieldValue, touched, values } = useFormikContext()

    const [imageUri, setImageUri] = useState()

    const handleAdd = (result) => {
        setImageUri(result.uri)
        setFieldValue(name, result)
    }


    return (
        <>
            <BlueRingView
            style={{marginVertical: 10}}
            borderRadius={100}
            ringWidth={3}>
                <ImageInput
                    imageUri={imageUri} 
                    onChangeImage={(result) => handleAdd(result)}
                />
            </BlueRingView>
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    );
}

export default FormImagePicker;