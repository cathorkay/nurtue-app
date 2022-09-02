import React from 'react';
import { StyleSheet } from 'react-native';
import { useFormikContext } from 'formik';

import OrangeButton from '../OrangeButton';

function SubmitButton({ title }) {
    const { handleSubmit } = useFormikContext();
    
    return (
        <OrangeButton style={{marginVertical: 15}} onPress={handleSubmit}>
        {title}</OrangeButton>
    );
}

export default SubmitButton;