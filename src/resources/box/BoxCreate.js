import React from 'react';
import { Create, TextInput, SimpleForm } from 'admin-on-rest/lib/mui'


export const BoxCreate = (props) => (
    <Create {...props}>
        <SimpleForm invalid={true}>
            <TextInput source='name' />
            <TextInput source='cost_per_box' label='Cost per box($)'/>
        </SimpleForm>
    </Create>
);
