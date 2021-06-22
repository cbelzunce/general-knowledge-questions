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

function Cinema({ questions }) {
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
      <Navbar 
        description={"General knowledge questions with answers: test your smarts with fun quizzes about cinema, history, geography... Hundreds of free online trivia quiz games to improve your gk skills."}
        title={"General knowledge questions with answers"}
      />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
              <Grid item xs={12} sm={12} md={12}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image='general_knowledge_questions_with_answers_cinema3.jpg'
                    title='Cinema'
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h1">
                      General trivia questions with answers : cinema quizz #1
                    </Typography>
                    <Typography paragraph>
                      Numbers of <strong>cinema trivia questions</strong> with answers to become better 
                      at quizzes games. A wide diversity of topics are waiting for you: 
                      actors, movies, directors, people... Simply answer every question as carefully as you can. 
                      Are you a quizmaster? Let's find out!
                    </Typography>
                    <RadioQuiz result={questions.results.slice(0, 10)} startButton={"Start Quizz #1"}/>
                  </CardContent>
                </Card>
              </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={12}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image='general_knowledge_questions_with_answers_cinema1.jpg'
                  title='Cinema'
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    General trivia questions with answers : cinema quizz #2
                  </Typography>
                  <Typography paragraph>
                    So you want more questions? This is Another batch of <strong>quiz questions</strong> 
                    to help you prepare an exam, or just to play with friends. 
                    All you have to do is staying focused (and please, don't cheat!). 
                    Discover your score at the end of the quiz. 
                    New questions every time in this world cinema quiz!
                  </Typography>
                  <RadioQuiz result={questions.results.slice(11, 21)} startButton={"Start Quizz #2"}/>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={12}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image='general_knowledge_questions_with_answers_cinema2.jpg'
                  title='Cinema'
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    General trivia questions with answers : cinema quizz #3
                  </Typography>
                  <Typography paragraph>
                    This is our last batch of 10 <strong>general trivia questions with answers</strong> 
                    about cinema. This questioning is not only a test of your cinema general knowledge 
                    but also a fun way to discover some stuff you don't know yet! 
                    Just answer each question and try to reach the highest score.
                  </Typography>
                  <RadioQuiz result={questions.results.slice(22, 32)} startButton={"Start Quizz #3"}/>
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
  const res = await fetch('https://opentdb.com/api.php?amount=50&category=11')
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

export default Cinema
