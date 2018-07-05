import React from 'react'
import {Text, FormInput, FormLabel} from 'react-native-elements'
import {ScrollView,View , Button, TextInput} from 'react-native'
import FillInTheBlanksService from "../services/FillInTheBlanksService";

export default class FillInTheBlanksQuestionWidget extends React.Component{
    constructor(props){
        super(props);
        this.fillInBlanksService = FillInTheBlanksService.instance
        this.state = {
            lessonId: 1,
            questionArr:[],
            question:{
                title: '',
                subtitle: '',
                points: 0,
                type: 'FB',
                questionText:'',
                questionTxtArr:[],
                answer:[],
                variable:[]
            }
        }
    }
    componentDidMount(){
        const {navigation} = this.props;
        const examId = navigation.getParam("examId");
        const lessonId = navigation.getParam("lessonId");
        const question = navigation.getParam("question");
        console.log(question);
        question.questionTxtArr = question.questionTxtArr.split('|');
        question.answer = question.answer.split('|');
        question.variable = question.variable.split('|');

        this.setState({
            examId: examId,
            lessonId: lessonId,
            question: question
        });
    }


    setTitle(text){
        this.setState({
            question:{
                title:text,
                subtitle: this.state.question.subtitle,
                points: this.state.question.points.toString(),
                type: 'FB',
                questionText: this.state.question.questionText,
                questionTxtArr: this.state.question.questionTxtArr,
                answer:this.state.question.answer,
                variable: this.state.question.variable
            }
        })

    }
    setDescription(text){
        this.setState({
            question:{
                title:this.state.question.title,
                subtitle: text,
                points: this.state.question.points.toString(),
                type: 'FB',
                questionText: this.state.question.questionText,
                questionTxtArr: this.state.question.questionTxtArr,
                answer:this.state.question.answer,
                variable: this.state.question.variable
            }
        })

    }
    setPoints(text){
        this.setState({
            question:{
                title:this.state.question.title,
                subtitle: this.state.question.subtitle,
                points: text.toString(),
                type: 'FB',
                questionText: this.state.question.questionText,
                questionTxtArr: this.state.question.questionTxtArr,
                answer:this.state.question.answer,
                variable: this.state.question.variable
            }
        })
    }

    setQuestionText(text){
        this.setState({
            question:{
                title:this.state.question.title,
                subtitle: this.state.question.subtitle,
                points: this.state.question.points.toString(),
                type: 'FB',
                questionText: text,
                questionTxtArr: this.state.question.questionTxtArr,
                answer:this.state.question.answer,
                variable: this.state.question.variable
            }
        });
        this.setState({
            questionArr: this.state.question.questionText.split(/(\[(.+?)=(.+?)\])/g)
        });



    }
    addQuestion(){
        let ansArr=[], varArr=[], textArr=[];
        this.state.questionArr.map((option, index) => {
            if(index%4==0){
                textArr.push(option);
            }
            else if(index%4==2){
                varArr.push(option)
            }
            else if(index%4==3){
                ansArr.push(option)
            }
        });
        console.log("hi");
        this.setState({
            question:{
                title:this.state.question.title,
                subtitle: this.state.question.subtitle,
                points: this.state.question.points.toString(),
                type: 'FB',
                questionText:this.state.question.questionText,
                questionTxtArr:textArr,
                answer:ansArr,
                variable:varArr
            }
        });
    }

    submitBtn(){
        let question = this.state.question;
        question={
            title:this.state.question.title,
            subtitle: this.state.question.subtitle,
            points: this.state.question.points.toString(),
            type: 'FB',
            questionText:this.state.question.questionText,
            questionTxtArr:question.questionTxtArr.join('|'),
            answer:question.answer.join('|'),
            variable:question.variable.join('|')
        };
        this.fillInBlanksService.createFBQuestion(this.state.examId, question)
            .then(function (response) {
                console.log(response);
            })
    }

    render(){
        return(
            <ScrollView>
                <Text h4> Fill in the Blanks</Text>
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

                <FormLabel>
                    Question:
                </FormLabel>
                <FormInput
                    value={this.state.question.questionText}
                    onChangeText={text => this.setQuestionText(text)}/>
                <Button
                    title="Add Question"
                    onPress={() => this.addQuestion()}
                />
                {this.state.question.questionTxtArr.map((option, index) => (
                    <View key={index}
                          style={{
                              flexDirection: 'row'
                          }}>
                        >
                        <Text>{option}</Text>
                        {option!='' && <FormInput/>}
                    </View>
                ))}
                <Text h4>Preview</Text>
                <Text h3>{this.state.question.title}</Text>
                <Text h4>Points: {this.state.question.points.toString()}</Text>
                <Text h4>{this.state.question.subtitle}</Text>
                {this.state.question.questionTxtArr.map((option, index) => (
                    <View key={index}
                          style={{
                              flexDirection: 'row'
                          }}>
                        >
                        <Text>{option}</Text>
                        {option!='' && <FormInput/>}
                    </View>
                ))}

                <Button
                    title="Submit"
                    onPress={() => this.submitBtn()}/>

            </ScrollView>
        )
    }
}