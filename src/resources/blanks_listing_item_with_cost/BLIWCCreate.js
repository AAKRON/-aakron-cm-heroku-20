import React from 'react';
import {Create, SimpleForm, NumberInput} from 'admin-on-rest/lib/mui'

export const BLIWCCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <NumberInput source='item_number'/>
            <NumberInput source='blank_number'/>
        </SimpleForm>
    </Create>
);
