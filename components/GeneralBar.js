import React from 'react';
import { useFormikContext } from 'formik';

import AppTextInput from '../AppTextInput';
import ErrorMessage from './ErrorMessage';

function AppFormField({ name, ...otherProps }) {
    const {setFieldTouched, handleChange, errors, touched} = useFormikContext();
    
    return (
        <>
        <AppTextInput
            onBlur={() => setFieldTouched(name)}
            onChangeText={handleChange(name)}
            {...otherProps}
        />
                <View style={styles.container}>
            {icon && <MaterialCommunityIcons name={icon} size={20} color={defaultStyles.colors.medium} style={styles.icon}/>}
            <TextInput style={defaultStyles.text} {...otherProps} />
        </View>
        <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    );
}

export default AppFormField;