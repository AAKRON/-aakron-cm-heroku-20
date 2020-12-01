import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { FileUpload } from './components/FileUpload';

export default () => (
    <div>
        <Card>
            <CardText>
                { localStorage.getItem('role') === 'admin' &&
                  <FileUpload />
                }
                { localStorage.getItem('role') !== 'admin' &&
                  <h1 style={{ color : "#00bcd4", textAlign : "center"}}>Hello {localStorage.getItem('username')}, You have only <b>Add & View</b> rights in full system</h1>
                }

            </CardText>
        </Card>
    </div>

);
