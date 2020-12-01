import React from 'react';
import { Edit, DisabledInput, SimpleForm, TextInput, SelectInput } from 'admin-on-rest/lib/mui';

const UserTitle = ({record}) => {
  return <span>User #{ record ? `${record.id}`: '' }</span>;
};

export const UserEdit = (props) => (
    <Edit title={<UserTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="username" />
            <SelectInput source="role" choices={[
                { id: 'admin', name: 'Admin' },
                { id: 'user', name: 'User' },
            ]} />
            <TextInput source="password" />
        </SimpleForm>
    </Edit>
);
