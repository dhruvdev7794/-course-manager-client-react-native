import React from 'react'
import {ScrollView, View, Button} from 'react-native'
import {Text, FormInput, FormLabel} from 'react-native-elements'
import EssayService from "../services/EssayService";

let self;
export default class EssayQuestion extends React.Component{

    constructor(props){
        super(props);
        this.state={
            lessonId:1,
            questionId: 1,
            examId:1,
            question:{
                title:'',
                subtitle:'',
                points:0,
                questionType:'ES'
            }
        };
        this.essayService = EssayService.instance;
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
            this.setState({question:question});
            this.setState({questionId: question.id});
        }
    }

    setTitle(text){
        this.setState({
            question:{
                title:text,
                subtitle: this.state.question.subtitle,
                points: this.state.question.points.toString(),
                type: 'ES'
            }
        })

    }
    setDescription(text){
        this.setState({
            question:{
                title:this.state.question.title,
                subtitle: text,
                points: this.state.question.points.toString(),
                type: 'ES'
            }
        })

    }
    setPoints(text){
        this.setState({
            question:{
                title:this.state.question.title,
                subtitle: this.state.question.subtitle,
                points: text.toString(),
                type: 'ES'
            }
        })

    }

    submitBtn(){
        return self.essayService.findEssayFromQuestionId(this.state.questionId)
            .then(function (response) {
                if(response==null){
                    self.essayService.createEssayQuestion(self.state.examId, self.state.question)
                        .then(function (response) {
                            if(response!=null) {
                                self.props.navigation.goBack();
                            }
                        })
                }
                else{
                    let question = self.state.question;
                    question.id=self.state.questionId;
                    self.essayService.updateEssayQuestion(self.state.examId, question)
                        .then(function (response) {
                            if(response!=null){
                                console.log(response);
                                self.props.navigation.goBack();
                            }
                        })
                }
            });
    }



    render(){
        return(
            <ScrollView>
                <Text h4>Essay Question</Text>
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


                <Text h4>Preview</Text>

                <Text>{this.state.question.title}</Text>
                <Text>Points: {this.state.question.points}</Text>
                <Text>Description:  {this.state.question.subtitle}</Text>
                <FormInput
                    placeholder="Enter Essay here"/>
                <Button
                    title="Submit"
                    onPress={() => this.submitBtn()}
                />
                <Button
                    title="Cancel"
                    onPress={() => this.props.navigation.goBack()}
                />

            </ScrollView>
         )

    }
}