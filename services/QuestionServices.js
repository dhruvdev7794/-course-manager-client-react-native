let _singleton = Symbol();
const QUESTION_EXAM_API_URL = 'http://localhost:8080/api/exam/:EID';

export default class QuestionServices{
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new QuestionServices(_singleton);
        return this[_singleton]
    }

    createEssayQuestion(examId, essay){
        return fetch(QUESTION_EXAM_API_URL+'/essay'.replace(':EID', examId),{
            method:'post',
            body:JSON.stringify(essay),
            headers: {'Content-Type':'application/json'}
        }).then( function (response){
            return response.json();
        })
    }

    createMcqQuestion(examId, mcq){
        return fetch(QUESTION_EXAM_API_URL+'/choice'.replace(':EID', examId),{
            method:'post',
            body:JSON.stringify(mcq),
            headers: {'Content-Type':'application/json'}
        }).then( function (response){
            return response.json();
        })
    }

    createFillQuestion(examId, blanks){
        return fetch(QUESTION_EXAM_API_URL+'/blanks'.replace(':EID', examId),{
            method:'post',
            body:JSON.stringify(blanks),
            headers: {'Content-Type':'application/json'}
        }).then( function (response){
            return response.json();
        })
    }

    createTFQuestion(examId, truefalse){
        return fetch(QUESTION_EXAM_API_URL+'/truefalse'.replace(':EID', examId),{
            method:'post',
            body:JSON.stringify(truefalse),
            headers: {'Content-Type':'application/json'}
        }).then( function (response){
            return response.json();
        })
    }





}