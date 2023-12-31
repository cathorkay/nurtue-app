import React, { useState } from 'react';
import { useField, useFormikContext } from 'formik';

import RNDateTimePicker from '@react-native-community/datetimepicker';

function DatePickerField({...props }) {
    const { setFieldValue } = useFormikContext();
    const [date, setDate] = useState(new Date());
    const [field] = useField(props);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setFieldValue(field.name, currentDate);
    };

    return (
        <RNDateTimePicker
            {...field}
            {...props}
            display="spinner"
            value={date}
            onChange={onChange}
        />
    );
}

export default DatePickerField;