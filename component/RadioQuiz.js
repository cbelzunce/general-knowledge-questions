import * as React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core'
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

export default function RadioQuiz(props) {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('Choose wisely');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const classes = useStyles();

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
  };

  const updateQuestion = () => {
    setCurrentQuestion(currentQuestion+1)
    setHelperText(' ')
    setError(false)
    setValue('')
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let correctAnswer = props.result[currentQuestion].correct_answer;

    if (value === correctAnswer) {
      setHelperText('Good!');
      setError(false);
      setScore(score+1)
    } else if (value === '') {
      setHelperText('Please select an option.');
      setError(true);
    } else {
      setHelperText('Sorry, wrong answer! The correct answer was:' + correctAnswer);
      setError(true);
    }
  };

  // if (error === true) {
  //   setCorrection('The good answer was {props.result[currentQuestion].correct_answer}')
  // }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl
        sx={{ m: 3 }}
        component="fieldset"
        error={error}
        variant="standard"
      >
        <FormLabel><h3>{props.result[currentQuestion].question}</h3></FormLabel>
        <RadioGroup
          aria-label="quiz"
          name="quiz"
          value={value}
          onChange={handleRadioChange}
        >
        {props.result[currentQuestion].answers.map((answer) => {
          return <FormControlLabel value={answer} control={<Radio/>} label={answer}/>
        })}
        </RadioGroup>
        <FormHelperText>{helperText}</FormHelperText>

        <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
          Check Answer
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setCurrentQuestion(() => {updateQuestion()})}
          item
        >
          Next question
        </Button>
      </FormControl>
    </form>
  );
}
