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

function Science({ questions }) {
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
                    image='science.jpg'
                    title='Science'
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h1">
                      General knowledge test : science #1
                    </Typography>
                    <Typography paragraph>
                      This is our first <strong>General knowledge test</strong> about science.
                      Human body, chemsitry, physics, astronomy, scientists... are some of the themes of the following quiz.
                      The rule is easy: simply try to figure which answer is the good one.
                      Ready? Let's go!
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
                  image='science.jpg'
                  title='Science'
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    General knowledge test : science #2
                  </Typography>
                  <Typography paragraph>
                    So you want to play again ? This is another batch of <strong>gk questions</strong> to test your knowledge and memory.
                    Our quizzes can help you prepare an exam or a test. Or maybe you just do it for fun !
                    All you have to do is staying focused. Discover your score at the end of the quiz. 
                    New questions every time in this science quiz!
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
                  image='science.jpg'
                  title='Science'
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    General knowledge test : science #3
                  </Typography>
                  <Typography paragraph>
                    Our last <strong>general knowledge test</strong> about science.
                    Simply answer science questions and score as much as you can.
                    This quiz is not only a test of your science general knowledge, 
                    but also a fun way to learn new things !
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
  const res = await fetch('https://opentdb.com/api.php?amount=50&category=17')
  const questionsFromApi = await res.json();
  const searchRegExp = /incorrect_answers/g;
  const searchRegExp2 = /correct_answer/g;
console.log(questionsFromApi)
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

export default Science
