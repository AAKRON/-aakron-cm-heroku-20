import React from 'react';
import {Create, SimpleForm, NumberInput, LongTextInput} from 'admin-on-rest/lib/mui'

export const BlankTypeCreate = (props) => (
    <Create {...props}>
        <SimpleForm invalid={true}>
            <NumberInput source='type_number'/>
            <LongTextInput source='description'/>
        </SimpleForm>
    </Create>
);
