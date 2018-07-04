import React from 'react'
import {ScrollView, Button} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

export default class AssignmentList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            assignments:[],
            lessonId: 1
        }
    }

    render(){
        return(
            <ScrollView>
                <Text h4>Assignments</Text>
                <Button title="Add widgets"
                    onPress={() => this.props.navigation.navigate("AssignmentWidget",{
                    lessonId: this.state.lessonId
                })}/>
                {this.state.assignments.map((assignments, index) => {
                    return(
                        <ListItem
                            onPress={() =>{
                                this.props.navigation.navigate("AssignmentWidget"
                                    // ,
                                    // {
                                    // assignmentId: widget.id,
                                    // widget: widget,
                                    // lessonId: this.state.lessonId
                                    // }

                                )}
                            }
                            key={index}
                            subtitle={assignments.title}
                            title={assignments.description}/>
                            )})}

            </ScrollView>
        )
    }
}