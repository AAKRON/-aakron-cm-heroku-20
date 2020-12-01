import React from 'react';
import { List, Edit, EditButton, DisabledInput, LongTextInput, ReferenceInput, SelectInput, SimpleForm, TextInput, Create, Datagrid, ReferenceField, TextField } from 'admin-on-rest/lib/mui';

export const PostList = (props) => (
    <List {...props}>
        <Datagrid>
				<ReferenceField label="User" source="userId" reference="users">
					<TextField source="name" />
				</ReferenceField>
            <TextField source="title" />
			<TextField source="body" />
        </Datagrid>
    </List>
);

const PostTitle = ({record}) => {
	return <span>Post { record ? `${record.title}`: '' } </span>
};

export const PostEdit = (props) => (
    <Edit title={<PostTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <ReferenceInput label="User" source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <LongTextInput source="body" />
        </SimpleForm>
    </Edit>
);

export const PostCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <LongTextInput source="body" />
        </SimpleForm>
    </Create>
);

