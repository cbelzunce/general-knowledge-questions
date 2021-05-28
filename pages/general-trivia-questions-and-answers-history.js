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

function History({ questions }) {
  const classes = useStyles();

  questions.results.map((question, index) => {
    question.id = index;

    // convert html entities
    question.question = he.decode(question.question)
    question.correctAnswer = he.decode(question.correctAnswer)

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
                    image='general_trivia_questions_and_answers_history2.jpg'
                    title='History'
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h1">
                      General trivia questions and answers : history quizz #1
                    </Typography>
                    <Typography paragraph>
                      Hundreds of <strong>general trivia questions and answers</strong> about history, to help you improve your general knowledge skills.
                      Answer our multiple-choice quiz questions as accurately as possible.
                      find out how much you know about history with this <strong>quiz</strong> !
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
                  image='general_trivia_questions_and_answers_history1.jpg'
                  title='History'
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    General trivia questions and answers : history quizz #2
                  </Typography>
                  <Typography paragraph>
                    Another serie of <strong>gk trivia questions</strong> to help you prepare an exam, 
                    or just for fun.
                    Read each question carefully and choose the response that you think is correct.
                    Find out just how smart -or ignorant- you are with this history quiz !
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
                  image='general_trivia_questions_and_answers_history4.jpg'
                  title='History'
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    General trivia questions and answers : history quizz #3
                  </Typography>
                  <Typography paragraph>
                    Our last <strong>general trivia questions and answers</strong> about history.
                    Simply answer history questions and score as much as you can.
                    This quiz is not only a test of your history gk, but also a funny way to learn a few things you do not know yet !
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
  const res = await fetch('https://opentdb.com/api.php?amount=50&category=23')
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

export default History
