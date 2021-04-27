import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import parse from 'html-react-parser';
import Footer from '../component/Footer'
import Navbar from '../component/Navbar'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import StarBorder from '@material-ui/icons/StarBorder';
import { makeStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';



const questions = [
  {id: 1, title: "Question 1", content: parse("Quel est le truc ?")},
  {id: 2, title: "Question 2", content: parse("Quel est le bidule ?")},
  {id: 3, title: "Question 3", content: parse("Quel est le machin ?")},
  {id: 4, title: "Question 4", content: parse("Quel est le pouet ?")},
  {id: 5, title: "Question 5", content: parse("Quel est le couac ?")},
  {id: 6, title: "Question 6", content: parse("Quel est le couic ?")},
];

export default function Geography() {
  const [open, setOpen] = React.useState(false);

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));

  const classes = useStyles();

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar/>
      <main>
        {questions.map((question) => (
          <List>
            <ListItem button onClick={handleClick}>
              <ListItemText primary={question.content} />
              { open ? <ExpandMore /> : <ExpandLess /> }
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Starred" />
                </ListItem>
              </List>
            </Collapse>
          </List>
        ))}
      </main>
      <Footer/>
    </React.Fragment>
  );
}