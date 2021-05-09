import React, { useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from '../component/Footer'
import Navbar from '../component/Navbar'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import RadioQuiz from '../component/RadioQuiz'
import he from 'he'
import Card from '@material-ui/core/Card/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

function Geography({ questionsFromApi }) {
  const classes = useStyles();

  questionsFromApi.results.map((question, index) => {
    question.id = index;

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
  // todo mélanger questions (éviter duplicate)

  // todo récupérer les questions (autre source : https://trivia.willfry.co.uk/example)
  // Formatter les questions des différentes sources pour format commun

  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar/>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
              <Grid item xs={12} sm={12} md={12}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image='geography.jpg'
                    title='Geography'
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h1">
                      Geography quiz
                    </Typography>
                    <Typography paragraph>
                      Hundreds of <strong>geography quiz questions</strong> to help you improve your general knowledge skills. A
                      large variety of themes are explored : countries, cities, capital cities, people, oceans, economy...
                      Let's check out if you really know the world where you're living with this <strong>world geography quiz</strong> !
                    </Typography>
                    <RadioQuiz result={questionsFromApi.results.slice(0, 10)}/>
                  </CardContent>
                </Card>
              </Grid>
          </Grid>
        {/*</Container>*/}

        {/*<Container className={classes.cardGrid} maxWidth="md">*/}
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={12}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image='geography.jpg'
                  title='Geography'
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Geography quizzes
                  </Typography>
                  <Typography paragraph>
                    Another serie of <strong>quiz questions</strong> to help you prepare an exam, or just to play with friends.
                    New questions every time in this <strong>world geography quiz</strong> !
                  </Typography>
                  <Typography>
                    <RadioQuiz result={questionsFromApi.results.slice(11, 21)}/>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
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
