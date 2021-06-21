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
  const [success, setSuccess] = React.useState(false);
  const [showQuizz, setShowQuizz] = React.useState(false)
  const [helperText, setHelperText] = React.useState('Choose wisely');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [disable, setDisable] = useState(false);
  const countQuestions = props.result.length;
  const firstQuestionId = props.result[0].id;
  const startButton = props.startButton;

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
    setSuccess(false);
  };

  const updateQuestion = () => {
      if (currentQuestion < countQuestions) {
        setCurrentQuestion(currentQuestion+1)

        setHelperText(' ');
        setError(false);
        setSuccess(false);

        setValue('');
        setDisable(false);
      }
  }

  const resetQuiz = () => {
    setCurrentQuestion(firstQuestionId);
    setScore(0)
    setError(false);
    setSuccess(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let correctAnswer = props.result[currentQuestion].correctAnswer;

    if (value === correctAnswer) {
      setSuccess(true);
      setHelperText('Good!');
      setError(false);
      setScore(score+1);
      setDisable(true);
    } else {
      setHelperText('Sorry, wrong answer! The correct answer was: ' + correctAnswer);
      setError(true);
      setDisable(true);
    }

    setTimeout(function () {
      updateQuestion();
    }, 3000);
  };

  // The Start Button
  const button = <Button
    variant="outlined"
    color="primary"
    onClick={() => setShowQuizz("true")}
    item
  >
    { startButton }
  </Button>

  // The Quizz
  const quizz = <form onInput={handleSubmit}>
    <FormControl
      sx={{ m: 3 }}
      component="fieldset"
      error={error}
      variant="standard"
    >
      <FormLabel>
        <h3 style={{ color: success ? '#00AB70' : '' }}>
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
              return  <FormControlLabel key={index} value={answer} control={<Radio/>} label={answer}/>
            })
            : ''
        }
      </RadioGroup>
      <FormHelperText>{currentQuestion < countQuestions ? helperText : ''}</FormHelperText>
    </FormControl>
  </form>

  return (
    <>
      {showQuizz ?  quizz : button }
    </>
  );
}
