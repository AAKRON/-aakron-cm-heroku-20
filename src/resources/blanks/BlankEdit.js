import React from 'react';
import { Edit, DisabledInput, LongTextInput, SimpleForm, NumberInput, ReferenceInput, SelectInput } from 'admin-on-rest/lib/mui';
import BlankCostView from './BlankCostView';

const Title = ({record}) => {
	return <span>Blank #{ record ? `${record.blank_number}`: '' }</span>;
};
export const BlankEdit = (props) => (
    <Edit title={<Title />} {...props}>
        <SimpleForm>
            <DisabledInput source='id' />
            <NumberInput source='blank_number' />
            <LongTextInput source='description' />
						<ReferenceInput label="Blank Type" reference="blank_types" source="blank_type_id" perPage={0}>
					     <SelectInput optionText="description" />
						</ReferenceInput>
						<NumberInput source='cost' label='Cost($)'/>
						<BlankCostView type="price" />
						<BlankCostView type="inventory" />
        </SimpleForm>
    </Edit>
);
