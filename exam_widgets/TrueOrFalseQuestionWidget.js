import React from 'react'
import {Text, FormLabel, FormInput, CheckBox} from 'react-native-elements'
import {ScrollView, Button} from 'react-native'
import TrueOrFalseService from "../services/TrueOrFalseService";
let self
export default class TrueOrFalseQuestionWidget extends React.Component{
    constructor(props){
        super(props);
        this.trueFalseService = TrueOrFalseService.instance
        this.state={
            lessonId:1,
            examId: 1,
            questionId:1,
            question:{
                points: 0,
                title: '',
                subtitle:'',
                type: 'TF',
                isTrue:false
            }
        }
        self=this;
    }

    componentDidMount(){
        const {navigation} = this.props;
        const examId = navigation.getParam("examId");
        const lessonId = navigation.getParam("lessonId");
        const question = navigation.getParam("question");
        this.setState({
            examId: examId,
            lessonId: lessonId
        });
        if(question!=null){
            this.setState({question: question, questionId:question.id});
        }
    }


    setTitle(text){
        this.setState({
            question:{
                title:text,
                subtitle: this.state.question.subtitle,
                points: this.state.question.points.toString(),
                type: 'TF',
                isTrue: this.state.question.isTrue
            }
        })

    }
    setDescription(text){
        this.setState({
            question:{
                title:this.state.question.title,
                subtitle: text,
                points: this.state.question.points.toString(),
                type: 'TF',
                isTrue: this.state.question.isTrue
            }
        })

    }
    setPoints(text){
        this.setState({
            question:{
                title:this.state.question.title,
                subtitle: this.state.question.subtitle,
                points: text.toString(),
                type: 'TF',
                isTrue: this.state.question.isTrue
            }
        })

    }
    setTrue(isTrue){
        this.setState({
            question:{
                title:this.state.question.title,
                subtitle: this.state.question.subtitle,
                points: this.state.question.points.toString(),
                type: 'TF',
                isTrue: isTrue
            }
        })
    }

    submitBtn(){
        return self.trueFalseService.findTFFromQuestionId(this.state.questionId)
            .then(function (response) {
                if(response==null){
                    self.trueFalseService.createTFQuestion(self.state.examId, self.state.question)
                        .then(function (response) {
                            console.log(response);
                        })
                }
                else{
                    let question = self.state.question
                    question.id = self.state.questionId;
                    self.trueFalseService.updateTFQuestion(self.state.examId, question)
                        .then(function (response) {
                            console.log(response);
                        })
                }
            })

    }

    render(){
        return(
            <ScrollView>
                <Text h4>True or False Question</Text>
                <FormLabel>
                    Title
                </FormLabel>
                <FormInput
                    value={this.state.question.title}
                    onChangeText={text => this.setTitle(text)}/>

                <FormLabel>
                    Description
                </FormLabel>
                <FormInput
                    value={this.state.question.subtitle}
                    onChangeText={text => this.setDescription(text)}/>

                <FormLabel>
                    Points
                </FormLabel>
                <FormInput
                    value={this.state.question.points.toString()}
                    onChangeText={text => this.setPoints(text)}/>
                <CheckBox onPress={() => this.setTrue(!this.state.question.isTrue)}
                        checked={this.state.question.isTrue}
                        title="The answer is True"/>


                <Text h4>Preview</Text>
                <Text h3>{this.state.question.title}</Text>
                <Text h4>Points: {this.state.question.points.toString()}</Text>
                <Text h4>{this.state.question.subtitle}</Text>
                <CheckBox title="True"
                    checked={this.state.question.isTrue}/>
                <CheckBox title="False"
                    checked={!this.state.question.isTrue}/>
                <Button
                title="Submit"
                onPress={() => this.submitBtn()}/>


            </ScrollView>
        )
    }
}