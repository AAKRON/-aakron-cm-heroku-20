import React from 'react';
import { Datagrid, EditButton, List, TextField } from 'admin-on-rest/lib/mui';
import { GlobalVariableFilter } from './GlobalVariableFilter'

export const GlobalVariableListing = (props) => (
    <List title="All Global Variable" {...props} filters={<GlobalVariableFilter />}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="value" />
            <EditButton />
        </Datagrid>
    </List>
);
