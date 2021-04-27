import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter();

  return (
    <React.Fragment>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap onClick={() => router.push('/')}>
            General knowledge questions
          </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}