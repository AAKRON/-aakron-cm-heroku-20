import React from 'react';
import { Filter, TextInput } from 'admin-on-rest/lib/mui';

export const GlobalVariableFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search by name" source="q" alwaysOn/>
    </Filter>
);
