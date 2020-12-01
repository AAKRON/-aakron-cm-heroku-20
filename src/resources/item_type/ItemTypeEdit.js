import React from 'react';
import { Edit, DisabledInput, TextInput, SimpleForm, NumberInput} from 'admin-on-rest/lib/mui';

const Title = ({record}) => {
	return <span>Item Type #{ record ? `${record.type_number}`: '' }</span>;
};
export const ItemTypeEdit = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <DisabledInput source='id' />
            <NumberInput source='type_number' />
            <TextInput source='description' />
				</SimpleForm>
    </Edit>
);
