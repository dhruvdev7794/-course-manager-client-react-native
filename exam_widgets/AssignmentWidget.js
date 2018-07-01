import React from 'react';
import {ScrollView} from 'react-native';
import {Text} from 'react-native-elements';

class AssignmentWidget extends React.Component{
    static navigationOption={title: 'Assignment'}
    constructor(props){
        super(props);
        this.state={
            assignmentId: 1,
            lessonId: 1,
            assignment: {
                title: '',
                description: '',
                points: 0,
                widgetType: 'Assignment'
            }
        }
    }

    render(){
        return(
            <ScrollView>
                <Text h2>Assignment</Text>

            </ScrollView>
        )
    }
}

export default AssignmentWidget;