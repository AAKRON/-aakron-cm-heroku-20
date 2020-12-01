import React from 'react';
import { Filter, TextInput } from 'admin-on-rest/lib/mui';

export const Filter = (props) => (
    <Filter {...props}>
        <TextInput label="Search by blank number" source="q" alwaysOn/>
    </Filter>
);
