import React from 'react';
import {Create, TextInput, SimpleForm, SelectInput } from 'admin-on-rest/lib/mui'

const validateCreate = (values) => {
    const errors = {};
    for (const field of ['screen_size', 'cost']) {
        if (!values[field]) {
            let field_name = field.split('_').join(' ');
            errors[field] = [`${field_name} cannot be blank!`];
        }
    }

    return errors;
};

export const UserCreate = (props) => (
    <Create {...props}>
        <SimpleForm invalid={true} validation={validateCreate}>
            <TextInput source='username' />
            <TextInput source='password' />
            <SelectInput source="role" choices={[
                { id: 'admin', name: 'Admin' },
                { id: 'user', name: 'User' },
            ]} />
        </SimpleForm>
    </Create>
);
