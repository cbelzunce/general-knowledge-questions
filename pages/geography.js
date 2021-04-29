import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import parse from 'html-react-parser';
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

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

// todo : markdown file
const questions = [
  {id: 1, title: "Question 1", content: parse("Quel est le truc ?"), answer:parse("La réponse 1")},
  {id: 2, title: "Question 2", content: parse("Quel est le bidule ?"), answer:parse("La réponse 2")},
  {id: 3, title: "Question 3", content: parse("Quel est le machin ?"), answer:parse("La réponse 3")},
  {id: 4, title: "Question 4", content: parse("Quel est le pouet ?"), answer:parse("La réponse 4")},
  {id: 5, title: "Question 5", content: parse("Quel est le couac ?"), answer:parse("La réponse 5")},
  {id: 6, title: "Question 6", content: parse("Quel est le couic ?"), answer:parse("La réponse 6")},
];

export default function Geography() {
  const classes = useStyles();

  //todo define styles
  // todo : menu en haut, ancres qui mènent à différentes sections de la page (big page) pour caser des mots clé
  // traduire et mixer d'après bouquin culture gé et sites
  // trouver images libres de droit

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

            {questions.map((question) => (
              <Grid item key={question.id} xs={12} sm={12} md={10}>
                  <div>
                    <Typography gutterBottom variant="h5" component="h3">{question.content}
                    </Typography>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>See the answer</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {question.answer}
                      </AccordionDetails>
                    </Accordion>
                  </div>
              </Grid>
            ))}

          </Grid>
        </Container>


      </main>
      <Footer/>
    </React.Fragment>
  );
}