import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Snackbar from 'material-ui/Snackbar';
import axios from 'axios';
import {SERVER_URL} from '../config';

const UPLOAD_PATH = `${SERVER_URL}/items-and-blanks-listings`;
const VALID_FILE_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
const REDIRECT_PATH = {
  jobs_and_blanks: '#/job_listings',
  raw_materials: '#/raw_materials',
  blanks_listing_item_with_cost: '#/blanks_listing_item_with_costs',
  blanks_listing_by_item: '#/blanks_listing_by_items',
  box_list_for_costing_module:'#/boxes',
  item_list_for_costing_module:'#/items',
  screen_cliche_sizes_for_costing_module: '#/screens',
  blanks_report:'#/blanks',
  item_listing_with_item_types: '#items'
};

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
  button: {
    marginLeft: 10
  }
};


export class FileUpload extends React.Component {
  state = {
    file: null,
    open_snackbar: false,
    snackbar_message: '',
    document_type: ''
  };

  handleFileChange = (e) => this.setState({file: e.target.files[0]});

  handleSnackbarClose = () => this.setState({open_snackbar: false, snackbar_message: '', file: null});

  handleUpload = (e) => {
    e.preventDefault();
    const {file, document_type} = this.state;

    if (!file) {
      this.setState({open_snackbar: true, snackbar_message: 'Please upload a file'});
      return false;
    }

    if (file.type !== VALID_FILE_TYPE) {
      this.setState({open_snackbar: true, snackbar_message: 'Please upload a valid spreadsheet'});
      return false;
    }

    if (!document_type) {
      this.setState({open_snackbar: true, snackbar_message: 'Please select a type'});
      return false;
    }

    const formData = new FormData();
    formData.append('file', this.state.file);
    formData.append('document_type', this.state.document_type);
    axios.post(UPLOAD_PATH, formData).then((response) => {
      this.setState({open_snackbar: true, snackbar_message: response.data.message });
      setTimeout(() => {location.replace(REDIRECT_PATH[this.state.document_type]);}, 100);
    });
  };

  handleDownload = (e) => {
    e.preventDefault();
    const {document_type} = this.state;

    if (!document_type) {
      this.setState({open_snackbar: true, snackbar_message: 'Please select a type'});
      return false;
    }

    if(typeof(this.state.document_type) !== 'undefined') {
      window.open(`${SERVER_URL}/download/${this.state.document_type}`, '_blank');
    }

  };
  render() {
    return (
      <div>
      <input type="file" onChange={this.handleFileChange}/>

      <h2>Please import a spreadsheet with the same name below:</h2>
      <RadioButtonGroup name="shipSpeed" defaultSelected="not_light" onChange={ (e, value) => this.setState({document_type: value})}>
      <RadioButton
      value="jobs_and_blanks"
      label="JOB LIST ACTUAL COSTING MODULE"
      style={styles.radioButton}
      onChange={ (e) => console.log("Changing something") }
      />
      <RadioButton
      value="raw_materials"
      label="COPY OF NEW RAW CAL"
      style={styles.radioButton}
      />

      <RadioButton
      value='blanks_listing_item_with_cost'
      label='BLANKS LISTING ITEM WITH COST'
      style={styles.radioButton}
      />

      <RadioButton
      value='blanks_listing_by_item'
      label='BLANKS LISTING BY ITEM'
      style={styles.radioButton}
      />

      <RadioButton
      value='box_list_for_costing_module'
      label='BOX LIST FOR COSTING MODULE'
      style={styles.radioButton}
      />

      <RadioButton
      value='item_list_for_costing_module'
      label='ITEM LIST FOR COSTING MODULE'
      style={styles.radioButton}
      />

      <RadioButton
      value='screen_cliche_sizes_for_costing_module'
      label='SCREEN-CLICHE SIZES FOR COSTING MODULE'
      style={styles.radioButton}
      />

      <RadioButton
      value='blanks_report'
      label='BLANKS REPORT'
      style={styles.radioButton}
      />

      <RadioButton
      value='item_listing_with_item_types'
      label='ITEM LISTING WITH ITEM TYPES'
      style={styles.radioButton}
      />

      </RadioButtonGroup>

      <RaisedButton onClick={this.handleUpload} label="Upload File" primary/>
      <RaisedButton onClick={this.handleDownload} label="Download File" style={styles.button} secondary={true} />
      <Snackbar
      open={this.state.open_snackbar}
      message={this.state.snackbar_message}
      autoHideDuration={4000}
      onRequestClose={this.handleSnackbarClose}
      />
      </div>
    )
  }
}
