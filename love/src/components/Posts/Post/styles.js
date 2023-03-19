import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    height: 0,
    width:'100%',
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
    backgroundColor:'#221E1D',
    border: '1px solid white',
    color: '#F5F5F5',
  },
  tag_style:{
    color: '#3A9AEC',
  },
  desc_style:{
    color: '#aaa',
  },
  like:{
    color:'#ffb800',
  },
  del:{
    color:'#ff008d',
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  title: {
    padding: '0 16px',
    color : '#f1f1f1',
    marginBottom : '0px',
  },
  eventDate:{
    color : '#aaa',
    fontSize : '12px',
    padding: '0 16px',
  },
  creator : {
    color : '#f1f1f1'
  },
  desc : {
    color : '#aaa'
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});