import React from 'react';
import { EditButton, Filter, TextInput, List, Datagrid, TextField } from 'admin-on-rest/lib/mui';
import PriceField from '../../components/PriceField';

const FilterSearch = (props) => (
    <Filter {...props}>
        <TextInput label="Search by color name" source="q" alwaysOn/>
    </Filter>
);

export const ColorList = (props) => (
    <List title="All Colors" sort={{ field: 'id', order: 'ASC' }} filters={<FilterSearch/> } {...props}>
        <Datagrid>
            <TextField source='id' />
            <TextField source='code' />
            <TextField source='name' />
            <PriceField source='cost_of_color' label='Cost ($)'/>
            <EditButton />
        </Datagrid>
    </List>
);
