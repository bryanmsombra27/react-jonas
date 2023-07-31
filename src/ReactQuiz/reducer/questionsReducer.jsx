export const actions = {
  dataReceived: "dataReceived",
  dataFailed: "dataFailed",
  start: "start",
  newAnswer: "newAnswer",
  nextQuestion: "nextQuestion",
  finished: "finished",
  reset: "reset",
  tick: "tick",
};
const SECS_PER_QUESTIONS = 30;

const questionsReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.dataReceived:
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    case actions.dataFailed:
      return {
        ...state,
        status: "error",
      };
    case actions.start:
      return {
        ...state,
        status: "active",
        timeRemining: state.questions.length * SECS_PER_QUESTIONS,
      };
    case actions.newAnswer:
      const question = state.questions[state.index];
      const points =
        question.correctOption == action.payload
          ? state.points + question.points
          : state.points;

      return {
        ...state,
        answer: action.payload,
        points: points,
      };

    case actions.nextQuestion:
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case actions.finished:
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case actions.reset:
      return {
        ...state,
        status: "ready",
        index: 0,
        answer: null,
        highscore: state.points,
        points: 0,
      };

    case actions.tick:
      return {
        ...state,
        timeRemining: state.timeRemining > 0 ? state.timeRemining - 1 : 0,
        status: state.timeRemining === 0 ? "finished" : state.status,
      };

    default:
      //   return state;
      throw new Error(`Invalid action ${action.type}`);
  }
};

export default questionsReducer;
