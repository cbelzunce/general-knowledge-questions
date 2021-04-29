import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import parse from 'html-react-parser';
import Footer from '../component/Footer'
import Navbar from '../component/Navbar'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

// todo : markdown file
const questions = [
  {id: 1, title: "Question 1", content: parse("Quel est le truc ?")},
  {id: 2, title: "Question 2", content: parse("Quel est le bidule ?")},
  {id: 3, title: "Question 3", content: parse("Quel est le machin ?")},
  {id: 4, title: "Question 4", content: parse("Quel est le pouet ?")},
  {id: 5, title: "Question 5", content: parse("Quel est le couac ?")},
  {id: 6, title: "Question 6", content: parse("Quel est le couic ?")},
];

export default function Geography() {
  const classes = useStyles();

  //todo define styles

  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar/>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {questions.map((question) => (
              <Grid item key={question.id} xs={12} sm={12} md={10}>
                  <div>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>{question.content}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        Réponse : pouet
                      </AccordionDetails>
                    </Accordion>
                  </div>
              </Grid>
            ))}

          </Grid>
        </Container>


      </main>
      <Footer/>
    </React.Fragment>
  );
}