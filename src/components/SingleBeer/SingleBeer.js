import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import EditBeer from '../EditBeer/EditBeer';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '../Modal/Modal';
import './SingleBeer.css';



export default function SingleBeer (props) {

  const useStyles = makeStyles({
    card: {
      maxWidth: 300,
      margin: 'auto',
      marginTop: '10px'
  },
    image: {
      width: 300,
      height: 300
    }
});


const [open, setOpen] = React.useState(false);
const [scroll, setScroll] = React.useState('paper');
const [title, setTitle] = React.useState('');
const [content, setContent] = React.useState(null);
const [cancelLabel, setCancelLabel] = React.useState(null);
const [confirmLabel, setConfirmLabel] = React.useState(null);
const [actionConfirm, setActionConfirm] = React.useState(null);

const [newBeerName, setNewBeerName] = React.useState('');
const [newBeerPrice, setNewBeerPrice] = React.useState(null);
const [newBeerVolume, setNewBeerVolume] = React.useState(null);

const descriptionElementRef = React.useRef(null);

React.useEffect(() => {
  if (open) {
    const { current: descriptionElement } = descriptionElementRef;
    if (descriptionElement !== null) {
      descriptionElement.focus();
    }
  }
}, [open]);

const openRemove = scrollType => {
 setOpen(true);
 setScroll(scrollType);
 setTitle('Confirm delete');
 setCancelLabel('No');
 setConfirmLabel('Yes');
 setContent(<div>
              Are you sure you want to delete <b>{props.item.name}</b> beer?
          </div>);
  setActionConfirm(() => handleRemove);
}

const openEdit = scrollType => {
  setOpen(true);
  setScroll(scrollType);
  setTitle('Confirm edit');
  setCancelLabel('Cancel');
  setConfirmLabel('Confirm');
  setContent(<EditBeer name={props.item.name}
                       price={props.item.price}
                       volume={props.item.volume} 
                       handleName={handleBeerNameEdit}
                       handlePrice={handleBeerPriceEdit}
                       handleVolume={handleBeerVolumeEdit}
    />);
  setActionConfirm(() => handleEdit);
 }

 const handleBeerNameEdit = newName => {
   setNewBeerName(newName);
   console.log(newBeerName);
 }

 const handleBeerPriceEdit = (newPrice) => {
   setNewBeerPrice(newPrice);
 }
  
 const handleBeerVolumeEdit = (newVolume) => {
   setNewBeerVolume(newVolume);
 }


// const handleClickOpen = scrollType => () => {
//   console.log('2')
//     setOpen(true);
//     setScroll(scrollType);
//   };
  
  const handleClose = () => {
    setOpen(false);
  };

const handleRemove = (beerId) => {
  props.deleteBeer(beerId);
  handleClose();
}

const handleEdit = (beerId) => {
  props.updateBeer(beerId);
  handleClose();
}


  const classes = useStyles();

      return (  
        // <div className="flex-container" key={props.id}>
        //     <div  className="image">
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
                className={classes.image}
                component="img"
                alt={props.item.name}
                height="100"
                width="100"
                image={props.item.downloadUrl}
                title={props.item.name}
              />
                {/* <img style={{width:"200px", height:"200px"}}
                src={item.imgUrl}
                alt={item.name}
                />    */}
            {/* </div> */}
            {/* <div className="info"> <br></br>
                                  Cena: {props.item.price} RSD <br></br>
                                  Zapremina: {props.item.volume}
            </div> */}
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Ime: <b>{props.item.name}</b>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Cena: <b>{props.item.price} RSD</b>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Zapremina: <b>{props.item.volume}</b>
                </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions >
           
            <Button size="small" color="primary" onClick={() => openEdit('paper')}>
              Izmeni
            </Button>
            <Button  size="small" color="secondary"  onClick={() => openRemove('paper')}>
              Obriši
            </Button>
          </CardActions>
            <Modal open={open}
                   handleConfirm={actionConfirm}
                   handleCancel={handleClose}
                   handleClose={handleClose}
                   item={props.item}
                   scroll={scroll} 
                   descriptionElementRef={descriptionElementRef}
                   title={title}
                   content={content}
                   cancelLabel={cancelLabel}
                   confirmLabel={confirmLabel}
                   />
          {/* <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
          <DialogTitle id="scroll-dialog-title"><b>Confirm delete</b></DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
              >
              </DialogContentText>
              <div className={classes.info}>
                  Are you sure you want to delete <b>{props.item.name}</b> beer?
              </div>
                
                
            </DialogContent>
            
            <DialogActions>
              <Button onClick={() => handleClose()} color="primary">
                No
              </Button>
              <Button onClick={() => handleRemove(props.item.id)} color="primary">
                Yes
              </Button>
            </DialogActions>
      </Dialog> */}


        </Card>
      )
    
  }
