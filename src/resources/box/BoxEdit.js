import React from 'react';
import { Edit, DisabledInput, SimpleForm, TextInput } from 'admin-on-rest/lib/mui';

const BoxTitle = ({record}) => {
    return <span>Box { record ? `${record.name}`: '' }</span>;
};
export const BoxEdit = (props) => (
    <Edit title={<BoxTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source='id' />
            <TextInput source='name' />
            <TextInput source='cost_per_box' label='Cost per box($)'/>
        </SimpleForm>
    </Edit>
);
