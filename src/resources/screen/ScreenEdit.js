import React from 'react';
import { Edit, DisabledInput, SimpleForm, TextInput } from 'admin-on-rest/lib/mui';

const ScreenTitle = ({record}) => {
	return <span>Screen { record ? `${record.screen_size}`: '' }</span>;
};

const validateCreate = (values) => {
	alert('11111');
    return false;
};
export const ScreenEdit = (props) => (
    <Edit title={<ScreenTitle />} validation={validateCreate} {...props}>
        <SimpleForm>
            <DisabledInput source='id' />
            <TextInput source='screen_size' />
            <TextInput source='cost' />
        </SimpleForm>
    </Edit>
);
