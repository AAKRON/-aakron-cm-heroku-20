import React from 'react';
import {Create, TextInput, SimpleForm } from 'admin-on-rest/lib/mui'

export const VendorCreate = (props) => (
    <Create {...props}>
        <SimpleForm invalid={true}>
            <TextInput source='name' />
            <TextInput source='code' />
        </SimpleForm>
    </Create>
);
