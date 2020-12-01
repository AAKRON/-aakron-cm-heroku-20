import React from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import RemoveJobButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';

export default class JobTable extends React.Component {
    state = {
        value: 'pricing',
        style: {
            inventory: { display: 'none'},
            pricing: { display: ''}
        },
        item_jobs: [],
        tableBodyRenderKey: 0,
        deletedJobKey:-1
    };

    handleRemoveJob = (jobIndex) => () => {
      var currentItemJobs = this.state.item_jobs.filter((job, index) => jobIndex !== index)
      this.state.deletedJobKey = jobIndex;

      if (currentItemJobs.length === 0) {

        if (typeof(this.props.record.jobs) === 'object')
          this.props.record.jobs[0].deleted = true;

        this.updateItemJobs(currentItemJobs);
      } else {
          setTimeout(() => {this.updateItemJobs(currentItemJobs)}, 1);
      }
    };

    updateItemJobs = (currentItemJobs) => {
      this.setState({
          item_jobs: currentItemJobs,
          tableBodyRenderKey: (this.state.tableBodyRenderKey)+1
      });
      this.props.record.jobs = currentItemJobs;
    }

    handleChange = (event, index, value) => {
        this.setState({value, style: this.toggleDisplay(value)});
    };

    onRowSelection = (rows) =>{
      const { jobs } = this.props.record;
      jobs.forEach((job, i) => {
        job.selected = rows.indexOf(i) > -1;
        job.deleted  = i === this.state.deletedJobKey
      });
      this.setState({deletedJobKey:-1});
    };

    toggleDisplay = (field) => {
        return {
            inventory: { display: (field === 'inventory') ? '' : 'none' },
            pricing: { display: (field === 'pricing') ? '': 'none' }
        }
    };

    jobField = (job, index) => {
        return (
          <TableRow key={index} selected={job.selected}>
              <TableRowColumn style={{width: '30%'}}>{job.job_number} - {job.description }</TableRowColumn>
              <TableRowColumn>${job.wages_per_hour}</TableRowColumn>
              <TableRowColumn>{job.hour_per_piece}</TableRowColumn>
              <TableRowColumn>${job.direct_labor_cost}</TableRowColumn>
              <TableRowColumn style={this.state.style.pricing}>${job.overhead_pricing_cost}</TableRowColumn>
              <TableRowColumn style={this.state.style.inventory}>${job.overhead_inventory_cost}</TableRowColumn>
              <TableRowColumn>
                <RemoveJobButton onClick={this.handleRemoveJob(index)}><DeleteIcon /></RemoveJobButton>
              </TableRowColumn>
          </TableRow>
        );
    };
    render () {
        const { inventory, pricing } = this.state.style;

        if (typeof(this.props.record.jobs) === 'object' && this.props.record.jobs.length > 0 && this.state.item_jobs.length === 0) {
          this.state.item_jobs = this.props.record.jobs;
        }

        if (typeof(this.state.item_jobs) === 'object' && this.state.item_jobs.length > 0) {
            return (
                <div>
                <h2>Job</h2>
                    <SelectField
                        floatingLabelText="Overhead Cost"
                        value={this.state.value}
                        onChange={this.handleChange}>
                        <MenuItem value='inventory' primaryText="Inventory" />
                        <MenuItem value='pricing' primaryText="Pricing" />
                    </SelectField>
                    <Table multiSelectable={true} onRowSelection={this.onRowSelection}>
                        <TableHeader enableSelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn style={{width: '30%'}}>Job#</TableHeaderColumn>
                                <TableHeaderColumn>Wages($)/hr</TableHeaderColumn>
                                <TableHeaderColumn>Hr/pcs</TableHeaderColumn>
                                <TableHeaderColumn>Direct Labor ($)</TableHeaderColumn>
                                <TableHeaderColumn style={pricing}>Pricing ($)</TableHeaderColumn>
                                <TableHeaderColumn style={inventory}>Inventory ($)</TableHeaderColumn>
                                <TableHeaderColumn></TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody deselectOnClickaway={false} showRowHover={true} key={this.state.tableBodyRenderKey}>
                            { this.state.item_jobs.map(this.jobField) }
                        </TableBody>
                    </Table>
                </div>
            );
        }

        return ( <div><br /><br />No job(s)</div>)

    }
}
