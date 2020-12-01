import React from 'react';
import { Admin, Resource } from 'admin-on-rest';
import { Delete } from 'admin-on-rest/lib/mui';
import { ItemList, ItemEdit, ItemCreate } from './resources/item/';
import { JobList, JobEdit, JobCreate } from './resources/job/';
import { BlankList, BlankCreate, BlankEdit } from './resources/blanks/';
import { BlanksJobList, BlankJobEdit } from './resources/blanks_job/';
import { ItemJobsList, ItemJobEdit } from './resources/item_job/';
import { ColorList, ColorEdit, ColorCreate } from './resources/color/';
import { VendorList, VendorEdit, VendorCreate } from './resources/vendor';
import { UnitsOfMeasureList, UnitsOfMeasureEdit, UnitsOfMeasureCreate } from './resources/unitsofmeasure';
import { RawMaterialTypeList, RawMaterialTypeEdit, RawMaterialTypeCreate } from './resources/raw_material_type';
import { RawMaterialListing, RawMaterialCreate, RawMaterialEdit } from './resources/raw_material';
import { BLIWCListing, BLIWCCreate, BLIWCEdit } from './resources/blanks_listing_item_with_cost/';
import { BLBIListing, BLBIEdit, BLBICreate } from './resources/blanks_listing_by_item/';
import { BlankTypeListing, BlankTypeEdit, BlankTypeCreate } from './resources/blank_type/';
import { ItemTypeListing, ItemTypeEdit, ItemTypeCreate } from './resources/item_type/';
import { ScreenListing, ScreenCreate, ScreenEdit } from './resources/screen';
import { BoxListing, BoxEdit, BoxCreate } from './resources/box';
import { FinalCalculationList, FinalCalculationEdit, FinalCalculationCreate } from './resources/final_calculation/';
import { UserListing, UserEdit, UserCreate } from './resources/user';
import { GlobalVariableListing, GlobalVariableEdit, GlobalVariableCreate } from './resources/global_variable';
import { CostCalCulatorCreate } from './resources/cost_calculator';
import authClient from './authClient';
import ItemJobIcon from 'material-ui/svg-icons/device/widgets';
import ItemIcon from 'material-ui/svg-icons/action/view-stream';
import JobIcon from 'material-ui/svg-icons/action/gavel';
import BIcon from 'material-ui/svg-icons/action/loyalty';
import ColorIcon from 'material-ui/svg-icons/action/group-work';
import UnitsOfMeasureIcon from 'material-ui/svg-icons/action/all-out';
import VendorIcon from 'material-ui/svg-icons/action/store';
import Menu from './Menu';
import restClient from './restClient';
import Dashboard from './Dashboard';

const App = () => (
  <Admin title='Aakron Costing Module' authClient={authClient} restClient={restClient} dashboard={Dashboard} menu={Menu}>

  <Resource name='job_listings' list={JobList} icon={JobIcon} edit={JobEdit} create={JobCreate} remove={Delete}/>

  <Resource name='screens' list={ScreenListing} create={ScreenCreate} edit={ScreenEdit} remove={Delete}/>

  <Resource name='items' list={ItemList} edit={ItemEdit}
  create={ItemCreate} remove={Delete} icon={ItemIcon}/>

  <Resource name='item_jobs' list={ItemJobsList}
  icon={ItemJobIcon} edit={ItemJobEdit} />

  <Resource name='boxes' list={BoxListing} create={BoxCreate} edit={BoxEdit} remove={Delete}/>

  <Resource name='item_types' list={ItemTypeListing} edit={ItemTypeEdit} create={ItemTypeCreate} remove={Delete} />

  <Resource name='blanks' list={BlankList} create={BlankCreate}
  icon={BIcon} edit={BlankEdit} remove={Delete}/>

  <Resource name='blank_jobs' list={BlanksJobList}
  edit={BlankJobEdit} />

  <Resource name='blank_types' list={BlankTypeListing} edit={BlankTypeEdit} create={BlankTypeCreate} remove={Delete} />

  <Resource name="colors" list={ColorList} icon={ColorIcon}
  remove={Delete} edit={ColorEdit} create={ColorCreate}/>

  <Resource name="units_of_measures" list={UnitsOfMeasureList}
  icon={UnitsOfMeasureIcon} edit={UnitsOfMeasureEdit}
  remove={Delete} create={UnitsOfMeasureCreate} />

  <Resource name="vendors" list={VendorList} icon={VendorIcon}
  edit={VendorEdit} remove={Delete} create={VendorCreate}/>

  <Resource name="rawmaterialtypes" list={RawMaterialTypeList}
  remove={Delete} edit={RawMaterialTypeEdit}
  create={RawMaterialTypeCreate} />

  <Resource name='raw_materials' list={RawMaterialListing} create={RawMaterialCreate}
  edit={RawMaterialEdit} remove={Delete}/>

  <Resource name='final_calculations' list={FinalCalculationList}
  edit={FinalCalculationEdit}	create={FinalCalculationCreate}
  remove={Delete}/>

  <Resource name='blanks_listing_item_with_costs' list={BLIWCListing} create={BLIWCCreate} edit={BLIWCEdit} remove={Delete}/>
  <Resource name='blanks_listing_by_items' list={BLBIListing} create={BLBICreate} edit={BLBIEdit} remove={Delete} />

  <Resource name='cost_calculator' create={CostCalCulatorCreate} />

  <Resource name='users' list={UserListing} edit={UserEdit} create={UserCreate} remove={Delete}/>

  <Resource name='app_constants' list={GlobalVariableListing} edit={GlobalVariableEdit} create={GlobalVariableCreate} />
  </Admin>
);

export default App;
