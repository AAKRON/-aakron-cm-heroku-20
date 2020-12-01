import React from 'react';
import { List, Datagrid, EditButton, TextField } from 'admin-on-rest/lib/mui';
import { BoxFilter } from './BoxFilter'
import PriceField from '../../components/PriceField';


export const BoxListing = (props) => (
    <List title="All Boxes" sort={{ field: 'id', order: 'ASC' }} filters={<BoxFilter />} {...props}>
        <Datagrid>
            <TextField source='id' />
            <TextField source='name' />
            <PriceField source="cost_per_box"/>
            <EditButton />
        </Datagrid>
    </List>
);
