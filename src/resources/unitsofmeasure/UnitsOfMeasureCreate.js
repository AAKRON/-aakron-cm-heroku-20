import React from 'react';
import {Create, TextInput, SimpleForm } from 'admin-on-rest/lib/mui'


export const UnitsOfMeasureCreate = (props) => (
    <Create {...props}>
        <SimpleForm invalid={true}>
            <TextInput source='name' />
            <TextInput source='abbr' />
        </SimpleForm>
    </Create>
);
