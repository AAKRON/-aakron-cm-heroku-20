import React from 'react';
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

class OverHeadCostFilter extends React.Component {
    state = {
        value: 1,
        style: {
            inventory: { display: 'none'},
            pricing: { display: 'block'}
        }
    };

    handleChange = (event, index, value) => {
        this.setState({value, style: this.toggleDisplay(value)});
    }

    toggleDisplay = (field) => {
        return {
            inventory: { display: (field === 'inventory') ? 'block' : 'none' },
            pricing: { display: (field === 'pricing') ? 'block': 'none' }
        }
    }

    render() {
        return(
            <SelectField
                floatingLabelText="Overhead Cost"
                value={this.state.value}
                onChange={this.handleChange}>
                <MenuItem value='inventory' primaryText="Inventory" />
                <MenuItem value='pricing' primaryText="Pricing" />
            </SelectField>
        )
    }
}

export { OverHeadCostFilter };