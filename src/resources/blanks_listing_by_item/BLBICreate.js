import React from 'react';
import {Create, TextInput, SimpleForm, NumberInput} from 'admin-on-rest/lib/mui'

export const BLBICreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <NumberInput source='item_number'/>
            <NumberInput source='blank_number'/>
            <TextInput source='mult' label="Multiplication" />
						<TextInput source='div' label="Division" />
        </SimpleForm>
    </Create>
);
