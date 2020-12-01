import React from 'react';
import { Filter, TextInput } from 'admin-on-rest/lib/mui';

export const RawMaterialFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search by raw material name" source="q" alwaysOn/>
    </Filter>
);
