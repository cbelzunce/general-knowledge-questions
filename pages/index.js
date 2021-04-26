import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import parse from 'html-react-parser';
import { useRouter } from 'next/router'
import Footer from '../component/Footer'
import Navbar from '../component/Navbar'
import HeroContent from '../component/HeroContent'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        General knowledge questions
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
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
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));


const cards = [
  {id: 1, page:"/history", title: "History", image:"history.jpg", presentation: parse("<strong>General knowledge trivia</strong> about world history, civilisations, characters...")},
  {id: 2, page:"/geography", title: "Geography", image:"geography.jpg", presentation: parse("<strong>General knowledge facts</strong> about countries and cities all around the world.")},
  {id: 3, page:"/science", title: "Science", image:"science.jpg", presentation: parse("<strong>General knowledge quiz online</strong> about famous scientists, inventions, etc.")},
  {id: 4, page:"/nature", title: "Nature", image:"nature.jpg", presentation: parse("<strong>General knowledge quiz game</strong> with questions about animals, plants, weather...")},
  {id: 5, page:"/arts", title: "Arts", image:"arts.jpg", presentation: parse("<strong>General knowledge trivia</strong> about music, painting, theatre, literature...")},
  {id: 6, page:"/fun", title: "Fun facts", image:"fun.jpg", presentation: parse("<strong>Funny general knowledge questions</strong> about unexpected and surprising topics.")},
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
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
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
                      Start quiz
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