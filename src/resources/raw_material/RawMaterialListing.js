import React from 'react';
import { List, Datagrid, EditButton, TextField } from 'admin-on-rest/lib/mui';
import PriceField from '../../components/PriceField';
import { RawMaterialFilter } from './RawMaterialFilter';

export const RawMaterialListing = (props) => (
    <List title="RawMaterial Listing" filters={<RawMaterialFilter />} {...props}>
        <Datagrid>
            <TextField source='id' />
            <TextField source='name' />
            <TextField source='raw_material_type' label='Type'/>
            <TextField source='vendor' />
            <PriceField source='cost'  label='Cost ($)'/>
            <TextField source='unit' />
            <TextField source='color' />
            <EditButton />
        </Datagrid>
    </List>
);
