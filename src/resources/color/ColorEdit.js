import React from 'react';
import { Edit, DisabledInput, SimpleForm, TextInput, NumberInput } from 'admin-on-rest/lib/mui';

const ColorTitle = ({record}) => {
    return <span>Color #{ record ? `${record.name}`: '' }</span>;
};
export const ColorEdit = (props) => (
    <Edit title={<ColorTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source='id' />
            <TextInput source='code' />
            <TextInput source='name' />
            <NumberInput source='cost_of_color' label='Cost($)'/>
        </SimpleForm>
    </Edit>
);
