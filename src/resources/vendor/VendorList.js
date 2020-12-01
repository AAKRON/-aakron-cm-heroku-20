import React from 'react';
import { Filter, List, TextInput, Datagrid, EditButton, TextField } from 'admin-on-rest/lib/mui';

const FilterSearch = (props) => (
    <Filter {...props}>
        <TextInput label="Search by vendor code " source="q" alwaysOn/>
    </Filter>
);

export const VendorList = (props) => (
    <List title="All Vendors" sort={{ field: 'id', order: 'ASC' }} filters={<FilterSearch />} {...props}>
        <Datagrid>
            <TextField source='id' />
            <TextField source='name' />
            <TextField source='code' />
            <EditButton />
        </Datagrid>
    </List>
);
