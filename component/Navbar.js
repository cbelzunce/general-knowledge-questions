import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router'
import Head from "next/head"


export default function Navbar() {
  const router = useRouter();

  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
        <title>Your page title</title>
        <meta name="description" content="An example of a meta description." />
        <link rel="icon" type="image/png" sizes="16x16" href="" />
      </Head>
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