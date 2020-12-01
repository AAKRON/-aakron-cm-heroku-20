import React from 'react';
import {Create, TextInput, SimpleForm, NumberInput } from 'admin-on-rest/lib/mui'


export const ColorCreate = (props) => (
    <Create {...props}>
        <SimpleForm invalid={true}>
            <TextInput source='code' />
            <TextInput source='name' />
            <NumberInput source='cost_of_color' label='Cost($)'/>
        </SimpleForm>
    </Create>
);
