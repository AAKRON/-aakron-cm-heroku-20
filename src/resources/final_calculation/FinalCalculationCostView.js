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
const total_blank_cost = 0.0;

export default class FinalCalculationCostView extends React.Component {

  blankField = (blank, index) =>{
    total_blank_cost = eval(total_blank_cost) + eval(blank.total);
    return (
          <TableRow key={index}>
            <TableRowColumn>{blank.blank_number}</TableRowColumn>
            <TableRowColumn style={textCenterAlign}>{blank.blank_name}</TableRowColumn>
            <TableRowColumn style={textCenterAlign}>{blank.color_description}</TableRowColumn>
            <TableRowColumn style={textRightAlign}><b>${blank.total}</b></TableRowColumn>
          </TableRow>
      )
  };
  render () {

    return (
      <div>
        { typeof(this.props.record.total_cost) === 'number' &&
          <h3>Total Cost($) : <b>${this.props.record.total_cost}</b></h3>
        }
        <Paper style={style} zDepth={2}>
          <Table selectable={false}>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn colSpan={5}>
                    <b>Cost Factor</b>
                  </TableHeaderColumn>
                  <TableHeaderColumn style={textRightAlign}>
                    <b>Cost($)</b>
                  </TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn style={rightColumnBorder} rowSpan="2">
                  Raw Material
                </TableRowColumn>
                <TableHeaderColumn colSpan={2}>Name</TableHeaderColumn>
                <TableHeaderColumn style={textRightAlign}>Cost</TableHeaderColumn>
                <TableHeaderColumn style={textCenterAlign}>Pcs / Unit One</TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn  colSpan={2} >{this.props.record.raw_material_name}</TableRowColumn>
                <TableRowColumn style={textRightAlign}>${this.props.record.raw_material_cost}</TableRowColumn>
                <TableRowColumn style={textCenterAlign}>{this.props.record.number_of_pieces_per_unit_one}</TableRowColumn>
                <TableRowColumn style={textRightAlign}><b>${this.props.record.raw_calculated}</b></TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn style={rightColumnBorder} rowSpan="3">
                  Colorant
                </TableRowColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn style={textRightAlign}>Cost</TableHeaderColumn>
                <TableHeaderColumn style={textCenterAlign}>Pcs/Unit</TableHeaderColumn>
                <TableHeaderColumn style={textCenterAlign}>% Of Colorant</TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn >{this.props.record.colorant_one}</TableRowColumn>
                <TableRowColumn style={textRightAlign}>${this.props.record.color_one_cost}</TableRowColumn>
                <TableRowColumn style={textCenterAlign}>{this.props.record.number_of_pieces_per_unit_one}</TableRowColumn>
                <TableRowColumn style={textCenterAlign}>{this.props.record.percentage_of_colorant_one}</TableRowColumn>
                <TableRowColumn style={textRightAlign}><b>${this.props.record.fina_color_one_cost}</b></TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn >{this.props.record.colorant_two === ''? '-' : this.props.record.colorant_two}</TableRowColumn>
                <TableRowColumn style={textRightAlign}>${this.props.record.color_two_cost}</TableRowColumn>
                <TableRowColumn style={textCenterAlign}>{this.props.record.number_of_pieces_per_unit_two}</TableRowColumn>
                <TableRowColumn style={textCenterAlign}>{this.props.record.percentage_of_colorant_two}</TableRowColumn>
                <TableRowColumn style={textRightAlign}><b>${this.props.record.fina_color_two_cost}</b></TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn colSpan={5} style={textRightAlign} ><b>Total Cost($)</b></TableRowColumn>
                <TableRowColumn style={textRightAlign}><b>${this.props.record.total_cost}</b></TableRowColumn>
              </TableRow>
              </TableBody>
          </Table>
        </Paper>

        { typeof(this.props.record.blank_average_cost) === 'string' &&
          <h3>Total Average Blank Cost($) : <b>${this.props.record.blank_average_cost}</b></h3>
        }

        <Paper style={style} zDepth={2}>
          <Table selectable={false}>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn colSpan={5}>
                    <b>Cost Factor</b>
                  </TableHeaderColumn>
                  <TableHeaderColumn style={textRightAlign}>
                    <b>Cost($)</b>
                  </TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                { typeof(this.props.record.blank_final_calculations_view) === 'object' &&
                <TableRow>
                  <TableRowColumn style={rightColumnBorder} rowSpan={this.props.record.blank_final_calculations_view.length + 4}>
                    Blank
                  </TableRowColumn>
                  <TableHeaderColumn >Blank number</TableHeaderColumn>
                  <TableHeaderColumn style={textRightAlign}>Blank Name</TableHeaderColumn>
                  <TableHeaderColumn >Color</TableHeaderColumn>
                </TableRow>
                }
                { typeof(this.props.record.blank_final_calculations_view) === 'object' &&
                  this.props.record.blank_final_calculations_view.map(this.blankField)
                }
                { typeof(this.props.record.blank_final_calculations_view) === 'object' &&
                <TableRow>
                  <TableRowColumn style={textRightAlign} colSpan="3">Total Blank Cost($)</TableRowColumn>
                  <TableRowColumn style={textRightAlign}><b>${total_blank_cost.toFixed(4)}</b></TableRowColumn>
                </TableRow>
                }
                { typeof(this.props.record.blank_final_calculations_view) === 'object' &&
                <TableRow>
                  <TableRowColumn style={textRightAlign} colSpan="3">Number Of Blank</TableRowColumn>
                  <TableRowColumn style={textRightAlign}><b>{this.props.record.blank_final_calculations_view.length}</b></TableRowColumn>
                </TableRow>
                }
                { typeof(this.props.record.blank_final_calculations_view) === 'object' &&
                <TableRow>
                  <TableRowColumn style={textRightAlign} colSpan="3">Total Average Blank Cost($)</TableRowColumn>
                  <TableRowColumn style={textRightAlign}><b>${(total_blank_cost.toFixed(4) / this.props.record.blank_final_calculations_view.length).toFixed(4)}</b></TableRowColumn>
                </TableRow>
                }
              </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}
