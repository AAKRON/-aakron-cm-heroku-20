import React from 'react';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import { Edit, ListButton, SimpleForm, DisabledInput } from 'admin-on-rest/lib/mui';
import { CopyJobModal } from '../../components/CopyJobModal';
import JobTable from '../../components/JobTable';

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

const PostEditActions = ({ basePath, data, refresh }) => (
    <CardActions style={cardActionStyle}>
        <ListButton basePath={basePath} />
        <FlatButton primary label="Refresh" onClick={refresh} icon={<NavigationRefresh />} />
        { localStorage.getItem('role') === 'admin' &&
          <CopyJobModal data={data} type="item" submitForm={() => 1}/>
        }
    </CardActions>
);

export const ItemJobEdit = (props) => (
    <Edit title='' actions={<PostEditActions />} {...props}>
  		<SimpleForm>
        <DisabledInput source='id' />
        <DisabledInput source='item_number' label='Item Number'/>
        <DisabledInput source='description' label="Description"/>
  		  <JobTable />
  		</SimpleForm>
    </Edit>
);
