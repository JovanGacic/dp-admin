import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { setUserActive } from '../../actions';


const useStyles = makeStyles({
  card: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: '10px'
  },
  info: {
    backgroundColor: '#e6e6ff',
    textAlign: 'center',
    borderRadius: '5px'
  },
  timestamp: {
    backgroundColor: '#e6e6ff'
  }
  
});

export default function User (props) {
    const classes = useStyles();

    return (
     
        <Card className={classes.card}>
            <CardActionArea>
              <CardContent>
                <Typography variant="body1" color="textPrimary" component="p">
                  Email: {props.item.email}
                </Typography>

              </CardContent>
            </CardActionArea>
        <CardActions>
          {props.item.status === 'inactive' ?
          <Button size="small" color="primary" onClick={props.activateUser}>
            Activate
          </Button> 
          : null}
          {props.item.status === 'active' ?
          <Button size="small" color="secondary" onClick={props.deactivateUser}>
            Deactivate
          </Button>
          : null}
        </CardActions>
      </Card>
    
    );
}