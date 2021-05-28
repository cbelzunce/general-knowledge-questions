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

function Nature({ questions }) {
  const classes = useStyles();

  questions.results.map((question, index) => {
    question.id = index;

    // convert html entities
    question.question = he.decode(question.question)

    // Mix all answers
    question.answers = []
    question.answers.push(question.correctAnswer)
    question.answers = question.answers.concat(question.incorrectAnswers)

    question.answers = question.answers
      .map((a) =>  he.decode(a))
      .map((a) => [Math.random(),a])
      .sort((a,b) => a[0]-b[0])
      .map((a) => a[1])
  })

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
                    image='gk_questions_animals2.jpg'
                    title='Nature'
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h1">
                      Gk questions : animals quiz #1
                    </Typography>
                    <Typography paragraph>
                      This is our first quiz of <strong>gk questions</strong> about animals to help you improve your general knowledge skills. 
                      A wide variety of topics are explored : ethology, anatomy, species, alimentation, prehistoric animals... you name it !
                      Find out just how smart -or ignorant- you are about animals with this quiz !
                    </Typography>
                    <RadioQuiz result={questions.results.slice(0, 10)}/>
                  </CardContent>
                </Card>
              </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={12}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image='gk_questions_animals1.jpg'
                  title='Nature'
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Gk questions : animals quiz #2
                  </Typography>
                  <Typography paragraph>
                    Second series of <strong>gk questions</strong> to help you prepare an assessment, 
                    or just to play with friends.
                    Just stay focused and try to figure out which answer is correct.
                    New questions every time you come back on this page in this quiz about animals!
                  </Typography>
                  <Typography>
                    <RadioQuiz result={questions.results.slice(11, 21)}/>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={12}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image='gk_questions_animals4.jpg'
                  title='Nature'
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Gk questions : animals quiz #3
                  </Typography>
                  <Typography paragraph>
                    The last <strong>gk questions</strong> series about animals. 
                    You know the rule: several answers are proposed, but only one is correct.
                    Try to score as much as you can in this 10 questions series.
                  </Typography>
                  <Typography>
                    <RadioQuiz result={questions.results.slice(22, 32)}/>
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
  const res = await fetch('https://opentdb.com/api.php?amount=50&category=27')
  const questionsFromApi = await res.json();
  const searchRegExp = /incorrect_answers/g;
  const searchRegExp2 = /correct_answer/g;

  let questions = JSON.stringify(questionsFromApi)
    .replace(searchRegExp, "incorrectAnswers")
    .replace(searchRegExp2, "correctAnswer")
  ;

  questions = JSON.parse(questions);

  return {
    props: {
      questions
    },
  }
}

export default Nature
