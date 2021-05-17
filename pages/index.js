import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import parse from 'html-react-parser';
import { useRouter } from 'next/router'
import Footer from '../component/Footer'
import Navbar from '../component/Navbar'
import HeroContent from '../component/HeroContent'

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

// http://geekhmer.github.io/blog/2018/03/29/import-markdown-files-and-serve-its-content-in-next-dot-js/

const cards = [
  {id: 1, page:"/history", title: "History", keyword:"General trivia questions and answers", image:"history.jpg", presentation: parse("<strong>General knowledge quizz</strong> about world history, civilisations, characters...")},
  {id: 2, page:"/geography", title: "Geography", keyword:"General knowledge questions", image:"geography.jpg", presentation: parse("<strong>General knowledge quizzes</strong> about countries and cities all around the world.")},
  {id: 3, page:"/science", title: "Science", keyword:"General knowledge test", image:"science.jpg", presentation: parse("<strong>General knowledge quizzes</strong> about famous scientists, inventions, etc.")},
  {id: 4, page:"/nature", title: "Animals", keyword:"GK questions", image:"nature.jpg", presentation: parse("<strong>General knowledge quizz</strong> about animals")},
  {id: 5, page:"/arts", title: "Arts", keyword:"GK quizz", image:"arts.jpg", presentation: parse("<strong>General knowledge quizz</strong> about music, painting, theatre, literature...")},
  {id: 6, page:"/cinema", title: "Cinema", keyword:"General knowledge questions with answers", image:"cinema.jpeg", presentation: parse("<strong>General knowledge quizzes</strong> about movies, films, actors, etc.")},
];

export default function Home() {
  const classes = useStyles();
  const router = useRouter();

  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar/>
      <main>
        <HeroContent/>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.image}
                    title={card.title}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {card.title}
                    </Typography>
                    <Typography>
                      {card.presentation}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => router.push(card.page)}>
                      {card.keyword} : start
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Footer/>
    </React.Fragment>
  );
}
