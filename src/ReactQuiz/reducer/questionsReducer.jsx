export const actions = {
  dataReceived: "dataReceived",
  dataFailed: "dataFailed",
  start: "start",
  newAnswer: "newAnswer",
  nextQuestion: "nextQuestion",
};

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
      const arrayLength = state.questions.length;
      return {
        ...state,
        // index: state.index < arrayLength && state.index + 1,
        index: state.index + 1,
        answer: null,
      };

    default:
      //   return state;
      throw new Error(`Invalid action ${action.type}`);
  }
};

export default questionsReducer;
