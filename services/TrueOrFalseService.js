let _singleton = Symbol();
const TRUE_FALSE_API_URL = 'http://localhost:8080/api/truefalse';
const TRUE_FALSE_EXAM_API_URL = 'http://localhost:8080/api/exam/EID/truefalse';

export default class TrueOrFalseService{
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new TrueOrFalseService(_singleton);
        return this[_singleton]
    }

    createTFQuestion(examId, tfQuestion){
        return fetch(TRUE_FALSE_EXAM_API_URL.replace("EID", examId), {
            body: JSON.stringify(tfQuestion),
            headers: {'Content-type': 'application/json'},
            method: 'POST'
        }).then(function (response){
            return response.json();
        })
    }

    updateTFQuestion(examId, tfQuestion){
        return fetch(TRUE_FALSE_EXAM_API_URL.replace("EID", examId), {
            body: JSON.stringify(tfQuestion),
            headers: {'Content-type': 'application/json'},
            method: 'PUT'
        }).then(function (response){
            return response.json();
        })
    }

    findTFFromQuestionId(questionId){
        return fetch(TRUE_FALSE_API_URL+"/"+questionId)
            .then(function (response) {
                if(response.status>400){
                    return null;
                }
                return response.json();
            })
    }


}
