import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import JobIcon from 'material-ui/svg-icons/action/gavel';
import ItemIcon from 'material-ui/svg-icons/action/view-stream';
import BlankIcon from 'material-ui/svg-icons/action/loyalty';
import RawMaterialIcon from 'material-ui/svg-icons/action/dns';
import FinalCalcIcon from 'material-ui/svg-icons/action/account-balance-wallet';
import AdminIcon from 'material-ui/svg-icons/action/settings';
import CostCalcIcon from 'material-ui/svg-icons/action/build';
import BomIcon from 'material-ui/svg-icons/action/chrome-reader-mode';

export default ({ resources, onMenuTap, logout }) => (
  <div>
  <MenuItem primaryText="Dashboard" leftIcon={<DashboardIcon />}
  containerElement={<Link to="/" />}/>

  <Divider />
  <MenuItem
  primaryText="Jobs"
  leftIcon={<JobIcon />}
  rightIcon={<ArrowDropRight />}
  menuItems={[
    <MenuItem primaryText="Listing" containerElement={<Link to="job_listings"/>}/>,
    <MenuItem primaryText="Screen" containerElement={<Link to="screens"/>}/>
  ]}
  />

  <Divider />
  <MenuItem
  primaryText="Blanks"
  leftIcon={<BlankIcon />}
  rightIcon={<ArrowDropRight />}
  menuItems={[
    <MenuItem primaryText="Listing" containerElement={<Link to="blanks"/>}/>,
    <MenuItem primaryText="Jobs" containerElement={<Link to="blank_jobs"/>}/>,
    <MenuItem primaryText="Types"  containerElement={<Link to="blank_types"/>}/>,
  ]}
  />

  <Divider />

  <MenuItem
  primaryText="Items"
  leftIcon={<ItemIcon />}
  rightIcon={<ArrowDropRight />}
  menuItems={[
    <MenuItem primaryText="Listing" containerElement={<Link to="items"/>}/>,
    <MenuItem primaryText="Jobs" containerElement={<Link to="item_jobs"/>}/>,
    <MenuItem primaryText="Boxes"  containerElement={<Link to="boxes"/>}/>,
    <MenuItem primaryText="Types"  containerElement={<Link to="item_types"/>}/>,
  ]}
  />

  <Divider />

  <MenuItem primaryText="Bill of Materials" leftIcon={<BomIcon />} rightIcon={<ArrowDropRight />}
  menuItems={[
    <MenuItem primaryText="Listing Item with Cost" containerElement={<Link to="blanks_listing_item_with_costs"/>}/>,
    <MenuItem primaryText="Listing By Item" containerElement={<Link to="blanks_listing_by_items"/>}/>,
  ]} />

  <Divider />

  <MenuItem
  primaryText="Raw Material"
  leftIcon={<RawMaterialIcon />}
  rightIcon={<ArrowDropRight />}
  menuItems={[
    <MenuItem primaryText="Listing" containerElement={<Link to="raw_materials"/>}/>,
    <MenuItem primaryText="Colors" containerElement={<Link to="colors"/>}/>,
    <MenuItem primaryText="Units Of Measure"  containerElement={<Link to="units_of_measures"/>}/>,
    <MenuItem primaryText="Types"  containerElement={<Link to="rawmaterialtypes"  />}/>,
    <MenuItem primaryText="Vendor"  containerElement={<Link to="vendors"  />}/>,
  ]}
  />

  <Divider />

  <MenuItem primaryText="Final Calc" leftIcon={<FinalCalcIcon />} containerElement={<Link to="final_calculations" />}/>

  <Divider />

  <MenuItem primaryText="Cost Calculator" leftIcon={<CostCalcIcon />} containerElement={<Link to="/cost_calculator/create" />}/>

  <Divider />

  { localStorage.getItem('role') === 'admin' &&
    <MenuItem primaryText="Admin" leftIcon={<AdminIcon />} rightIcon={<ArrowDropRight />}
    menuItems={[
      <MenuItem primaryText="Users" containerElement={<Link to="users"/>}/>,
      <MenuItem primaryText="Global" containerElement={<Link to="app_constants"/>}/>,
    ]} />
  }

  { localStorage.getItem('role') === 'admin' &&
    <Divider />
  }

  {logout}

  </div>
);
