import React from 'react';
import {Create, SimpleForm, NumberInput, TextInput} from 'admin-on-rest/lib/mui'

export const ItemTypeCreate = (props) => (
    <Create {...props}>
        <SimpleForm invalid={true}>
            <NumberInput source='type_number'/>
            <TextInput source='description'/>
        </SimpleForm>
    </Create>
);
