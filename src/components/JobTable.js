import React from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from "material-ui/Table";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import RemoveJobButton from "material-ui/IconButton";
import DeleteIcon from "material-ui/svg-icons/action/delete-forever";
import Dialog from "material-ui/Dialog";
import { GET_LIST, UPDATE } from "admin-on-rest";
import restClient from "../restClient";
import axios from "axios";
import FlatButton from "material-ui/FlatButton";
import AutoComplete from "material-ui/AutoComplete";
import TextField from "material-ui/TextField";
import ContentCreate from "material-ui/svg-icons/content/create";
import * as _ from "lodash";

export default class JobTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "pricing",
      style: {
        inventory: { display: "none" },
        pricing: { display: "" },
      },
      item_jobs: [],
      tableBodyRenderKey: 0,
      deletedJobKey: -1,
      items: [],
      jobs: [],
      EditableJob: {},
      EditIndex: -1,
      open: false,
    };
  }
  fetchItems = () =>
    restClient(GET_LIST, "item-list-only", {
      pagination: { page: 1, perPage: -1 },
      sort: { field: "id", order: "ASC" },
    });

  fetchJobs = () =>
    restClient(GET_LIST, "job-list-only", {
      pagination: { page: 1, perPage: -1 },
      sort: { field: "id", order: "ASC" },
    });
  componentDidMount() {
    axios.all([this.fetchItems(), this.fetchJobs()]).then(
      axios.spread((item, job) => {
        const items = item.data.map(
          (item) => `${item.item_number} - ${item.description}`
        );
        const jobs = job.data.map(
          (job) => `${job.job_number} - ${job.description}`
        );
        this.setState({ items, jobs });
      })
    );
  }

  handleRemoveJob = (jobIndex) => () => {
    var currentItemJobs = this.state.item_jobs.filter(
      (job, index) => jobIndex !== index
    );
    this.state.deletedJobKey = jobIndex;

    if (currentItemJobs.length === 0) {
      if (typeof this.props.record.jobs === "object")
        this.props.record.jobs[0].deleted = true;

      this.updateItemJobs(currentItemJobs);
    } else {
      setTimeout(() => {
        this.updateItemJobs(currentItemJobs);
      }, 1);
    }
  };

  handleEditJob = async () => {
    const { EditIndex, EditableJob } = this.state;

    const tempJob = this.state.item_jobs;
    tempJob[EditIndex] = { ...EditableJob };
    this.setState({
      item_jobs: tempJob,
      open: false,
      tableBodyRenderKey: this.state.tableBodyRenderKey + 1,
    });
    //call API to update job
    // const data = restClient(UPDATE, "update-item-job-data", {
    //   item_number: 98010,
    //   job_listing_id: 3,
    //   hour_per_piece: "0.0025",
    //   item_job_id: 18583,
    // });

    if (this.props.resource === "blank_jobs") {
      console.log("blank_number", this.props.record.blank_number);
      const newdata = await axios.put(
        "https://costing-module-api-heroku-20.herokuapp.com/api/v1/update-blank-job-data",
        {
          blank_number: this.props.record.blank_number,
          job_listing_id: EditableJob.job_listing_id,
          hour_per_piece: EditableJob.hour_per_piece,
          blank_job_id: EditableJob.job_pk_id,
        },
        {
          headers: {
            Authorization: `Bearer 6539a1e806bbc2c09436b39c62615425`,
          },
        }
      );
      this.props.record.jobs = newdata;
    }
    if (this.props.resource === "item_jobs") {
      console.log("item_number", this.props.record.item_number);
      const newdata = await axios.put(
        "https://costing-module-api-heroku-20.herokuapp.com/api/v1/update-item-job-data",
        {
          item_number: this.props.record.item_number,
          job_listing_id: EditableJob.job_listing_id,
          hour_per_piece: EditableJob.hour_per_piece,
          item_job_id: EditableJob.job_pk_id,
        },
        {
          headers: {
            Authorization: `Bearer 6539a1e806bbc2c09436b39c62615425`,
          },
        }
      );
      this.props.record.jobs = newdata;
    }

    // console.log(this.props.record);
  };

  updateItemJobs = (currentItemJobs) => {
    this.setState({
      item_jobs: currentItemJobs,
      tableBodyRenderKey: this.state.tableBodyRenderKey + 1,
    });
    this.props.record.jobs = currentItemJobs;
  };

  handleChange = (event, index, value) => {
    this.setState({ value, style: this.toggleDisplay(value) });
  };

  onRowSelection = (rows) => {
    const { jobs } = this.props.record;
    jobs.forEach((job, i) => {
      job.selected = rows.indexOf(i) > -1;
      job.deleted = i === this.state.deletedJobKey;
    });
    this.setState({ deletedJobKey: -1 });
  };

  toggleDisplay = (field) => {
    return {
      inventory: { display: field === "inventory" ? "" : "none" },
      pricing: { display: field === "pricing" ? "" : "none" },
    };
  };
  toggleDialog = (index, job) => () => {
    this.setState({
      open: true,
      EditableJob: this.state.item_jobs[index],
      id: this.state.item_jobs[index].job_listing_id,
      description: this.state.item_jobs[index].description,
      EditIndex: index,
    });
  };

  hadleAutoComplete = (jobIndex) => (data) => {
    const vale = data.split(" - ");
    this.setState({
      id: vale[0],
      description: vale[1],
    });
    console.log(data);
  };

  //   handleJobFieldSelectChange = (jobIndex) => (value) => {
  //     const newJob = this.state.copy_jobs.map((job, index) => {
  //       if (jobIndex !== index) return job;
  //       value = stringHelpers.extractLeadingNumber(value);
  //       job.job_listing_id = value;
  //       return { ...job, value };
  //     });

  //     this.setState({ copy_jobs: newJob });
  //   };

  handleJobFieldChange = (jobIndex) => (event, value) => {
    const { id, description } = this.state;

    this.setState({
      EditableJob: {
        ...this.state.EditableJob,
        job_listing_id: Number(id),
        job_number: Number(id),
        description,
        [event.target.name]: value,
      },
    });
  };

  jobField = (job, index) => {
    return (
      <TableRow key={index} selected={job.selected}>
        <TableRowColumn style={{ width: "30%" }}>
          {job.job_number} - {job.description}
        </TableRowColumn>
        <TableRowColumn>${job.wages_per_hour}</TableRowColumn>
        <TableRowColumn>{job.hour_per_piece}</TableRowColumn>
        <TableRowColumn>${job.direct_labor_cost}</TableRowColumn>
        <TableRowColumn style={this.state.style.pricing}>
          ${job.overhead_pricing_cost}
        </TableRowColumn>
        <TableRowColumn style={this.state.style.inventory}>
          ${job.overhead_inventory_cost}
        </TableRowColumn>
        <TableRowColumn>
          <RemoveJobButton onClick={this.toggleDialog(index)}>
            <ContentCreate />
          </RemoveJobButton>
        </TableRowColumn>
        <TableRowColumn>
          <RemoveJobButton onClick={this.handleRemoveJob(index, job)}>
            <DeleteIcon />
          </RemoveJobButton>
        </TableRowColumn>
      </TableRow>
    );
  };
  render() {
    const { inventory, pricing } = this.state.style;
    const { EditableJob } = this.state;
    const defaultJob =
      EditableJob.job_listing_id && EditableJob.description
        ? EditableJob.job_listing_id + " - " + EditableJob.description
        : "";
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={() => this.setState({ open: false })}
      />,
      <FlatButton
        label="Update"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => {
          this.handleEditJob();
        }}
      />,
    ];

    if (
      typeof this.props.record.jobs === "object" &&
      this.props.record.jobs.length > 0 &&
      this.state.item_jobs.length === 0
    ) {
      this.state.item_jobs = this.props.record.jobs;
    }

    if (
      typeof this.state.item_jobs === "object" &&
      this.state.item_jobs.length > 0
    ) {
      return (
        <div>
          <h2>Job</h2>
          <SelectField
            floatingLabelText="Overhead Cost"
            value={this.state.value}
            onChange={this.handleChange}
          >
            <MenuItem value="inventory" primaryText="Inventory" />
            <MenuItem value="pricing" primaryText="Pricing" />
          </SelectField>
          <Dialog
            title="Edit Job"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={() => this.setState({ open: false })}
            autoScrollBodyContent={true}
          >
            <AutoComplete
              floatingLabelText="Type the job number"
              filter={AutoComplete.fuzzyFilter}
              dataSource={this.state.jobs}
              name="job_listing_id"
              maxSearchResults={5}
              //onNewRequest={this.handhadleAutoComplete}
              onUpdateInput={this.hadleAutoComplete(this.state.EditIndex)}
              fullWidth={false}
              searchText={defaultJob}
            />
            &nbsp;&nbsp;
            <TextField
              hintText="Hour Per Piece"
              floatingLabelText="Hour Per Piece"
              errorText=""
              name="hour_per_piece"
              onChange={this.handleJobFieldChange(this.state.EditIndex)}
              defaultValue={this.state.EditableJob.hour_per_piece}
            />
          </Dialog>
          <Table multiSelectable={true} onRowSelection={this.onRowSelection}>
            <TableHeader enableSelectAll={false}>
              <TableRow>
                <TableHeaderColumn style={{ width: "30%" }}>
                  Job#
                </TableHeaderColumn>
                <TableHeaderColumn>Wages($)/hr</TableHeaderColumn>
                <TableHeaderColumn>Hr/pcs</TableHeaderColumn>
                <TableHeaderColumn>Direct Labor ($)</TableHeaderColumn>
                <TableHeaderColumn style={pricing}>
                  Pricing ($)
                </TableHeaderColumn>
                <TableHeaderColumn style={inventory}>
                  Inventory ($)
                </TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              deselectOnClickaway={false}
              showRowHover={true}
              key={this.state.tableBodyRenderKey}
            >
              {this.state.item_jobs.map(this.jobField)}
            </TableBody>
          </Table>
        </div>
      );
    }

    return (
      <div>
        <br />
        <br />
        No job(s)
      </div>
    );
  }
}
