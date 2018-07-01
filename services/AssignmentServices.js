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
            this[_singleton] = new CourseService(_singleton);
        return this[_singleton]
    }




}
