import React from "react";
import Paper from 'material-ui/Paper';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

const style = {
  textAlign: 'center',
  display: 'inline-block',
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
export default class BlankCostView extends React.Component {

  jobField = (job, index) =>{

    return (
        <TableRow key={index}>
          <TableRowColumn colSpan={4}>{job.job_number} - {job.description}</TableRowColumn>
          <TableRowColumn style={textRightAlign}>${job.wages_per_hour}</TableRowColumn>
          <TableRowColumn style={textCenterAlign}>{job.hour_per_piece}</TableRowColumn>
          <TableRowColumn style={textRightAlign}>${job.direct_labor_cost}</TableRowColumn>
          { this.props.type === 'price' &&
          <TableRowColumn style={textRightAlign}>${job.overhead_pricing_cost}</TableRowColumn>
          }
          { this.props.type === 'price' &&
          <TableRowColumn style={textRightAlign}><b>${job.total_pricing_cost}</b></TableRowColumn>
          }
          { this.props.type === 'inventory' &&
          <TableRowColumn style={textRightAlign}>${job.overhead_inventory_cost}</TableRowColumn>
          }
          { this.props.type === 'inventory' &&
          <TableRowColumn style={textRightAlign}><b>${job.total_inventory_cost}</b></TableRowColumn>
          }
        </TableRow>
    )
  };

  render () {
    if (typeof(this.props.record.jobs) === 'object' && this.props.record.jobs.length > 0) {

      return (
        <div>
          { this.props.type === 'price' &&
          <h3>Price Cost($) : <b>${this.props.record.total_price_cost}</b></h3>
          }
          { this.props.type === 'inventory' &&
          <h3>Inventory Cost($) : <b>${this.props.record.total_inventory_cost}</b></h3>
          }
          <Paper style={style} zDepth={2}>
            <Table selectable={false}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn colSpan={9}>
                      <b>Cost Factor</b>
                    </TableHeaderColumn>
                    <TableHeaderColumn style={textRightAlign}>
                      <b>Cost($)</b>
                    </TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  { typeof(this.props.record.jobs) === 'object' && this.props.record.jobs.length > 0 &&
                  <TableRow>
                    <TableRowColumn style={rightColumnBorder} rowSpan={this.props.record.jobs.length + 1}>
                      Jobs
                    </TableRowColumn>
                    <TableHeaderColumn colSpan={4}>Job</TableHeaderColumn>
                    <TableHeaderColumn style={textRightAlign}>Wages($)/hr</TableHeaderColumn>
                    <TableHeaderColumn style={textCenterAlign}>Hr/pcs</TableHeaderColumn>
                    <TableHeaderColumn style={textRightAlign}>Direct Labor ($)</TableHeaderColumn>
                    <TableHeaderColumn style={textRightAlign}>Overhead Price</TableHeaderColumn>
                  </TableRow>
                  }
                  { this.props.record.jobs.map(this.jobField) }
                  <TableRow>
                    <TableRowColumn style={rightColumnBorder}>Average</TableRowColumn>
                    <TableRowColumn colSpan={8} style={textRightAlign}>Average cost pulled from <b>Final Calc</b></TableRowColumn>
                    <TableRowColumn style={textRightAlign}><b>${this.props.record.blank_average_cost}</b></TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn colSpan={9} style={textRightAlign} >
                    { this.props.type === 'price' &&
                      <b>Total Price Cost($)</b>
                    }
                    { this.props.type === 'inventory' &&
                      <b>Total Inventory Cost($)</b>
                    }
                    </TableRowColumn>
                    { this.props.type === 'price' &&
                    <TableRowColumn style={textRightAlign}><b>${this.props.record.total_price_cost}</b></TableRowColumn>
                    }
                    { this.props.type === 'inventory' &&
                    <TableRowColumn style={textRightAlign}><b>${this.props.record.total_inventory_cost}</b></TableRowColumn>
                    }

                  </TableRow>
                </TableBody>
            </Table>
          </Paper>
        </div>
      );
    } else if (this.props.record.type_number === 1) {
      return (<div>{this.props.type} Cost Loading....</div>);
    } else {
      return (<div></div>);
    }
  }
}
