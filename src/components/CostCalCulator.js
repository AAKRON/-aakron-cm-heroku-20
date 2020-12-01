import React from "react";
import AutoComplete from 'material-ui/AutoComplete';
import axios from 'axios';
import lodash from 'lodash';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import AddIcon from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import ContentSave from 'material-ui/svg-icons/content/save';
import RaisedButton from 'material-ui/RaisedButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import {stringHelpers} from '../helpers/stringHelpers';
import { GET_LIST, UPDATE } from 'admin-on-rest';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';
import restClient from '../restClient';
import {SERVER_URL} from '../config';

const downloadPath = `${SERVER_URL}/cost-pdf-download`;

const style = {
  textAlign: 'center',
  display: 'inline-block',
  marginTop: "20px"
};
const textCenterAlign = {
  textAlign: 'center',
  textOverflow: 'inherit'
};
const textRightAlign = {
  textAlign: 'right',
  textOverflow: 'inherit'
};
const rightColumnBorder = {
  borderRight: '1px solid #ccc',
  textOverflow: 'inherit'
}

const buttonStyle = {

}
const requiredMessage = "This field is required.";

export default class CostCalCulator extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        blank_dialog_open: false,
        job_dialog_open: false,
        item_name: '',
        blank:[],
        blanks: [],
        error_blank:[{name: '', cost: ''}],
        job:[],
        jobs: [],
        error_job:[{job_listing_id: '', hour_per_piece: ''}],
        selected_jobs: [],
        screens: [],
        box: [{name: '', cost: 0.00}],
        ink_cost: '',
        total_cost: ''
      };
  }

  fetchJobs = () => restClient(GET_LIST, 'job-list-only', {pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' }});

  componentDidMount() {
    axios.all([this.fetchJobs()])
        .then(axios.spread((job) => {
            this.setState({jobs: job.data.map(job => `${job.job_number} - ${job.description}`)});
        }));
  }

  handleBlankDialogOpen = () => this.setState({blank_dialog_open: true});

  handleBlankDialogClose = () => this.setState({blank_dialog_open: false});

  handleJobDialogOpen = () => this.setState({job_dialog_open: true});

  handleJobDialogClose = () => this.setState({job_dialog_open: false});

  handleItemNameFieldChange = (event, value) => {
    this.setState({item_name: value});
  };

  //Start Blank Feature
  handleSaveBlank = () => {
    if(this.validateBlank()) {
      var blanks = this.state.blanks;

      if (typeof(this.state.blank.blankIndex) !== 'undefined' && typeof(this.state.blank.blankIndex) !== '') {
        blanks[this.state.blank.blankIndex] = this.state.blank;
      } else {
        blanks = blanks.concat(this.state.blank)
      }
      this.setState({ blanks: blanks });

      this.setState({blank: {}, error_blank:{name: '', cost: ''}});

      this.handleTotalCost('blank', blanks);
      this.handleBlankDialogClose();
    }

  };

  handleAddBlank = () => {
    this.setState({blank: {}, error_blank:{name: '', cost: ''}});
    this.handleBlankDialogOpen()
  };

  handleEditBlank = (blankIndex) => () => {
    this.setState({blank: {...this.state.blanks[blankIndex], blankIndex: blankIndex}});
    this.handleBlankDialogOpen()
  };

  handleRemoveBlank = (blankIndex) => () => {
      var blanks = this.state.blanks.filter((blank, index) => blankIndex !== index);
      this.setState({
          blanks: blanks
      });

      this.handleTotalCost('blank', blanks);
  };

  handleBlankTextFieldChange = (event, value) => {
      this.setState({error_blank: {...this.state.error_blank, [event.target.name]: (value == '' ? requiredMessage : "")}});
      this.setState({blank: {...this.state.blank, [event.target.name]: value}});
  };

  validateBlank = () => {
    if (typeof(this.state.blank.name) === 'undefined' && typeof(this.state.blank.cost) === 'undefined') {
      this.setState({error_blank: {name: requiredMessage, cost: requiredMessage}});
      return false;
    } else if (typeof(this.state.blank.name) === 'undefined' || this.state.blank.name === '') {
      this.setState({error_blank: {...this.state.error_blank, name: requiredMessage}});
      return false;
    } else if (typeof(this.state.blank.cost) === 'undefined' || this.state.blank.cost === '') {
      this.setState({error_blank: {...this.state.error_blank, cost: requiredMessage}});
      return false;
    }

    return true;
  }
  //End Blank Feature

  //Start Job Featue
  handleAddJob = () => {
    this.setState({job: {}, error_job:{job_listing_id: '', hour_per_piece: ''}});
    this.handleJobDialogOpen();
  };

  handleEditJob = (jobIndex) => () => {
    this.setState({job: {...this.state.selected_jobs[jobIndex], jobIndex: jobIndex}});
    this.handleJobDialogOpen()
  };

  handleRemoveJob = (jobIndex) => () => {
    var selected_jobs = this.state.selected_jobs.filter((job, index) => jobIndex !== index)
    var screens = selected_jobs.filter((job) => job.screen !== null).map((job) => job);
      this.setState({
          selected_jobs: selected_jobs,
          screens: screens
      });
  };

  handleJobFieldChange = (event, value) => {
    this.setState({error_job: {...this.state.error_job, [event.target.name]: (value == '' ? requiredMessage : "")}});
    this.setState({job: {...this.state.job, [event.target.name]: value}});
  };

  handleJobFieldSelectChange = (value) => {
      value = stringHelpers.extractLeadingNumber(value);

      if(value > 0) {} else {value = ''}

      this.setState({error_job: {...this.state.error_job, job_listing_id: (value == '' ? requiredMessage : "")}});
      this.setState({job: {...this.state.job, job_listing_id: value}});
  };

  handleSaveJob = () => {
    if (this.validateJob()) {

        restClient(UPDATE, 'job-cost-calculate', {
            id: this.state.job.job_listing_id,
            data: this.state.job,
        })
        .then(response => {
          var selected_jobs = this.state.selected_jobs;

          if (typeof(this.state.job.jobIndex) !== 'undefined' && typeof(this.state.job.jobIndex) !== '') {
            selected_jobs[this.state.job.jobIndex] = response.data;
          } else {
            selected_jobs = selected_jobs.concat(response.data)
          }

          var screens = selected_jobs.filter((job) => job.screen !== null).map((job) => job);

          this.setState({ selected_jobs: selected_jobs, screens: screens });

          this.handleTotalCost('job', selected_jobs);
          this.handleTotalCost('screen', screens);
          this.setState({job: {}, error_job:{job_listing_id: '', hour_per_piece: ''}});
          this.handleJobDialogClose();
          }
        );
    }
  };

  validateJob = () => {
    if (typeof(this.state.job.job_listing_id) === 'undefined' && typeof(this.state.job.hour_per_piece) === 'undefined') {
      this.setState({error_job: {job_listing_id: requiredMessage, hour_per_piece: requiredMessage}});
      return false;
    } else if (typeof(this.state.job.job_listing_id) === 'undefined' || this.state.job.job_listing_id === '') {
      this.setState({error_job: {...this.state.error_job, job_listing_id: requiredMessage}});
      return false;
    } else if (typeof(this.state.job.hour_per_piece) === 'undefined' || this.state.job.hour_per_piece === '') {
      this.setState({error_job: {...this.state.error_job, hour_per_piece: requiredMessage}});
      return false;
    }

    return true;
  }
  //End Job Featue

  handleBoxTextFieldChange = (event, value) => {
    var box = this.state.box
    if (event.target.name == 'name') {
      box[0].name = value
    } else {
      box[0].cost = value
    }
    this.setState({box: box});
    this.handleTotalCost('box', value)
  };

  handleInkTextFieldChange = (event, value) => {
    this.setState({ink_cost: value});
    this.handleTotalCost('ink', value)
  };

  handleDownloadInvoice = () => {
    axios.post(downloadPath, {data : lodash.pick(this.state, ['item_name', 'blanks', 'selected_jobs', 'screens', 'box', 'ink_cost', 'total_cost'])}).then((response) => {
      window.open(`${SERVER_URL}/download/item_cost_invoice`, '_blank');
    });
  };

  handleTotalCost = (cost_factor, factor) => {
    var total_cost = 0.00;

    var blanks = cost_factor === 'blank' ? factor : this.state.blanks;
    var selected_jobs = cost_factor === 'job' ? factor : this.state.selected_jobs;
    var screens = cost_factor === 'screen' ? factor : this.state.screens;
    var box_cost = cost_factor === 'box' ? factor : this.state.box[0].cost;
    var ink_cost = cost_factor === 'ink' ? factor : this.state.ink_cost;

    blanks.forEach(function(blank){
      total_cost = total_cost + Number(blank.cost)
    });

    selected_jobs.forEach(function(job){
      total_cost = total_cost + Number(job.total_pricing_cost)
    });

    screens.forEach(function(element){
      total_cost = total_cost + Number(element.screen.cost)
    });

    if (box_cost > 0) {
      total_cost = total_cost + Number(box_cost)
    }

    if (ink_cost > 0) {
      total_cost = total_cost + Number(ink_cost)
    }

    this.setState({total_cost: total_cost.toFixed(5)});
  };

  blankField = (blank, blankIndex) =>{
    return (
      <TableRow key={blankIndex}>
        <TableRowColumn colSpan={6}>{blank.name}</TableRowColumn>
        <TableRowColumn style={textRightAlign}>${blank.cost}</TableRowColumn>
        <TableRowColumn style={{paddingLeft:0}}>
          <IconButton onClick={this.handleEditBlank(blankIndex)} style={buttonStyle}><ContentCreate /></IconButton>
          <IconButton onClick={this.handleRemoveBlank(blankIndex)} style={buttonStyle}><DeleteIcon /></IconButton>
        </TableRowColumn>
        <TableRowColumn style={textRightAlign}><b>${blank.cost}</b></TableRowColumn>
      </TableRow>
    )
  };

  jobField = (job, jobIndex) =>{
    return (
      <TableRow key={jobIndex}>
        <TableRowColumn colSpan={3}>{job.job_number} - {job.description}</TableRowColumn>
        <TableRowColumn style={textRightAlign}>${job.wages_per_hour}</TableRowColumn>
        <TableRowColumn style={textCenterAlign}>{job.hour_per_piece}</TableRowColumn>
        <TableRowColumn style={textRightAlign}>${job.direct_labor_cost}</TableRowColumn>
        <TableRowColumn style={textRightAlign}>${job.overhead_pricing_cost}</TableRowColumn>
        <TableRowColumn style={{paddingLeft:0}}>
          <IconButton onClick={this.handleEditJob(jobIndex)} style={buttonStyle}><ContentCreate /></IconButton>
          <IconButton onClick={this.handleRemoveJob(jobIndex)} style={buttonStyle} ><DeleteIcon /></IconButton>
        </TableRowColumn>
        <TableRowColumn style={textRightAlign}><b>${job.total_pricing_cost}</b></TableRowColumn>
      </TableRow>
    )
  };

  screenField = (screen, index) =>{
    return (
          <TableRow key={index}>
            <TableRowColumn colSpan={6}>{screen.job_number} - {screen.description}</TableRowColumn>
            <TableRowColumn colSpan={2} style={textCenterAlign}>{screen.screen.screen_size}</TableRowColumn>
            <TableRowColumn style={textRightAlign}><b>${screen.screen.cost}</b></TableRowColumn>
          </TableRow>
      )
  };

  render () {
      return (
          <div style={{ marginTop: "40px" }}>
            <TextField
              hintText="Item Name"
              name="name"
              defaultValue=''
              onChange={this.handleItemNameFieldChange} />

            <Paper style={style} zDepth={2}>
              <Table selectable={false}>
                  <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                      <TableHeaderColumn colSpan={8}>
                        <b>Cost Factor</b>
                      </TableHeaderColumn>
                      <TableHeaderColumn style={textRightAlign}>
                        <b>Cost($)</b>
                      </TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody displayRowCheckbox={false}>
                    <TableRow>
                      <TableRowColumn style={rightColumnBorder} rowSpan={this.state.blanks.length + 2}>
                        Blanks
                      </TableRowColumn>
                      <TableHeaderColumn colSpan={6}>Blank</TableHeaderColumn>
                      <TableHeaderColumn style={textRightAlign} >Pricing Cost($)</TableHeaderColumn>
                      <TableHeaderColumn></TableHeaderColumn>
                    </TableRow>
                    { this.state.blanks.map(this.blankField) }
                    <TableRow>
                      <TableRowColumn colSpan={9}>
                        <FlatButton
                          label="Add Blank"
                          secondary={true}
                          icon={<AddIcon />}
                          onTouchTap={this.handleAddBlank}
                        />
                      </TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn style={rightColumnBorder} rowSpan={this.state.selected_jobs.length + 2}>
                        Jobs
                      </TableRowColumn>
                      <TableHeaderColumn colSpan={3}>Job#</TableHeaderColumn>
                      <TableHeaderColumn style={textRightAlign} >Wages($)/hr</TableHeaderColumn>
                      <TableHeaderColumn style={textRightAlign} >Hr/pcs</TableHeaderColumn>
                      <TableHeaderColumn style={textRightAlign} >Direct Labor ($)</TableHeaderColumn>
                      <TableHeaderColumn style={textRightAlign} >Pricing ($)</TableHeaderColumn>
                      <TableHeaderColumn></TableHeaderColumn>
                    </TableRow>
                    { this.state.selected_jobs.map(this.jobField) }
                    <TableRow>
                      <TableRowColumn colSpan={9}>
                        <FlatButton
                          label="Add Job"
                          secondary={true}
                          icon={<AddIcon />}
                          onTouchTap={this.handleAddJob}
                        />
                      </TableRowColumn>
                    </TableRow>
                    { typeof(this.state.screens) === 'object' && this.state.screens.length > 0 &&
                    <TableRow>
                      <TableRowColumn rowSpan={this.state.screens.length + 1} style={rightColumnBorder}>
                        Screens
                      </TableRowColumn>
                      <TableHeaderColumn colSpan={6}>Job</TableHeaderColumn>
                      <TableHeaderColumn colSpan={2} style={textCenterAlign}>Screen Name</TableHeaderColumn>
                    </TableRow>
                    }
                    { typeof(this.state.screens) === 'object' && this.state.screens.length > 0 &&
                      this.state.screens.map(this.screenField)
                    }
                    <TableRow>
                      <TableRowColumn rowSpan={2} style={rightColumnBorder}>
                        Box
                      </TableRowColumn>
                      <TableHeaderColumn colSpan={6}>Name</TableHeaderColumn>
                      <TableHeaderColumn colSpan={2} style={textCenterAlign}>Cost($)</TableHeaderColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn colSpan={6}>
                        <TextField
                          hintText="Box Name"
                          name="name"
                          defaultValue={this.state.box[0].name}
                          fullWidth={true}
                          onChange={this.handleBoxTextFieldChange}/>
                      </TableRowColumn>
                      <TableRowColumn colSpan={2} style={textCenterAlign}>
                        <TextField
                          hintText="Box Cost"
                          name="cost"
                          type="number"
                          defaultValue={this.state.box[0].cost}
                          onChange={this.handleBoxTextFieldChange}/>
                      </TableRowColumn>
                      <TableRowColumn style={textRightAlign}>
                      { this.state.box[0].cost >= 0 &&
                        <b>${this.state.box[0].cost}</b>
                      }
                      </TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn style={rightColumnBorder}>Ink Cost</TableRowColumn>
                      <TableRowColumn colSpan={2} style={textCenterAlign}>
                        <TextField
                          hintText="Ink Cost"
                          name="cost"
                          type="number"
                          defaultValue={this.state.ink_cost}
                          onChange={this.handleInkTextFieldChange}/>
                      </TableRowColumn>
                      <TableRowColumn colSpan={7} style={textRightAlign}>
                      { this.state.ink_cost !== '' &&
                        <b>${this.state.ink_cost}</b>
                      }
                      </TableRowColumn>
                    </TableRow>
                    <TableRow>
                      <TableRowColumn colSpan={9} style={textRightAlign} ><b>Total Price Cost($)</b></TableRowColumn>
                      <TableRowColumn style={textRightAlign}>
                        { this.state.total_cost !== '' &&
                          <b>${this.state.total_cost}</b>
                        }
                      </TableRowColumn>
                    </TableRow>
                  </TableBody>
              </Table>

              <RaisedButton
                  type="submit"
                  label="Download Invoice"
                  icon={<FileFileDownload />}
                  onClick={this.handleDownloadInvoice}
                  primary={true}
                  style={{
                      margin: '10px 24px',
                      position: 'relative',
                      float: "right"
                  }}
              />
            </Paper>

            <Dialog
                title={`${typeof(this.state.blank.blankIndex) !== 'undefined' ? 'Edit' : 'Add'} Blank Detail`}
                modal={false}
                open={this.state.blank_dialog_open}
                onRequestClose={this.handleBlankDialogClose}
                autoScrollBodyContent={true}
            >
              <Table selectable={false} style={{marginTop:"10px"}}>
                <TableBody displayRowCheckbox={false}>
                  <TableRow>
                    <TableRowColumn>
                      <TextField
                        hintText="Blank Name"
                        floatingLabelText="Blank Name"
                        name="name"
                        defaultValue={typeof(this.state.blank.name) !== 'undefined' ? this.state.blank.name : ''}
                        errorText={this.state.error_blank.name}
                        onChange={this.handleBlankTextFieldChange}/>
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                        hintText="Blank Price Cost($)"
                        floatingLabelText="Blank Price Cost($)"
                        name="cost"
                        type="number"
                        defaultValue={typeof(this.state.blank.cost) !== 'undefined' ? this.state.blank.cost : ''}
                        errorText={this.state.error_blank.cost}
                        onChange={this.handleBlankTextFieldChange}
                      />
                    </TableRowColumn>
                  </TableRow>
                </TableBody>
              </Table>
              <RaisedButton
                  type="submit"
                  label="Save"
                  icon={<ContentSave />}
                  onClick={this.handleSaveBlank}
                  primary={true}
                  style={{
                      margin: '10px 24px',
                      position: 'relative',
                  }}
              />
            </Dialog>

            <Dialog
                title={`${typeof(this.state.job.jobIndex) !== 'undefined' ? 'Edit' : 'Add'} Job Detail`}
                modal={false}
                open={this.state.job_dialog_open}
                onRequestClose={this.handleJobDialogClose}
                autoScrollBodyContent={true}
            >
              <Table selectable={false} style={{marginTop:"10px"}}>
                <TableBody displayRowCheckbox={false}>
                  <TableRow>
                    <TableRowColumn>
                      <AutoComplete
                          floatingLabelText="Type the job number"
                          errorText={this.state.error_job.job_listing_id}
                          filter={AutoComplete.fuzzyFilter}
                          dataSource={this.state.jobs}
                          name="job_listing_id"
                          maxSearchResults={5}
                          onUpdateInput={this.handleJobFieldSelectChange}
                          fullWidth={false}
                          searchText={typeof(this.state.job.job_listing_id) !== 'undefined' && typeof(this.state.job.description) !== 'undefined' ? (this.state.job.job_listing_id  + ' - ' + this.state.job.description) : ''}
                      />
                    </TableRowColumn>
                    <TableRowColumn>
                      <TextField
                          hintText="Hour Per Piece"
                          floatingLabelText="Hour Per Piece"
                          errorText={this.state.error_job.hour_per_piece}
                          name="hour_per_piece"
                          type="number"
                          onChange={this.handleJobFieldChange}
                          defaultValue={typeof(this.state.job.hour_per_piece) !== 'undefined' ? this.state.job.hour_per_piece : ''}
                      />
                    </TableRowColumn>
                  </TableRow>
                </TableBody>
              </Table>
              <RaisedButton
                  type="submit"
                  label="Save"
                  icon={<ContentSave />}
                  onClick={this.handleSaveJob}
                  primary={true}
                  style={{
                      margin: '10px 24px',
                      position: 'relative',
                  }}
              />
            </Dialog>
          </div>
      );
    }
}
