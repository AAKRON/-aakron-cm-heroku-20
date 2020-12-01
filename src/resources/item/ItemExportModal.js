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
        marginBottom: "10px"
      },
      SecondButton: {
        marginLeft: '30px',
        marginBottom: "10px"
      }
    },
    CenterAlgin: {
      textAlign: 'center'
    },
    Item: {
      margin: 4,
    },
    Wrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      marginBottom: "10px"
    },
};

class ItemExportModal extends React.Component {
    state = { open: false, items: [], seleted_items:[], searchText:''};


    fetchItems = () => restClient(GET_LIST, 'item-list-only', {pagination: { page: 1, perPage: -1 }, sort: { field: 'id', order: 'ASC' }});

    handleOpen = () => this.setState({open: true});

    handleClose = () => this.setState({open: false});

    handleItemPriceCostDownload = (e) => {
      e.preventDefault();

      window.open(`${SERVER_URL}/item-download/item-price-cost.csv`, '_blank');
    };

    handleItemInventoryCostDownload = (e) => {
      e.preventDefault();

      window.open(`${SERVER_URL}/item-download/item-inventory-cost.csv`, '_blank');
    };

    handleSeletedItemPriceCostDownload = (e) => {
      e.preventDefault();

      window.open(`${SERVER_URL}/item-download/item-price-cost.csv?items=${this.state.seleted_items.toString()}`, '_blank');
    };

    handleSeletedItemInventoryCostDownload = (e) => {
      e.preventDefault();

      window.open(`${SERVER_URL}/item-download/item-inventory-cost.csv?items=${this.state.seleted_items.toString()}`, '_blank');
    };

    componentDidMount() {
      axios.all([this.fetchItems()])
          .then(axios.spread((item) => {
              const items = item.data.map(item => `${item.item_number} - ${item.description}`);
              this.setState({items});
          }));
    }

    handleRequestDelete = (seleted_items_index) => {

        this.setState({
            seleted_items: this.state.seleted_items.filter((item, index) => seleted_items_index !== index)
        });
      };

    renderItemsChip(item, index) {
        return (
          <Chip
            key={item}
            onRequestDelete={() => this.handleRequestDelete(index)}
            style={styles.Item}
          >
            {item}
          </Chip>
        );
      }

    render() {
        return (
            <span>
                <FlatButton primary label="Export Items"
                            onTouchTap={this.handleOpen}
                            icon={<FileFileDownload />}/>
                <Dialog
                    title="Export Item List"
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                <div style={styles.CenterAlgin}>
                  <h2>Export All Items</h2>
                  <RaisedButton style={styles.RaisedButton.FirstButton} label="Price Cost Items"
                      secondary={true}
                      onTouchTap={this.handleOpen}
                      icon={<FileFileDownload />} onClick={this.handleItemPriceCostDownload}/>

                  <RaisedButton style={styles.RaisedButton.SecondButton} label="Inventory Cost Items"
                      secondary={true}
                      onTouchTap={this.handleOpen}
                      icon={<FileFileDownload />} onClick={this.handleItemInventoryCostDownload} />
                  <Divider />

                  <h2 style={{marginBottom:0}}>Export Seleted Items</h2>
                  <AutoComplete
                      floatingLabelText={`Type the item number`}
                      filter={AutoComplete.fuzzyFilter}
                      dataSource={this.state.items}
                      maxSearchResults={5}
                      onNewRequest={(item_description) => {
                        var seleted_items = this.state.seleted_items;
                        var item_number = stringHelpers.extractLeadingNumber(item_description);

                        this.setState({searchText: item_description});

                        if (seleted_items.indexOf(item_number) === -1) {
                            seleted_items.push(item_number);
                        }

                        this.setState({
                            seleted_items:seleted_items,
                            searchText: ''
                        })

                      }}
                      fullWidth={true}
                      searchText = {this.state.searchText}
                  />
                  <h4 style={{textAlign:"left", margin:"5px 0"}}>Seleted Item:</h4>
                  <div style={styles.Wrapper}>
                    {this.state.seleted_items.map(this.renderItemsChip, this)}
                  </div>
                  { this.state.seleted_items.length > 0 &&
                  <RaisedButton style={styles.RaisedButton.FirstButton} label="Price Cost Items"
                      primary={true}
                      onTouchTap={this.handleOpen}
                      icon={<FileFileDownload />} onClick={this.handleSeletedItemPriceCostDownload}/>
                  }
                  { this.state.seleted_items.length > 0 &&
                  <RaisedButton style={styles.RaisedButton.SecondButton} label="Inventory Cost Items"
                      primary={true}
                      onTouchTap={this.handleOpen}
                      icon={<FileFileDownload />} onClick={this.handleSeletedItemInventoryCostDownload} />
                   }
                </div>
                </Dialog>
            </span>
        );
    }
}


export { ItemExportModal }
