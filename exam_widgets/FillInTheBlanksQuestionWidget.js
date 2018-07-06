import React from 'react'
import {Text, FormInput, FormLabel} from 'react-native-elements'
import {ScrollView,View , Button, TextInput} from 'react-native'
import FillInTheBlanksService from "../services/FillInTheBlanksService";
let self;
export default class FillInTheBlanksQuestionWidget extends React.Component{
    constructor(props){
        super(props);
        this.fillInBlanksService = FillInTheBlanksService.instance
        this.state = {
            lessonId: 1,
            id:1,
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
        self = this;
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
            if(typeof question.questionTxtArr != "object") question.questionTxtArr = question.questionTxtArr.split('|');
            if(typeof question.answer != "object") question.answer = question.answer.split('|');
            if(typeof question.variable != "object") question.variable = question.variable.split('|');
            this.setState({question: question, id:question.id});
        }
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
        return this.fillInBlanksService.findFBromQuestionId(this.state.id)
            .then(function (response) {
                if(response==null){
                    let question = self.state.question;
                    question={
                        title:self.state.question.title,
                        subtitle: self.state.question.subtitle,
                        points: self.state.question.points.toString(),
                        type: 'FB',
                        questionText:self.state.question.questionText,
                        questionTxtArr:question.questionTxtArr.join('|'),
                        answer:question.answer.join('|'),
                        variable:question.variable.join('|')
                    };
                    self.fillInBlanksService.createFBQuestion(self.state.examId, question)
                        .then(function (response) {
                            self.props.navigation.goBack();
                        })
                }
                else{
                    console.log("here");
                    let question = self.state.question;
                    question={
                        id:self.state.id,
                        title:self.state.question.title,
                        subtitle: self.state.question.subtitle,
                        points: self.state.question.points.toString(),
                        type: 'FB',
                        questionText:self.state.question.questionText,
                        questionTxtArr:question.questionTxtArr.join('|'),
                        answer:question.answer.join('|'),
                        variable:question.variable.join('|')
                    };
                    self.fillInBlanksService.updateFBQuestion(self.state.examId, question)
                        .then(function (response) {
                            self.props.navigation.goBack();
                        })
                }
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