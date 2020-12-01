import React from 'react';
import { Filter, TextInput } from 'admin-on-rest/lib/mui';

export const ScreenFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search by screen size" source="q" alwaysOn/>
    </Filter>
);
