import React from 'react';
import { Edit, DisabledInput, SimpleForm, TextInput } from 'admin-on-rest/lib/mui';

const Title = ({record}) => {
    return <span>Raw Material Type { record ? `${record.name}`: '' }</span>;
};

export const RawMaterialTypeEdit = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <DisabledInput source='id' />
            <TextInput source='name' />
        </SimpleForm>
    </Edit>
);
