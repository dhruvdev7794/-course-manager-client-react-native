let _singleton = Symbol();
const FILL_IN_BLANKS_API_URL = 'http://localhost:8080/api/truefalse';
const FILL_IN_BLANKS_EXAM_API_URL = 'http://localhost:8080/api/exam/EID/blanks';

export default class FillInTheBlanksService{
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new FillInTheBlanksService(_singleton);
        return this[_singleton]
    }
    createFBQuestion(examId, fbQuestion){
        return fetch(FILL_IN_BLANKS_EXAM_API_URL.replace("EID", examId), {
            body: JSON.stringify(fbQuestion),
            headers: {'Content-type': 'application/json'},
            method: 'POST'
        }).then(function (response){
            return response.json();
        })
    }
}