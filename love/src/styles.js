import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    marginBottom: '3rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width:'100%',
  },
  create :{
    marginRight : '3rem !important',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    marginLeft: '3rem',
    // fontSize : '2rem'
  },
  image: {
    marginLeft: '15px',
  },
  [theme.breakpoints.down('sm')]:{
    mainContainer : {
      flexDirection:"column-reverse"
    }
  },
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
 
}));