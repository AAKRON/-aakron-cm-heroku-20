import React from 'react';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import { List, Datagrid, EditButton, TextField, CreateButton } from 'admin-on-rest/lib/mui';
import { Filter, TextInput, ChipField} from 'admin-on-rest/lib/mui';
import PriceField from '../../components/PriceField';
import { BlankExportModal } from './BlankExportModal'
const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

const BlankFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search by blank number" source="q" alwaysOn/>
    </Filter>
);

const BlankListActions = ({ basePath, data, refresh }) => (
    <CardActions style={cardActionStyle}>
        <CreateButton basePath={basePath} />
        <FlatButton primary label="Refresh" onClick={refresh} icon={<NavigationRefresh />} />
        <BlankExportModal submitForm={() => 1} />
    </CardActions>
);


export const BlankList = (props) => (
    <List title="All Blanks" actions={<BlankListActions />} sort={{ field: 'blank_number', order: 'ASC' }} filters={<BlankFilter />} {...props}>
        <Datagrid>
            <TextField source='blank_number' />
            <TextField source='description'/>
            <ChipField source='blank_type' />
            <PriceField source='cost' label="Cost($)" />
            <PriceField source='total_blank_cost_for_price' label="Price Cost($)" />
            <PriceField source='total_blank_cost_for_inventory' label="Inventory Cost($)" />
            <EditButton />
        </Datagrid>
    </List>
);
