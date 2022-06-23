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

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';

function App() {
  const content = useRoutes(router);

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {content}
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
