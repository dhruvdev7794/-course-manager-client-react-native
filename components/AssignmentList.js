import React from 'react'
import {ScrollView,View,  Button} from 'react-native'
import {Text, ListItem, Icon} from 'react-native-elements'
import AssignmentServices from "../services/AssignmentServices";

export default class AssignmentList extends React.Component{
    constructor(props){

        super(props);
        this.assignmentService = AssignmentServices.instance;
        this.state={
            assignments:[],
            lessonId: 1
        };
    }

    componentDidMount(){
        const {navigation} = this.props;
        const lessonId = navigation.getParam("lessonId");
        if(lessonId!=null){
            this.setState({lessonId});
            this.assignmentService.findAssignmentsFromLessonId(lessonId)
                .then(assignments => this.setState({assignments}))
        }
    }

    deleteOption(assignment){
        this.assignmentService.deleteAssignment(assignment.id);
        this.assignmentService.findAssignmentsFromLessonId(this.state.lessonId)
            .then(assignments => this.setState({assignments}))
    }
    render(){
        return(
            <ScrollView>
                <Text h4>Assignments</Text>
                <Button title="Add Assignment"
                    onPress={() => this.props.navigation.navigate("AssignmentWidget",{
                    lessonId: this.state.lessonId
                })}/>
                {this.state.assignments.map((assignment, index) => {
                    return(
                        <View
                            key={index}>
                            <ListItem
                                onPress={() =>{
                                    this.props.navigation.navigate("AssignmentWidget"
                                        ,
                                        {
                                        assignmentId: assignment.id,
                                        widget: assignment,
                                        lessonId: this.state.lessonId
                                        }

                                    )}
                                }
                                subtitle={assignment.description}
                                title={assignment.text}/>
                            <Icon
                                name="trash"
                                type="font-awesome"
                                onPress={() => this.deleteOption(assignment)}
                            />
                        </View>
                            )})}


            </ScrollView>
        )
    }
}