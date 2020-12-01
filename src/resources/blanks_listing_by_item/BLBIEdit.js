import React from 'react';
import { Edit, DisabledInput, SimpleForm, TextInput, NumberInput } from 'admin-on-rest/lib/mui';

const BLBITitle = ({record}) => {
	return <span>Blank List By Item #{ record ? `${record.id}`: '' }</span>;
};

export const BLBIEdit = (props) => (
    <Edit title={<BLBITitle />} {...props}>
        <SimpleForm>
            <DisabledInput source='id' />
            <NumberInput source='item_number' />
            <NumberInput source='blank_number' />
						<TextInput source='mult' label="Multiplication" />
						<TextInput source='div' label="Division" />
        </SimpleForm>
    </Edit>
);
