import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CopyJob from 'material-ui/svg-icons/content/content-copy';
import { CopyJobForm } from './CopyJobForm';
/*const styles = {
    radioButton: {
        marginTop: 16,
    },
};*/

class CopyJobModal extends React.Component {
    state = { open: false };

    handleOpen = () => this.setState({open: true});

    handleClose = () => this.setState({open: false});

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Copy Over"
                primary={true}
                keyboardFocused={true}
                onTouchTap={() => {this.refs.copy_job_form.submit(this.handleClose)} }
            />,
        ];

        //if (typeof(this.props.data) != 'undefined' && this.props.data.jobs.length === 0) return <span></span>;
        return (
            <span>
                <FlatButton primary label="Copy Job"
                            onTouchTap={this.handleOpen}
                            icon={<CopyJob />}/>
                <Dialog
                    title={`Copy jobs to ${this.props.type}`}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                    <CopyJobForm data={this.props.data} type={this.props.type} ref="copy_job_form"/>
                </Dialog>
            </span>
        );
    }
}


export { CopyJobModal }
