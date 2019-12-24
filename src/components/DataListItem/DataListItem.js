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
import SingleOrder from "../SingleOrder/SingleOrder";

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

export default function DataListItem (props) {
    const classes = useStyles();
    let orderPrice = 0;
    const orders = transformObjectToArray(props.item.order);

    orders.map((item,key) => {
        return orderPrice = orderPrice + item.price * item.quantity;
    });
   
    var t = new Date(props.item.timeStamp);
   
    // var formattedDate = t.format("dd.mm.yyyy hh:MM:ss");

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
                  ID porudžbine: <b>{props.id}</b>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Grad: {props.item.city}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Adresa: {props.item.street} {props.item.streetNumber}/{props.item.apartment} {props.item.door === '' ? null : 'Ulaz: ' + props.item.door} {props.item.floor === '' ? null : ' Sprat: ' + props.item.floor}
                </Typography>
                <Typography variant="body1" color="textPrimary" component="p">
                  Datum i vreme: <b>{props.item.dateOfDelivery}</b> - <b>{props.item.timeOfDelivery}</b>
                </Typography>
                <br></br>
                <Typography variant="body1" color="textPrimary" component="p">
                  Ukupno za naplatu: {orderPrice}
                </Typography>

              </CardContent>
            </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleClickOpen('paper')}>
            Detalji porudžbine
          </Button>
          <Typography className={classes.timestamp}>
            Vreme porudžbine: {t.getDate()}-{t.getMonth()}-{t.getFullYear()} {t.getHours()}:{t.getMinutes()}:{t.getSeconds()}
          </Typography>

          <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogTitle id="scroll-dialog-title"><b>{props.id}</b></DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
               <SingleOrder orders={orders} orderPrice={orderPrice}/>
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
              >
              </DialogContentText>
              <div className={classes.info}>
                Poručilac: <b>{props.item.firstName + ' ' + props.item.lastName}</b><br></br>
                Adresa: <b>{props.item.street} {props.item.streetNumber}/{props.item.apartment} {props.item.door === '' ? null : 'Ulaz: ' + props.item.door} {props.item.floor === '' ? null : ' Sprat: ' + props.item.floor}</b><br></br>
                Ukupna cena porudžbine: <b>{orderPrice} RSD</b><br></br>
                Datum i vreme dostave: <b>{props.item.dateOfDelivery} - {props.item.timeOfDelivery}</b>
                <br></br>
                Kontakt: <b>{props.item.phoneNumber}</b>
                </div>
                
                
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