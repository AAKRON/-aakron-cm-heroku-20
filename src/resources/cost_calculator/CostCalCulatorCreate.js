import React from 'react';
import Paper from 'material-ui/Paper';
import CostCalCulator from '../../components/CostCalCulator';

const style = {
  display: 'inline-block',
  width: "100%",
  height: "100%",
  padding: "15px"
};
const pageHeader = {
  fontSize: "24px",
  lineHeight: "36px"
};
export const CostCalCulatorCreate = (props) => (
    <div>
      <Paper style={style} zDepth={1}>
        <span style={pageHeader}>
          <span>Cost Calculator</span>
        </span>
        <CostCalCulator />
      </Paper>
    </div>
);
