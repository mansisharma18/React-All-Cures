import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
// import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom'

export const mainListItems = (
  <div>
     <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <Link to="/home">
      <ListItemText primary="Home"  />

           </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <Link to="/dashboard">
      <ListItemText primary="Dashboard" />
      </Link>
      </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      {/* <ListItemText primary="Customers"  /> */}
    <Link to="/dashboard?article">
    <ListItemText primary="New Article" />
           </Link>
           </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      {/* <ListItemText primary="Customers"  /> */}
    <Link to="/dashboard?blogs">
    <ListItemText primary="Cures" />
           </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      {/* <ListItemText primary="Customers"  /> */}
    <Link to="/dashboard/reviewcomments">
    <ListItemText primary="Comments"  />

           </Link>
    
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      {/* <ListItemText primary="Reports" /> */}
      <Link to="/dashboard?user">
      <ListItemText primary="Register User" />
      </Link>
    </ListItem>
  

    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      {/* <ListItemText primary="Reports" /> */}
      <Link to="/dashboard/Promoadmin">
      <ListItemText primary="Promo" />
      </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      {/* <ListItemText primary="Customers"  /> */}
    <Link to="/dashboard?stats">
    <ListItemText primary="Statistics" />
           </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      {/* <ListItemText primary="Customers"  /> */}
    <Link to="/dashboard?promotions">
    <ListItemText primary="All Promotions" />
           </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      {/* <ListItemText primary="Customers"  /> */}
    <Link to="/dashboard?create_promo">
    <ListItemText primary="Create Promo" />
           </Link>
    </ListItem>
    
  
  </div>
);
export const secondaryListItems = (
  <div>
    <ListSubheader inset>Uploads</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        {/* <AssignmentIcon /> */}
      </ListItemIcon>
      <Link to="/dashboard?upload-img">
      <ListItemText primary="Upload Image" />
      </Link>
    </ListItem>
    {/* <ListItem button>
      <ListItemIcon>
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
            ]      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem> */}
  </div>
);