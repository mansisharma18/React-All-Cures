import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Cookies from 'js-cookie';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems, secondaryListItems } from './listItems';
import Deposits from './Deposits';
import Draft from './Draft';
import Approval from './Approval';
import Review from './Review';
import Promo from './Promo/CreatePromo'
import GetPromo from './Promo/GetPromo';
import UpdatePromo from './Promo/UpdatePromo';
import Title from './Title';
import Article from '.././Article/Article'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard(props) {
  console.log(props.location)
  const classes = useStyles();
  // const acPerm = Cookies.get("acPerm").split('|')
  const [open, setOpen] = React.useState(true);
  const [items, setItems] = React.useState([])
  const [isLoaded, setIsLoaded] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    document.title = 'All Cures | Dashboard'
    setIsLoaded(false);

    fetch("/dashboard/articlecount")
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoaded(true);
        <RenderComponent 
            search={props.location.search} 
            container={classes.container} 
            fixedHeightPaper={fixedHeightPaper} 
            ajaxIsLoaded={isLoaded}
            ajaxItems={items}
          />
      });
    }, []);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className="wallpaper-dashboard">
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          Dashboard
          </Typography>
          <IconButton color="inherit">
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
          <RenderComponent 
            search={props.location.search} 
            container={classes.container} 
            fixedHeightPaper={fixedHeightPaper} 
            ajaxIsLoaded={isLoaded}
            ajaxItems={items}
          />
          {/* <Promo/> */}
          {/* <div className="timer">Timer: {mytable}s</div> */}
      </main>
    </div>
    </div>
  );
}

function handleCountClick(key,value){
  console.log("CCCCCCCCCCLIIIIIIIIIICCCCCCCKKKKKKKKKKK"+key+value)
  if(key){
  return(
      <div className='card'>
        <Grid item xs={12} md={4} lg={3}>
          <Paper>
            <React.Fragment>
              <Title>{key} Articles</Title>  
              <ul>
              {value.map(item => {
                <li>{item[0]}</li>;
              })}
              </ul> 
              <Typography color="textSecondary">
              </Typography>
            </React.Fragment>
          </Paper>
        </Grid>
      </div>
    )
  }
}

function RenderComponent(props){
  if(props.search == '?article'){
    return(<Article/>);
  }
  if(props.search == '?create_promo'){
    return(<Promo/>);
  } else if(props.search == '?stats'){
    return(<Container maxWidth="lg" className={props.container}>
    <Grid container spacing={3}>
     
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={props.fixedHeightPaper}>
        
          <Review />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={props.fixedHeightPaper}>
          <Draft/>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={props.fixedHeightPaper}>
          <Approval />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={props.fixedHeightPaper}>
        <Deposits />
        </Paper>
      </Grid>
    </Grid>
    <Box pt={4}>
      <Copyright />
    </Box>
  </Container>
  );
  } else if(props.search == '?promotions'){
    return(
      <GetPromo/>
    )
    
  } else if(props.search.split('=')[0] == '?edit'){
    return(
      <UpdatePromo search={props.search}/>
    )
  // 
  } else {
    if (!props.ajaxIsLoaded) {

      return <div>Loading...</div>;
    } else if (props.ajaxIsLoaded) {
    return(
    <Container maxWidth="lg" className={props.container}>
    <Grid container spacing={3}>
     <Grid item xs={12} md={4} lg={3}>
       <Paper className={props.fixedHeightPaper}>
        <React.Fragment>
          <Title>Draft Articles</Title>   
          <div onClick={() => handleCountClick("Draft",props.ajaxItems["draft_article"])}>{props.ajaxItems["draft_article"].length}</div>
          <Typography color="textSecondary">
          </Typography>
        </React.Fragment>
       </Paper>
     </Grid>
     <Grid item xs={12} md={4} lg={3}>
       <Paper className={props.fixedHeightPaper}>
        <React.Fragment>
          <Title>Approval Articles</Title>   
          <div onClick={() => handleCountClick("Approval",props.ajaxItems["approval_article"])}>{props.ajaxItems["approval_article"].length}</div>
          <Typography color="textSecondary">
          </Typography>
        </React.Fragment>
       </Paper>
     </Grid>
     <Grid item xs={12} md={4} lg={3}>
       <Paper className={props.fixedHeightPaper}>
        <React.Fragment>
          <Title>Review Articles</Title>   
          <div onClick={() => handleCountClick("Review",props.ajaxItems["review_article"])}>{props.ajaxItems["review_article"].length}</div>
          <Typography color="textSecondary">
          </Typography>
        </React.Fragment>
       </Paper>
     </Grid>
     <Grid item xs={12} md={4} lg={3}>
       <Paper className={props.fixedHeightPaper}>
        <React.Fragment>
          <Title>Publish Articles</Title>   
          <div onClick={() => handleCountClick("Publish",props.ajaxItems["published_article"])}>{props.ajaxItems["published_article"].length}</div>  
          <Typography color="textSecondary">
          </Typography>
        </React.Fragment>
       </Paper>
     </Grid>
      {/* <Grid item xs={12} md={4} lg={3}>
        <Paper className={props.fixedHeightPaper}>
          <Deposits />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={props.fixedHeightPaper}>
          <Draft/>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={props.fixedHeightPaper}>
          <Approval />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={props.fixedHeightPaper}>
          <Review />
        </Paper>
      </Grid> */}
    </Grid>
    <Box pt={4}>
      <Copyright />
    </Box>
  </Container>
    )
    }
  }
}
