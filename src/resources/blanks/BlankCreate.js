import React from 'react';
import {Create, SimpleForm, NumberInput, ReferenceInput, SelectInput, LongTextInput} from 'admin-on-rest/lib/mui'


const validateCreate = (fields) => {
    const errors = {};
    for (const field of ['blank_number', 'description', 'cost']) {
        if (!fields[field]) {
            let field_name = field.split('_').join(' ');
            errors[field] = [`${field_name} cannot be blank!`];
        }
    }
    return errors;
};

export const BlankCreate = (props) => (
    <Create {...props}>
        <SimpleForm invalid={true} validation={validateCreate}>
            <NumberInput source='blank_number'/>
            <LongTextInput source='description'/>
            <ReferenceInput label="Blank Type" reference="blank_types" source="blank_type_id" perPage={0} allowEmpty>
					     <SelectInput optionText="description" />
					  </ReferenceInput>
						<NumberInput source='cost' label='Cost($)'/>
        </SimpleForm>
    </Create>
);
