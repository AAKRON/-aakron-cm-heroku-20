import React from 'react';
import { Datagrid, EditButton, Filter, List, TextInput, TextField } from 'admin-on-rest/lib/mui';


const BlanksJobFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search by blank number" source="q" alwaysOn/>
    </Filter>
);

export const BlanksJobList = (props) => (
    <List title="Blanks and Job" sort={{ field: 'id', order: 'ASC' }} filters={<BlanksJobFilter  />} {...props}>
        <Datagrid>
            <TextField source='id' />
            <TextField source='blank_number' />
            <TextField source='description' />
            <TextField source='number_of_jobs' />
            <EditButton />
        </Datagrid>
    </List>
);
