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
import Button from '@material-ui/core/Button'

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

function Geography({ questions }) {
  const classes = useStyles();
  const [showQuizz, setShowQuizz] = React.useState(false)
  const [showQuizz2, setShowQuizz2] = React.useState(false)
  const [showQuizz3, setShowQuizz3] = React.useState(false)
  const onClick = () => setShowQuizz(true)
  const onClick2 = () => setShowQuizz2(true)
  const onClick3 = () => setShowQuizz3(true)

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
        description={'General knowledge questions about geography, history, cinema, science, animals... improve your gk skills with hundreds of fun quizzes.'}
        title={"General knowledge questions"}
      />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
              <Grid item xs={12} sm={12} md={12}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image='general_knowledge_questions_geo5.jpg'
                    title='general knowledge question geography'
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h1">
                      General knowledge questions : geography quiz #1
                    </Typography>
                    <Typography paragraph>
                      Hundreds of <strong>general knowledge questions</strong> about geography to help you improve your gk skills. A
                      large variety of themes are explored : countries, capital cities, people, oceans, economy...
                      Let's check out if you really know the world where you're living with this <strong>general knowledge questions</strong> geography quizz !
                    </Typography>

                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={onClick}
                      item
                    >
                      Start Quizz #1
                    </Button>
                      { showQuizz ? <RadioQuiz result={questions.results.slice(0, 10)}/> : null }
                  </CardContent>
                </Card>
              </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={12}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image='general_knowledge_questions_geo1.jpg'
                  title='general knowledge questions geography'
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    General knowledge questions : geography quiz #2
                  </Typography>
                  <Typography paragraph>
                    Another serie of <strong>general knowledge questions</strong> to help you prepare an exam, 
                    or just to play with friends.
                    Will you be able to pick up the challenge ?
                    New questions every time in this <strong>general knowledge questions geography quiz</strong> !
                  </Typography>

                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={onClick2}
                    item
                  >
                    Start Quizz #2
                  </Button>
                  { showQuizz2 ? <RadioQuiz result={questions.results.slice(11, 21)}/> : null }
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={12}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image='general_knowledge_questions_geo2.jpg'
                  title='general knowledge questions'
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    General knowledge questions : geography quiz #3
                  </Typography>
                  <Typography paragraph>
                    Our last serie of <strong>general knowledge questions</strong>.
                    You know the rule : try to find the right answer, and do not cheat !
                    Train harder to shine in society, brighter than ever.
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={onClick3}
                    item
                  >
                    Start Quizz #3
                  </Button>
                  { showQuizz3 ? <RadioQuiz result={questions.results.slice(22, 32)}/> : null }
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
  const res = await fetch('https://opentdb.com/api.php?amount=50&category=22')
  const questionsFromApi = await res.json();
  const searchRegExp = /incorrect_answers/g;
  const searchRegExp2 = /correct_answer/g;
  // const res2 = await fetch('https://trivia.willfry.co.uk/api/questions?categories=geography&limit=1')
  // const questionsFromApi2 = await res2.json();

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

export default Geography
