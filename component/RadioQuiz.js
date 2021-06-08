import * as React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { useState } from 'react'

export default function RadioQuiz(props) {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('Choose wisely');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [disable, setDisable] = useState(false);
  const countQuestions = props.result.length;
  const firstQuestionId = props.result[0].id;

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
  };

  const updateQuestion = () => {

    if (currentQuestion < countQuestions) {
      setCurrentQuestion(currentQuestion+1)

      setHelperText(' ');
      setError(false);
      setValue('');
      setDisable(false);
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(firstQuestionId);
    setScore(0)
    setError(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let correctAnswer = props.result[currentQuestion].correctAnswer;

    if (value === correctAnswer) {
      setHelperText('Good!');
      setError(false);
      setScore(score+1);
      setDisable(true);

    } else if (value === '') {
      setHelperText('Please select an option.');
      setError(true);

    } else {
      setHelperText('Sorry, wrong answer! The correct answer was: ' + correctAnswer);
      setError(true);
      setDisable(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl
        sx={{ m: 3 }}
        component="fieldset"
        error={error}
        variant="standard"
      >
        <FormLabel>
          <h3>
            {
              currentQuestion < countQuestions
                ? props.result[currentQuestion].question
                : <>
                    <p>Your Score : {score} / {countQuestions}</p>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => setCurrentQuestion(() => {resetQuiz()})}
                      item
                    >
                      Try Again
                    </Button>
                  </>
            }
          </h3>
        </FormLabel>
        <RadioGroup
          aria-label="quiz"
          name="quiz"
          value={value}
          onChange={handleRadioChange}
        >
        {
          props.result[currentQuestion]
            ? props.result[currentQuestion].answers.map((answer, index) => {
          return <FormControlLabel key={index} value={answer} control={<Radio/>} label={answer}/>
        })
            : ''
        }
        </RadioGroup>
        <FormHelperText>{currentQuestion < countQuestions ? helperText : ''}</FormHelperText>

        {currentQuestion < countQuestions &&
          <>
            <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined" disabled={disable}>
              Check Answer
            </Button>
            <br/>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setCurrentQuestion(() => {updateQuestion()})}
              >
              Next question
            </Button>
          </>
        }
      </FormControl>
    </form>
  );
}
