import React from 'react';
import { Edit, DisabledInput, LongTextInput,  SimpleForm, ReferenceInput, SelectInput, NumberInput } from 'admin-on-rest/lib/mui';

const JobTitle = ({record}) => {
	return <span>Job { record ? `${record.job_number}`: '' }</span>;
};
export const JobEdit = (props) => (
    <Edit title={<JobTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source='id' />
            <NumberInput source='job_number' />
            <LongTextInput source='description' />
						<ReferenceInput label="Screen" reference="screens" source="screen_id" perPage={0} allowEmpty>
					     <SelectInput optionText="screen_size" />
						</ReferenceInput>
            <NumberInput source='wages_per_hour'  label='Wages/hr ($)'/>
        </SimpleForm>
    </Edit>
);
