let _singleton = Symbol();
const FILL_IN_BLANKS_API_URL = 'https://dhruv-sharma-course-mgmt.herokuapp.com/api/blanks';
const FILL_IN_BLANKS_EXAM_API_URL = 'https://dhruv-sharma-course-mgmt.herokuapp.com/api/exam/EID/blanks';

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
    updateFBQuestion(examId, fbQuestion){
        return fetch(FILL_IN_BLANKS_EXAM_API_URL.replace("EID", examId), {
            body: JSON.stringify(fbQuestion),
            headers: {'Content-type': 'application/json'},
            method: 'PUT'
        }).then(function (response){
            return response.json();
        })
    }
    findFBromQuestionId(questionId){
        return fetch(FILL_IN_BLANKS_API_URL+"/"+questionId)
            .then(function (response) {
                if(response.status>400){
                    return null;
                }
                return response.json();
            })
    }

}
