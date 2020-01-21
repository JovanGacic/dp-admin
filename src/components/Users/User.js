import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const useStyles = makeStyles({
  card: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: '10px'
  },
  info: {
    textAlign: 'center',
    borderRadius: '5px'
  },
  green: {
    backgroundColor: '#32ad7a',
    width: '20px',
    height: '20px',
    margin: 'auto'
  },
  red: {
    backgroundColor: '#b31d1d',
    width: '20px',
    height: '20px',
    margin: 'auto'
  }
});

export default function User (props) {
    const classes = useStyles();


    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = scrollType => () => {
      setOpen(true);
      setScroll(scrollType);
    };

    const changeStatus = status => {
      if (status === 'inactive') {
       return props.activateUser();
      } 
      else if (status === 'active') {
       return props.deactivateUser();
      }
    }

    const handleClose = () => {
      setOpen(false);
    };

    const handleStatus = () => {
      changeStatus(props.item.status);
      handleClose();
      
    }

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
      if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
          descriptionElement.focus();
        }
      }
    }, [open]);

    return (
     
        <Card className={classes.card}>
            <CardActionArea>
              <CardContent>
               {props.item.status === 'inactive' ? <div className={classes.red}></div> : <div className={classes.green}></div>}
                <Typography variant="body1" color="textPrimary" component="p">
                  Email: {props.item.email}
                </Typography>

              </CardContent>
            </CardActionArea>
        <CardActions >
          {props.item.status === 'inactive' ?
          <Button fullWidth size="medium" color="primary" onClick={handleClickOpen('paper')}>
            Activate
          </Button> 
          : null}
          {props.item.status === 'active' ?
          <Button fullWidth size="medium" color="secondary" onClick={handleClickOpen('paper')}>
            Deactivate
          </Button>
          : null}
          
        </CardActions>
        <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
          <DialogTitle id="scroll-dialog-title"><b>Confirm activation</b></DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
              >
              </DialogContentText>
              <div className={classes.info}>
                  Are you sure you want to {props.item.status === 'inactive' ? <b>activate</b> : <b>deactivate</b>} user <b>{props.item.email}</b>?
              </div>
                
                
            </DialogContent>
            
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                No
              </Button>
              <Button onClick={handleStatus} color="primary">
                Yes
              </Button>
            </DialogActions>
      </Dialog>
      </Card>


    
    );
}