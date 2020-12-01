import React from 'react';
import {Create, TextInput, SimpleForm} from 'admin-on-rest/lib/mui'

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

export const ScreenCreate = (props) => (
    <Create {...props}>
        <SimpleForm invalid={true} validation={validateCreate}>
            <TextInput source='screen_size'/>
            <TextInput source='cost' label="Cost ($)"/>
        </SimpleForm>
    </Create>
);
