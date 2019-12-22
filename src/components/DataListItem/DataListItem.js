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
    margin: 'auto'
  },
});

export default function DataListItem (props) {
    const classes = useStyles();

    const orders = transformObjectToArray(props.item.order);

    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = scrollType => () => {
      setOpen(true);
      setScroll(scrollType);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
      if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
          descriptionElement.focus();
        }
      }
    }, [open]);

    function transformObjectToArray(object){
      const array = [];
      const keys = Object.keys(object);
      keys.forEach(key => {
          const order = {id: key}
          array.push(Object.assign(order, object[key]))
      })
      return array;
    }

    return (

        <Card className={classes.card}>
            <CardActionArea>
              {/* <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
              /> */}
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Order ID: {props.id}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  City: {props.item.city}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Address: {props.item.street} {props.item.streetNumber}/{props.item.apartment} {props.item.door === '' ? null : '(door: ' + props.item.door +')'}
                </Typography>
              </CardContent>
            </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleClickOpen('paper')}>
            Order details
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogTitle id="scroll-dialog-title">{props.id}</DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
               {<div >
                  <img style={{width:"200px", height:"200px"}}
                    src={orders[0].imgUrl}
                    alt={orders[0].name}
                  />  X {orders[0].quantity}
               </div>}
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
              >
                
                {/* {[...new Array(50)]
                  .map(
                    () => `Cras mattis consectetur purus sit amet fermentum.
                    Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                    Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                                  )
                  .join('\n')} */}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleClose} color="primary">
                Subscribe
              </Button>
            </DialogActions>
      </Dialog>
        </CardActions>
      </Card>
    );
}