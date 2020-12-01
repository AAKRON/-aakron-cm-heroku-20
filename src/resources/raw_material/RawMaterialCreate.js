import React from 'react';
import {AutocompleteInput, Create, TextInput, SimpleForm } from 'admin-on-rest/lib/mui'
import axios from 'axios';
import { GET_LIST } from 'admin-on-rest';
import restClient from '../../restClient';

export class RawMaterialCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            units_of_measures: [],
            colors: [],
            vendors: [],
            raw_material_types: [],
        };
    }

    fetchUnitsOfMeasure = () => restClient(GET_LIST, 'units-of-measure-list-only', {pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' }});
    fetchColors = () => restClient(GET_LIST, 'color-list-only', {pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' }});
    fetchVendors = () => restClient(GET_LIST, 'vendor-list-only', {pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' }});
    fetchRawMaterialTypes = () => restClient(GET_LIST, 'raw-material-type-list-only', {pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' }});

    componentDidMount() {
        axios.all([this.fetchUnitsOfMeasure(), this.fetchColors(), this.fetchVendors(), this.fetchRawMaterialTypes()])
            .then(axios.spread((response1, response2, response3, response4) => {
                const units_of_measures = response1.data.map(data => ({id: data.id, name: data.name}));
                const colors = response2.data.map(data => ({id: data.id, name: data.name}));
                const vendors = response3.data.map(data => ({id: data.id, name: data.name}));
                const raw_material_types = response4.data.map(data => ({id: data.id, name: data.name}));
                this.setState({units_of_measures, colors, vendors, raw_material_types});
            }));
    }

    render() {
        return(
        <Create {...this.props}>
            <SimpleForm>
                <TextInput source='name'/>
                <TextInput source='cost' label='Cost ($)'/>
                <AutocompleteInput source="units_of_measure_id" choices={this.state.units_of_measures} />
                <AutocompleteInput source="color_id" choices={this.state.colors} />
                <AutocompleteInput source="vendor_id" choices={this.state.vendors} />
                <AutocompleteInput source="rawmaterialtype_id" label="Raw Material Type" choices={this.state.raw_material_types} />
            </SimpleForm>
        </Create>
        )
    }
}
