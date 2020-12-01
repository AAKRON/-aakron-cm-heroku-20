import React from 'react';
import { List, Datagrid, EditButton, TextField } from 'admin-on-rest/lib/mui';
import { BLBIFilter } from './BLBIFilter'

export const BLBIListing = (props) => (
    <List title="Blanks Listing By Item" sort={{ field: 'id', order: 'ASC' }} filters={<BLBIFilter />} {...props}>
        <Datagrid>
            <TextField source='id' />
            <TextField source='item_number' />
            <TextField source='blank_number' />
            <TextField source='mult' label="Multiplication" />
            <TextField source='div' label="Division"  />
            <EditButton />
        </Datagrid>
    </List>
);
