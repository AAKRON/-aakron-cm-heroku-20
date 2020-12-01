import React from 'react';
import axios from 'axios';
import { Edit, DisabledInput, SimpleForm, AutocompleteInput, TextInput, NumberInput } from 'admin-on-rest/lib/mui';
import AutoComplete from 'material-ui/AutoComplete';
import { GET_LIST } from 'admin-on-rest';
import restClient from '../../restClient';
import FinalCalculationCostView from './FinalCalculationCostView';

export class  FinalCalculationEdit extends React.Component {
	constructor(props) {
			super(props);
			this.state = {
					blanks: [],
          colors: [],
          raw_materials: [],
			};

      axios.all([this.fetchBlanks(), this.fetchColors(), this.fetchRawMaterials()])
  				.then(axios.spread((blank, color, raw_material) => {
  						const blanks = blank.data.map(blank => ({id: blank.id, name: `${blank.id} - ${blank.description}`}));
              const colors = color.data.map(color => ({id: color.name, name: color.name}));
              colors.push({id:'', name: 'No Colorant'})
              const raw_materials = raw_material.data.map(raw_material => ({id: raw_material.id, name: raw_material.name}));
              this.setState({blanks, colors, raw_materials});
  				}));
  }

	fetchBlanks = () => restClient(GET_LIST, 'blank-list-only', {pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' }});

  fetchColors = () => restClient(GET_LIST, 'color-list-only', {pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' }});

  fetchRawMaterials = () => restClient(GET_LIST, 'raw-material-list-only', {pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' }});

	render () {
    	return(
				<Edit {...this.props}>
		        <SimpleForm>
		            <DisabledInput source='id' />
                { this.state.blanks.length > 0 &&
		            <AutocompleteInput source="blank_id" choices={this.state.blanks} filter={AutoComplete.fuzzyFilter} translateChoice={false} />
                }
                <NumberInput source='color_number' label='Color #'/>
                <TextInput source='color_description' />

                { this.state.raw_materials.length > 0 &&
                <AutocompleteInput source="raw_material_id" choices={this.state.raw_materials} filter={AutoComplete.fuzzyFilter} translateChoice={false} />
                }

                { this.state.colors.length > 0 &&
                <AutocompleteInput source="colorant_one" choices={this.state.colors} filter={AutoComplete.fuzzyFilter} translateChoice={false} />
                }
                <TextInput source='number_of_pieces_per_unit_one' />
                <NumberInput source='percentage_of_colorant_one' />

                { this.state.colors.length > 0 &&
		            <AutocompleteInput source="colorant_two" choices={this.state.colors} filter={AutoComplete.fuzzyFilter} translateChoice={false} />
                }
                <TextInput source='number_of_pieces_per_unit_two' />
                <NumberInput source='percentage_of_colorant_two' />
								<FinalCalculationCostView />
						</SimpleForm>
				</Edit>
			)
	}
}
