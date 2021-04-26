import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import parse from 'html-react-parser';
import Footer from '../component/Footer'
import Navbar from '../component/Navbar'

const questions = [
  {id: 1, title: "Question 1", content: parse("Quel est le truc ?")},
  {id: 2, title: "Question 2", content: parse("Quel est le bidule ?")},
  {id: 3, title: "Question 3", content: parse("Quel est le machin ?")},
  {id: 4, title: "Question 4", content: parse("Quel est le pouet ?")},
  {id: 5, title: "Question 5", content: parse("Quel est le couac ?")},
  {id: 6, title: "Question 6", content: parse("Quel est le couic ?")},
];

export default function Geography() {

  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar/>
      <main>
        {questions.map((question) => (
          <div>
            <ul>
              <h2>{question.title}</h2>
              <p>{question.content}</p>
              <li>Réponse 1</li>
              <li>Réponse 2</li>
              <li>Réponse 3</li>
              <li>Réponse 4</li>
            </ul>
          </div>
        ))}
      </main>
      <Footer/>
    </React.Fragment>
  );
}