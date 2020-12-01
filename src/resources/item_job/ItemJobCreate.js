import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import AutoComplete from 'material-ui/AutoComplete';
import {stringHelpers} from '../../helpers/stringHelpers';
import AddBoxIcon from 'material-ui/svg-icons/content/add-box';
import AddJobButton from 'material-ui/FlatButton';
import axios from 'axios';
import {SERVER_URL} from '../../config/';
import TextField from 'material-ui/TextField';
import RemoveJobButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import lodash from 'lodash';
import { GET_LIST, UPDATE } from 'admin-on-rest';
import restClient from '../../restClient';

class ItemJobCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item_number: 0,
            item_jobs: [],
            items: [],
            jobs: [],
            snackbar: {open: false, message: 'Job added successfully'}
        };
    }

    fetchItems = () => restClient(GET_LIST, 'item-list-only', {pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' }});

    fetchJobs = () => restClient(GET_LIST, 'job-list-only', {pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' }});

    componentDidMount() {
        axios.all([this.fetchItems(), this.fetchJobs()])
            .then(axios.spread((item, job) => {
                const items = item.data.map(item => `${item.item_number} - ${item.description}`);
                const jobs = job.data.map(job => `${job.job_number} - ${job.description}`);
                this.setState({items, jobs});
            }));
    }

    handleAddNewJob = () => {
        this.setState({
            item_jobs: this.state.item_jobs
                .concat([{job_listing_id: '', hour_per_piece: ''}])
        });
    };

    handleRemoveJob = (jobIndex) => () => {
        this.setState({
            item_jobs: this.state.item_jobs.filter((job, index) => jobIndex !== index)
        });
    };

    handleJobFieldChange = (jobIndex) => (event, value) => {
        const newJob = this.state.item_jobs.map((job, index) => {
            if (jobIndex !== index) return job;
            return {...job, [event.target.name]: value};
        });

        this.setState({item_jobs: newJob});
    };

    handleJobFieldSelectChange = (jobIndex) => (value) => {
        const newJob = this.state.item_jobs.map((job, index) => {
            if (jobIndex !== index) return job;
            value = stringHelpers.extractLeadingNumber(value);
            return {...job, value};
        });

        this.setState({item_jobs: newJob});
    };

    jobField = (job, jobIndex) => {
        const defaultJob = (job.job_listing_id && job.description) ? job.job_listing_id  + ' - ' + job.description  : '';

        return (
            <div key={jobIndex}>
                <AutoComplete
                    floatingLabelText="Type the job number"
                    filter={AutoComplete.fuzzyFilter}
                    dataSource={this.state.jobs}
                    name="job_listing_id"
                    maxSearchResults={5}
                    onUpdateInput={this.handleJobFieldSelectChange(jobIndex)}
                    fullWidth={false}
                    searchText={defaultJob}
                />
                &nbsp;&nbsp;
                <TextField
                    hintText="Hour Per Piece"
                    floatingLabelText="Hour Per Piece"
                    errorText=""
                    name="hour_per_piece"
                    onChange={this.handleJobFieldChange(jobIndex)}
                    defaultValue={job.hour_per_piece}
                />
                <RemoveJobButton onClick={this.handleRemoveJob(jobIndex)}>
                    <DeleteIcon />
                </RemoveJobButton>
            </div>
        );
    };

    submitForm = () => {
      const payload = lodash.pick(this.state, ['item_number', 'item_jobs']);
        axios.post(SERVER_URL + '/item_jobs', payload)
            .then(() => {
                location.replace('/#/item_jobs');
                const snackbar = this.state.snackbar;
                snackbar.open = true;
                this.setState({snackbar});
            }, (error) => {
                console.log('Bad', error.response.data)
            });
    };

    render () {
        return(
            <div>
                <Card>
                    <CardHeader title="Add Jobs to Item" />
                    <CardText>
                        <form>
                            <AutoComplete
                                floatingLabelText="Type the item number"
                                filter={AutoComplete.fuzzyFilter}
                                dataSource={this.state.items}
                                maxSearchResults={5}
                                onUpdateInput={(item_description) => {
                                    this.setState({
                                        item_number: stringHelpers
                                            .extractLeadingNumber(item_description)
                                    })
                                }}
                                fullWidth={true}
                            />
                            <br /><br />
                            <AddJobButton label="Add Job" icon={<AddBoxIcon />  }
                                          onTouchTap={this.handleAddNewJob}
                                          primary/>
                            <br /><br />

                            { this.state.item_jobs.map(this.jobField) }
                            <br /><br />


                            <RaisedButton label="Save" primary={true}
                                          onTouchTap={this.submitForm}/>

                        </form>

                    </CardText>
                </Card>

                <Snackbar
                    open={this.state.snackbar.open}
                    message={this.state.snackbar.message}
                    autoHideDuration={4000}
                    onRequestClose={() => {
                    const snackbar = this.state.snackbar;
                     snackbar.open = false; snackbar.message = '';
                     this.setState({snackbar});
                    }}
                />
            </div>
        )
    }
}

export { ItemJobCreate }
