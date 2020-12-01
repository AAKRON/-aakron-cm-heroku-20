import React from 'react';
import { Filter, TextInput } from 'admin-on-rest/lib/mui';

export const BoxFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search by box name" source="q" alwaysOn/>
    </Filter>
);
