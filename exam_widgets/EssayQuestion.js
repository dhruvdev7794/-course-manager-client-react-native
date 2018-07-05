import React from 'react'
import {ScrollView, View, Button} from 'react-native'
import {Text, FormInput, FormLabel} from 'react-native-elements'
import EssayService from "../services/EssayService";


export default class EssayQuestion extends React.Component{

    constructor(props){
        super(props);
        this.essayService = EssayService.instance
        this.state={
            lessonId:1,
            examId:1,
            question:{
                text:'',
                subtitle:'',
                points:0,
                questionType:'ES'
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
            question:question
        });
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
        this.essayService.createEssayQuestion(this.state.examId, this.state.question)
            .then(function (response) {
                console.log(response);
            })
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

            </ScrollView>
         )

    }
}