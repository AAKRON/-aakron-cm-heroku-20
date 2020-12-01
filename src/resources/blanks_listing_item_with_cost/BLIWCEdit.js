import React from 'react';
import { Edit, DisabledInput, SimpleForm, NumberInput } from 'admin-on-rest/lib/mui';

const BLIWCTitle = ({record}) => {
	return <span>Blank List Item With Cost #{ record ? `${record.id}`: '' }</span>;
};

export const BLIWCEdit = (props) => (
    <Edit title={<BLIWCTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source='id' />
            <NumberInput source='item_number'/>
            <NumberInput source='blank_number'/>
        </SimpleForm>
    </Edit>
);
