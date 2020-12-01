import React from 'react';
import { Datagrid, EditButton, List, TextField } from 'admin-on-rest/lib/mui';
import { UserFilter } from './UserFilter'

export const UserListing = (props) => (
    <List title="All users" filters={<UserFilter />} {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="username" />
            <TextField source="role" />
            <EditButton />
        </Datagrid>
    </List>
);
