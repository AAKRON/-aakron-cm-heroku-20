import React from 'react';
import axios from 'axios';
import {Create, TextInput, SimpleForm, NumberInput, AutocompleteInput} from 'admin-on-rest/lib/mui'
import AutoComplete from 'material-ui/AutoComplete';
import { GET_LIST } from 'admin-on-rest';
import restClient from '../../restClient';

const validateCreate = (fields) => {
    const errors = {};
    for (const field of ['item_number', 'description']) {
        if (!fields[field]) {
            let field_name = field.split('_').join(' ');
            errors[field] = [`${field_name} cannot be blank!`];
        }
    }
    return errors;
};

export class  ItemCreate extends React.Component {
	constructor(props) {
			super(props);
			this.state = {
					boxes: [],
					item_types: [],
			};
	}

	fetchBoxes = () => restClient(GET_LIST, 'box-list-only', {pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' }});
	fetchItemTypes = () => restClient(GET_LIST, 'item-type-list-only', {pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' }});

	componentDidMount() {
		axios.all([this.fetchBoxes(), this.fetchItemTypes()])
				.then(axios.spread((box, item_type) => {
						const boxes = box.data.map(box => ({id: box.id, name: box.name}));
						const item_types = item_type.data.map(box => ({id: box.type_number, name: box.description}));
						this.setState({boxes, item_types});
				}));
	}

	render () {
			return(
				<Create invalid={true} validation={validateCreate} {...this.props}>
		        <SimpleForm>
                <NumberInput source='item_number'/>
                <TextInput source='description'/>
								<AutocompleteInput source="box_id" choices={this.state.boxes} filter={AutoComplete.fuzzyFilter} translateChoice={false} />
								<AutocompleteInput source="item_type_id" choices={this.state.item_types} filter={AutoComplete.fuzzyFilter} translateChoice={false} />
						</SimpleForm>
				</Create>
			)
	}
}
