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
import { Link } from 'react-router';

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
export default class ItemCostView extends React.Component {

  blankField = (blank, index) =>{
    return (
        <TableRow key={index}>
          <TableRowColumn colSpan={3}>{blank.blank_number} - {blank.description}</TableRowColumn>
          <TableRowColumn colSpan={2}>{blank.blank_type}</TableRowColumn>
          { this.props.type === 'price' &&
              <TableRowColumn style={textRightAlign}>
                <Link to={`blanks/${blank.blank_number}`} style={{ textDecoration : "none", color : "#00bcd4"}}>${blank.total_blank_cost_for_price}</Link>
              </TableRowColumn>
          }
          { this.props.type === 'inventory' &&
              <TableRowColumn style={textRightAlign}>
                <Link to={`blanks/${blank.blank_number}`} style={{ textDecoration : "none", color : "#00bcd4"}}>${blank.total_blank_cost_for_inventory}</Link>
              </TableRowColumn>
          }
          <TableRowColumn style={textCenterAlign}>{blank.multiplication}</TableRowColumn>
          <TableRowColumn style={textCenterAlign}>{blank.division}</TableRowColumn>
          { this.props.type === 'price' &&
              <TableRowColumn style={textRightAlign}><b>${blank.total_blank_cost_for_price_modify}</b></TableRowColumn>
          }
          { this.props.type === 'inventory' &&
              <TableRowColumn style={textRightAlign}><b>${blank.total_blank_cost_for_inventory_modify}</b></TableRowColumn>
          }
        </TableRow>
    )
  };

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

  screenField = (screen, index) =>{

    if (screen.screen_cost !== '-') {
      return (
          <TableRow key={index}>
            <TableRowColumn colSpan={6}>{screen.job_number} - {screen.description}</TableRowColumn>
            <TableRowColumn colSpan={2} style={textCenterAlign}>{screen.screen_name}</TableRowColumn>
            <TableRowColumn style={textRightAlign}><b>${screen.screen_cost}</b></TableRowColumn>
          </TableRow>
      )
    }
  };

  render () {
    if ((typeof(this.props.record.blanks) === 'object' && this.props.record.blanks.length > 0) ||
    (typeof(this.props.record.jobs) === 'object' && this.props.record.jobs.length > 0) ||
    (typeof(this.props.record.box_name) === 'string') ||
    this.props.record.ink_cost !== ''
    ) {

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
                  { typeof(this.props.record.blanks) === 'object' && this.props.record.blanks.length > 0 &&
                  <TableRow>
                    <TableRowColumn style={rightColumnBorder} rowSpan={this.props.record.blanks.length + 1}>
                      Blanks
                    </TableRowColumn>
                    <TableHeaderColumn colSpan={3}>Blank</TableHeaderColumn>
                    <TableHeaderColumn colSpan={2}>Blank Type</TableHeaderColumn>
                    <TableHeaderColumn style={textRightAlign} >Cost($)</TableHeaderColumn>
                    <TableHeaderColumn style={textCenterAlign}>Multiplication</TableHeaderColumn>
                    <TableHeaderColumn style={textCenterAlign}>Division</TableHeaderColumn>
                  </TableRow>
                  }
                  { typeof(this.props.record.blanks) === 'object' && this.props.record.blanks.length > 0 &&
                    this.props.record.blanks.map(this.blankField)
                  }
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
                  { typeof(this.props.record.jobs) === 'object' && this.props.record.jobs.length > 0 &&
                    this.props.record.jobs.map(this.jobField)
                  }
                  { typeof(this.props.record.screen) === 'object' && this.props.record.screen.length > 0 &&
                  <TableRow>
                    <TableRowColumn rowSpan={this.props.record.screen.length + 1} style={rightColumnBorder}>
                      Screens
                    </TableRowColumn>
                    <TableHeaderColumn colSpan={6}>Job</TableHeaderColumn>
                    <TableHeaderColumn colSpan={2} style={textCenterAlign}>Screen Name</TableHeaderColumn>
                  </TableRow>
                  }
                  { typeof(this.props.record.screen) === 'object' && this.props.record.screen.length > 0 &&
                    this.props.record.screen.map(this.screenField)
                  }
                  { typeof(this.props.record.box_name) === 'string' &&
                    <TableRow>
                      <TableRowColumn rowSpan={2} style={rightColumnBorder}>
                        Box
                      </TableRowColumn>
                      <TableHeaderColumn colSpan={4}>Name</TableHeaderColumn>
                      <TableHeaderColumn colSpan={2} style={textCenterAlign}>Cost</TableHeaderColumn>
                      <TableHeaderColumn colSpan={2} style={textCenterAlign}>Number Of pcs/box</TableHeaderColumn>
                    </TableRow>
                  }
                  { typeof(this.props.record.box_name) === 'string' &&
                  <TableRow>
                    <TableRowColumn colSpan={4}>{this.props.record.box_name}</TableRowColumn>
                    <TableRowColumn colSpan={2} style={textCenterAlign}>${this.props.record.box_cost}</TableRowColumn>
                    <TableRowColumn colSpan={2} style={textCenterAlign}>{this.props.record.number_of_pcs_per_box}</TableRowColumn>
                    <TableRowColumn style={textRightAlign}><b>${this.props.record.item_box_cost}</b></TableRowColumn>
                  </TableRow>
                  }
                  <TableRow>
                    <TableRowColumn  style={rightColumnBorder}>Ink Cost</TableRowColumn>
                    <TableRowColumn colSpan={9} style={textRightAlign}><b>${this.props.record.ink_cost}</b></TableRowColumn>
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
    } else {
      return (<div>{this.props.type} Cost Loading....</div>)
    }
  }
}
