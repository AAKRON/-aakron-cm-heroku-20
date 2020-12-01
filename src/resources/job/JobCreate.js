import React from 'react';
import { Create, LongTextInput, SimpleForm, TextInput, NumberInput, ReferenceInput, SelectInput } from 'admin-on-rest/lib/mui'

const validateCreate = (values) => {
    const errors = {};
    for (const field of ['job_number', 'wages_per_hour', 'description']) {
        if (!values[field]) {
            let field_name = field.split('_').join(' ');
            errors[field] = [`${field_name} cannot be blank!`];
        }
    }

    return errors;
};

export const JobCreate = (props) => (
    <Create {...props}>
	   <SimpleForm invalid={true} validation={validateCreate}>
        <NumberInput source='job_number' />
        <LongTextInput source='description'/>
        <ReferenceInput label="Screen" reference="screens" source="screen_id" perPage={0} allowEmpty>
				    <SelectInput optionText="screen_size" />
				</ReferenceInput>
        <TextInput source='wages_per_hour' label='Wages/hr ($)'/>
      </SimpleForm>
    </Create>
);
