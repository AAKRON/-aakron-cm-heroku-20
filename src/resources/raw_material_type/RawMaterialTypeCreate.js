import React from 'react';
import {Create, TextInput, SimpleForm } from 'admin-on-rest/lib/mui'

export const RawMaterialTypeCreate = (props) => (
    <Create {...props}>
        <SimpleForm invalid={true}>
            <TextInput source='name' />
        </SimpleForm>
    </Create>
);
