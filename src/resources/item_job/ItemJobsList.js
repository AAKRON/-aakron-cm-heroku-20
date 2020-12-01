import React from 'react';
import { List, Datagrid, EditButton, TextField } from 'admin-on-rest/lib/mui';
import { ItemJobFilter } from './ItemJobFilter';


export const ItemJobsList = (props) => (
    <List title="Items and Job" filters={<ItemJobFilter />} sort={{ field: 'item_number', order: 'ASC' }} {...props}>
        <Datagrid>
            <TextField source='item_number' />
            <TextField source='description' />
            <TextField source='number_of_jobs' />
            <EditButton />
        </Datagrid>
    </List>
);
