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

function Arts({ questions }) {
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
        description={'Gk quiz about arts and various other themes: science, animals, history, geography, cinema... Improve your gk skills with our quizzes.'}
        title={"Gk quiz"}
      />  
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
              <Grid item xs={12} sm={12} md={12}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image='gk_quiz_arts2.jpg'
                    title='Arts'
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h1">
                      Gk quiz : arts #1
                    </Typography>
                    <Typography paragraph>
                      This is our first <strong>gk quiz</strong> about arts to help you becoming better at quizzes.
                      Painters, sculptors, artistic movements, fun facts about pantings, are some of the topics of the following questions.
                      The rule is simple: just try to figure which answer is the correct one among the list.
                      Ready? Go!
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
                  image='gk_quiz_arts1.jpg'
                  title='Arts'
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Gk quiz : arts #2
                  </Typography>
                  <Typography paragraph>
                    One more batch of 10 <strong>quiz questions</strong> to help you practise an assessment, 
                    or just for pleasure.
                    The questions change each time you come back to this page.
                    Try to reach the highest score, and check it at the end of the quiz.
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
                  image='gk_quiz_arts3.jpg'
                  title='Arts'
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Gk quiz : arts #3
                  </Typography>
                  <Typography paragraph>
                    This is the last gk quiz for the arts category.
                    Simply try to find the correct answer, and socre as much as you can.
                    Learning new things while having fun, isn'it wonderful?
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
  const res = await fetch('https://opentdb.com/api.php?amount=25&category=25')
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

export default Arts
