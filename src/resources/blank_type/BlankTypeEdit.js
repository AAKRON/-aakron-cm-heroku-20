import React from 'react';
import { Edit, DisabledInput, LongTextInput, SimpleForm, NumberInput} from 'admin-on-rest/lib/mui';

const Title = ({record}) => {
	return <span>Blank Type #{ record ? `${record.type_number}`: '' }</span>;
};
export const BlankTypeEdit = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <DisabledInput source='id' />
            <NumberInput source='type_number' />
            <LongTextInput source='description' />
				</SimpleForm>
    </Edit>
);
