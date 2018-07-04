let _singleton = Symbol();
const ASSIGNMENT_API_URL = 'http://localhost:8080/api/assignment';
const ASSIGNMENT_LESSON_API_URL = 'http://localhost:8080/api/lesson/LID/assignment';

class AssignmentServices{
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new AssignmentServices(_singleton);
        return this[_singleton]
    }

    deleteAssignment(assignmentId){
        return fetch(ASSIGNMENT_API_URL+'/'+assignmentId, {
            method: 'DELETE'
        })
    }

    findAssignmentById(assignmentId){
        return fetch(ASSIGNMENT_API_URL+'/'+assignmentId)
            .then(function(response){
                return response;
            })
    }

    findAssignmentsFromLessonId(lessonId){
        return fetch(ASSIGNMENT_LESSON_API_URL.replace("LID", lessonId))
            .then(function (response){
                if(response.status>409){
                    return null;
                }
                return response.json();
            })
    }

    findAllAssignment(){
        return fetch(ASSIGNMENT_API_URL)
            .then(function (response) {
                return response.json();
            });
    }

    createAssignment(lessonId, assignment){
        console.log(assignment);
        console.log(lessonId);
        return fetch(ASSIGNMENT_LESSON_API_URL.replace("LID", lessonId),{
                body: JSON.stringify(assignment),
                headers: {'Content-type': 'application/json'},
                method: 'PUT'
            }).then(function (response) {
                return response.json();
        })
    }

    updateAssignment(assignmentId, assignment){
        return fetch(ASSIGNMENT_API_URL+'/'+assignmentId,{
                body: JSON.stringify(assignment),
                headers: {'Content-type': 'application/json'},
                method: 'PUT'
            })
            .then(function (response){
                return response.json();
            });
    }


}
export default AssignmentServices;