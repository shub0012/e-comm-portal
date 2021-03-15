import { useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    root: {
      flexGrow: 1,
    },
    carousel : {
      width:'100%',
      height:'600px',
      margin: 'auto',
      [theme.breakpoints.up('sm')]: {
        width: 'auto',
        height: 'auto',
      },
    },
}))