import React from 'react';
import { List, Datagrid, EditButton, TextField } from 'admin-on-rest/lib/mui';
import { FinalCalculationFilter } from './FinalCalculationFilter'
import PriceField from '../../components/PriceField';

export const FinalCalculationList = (props) => (
    <List title="Final Calculations" filters={<FinalCalculationFilter />} sort={{ field: 'blank_number', order: 'ASC' }} {...props}>
        <Datagrid>
            <TextField source='blank_number'/>
            <TextField source='blank_name'/>
            <TextField source='color_description' label='Color'/>
            <TextField source='raw_material' />
            <PriceField source='raw_calculated' label='Raw Calculated ($)'/>
            <PriceField source='cost_of_colorant_or_lacquer' label='Cost of Colorant ($)'/>
            <PriceField source='total' label='Total ($)'/>
            <PriceField source='ave_cost' label='Avg Cost ($)'/>
            <EditButton />
        </Datagrid>
    </List>
);
