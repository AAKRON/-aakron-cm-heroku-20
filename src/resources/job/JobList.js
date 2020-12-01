import React from 'react';
import { List, Datagrid, EditButton, TextField, ChipField } from 'admin-on-rest/lib/mui';
import { JobFilter } from './JobFilter';
import PriceField from '../../components/PriceField';

export const JobList = (props) => (
    <List title='All Jobs' sort={{ field: 'id', order: 'ASC' }} filters={<JobFilter />} {...props}>
        <Datagrid>
            <TextField source='id' />
            <TextField source='job_number' />
            <TextField source='description' />
            <ChipField source='screen_size' />
            <PriceField source='wages_per_hour' label='Wages/hr ($)'/>
            <EditButton />
        </Datagrid>
    </List>
);
