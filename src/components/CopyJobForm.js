import React from 'react'
import AutoComplete from 'material-ui/AutoComplete';
import axios from 'axios';
import lodash from 'lodash';
import TextField from 'material-ui/TextField';
import RemoveJobButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import AddBoxIcon from 'material-ui/svg-icons/content/add-box';
import AddJobButton from 'material-ui/FlatButton';
import {stringHelpers} from '../helpers/stringHelpers';
import { GET_LIST, UPDATE } from 'admin-on-rest';
import restClient from '../restClient';
import Snackbar from 'material-ui/Snackbar';

class CopyJobForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item_number: 0,
            blank_number: 0,
            copy_jobs: [],
            done: false,
            errors: {},
            loading: false,
            items: [],
            jobs: [],
            open_snackbar: false,
            snackbar_message: '',
            type: props.type,
            blanks: []
        };
    }

    fetchItems = () => restClient(GET_LIST, 'item-list-only', {pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' }});

    fetchBlanks = () => restClient(GET_LIST, 'blank-list-only', {pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' }});

    fetchJobs = () => restClient(GET_LIST, 'job-list-only', {pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' }});

    handleSnackbarClose = () => this.setState({open_snackbar: false, snackbar_message: ''});
    componentDidMount() {
      if(this.state.type === 'item') {
        axios.all([this.fetchItems(), this.fetchJobs()])
            .then(axios.spread((item, job) => {
                const items = item.data.map(item => `${item.item_number} - ${item.description}`);
                const jobs = job.data.map(job => `${job.job_number} - ${job.description}`);
                this.setState({items, jobs});
            }));
      } else {
        axios.all([this.fetchBlanks(), this.fetchJobs()])
            .then(axios.spread((blank, job) => {
                const blanks = blank.data.map(blank => `${blank.blank_number} - ${blank.description}`);
                const jobs = job.data.map(job => `${job.job_number} - ${job.description}`);
                this.setState({blanks, jobs});
            }));
      }

    }

    componentWillMount() {
        let {copy_jobs, jobs} = this.props.data;
        const fieldsToPick = ['job_listing_id', 'hour_per_piece', 'description'];
        if (typeof(jobs) === 'object') {
          copy_jobs = jobs.filter((obj) => obj.selected).map((obj) => lodash.pick(obj, fieldsToPick));
          this.setState({copy_jobs});
        }

    }


    handleAddNewJob = () => {
        this.setState({
            copy_jobs: this.state.copy_jobs
                .concat([{job_listing_id: '', hour_per_piece: ''}])
        });
    };

    handleRemoveJob = (jobIndex) => () => {
        this.setState({
            copy_jobs: this.state.copy_jobs.filter((job, index) => jobIndex !== index)
        });
    };


    handleJobFieldChange = (jobIndex) => (event, value) => {
        const newJob = this.state.copy_jobs.map((job, index) => {
            if (jobIndex !== index) return job;
            return {...job, [event.target.name]: value};
        });

        this.setState({copy_jobs: newJob});
    };

    handleJobFieldSelectChange = (jobIndex) => (value) => {
        const newJob = this.state.copy_jobs.map((job, index) => {
            if (jobIndex !== index) return job;
            value = stringHelpers.extractLeadingNumber(value);
            job.job_listing_id = value;
            return {...job, value};
        });

        this.setState({copy_jobs: newJob});
    };

    submit = (dialogClose) => {
        const payload = this.state.type === 'item' ? lodash.pick(this.state, ['item_number', 'copy_jobs']) : lodash.pick(this.state, ['blank_number', 'copy_jobs']);
        var type_id = this.state.type === 'item' ? payload.item_number : payload.blank_number;
        var eventAction = this.state.type === 'item' ? 'update-item-jobs-only' : 'update-blank-jobs-only';

        if (type_id === 0) {
          this.setState({open_snackbar: true, snackbar_message: 'Please select '+ this.state.type +' number'});
          return false;
        }

        restClient(UPDATE, eventAction, {
            id: type_id,
            data: payload,
        })
        .then(response => {
            this.setState({open_snackbar: true, snackbar_message: 'Jobs copied successfully'});

            if (type_id === this.props.data.id) {
                window.location.reload();
            }
            setTimeout(() => {dialogClose();}, 700);
          }
        );
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

    render() {
        const form = (
            <form onSubmit={this.submitForm}>
                <AutoComplete
                    floatingLabelText={`Type the ${this.state.type} number`}
                    filter={AutoComplete.fuzzyFilter}
                    dataSource={this.state.type === 'item' ? this.state.items : this.state.blanks}
                    maxSearchResults={5}
                    onUpdateInput={(item_description) => {
                      if (this.state.type === 'item') {
                        this.setState({
                            item_number: stringHelpers.extractLeadingNumber(item_description)
                        })
                      } else {
                        this.setState({
                            blank_number: stringHelpers.extractLeadingNumber(item_description)
                        })
                      }

                    }}
                    fullWidth={true}
                />
                <br /><br />
                <AddJobButton label="Add Job" icon={<AddBoxIcon />  }
                              onTouchTap={this.handleAddNewJob}
                              primary/>
                <br /><br />
                { this.state.copy_jobs.map(this.jobField) }

                <Snackbar
                  open={this.state.open_snackbar}
                  message={this.state.snackbar_message}
                  autoHideDuration={4000}
                  onRequestClose={this.handleSnackbarClose}
                />
            </form>
        );

        return ( <div> { form } </div> )
    }
}

export {CopyJobForm}
