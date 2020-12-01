import React from 'react';
import { Filter, TextInput } from 'admin-on-rest/lib/mui';

export const JobFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search by job number" source="q" alwaysOn/>
    </Filter>
);
