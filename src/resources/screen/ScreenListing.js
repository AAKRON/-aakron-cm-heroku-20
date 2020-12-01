import React from 'react';
import { Datagrid, EditButton, List, TextField } from 'admin-on-rest/lib/mui';
import PriceField from '../../components/PriceField';
import { ScreenFilter } from './ScreenFilter'

export const ScreenListing = (props) => (
    <List title="All screens" sort={{ field: 'id', order: 'ASC' }} filters={<ScreenFilter />} {...props}>
        <Datagrid>
            <TextField source='id' />
            <TextField source='screen_size' />
            <PriceField source='cost' label="cost ($)" />
            <EditButton />
        </Datagrid>
    </List>
);
