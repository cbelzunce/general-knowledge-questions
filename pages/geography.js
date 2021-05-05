import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
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
import RadioQuiz from '../component/RadioQuiz'
import he from 'he'

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

function Geography({ questionsFromApi }) {
  const classes = useStyles();

  questionsFromApi.results.map((question) => {

    // convert html entities
    question.question = he.decode(question.question)

    // Mix all answers
    question.answers = []
    question.answers.push(question.correct_answer)
    question.answers = question.answers.concat(question.incorrect_answers)

    question.answers = question.answers
      .map((a) =>  he.decode(a))
      .map((a) => [Math.random(),a])
      .sort((a,b) => a[0]-b[0])
      .map((a) => a[1])
  })

  //todo define styles et design
  // trouver images libres de droit
  // Faire 10 séries de 10 questions avec petit paragraphe SEO
  // Export PDF

  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar/>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={6}>
            <Grid xs={12} sm={12} md={10}>
              <Typography gutterBottom variant="h1" component="h2">
                Geography quiz
              </Typography>

              <Typography subtitle1 paragraph>
                Hundreds of <strong>geography quiz questions</strong> to help you improve your general knowledge skills. A
                large variety of themes are explored : countries, cities, capital cities, people, oceans, economy...
                Let's check out if you really know the world where you're living with this <strong>world geography quiz</strong> !
              </Typography>
            </Grid>

            {questionsFromApi.results.slice(0, 10).map((result, index) => (
              <Grid item key={index} xs={12} sm={12} md={10}>
                <RadioQuiz result={result}/>
              </Grid>
            ))}

            <Grid xs={12} sm={12} md={10}>
              <Typography gutterBottom gutterTop variant="h4" component="h3">
                Geography quizzes
              </Typography>
              <Typography subtitle2 paragraph>
                Another serie of <strong>quiz questions</strong> to help you prepare an exam, or just to play with friends.
                New questions every time in this <strong>world geography quiz</strong> !
              </Typography>
            </Grid>

            {questionsFromApi.results.slice(11, 21).map((result, index) => (
              <Grid item gutterBottom gutterTop key={index} xs={12} sm={12} md={10}>
                <RadioQuiz result={result}/>
              </Grid>
            ))}

          </Grid>
        </Container>

      </main>
      <Footer/>
    </React.Fragment>
  );
}

export async function getStaticProps() {
  const res = await fetch('https://opentdb.com/api.php?amount=100&category=22')
  const questionsFromApi = await res.json();

  return {
    props: {
      questionsFromApi,
    },
  }
}

export default Geography
