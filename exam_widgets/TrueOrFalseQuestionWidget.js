import React from 'react'
import {Text, FormLabel, FormInput, CheckBox} from 'react-native-elements'
import {ScrollView, Button} from 'react-native'
import TrueOrFalseService from "../services/TrueOrFalseService";

export default class TrueOrFalseQuestionWidget extends React.Component{
    constructor(props){
        super(props);
        this.trueFalseService = TrueOrFalseService.instance
        this.state={
            lessonId:1,
            examId: 1,
            isTrue:false,
            question:{
                points: 0,
                title: '',
                subtitle:'',
                type: 'TF',
                isTrue:false
            }
        }
    }

    componentDidMount(){
        const {navigation} = this.props;
        const examId = navigation.getParam("examId");
        const lessonId = navigation.getParam("lessonId");
        const question = navigation.getParam("question");
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
        this.setState({isTrue: isTrue});
    }

    submitBtn(){
        console.log(this.state.question);
        this.trueFalseService.createTFQuestion(this.state.examId, this.state.question)
            .then(function (response) {
                console.log(response);
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
                <CheckBox onPress={() => this.setTrue(!this.state.isTrue)}
                        checked={this.state.isTrue}
                        title="The answer is True"/>


                <Text h4>Preview</Text>
                <Text h3>{this.state.question.title}</Text>
                <Text h4>Points: {this.state.question.points.toString()}</Text>
                <Text h4>{this.state.question.subtitle}</Text>
                <CheckBox title="True"
                    checked={this.state.isTrue}/>
                <CheckBox title="False"
                    checked={!this.state.isTrue}/>

                <Button
                title="Submit"
                onPress={() => this.submitBtn()}/>


            </ScrollView>
        )
    }
}