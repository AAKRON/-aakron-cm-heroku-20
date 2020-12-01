import React from 'react';
import { EditButton, Filter, List, Datagrid, TextField, TextInput } from 'admin-on-rest/lib/mui';

const FilterSearch = (props) => (
    <Filter {...props}>
        <TextInput label="Search by unit name" source="q" alwaysOn/>
    </Filter>
);
export const UnitsOfMeasureList = (props) => (
    <List title="Units Of Measures" sort={{ field: 'id', order: 'ASC' }}  filters={<FilterSearch />} {...props}>
        <Datagrid>
            <TextField source='id' />
            <TextField source='name' />
            <TextField source='abbr' />
            <EditButton />
        </Datagrid>
    </List>
);
