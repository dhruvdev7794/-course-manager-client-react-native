import React from 'react';
import {ScrollView, View, Button} from 'react-native';
import {Text, FormLabel, FormValidationMessage, FormInput} from 'react-native-elements';
import AssignmentServices from '../services/AssignmentServices'

let self;
class AssignmentWidget extends React.Component{
    static navigationOption={title: 'Assignment'}
    constructor(props){
        super(props);
        this.assignmentService = AssignmentServices.instance
        this.state={
            assignmentId: 1,
            lessonId: 1,
            isNew: true,
            assignment: {
                text: '',
                description: '',
                points: 0,
                widgetType: 'Assignment'
            }
        };
        self = this;


    }
    componentDidMount(){
        const {navigation} = this.props;
        const assignmentId = navigation.getParam("assignmentId");
        const widget = navigation.getParam("widget");
        const lessonId = navigation.getParam("lessonId");
        let assignment = {};
        if(widget!=null){
            assignment ={
                text: (widget.text != null || widget.text != undefined) ? widget.text : '',
                description: (widget.description != null || widget.description != undefined) ? widget.description : '',
                points: (widget.points != null || widget.points != undefined) ? widget.points : 0,
                widgetType: 'Assignment'
            };
            this.setState({
                assignment: assignment
            })
        }

        if(widget!==null){
            this.setState({isNew: false})
        }
        this.setState({
            assignmentId: assignmentId,
            lessonId: lessonId
        })


    }

    setTitle(text){
        this.setState({
            assignment:{
                text: text,
                description: this.state.assignment.description,
                points:this.state.assignment.points.toString(),
                widgetType:this.state.widget
            }
        })
    }

    setDescription(description){
        this.setState({
            assignment:{
                text: this.state.assignment.text,
                description: description,
                points:this.state.assignment.points.toString(),
                widgetType:this.state.widget
            }
        })
    }

    setPoints(points){
        this.setState({
            assignment:{
                text: this.state.assignment.text,
                description: this.state.assignment.description,
                points:points.toString(),
                widgetType:this.state.widget
            }
        })
    }

    buttonPress(){
        console.log("hi");
    }

    createOrUpdateAssignment(){
        console.log(this.assignmentService);
        self.assignmentService.findAssignmentById(this.state.assignmentId)
            .then(function (response) {
                response = response.json();
                if(response!=null){
                    this.createAssgn(this.state.lessonId, this.state.assignment);
                }
                else{
                    this.updateAssgn(this.state.assignmentId, this.state.assignment);
                }
            })
    }

    createAssgn(lessonId, assignment){
        this.assignmentService.createAssignment(lessonId, assignment)
            .then(this.props.navigation.goBack())
    }

    updateAssgn(assignmentId, assignment){
        this.assignmentService.updateAssignment(assignmentId, assignment)
            .then(this.props.navigation.goBack())
    }

    render(){
        return(
            <ScrollView>
                <Text h2>Assignment</Text>

                <FormLabel>
                    Title
                </FormLabel>
                <FormInput
                    value={this.state.assignment.text}
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
                    <Text h4>{this.state.assignment.text}</Text>
                    <Text h5>Points: {this.state.assignment.points.toString()}</Text>
                    <Text h5>{this.state.assignment.description}</Text>
                    <FormInput
                        placeholder="Type your response"/>
                    <Text h5>Upload File</Text>
                    <Button title="Upload"
                            onPress={() => this.buttonPress()}/>
                    <Text h5>Submit Link</Text>
                    <FormInput placeholder="Enter Link"/>
                    <Button title="Submit"
                            onPress={() => this.createOrUpdateAssignment()}/>
                    <Button title="Cancel"
                            onPress={() =>this.props
                                .navigation
                                .goBack()}/>

                </View>



            </ScrollView>
        )
    }
}

export default AssignmentWidget;