import { useRoutes } from 'react-router-dom';
import router from 'src/router';
import DateFnsUtils from '@date-io/date-fns';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

function App() {
  const content = useRoutes(router);

  return (
    <ThemeProvider>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <CssBaseline />
        {content}
        </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}
export default App;
