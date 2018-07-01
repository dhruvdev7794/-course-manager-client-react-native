import React from 'react';
import {ScrollView, View, Button} from 'react-native';
import {Text, FormLabel, FormValidationMessage, FormInput} from 'react-native-elements';
import AssignmentServices from '../services/AssignmentServices'

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
        };
        this.assignmentService = AssignmentServices.instance

    }

    setTitle(title){
        this.setState({
            assignment:{
                title: title,
                description: this.state.assignment.description,
                points:this.state.assignment.points,
                widgetType:this.state.widget
            }
        })
    }

    setDescription(description){
        this.setState({
            assignment:{
                title: this.state.assignment.title,
                description: description,
                points:this.state.assignment.points,
                widgetType:this.state.widget
            }
        })
    }

    setPoints(points){
        this.setState({
            assignment:{
                title: this.state.assignment.title,
                description: this.state.assignment.description,
                points:points,
                widgetType:this.state.widget
            }
        })
    }

    render(){
        return(
            <ScrollView>
                <Text h2>Assignment</Text>

                <FormLabel>
                    Title
                </FormLabel>
                <FormInput
                    value={this.state.assignment.title}
                    onChangeText={text => this.setTitle(text)}/>

                <FormLabel>
                    Description
                </FormLabel>
                <FormInput
                    value={this.state.assignment.description}
                    onChangeText={text => this.setDescription(text)}/>

                <FormLabel>
                    Points
                </FormLabel>
                <FormInput
                    value={this.state.assignment.points.toString()}
                    onChangeText={text => this.setPoints(text)}/>


                <Text h3>Preview</Text>
                <View>
                    <Text h4>{this.state.assignment.title}</Text>
                    <Text h5>Points: {this.state.assignment.points}</Text>
                    <Text h5>{this.state.assignment.description}</Text>
                    <FormInput
                        placeholder="Type your response"/>
                    <Text h5>Upload File</Text>
                    <Button title="Upload"/>
                    <Text h5>Submit Link</Text>
                    <FormInput placeholder="Enter Link"/>
                    <Button title="Submit"/>
                    <Button title="Cancel"/>

                </View>



            </ScrollView>
        )
    }
}

export default AssignmentWidget;