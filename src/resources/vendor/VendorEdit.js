import React from 'react';
import { Edit, DisabledInput, SimpleForm, TextInput } from 'admin-on-rest/lib/mui';

const Title = ({record}) => {
    return <span>Vendor { record ? `${record.name}`: '' }</span>;
};

export const VendorEdit = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <DisabledInput source='id' />
            <TextInput source='name' />
            <TextInput source='code' />
        </SimpleForm>
    </Edit>
);
