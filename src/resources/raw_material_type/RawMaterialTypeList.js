import React from 'react';
import { EditButton, Filter, List, TextInput, Datagrid, TextField } from 'admin-on-rest/lib/mui';

const FilterSearch = (props) => (
    <Filter {...props}>
        <TextInput label="Search by name" source="q" alwaysOn/>
    </Filter>
);

export const RawMaterialTypeList = (props) => (
    <List title="Raw Material Types" sort={{ field: 'id', order: 'ASC' }} filters={<FilterSearch />} {...props}>
        <Datagrid>
            <TextField source='id' />
            <TextField source='name' />
            <EditButton />
        </Datagrid>
    </List>
);
