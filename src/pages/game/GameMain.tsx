import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  Col,
  Row,
  Card,
  Icon,
  Avatar,
  Badge,
  Divider,
  Radio
} from "antd";

const RadioGroup = Radio.Group;
const { Meta } = Card;

import { Question, Result, GlobalState } from "../../interfaces/index";
import { getQuestions } from "../../services/triviaService";

import GlobalStateContext from "../../context/GlobalStateContext";

interface Props extends GlobalState {};

interface State {
  questions: Result[];
}

/**
 * Capitalize a string input
 *
 * @param {String} word
 **/
const capitalize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * Convert an html characterSet into its original character.
 *
 * @param {String} str
 **/
const decode: Function = (str: string) => {
  if (!str || str === undefined || str.length === 0) {
    return "";
  }
	return str.replace(/&#(\d+);/g, function(match, dec) {
		return String.fromCharCode(dec);
	}).split("&quot;").join('"').split("&amp;").join("&");
}

/**
 * Randomize array element order in-place.
 * Alphabetize the result.
 * Using Durstenfeld shuffle algorithm.
 * @param {Array} array[string]
 */
const shuffle = (array: string[]) => {
  let copy = array;

  for (var i = copy.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }

  return copy.sort();
}

class GameMain extends Component<Props, State> {
  state: State = {
    questions: [],
  }

  componentDidMount() {
    getQuestions().then((res: any) => {
      let processedResults = res.results.map((result: any) => {
        return {
          ...result,
          response: null
        };
      });

      this.setState({ questions: processedResults });
    });

    console.log(this.props);

    // this.context.update({
    //   correctAnswers: 0,
    //   totalAnswers: 0,
    //   loading: false,
    //   errors: [],
    //   updateGlobalState: this.props.globalStateContext.update
    // });
  }

  correctAnswerCount = () => {
    return this.state.questions.filter((q: Result) => {
      return q.response === q.correct_answer
    });
  }

  shuffleAnswers = (question: Result) => {
    // Shuffle the answer order, and
    // change HTML entities to plain
    // text i.e. "I&#039m" => "I'm"
    let incorrect_answers = question.incorrect_answers.map((val) => {
      return unescape(val);
    });

    return shuffle([
      ...incorrect_answers,
      unescape(question.correct_answer)
    ]);
  }

  hasBeenAnswered = (question: Result) => {
    return !!question.response && question.response !== null;
  }

  isAnswerCorrect = (question: Result) => {
    return !!question.response &&
           question.response !== null &&
           question.response === question.correct_answer;
  }

  isAnswerIncorrect = (question: Result) => {
    return !!question.response &&
           question.response !== null &&
           question.response !== question.correct_answer;
  }

  onChangeAnswer = (e: any, question: any) => {
    // Edit question and update state
    // without manually mutating it
    const { questions } = this.state;
    const {
      correctAnswers,
      totalAnswers,
      loading,
      errors,
      updateGlobalState
    } = this.props;

    let isCorrect = e.target.value === question.correct_answer;
    let index = this.state.questions.indexOf(question);

    let processedQuestion: Result = {
      ...question,
      response: e.target.value
    }

    // Add response to copied state
    let processedQuestionState = questions;
    processedQuestionState.splice(index, 1, processedQuestion);

    this.setState({ questions: processedQuestionState },
      () => console.log(this.state));

    this.props.updateGlobalState({
      correctAnswers: isCorrect ? correctAnswers + 1 : correctAnswers,
      totalAnswers: totalAnswers + 1,
      loading: false,
      errors: [],
      updateGlobalState: updateGlobalState
    })
  }

  renderQuestions = (questions: any) => {
    let nextQuestion = questions.filter((q: any) => {
      return !q.response || q.response === null;
    })[0];
    return questions.map((q: any) => this.renderQuestion(
      q,
      questions.indexOf(q),
      q === nextQuestion
    ));
  }

  renderQuestion = (question: any, key: number, isNextQuestion: boolean) => {
    const answers = this.shuffleAnswers(question);
    console.log(question);
    let show = question.response !== null || isNextQuestion;

    return (
      <Col span={6} key={key}>
        <Card
          style={show ? styles.card : styles.hiddenCard}
          cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
          title={question.category}
        >
          <Meta
            title={`Difficulty: ${capitalize(question.difficulty)}`}
            description={unescape(decode(question.question))}
          />
          <RadioGroup
            options={answers}
            onChange={(e: any) => this.onChangeAnswer(e, question)}
            style={styles.radio}
            value={!!question.response ? question.response : ""}
            buttonStyle="solid"
            size="large"
          />
          {this.isAnswerCorrect(question) && (<>
            <Divider />
            <Icon
              type="check"
              style={{...styles.icon, color: 'green' }}
            />
            <a href="#">Great job!</a>
          </>)}
          {this.isAnswerIncorrect(question) && (<>
            <Divider />
            <Icon
              type="close"
              style={{...styles.icon, color: 'red' }}
            />
            <a href="#">Sorry, that is incorrect.</a>
          </>)}
        </Card>
      </Col>
    )
  }

  render() {
    const { questions } = this.state;

    return (<>
      <Row type="flex" justify="center">
        <h1>Game</h1>
        <hr />
        <Row type="flex" justify="center">
          {questions.length > 0 && this.renderQuestions(questions)}
        </Row>
      </Row>
    </>);
  }
}

const styles = {
  card: {
    width: 425,
    height: '45em',
    marginBottom: '4%',
    background: 'white',
    padding: '2%'
  },
  hiddenCard: {
    opacity: 0
  },
  icon: {
    height: 72,
    width: 28,
    marginTop: '2%'
  },
  inputBackground: {
    backgroundColor: "#F5F9FC",
    marginBottom: "3rem",
    padding: "2rem 1rem 3rem 1rem",
    height: '105%'
  },
  radio: {
    display: 'grid',
    lineHeight: '30px',
    marginTop: '2%'
  }
}

export default GameMain;
