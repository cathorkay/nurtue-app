import React from 'react';
import { useFormikContext } from 'formik';

import OrangeButton from '../OrangeButton';

function SubmitButton({ title }) {
    const { handleSubmit } = useFormikContext();
    
    return (
        <OrangeButton style={{marginVertical: 20}} onPress={handleSubmit}>
        {title}</OrangeButton>
    );
}


export default SubmitButton;