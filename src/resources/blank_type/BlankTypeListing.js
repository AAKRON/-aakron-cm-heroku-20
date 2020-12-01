import React from 'react';
import { Datagrid, EditButton, List, TextField } from 'admin-on-rest/lib/mui';

export const BlankTypeListing = (props) => (
    <List title="Blank Types Listing" sort={{ field: 'id', order: 'ASC' }} {...props}>
        <Datagrid>
            <TextField source='id' />
            <TextField source='type_number' />
            <TextField source='description' />
            <EditButton />
        </Datagrid>
    </List>
);
