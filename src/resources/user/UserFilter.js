import React from 'react';
import { Filter, TextInput } from 'admin-on-rest/lib/mui';

export const UserFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search by username" source="q" alwaysOn/>
    </Filter>
);
