let _singleton = Symbol();
const MCQ_API_URL = 'http://localhost:8080/api/choice';
const MCQ_EXAM_API_URL = 'http://localhost:8080/api/exam/EID/choice';

export default class MultipleChoiceQuestionService{

    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new MultipleChoiceQuestionService(_singleton);
        return this[_singleton]
    }

    createMCQQuestion(examId, mcqQuestion){
        return fetch(MCQ_EXAM_API_URL.replace("EID", examId), {
            body: JSON.stringify(mcqQuestion),
            headers: {'Content-type': 'application/json'},
            method: 'POST'
        }).then(function (response){
            return response.json();
        })
    }
}
