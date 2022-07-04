/*
import * as React from 'react';
import Projects from './views/Projects';
import './tailwind.generated.css';

export default function App() {
    return (
        <>
            <header className="bg-gray-900 text-white flex items-center h-12 w-full">
                <div className="container mx-auto">
                   <a className="navbar-brand" href="/">Timelogger</a>
                </div>
            </header>
            
            <main>
                <div className="container mx-auto">                      
                    <Projects />
                </div>
            </main>
        </>
    );
}
*/
import { useRoutes } from 'react-router-dom';
import router from 'src/router';

/* import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider'; */

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
