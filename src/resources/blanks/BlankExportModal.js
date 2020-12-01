import React from 'react';
import axios from 'axios';
import lodash from 'lodash';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';
import Divider from 'material-ui/Divider';
import AutoComplete from 'material-ui/AutoComplete';
import { GET_LIST, UPDATE } from 'admin-on-rest';
import Chip from 'material-ui/Chip';
import restClient from '../../restClient';
import {SERVER_URL} from '../../config';
import {stringHelpers} from '../../helpers/stringHelpers';

const styles = {
    RaisedButton: {
      FirstButton: {
        marginTop: "30px",
        marginBottom: "10px"
      },
      SecondButton: {
        marginLeft: '30px',
        marginTop: "30px",
        marginBottom: "10px"
      }
    },
    CenterAlgin: {
      textAlign: 'center'
    },
    Blank: {
      margin: 4,
    },
    Wrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      marginBottom: "10px"
    },
};

class BlankExportModal extends React.Component {
    state = { open: false, blanks: [], seleted_blanks:[], searchText:'' };

    fetchBlanks = () => restClient(GET_LIST, 'blank-list-only', {pagination: { page: 1, perPage: -1}, sort: { field: 'id', order: 'ASC' }, filter: { type_id: 1 }});

    handleOpen = () => this.setState({open: true});

    handleClose = () => this.setState({open: false});

    componentDidMount() {
      axios.all([this.fetchBlanks()])
          .then(axios.spread((blank) => {
              const blanks = blank.data.map(blank => `${blank.blank_number} - ${blank.description}`);
              this.setState({blanks});
          }));
    }

    handleBlankPriceCostDownload = (e) => {
      e.preventDefault();

      window.open(`${SERVER_URL}/blank-download/blank-price-cost.csv`, '_blank');
    };

    handleBlankInventoryCostDownload = (e) => {
      e.preventDefault();

      window.open(`${SERVER_URL}/blank-download/blank-inventory-cost.csv`, '_blank');
    };

    handleSeletedBlankPriceCostDownload = (e) => {
      e.preventDefault();

      window.open(`${SERVER_URL}/blank-download/blank-price-cost.csv?blanks=${this.state.seleted_blanks.toString()}`, '_blank');
    };

    handleSeletedBlankInventoryCostDownload = (e) => {
      e.preventDefault();

      window.open(`${SERVER_URL}/blank-download/blank-inventory-cost.csv?blanks=${this.state.seleted_blanks.toString()}`, '_blank');
    };

    handleRequestDelete = (seleted_blank_index) => {

        this.setState({
            seleted_blanks: this.state.seleted_blanks.filter((blank, index) => seleted_blank_index !== index)
        });
      };

    renderBlanksChip(blank, index) {
        return (
          <Chip
            key={blank}
            onRequestDelete={() => this.handleRequestDelete(index)}
            style={styles.Blank}
          >
            {blank}
          </Chip>
        );
    }

    render() {
        return (
            <span>
                <FlatButton primary label="Export Blank"
                            onTouchTap={this.handleOpen}
                            icon={<FileFileDownload />}/>
                <Dialog
                    title="Export Manufactured Blank List"
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                <div style={styles.CenterAlgin}>
                  <h2>Export All Blanks</h2>
                  <RaisedButton style={styles.RaisedButton.FirstButton} label="Price Cost Blanks"
                      secondary={true}
                      onTouchTap={this.handleOpen}
                      icon={<FileFileDownload />} onClick={this.handleBlankPriceCostDownload}/>

                  <RaisedButton style={styles.RaisedButton.SecondButton} label="Inventory Cost Blanks"
                      secondary={true}
                      onTouchTap={this.handleOpen}
                      icon={<FileFileDownload />} onClick={this.handleBlankInventoryCostDownload} />
                  <Divider />

                  <h2 style={{marginBottom:0}}>Export Seleted Blanks</h2>
                  <AutoComplete
                      floatingLabelText={`Type the manufactured blank number`}
                      filter={AutoComplete.fuzzyFilter}
                      dataSource={this.state.blanks}
                      maxSearchResults={5}
                      onNewRequest={(blank_description) => {
                        var seleted_blanks = this.state.seleted_blanks;
                        var blanks_number = stringHelpers.extractLeadingNumber(blank_description);

                        this.setState({searchText: blank_description});

                        if (seleted_blanks.indexOf(blanks_number) === -1) {
                            seleted_blanks.push(blanks_number);
                        }

                        this.setState({
                            seleted_blanks:seleted_blanks,
                            searchText: ''
                        })

                      }}
                      fullWidth={true}
                      searchText = {this.state.searchText}
                  />
                  <h4 style={{textAlign:"left", margin:"5px 0"}}>Seleted Blank:</h4>
                  <div style={styles.Wrapper}>
                    {this.state.seleted_blanks.map(this.renderBlanksChip, this)}
                  </div>
                  { this.state.seleted_blanks.length > 0 &&
                  <RaisedButton style={styles.RaisedButton.FirstButton} label="Price Cost Blanks"
                      primary={true}
                      onTouchTap={this.handleOpen}
                      icon={<FileFileDownload />} onClick={this.handleSeletedBlankPriceCostDownload}/>
                  }
                  { this.state.seleted_blanks.length > 0 &&
                  <RaisedButton style={styles.RaisedButton.SecondButton} label="Inventory Cost Blanks"
                      primary={true}
                      onTouchTap={this.handleOpen}
                      icon={<FileFileDownload />} onClick={this.handleSeletedBlankInventoryCostDownload} />
                   }
                </div>
                </Dialog>
            </span>
        );
    }
}


export { BlankExportModal }
