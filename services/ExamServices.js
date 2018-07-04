let _singleton = Symbol();
const EXAM_API_URL="http://localhost:8080/api/exam";
const EXAM_LESSON_API_URL = 'http://localhost:8080/api/lesson/LID/exam';

class ExamServices{
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new ExamServices(_singleton);
        return this[_singleton]
    }

    findAllExams(){
        return fetch(EXAM_API_URL)
            .then(function (response){
                return response.json();
            })
    }
    findExamById(examId){
        return fetch(EXAM_API_URL+"/"+examId)
            .then(function (response){
                return response.json();
            })
    }

    findExamByLesson(lessonId){
        console.log(EXAM_LESSON_API_URL.replace("LID", lessonId));
        return fetch(EXAM_LESSON_API_URL.replace("LID", lessonId))
            .then(function (response){
                return response.json();
            })
    }
    createNewExam(lessonId, exam){
        return fetch(EXAM_LESSON_API_URL.replace("LID", lessonId),{
            body: JSON.stringify(exam),
            headers: {'Content-Type': 'application/json'},
            method: 'POST'
        }).then(function (response){
            return response.json();
        })
    }
    deleteExam(examId){
        return fetch(EXAM_API_URL+'/'+examId ,{
            method: 'DELETE'
        })
    }

}
export default ExamServices;