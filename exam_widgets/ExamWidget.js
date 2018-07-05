import React from 'react';
import {Text, ButtonGroup, FormInput, FormLabel} from 'react-native-elements';
import {ScrollView, Button} from 'react-native';
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import EssayQuestion from "./EssayQuestion";
import TrueOrFalseQuestionWidget from "./TrueOrFalseQuestionWidget";
import ExamServices from "../services/ExamServices";

class ExamWidget extends React.Component{

    static navigationOptions = {title: 'Exam Widget'};
    constructor(props){
        super(props);
        this.examService = ExamServices.instance;
        this.state={
            examId:1,
            lessonId: 1,
            exam:{
                text:'',
                description:'',
                widgetType:'Exam'
            },
            isNew: true,
            widgetTypes:['Multiple Choice',
                'Fill in the blank', 'Essay', 'True or\nfalse'],
            selected: 0,
        }
    }

    componentDidMount(){
        const {navigation} = this.props;
        const lessonId = navigation.getParam("lessonId");
        this.setState({
            lessonId: lessonId
        })
    }
    setTitle(text){
        this.setState({
            exam: {
                text: text,
                description: this.state.exam.description,
                widgetType:'Exam'
            }
        })

    }
    setDescription(text){
        this.setState({
            exam: {
                text: this.state.exam.text,
                description: text,
                widgetType:'Exam'
            }
        })
    }
    submitBtn(){
        this.examService.createNewExam(this.state.lessonId, this.state.exam)
            .then(function (response) {
                console.log(response);
            })
    }

    render(){
        return(
            <ScrollView>
                <Text h2>Exam Widget</Text>
                <FormLabel>
                    Title
                </FormLabel>
                <FormInput
                    value={this.state.exam.text}
                    onChangeText={text => this.setTitle(text)}/>

                <FormLabel>
                    Description
                </FormLabel>
                <FormInput
                    value={this.state.exam.description}
                    onChangeText={text => this.setDescription(text)}/>

                <Button
                    title="Submit"
                    onPress={() => this.submitBtn()}
                />

            </ScrollView>
        )
    }
}

export default ExamWidget;