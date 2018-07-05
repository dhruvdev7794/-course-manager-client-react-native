let _singleton = Symbol();
const ESSAY_API_URL = 'http://localhost:8080/api/essay';
const ESSAY_EXAM_API_URL = 'http://localhost:8080/api/exam/EID/essay';

export default class EssayService{
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new EssayService(_singleton);
        return this[_singleton]
    }

    createEssayQuestion(examId, essay){
        return fetch(ESSAY_EXAM_API_URL.replace("EID", examId), {
            body: JSON.stringify(essay),
            headers: {'Content-type': 'application/json'},
            method: 'POST'
        }).then(function (response){
            return response.json();
        })
    }

}
