import React from 'react'
import {Text, Icon, FormLabel, FormInput, CheckBox} from 'react-native-elements'
import {ScrollView, Button, View} from 'react-native'
import MultipleChoiceQuestionService from "../services/MultipleChoiceQuestionService";
let self;
export default class MultipleChoiceQuestion extends React.Component{
    constructor(props){
        super(props);
        this.mcqService = MultipleChoiceQuestionService.instance
        this.state = {
            lessonId: 1,
            textInput:'',
            mcqArray: [],
            points: 0,
            id:1,
            question:{
                title:'',
                subtitle:'',
                points:0,
                type:'MC',
                correctOption:'',
                options:''
            }
        };
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
            if(typeof question.options != "object")
                question.options=question.options.split('|');
            this.setState({question:question, id:question.id});
            this.setState({mcqArray:question.options});
        }
    }


    setText(text){
        this.setState({
            textInput: text
        })
    }
    addMcqOption(){
        let tempArr = this.state.mcqArray;
        tempArr.push(this.state.textInput);
        this.setState({
            mcqArray: tempArr,
            textInput: ''
        })
    }
    submitBtn(){
        return this.mcqService.findMCQFromQuestionId(this.state.id)
            .then(function (response) {
                if(response==null){
                    let question = self.state.question;
                    question.options = self.state.mcqArray.join('|');
                    self.mcqService.createMCQQuestion(self.state.examId, question)
                        .then(function (response) {
                            self.props.navigation.goBack()
                        })
                }
                else{
                    let question = self.state.question;
                    question.id=self.state.id;
                    question.options = self.state.mcqArray.join('|');
                    console.log(question);
                    self.mcqService.createMCQQuestion(self.state.examId, question)
                        .then(function (response) {
                            self.props.navigation.goBack()
                        })
                }
            });

    }
    deleteOption(index){
        let mcq = this.state.mcqArray;
        delete mcq[index];
        this.setState({
            mcqArray: mcq
        })
    }

    setTitle(text){
        this.setState({
            question:{
                title:text,
                subtitle: this.state.question.subtitle,
                points: this.state.question.points.toString(),
                type: 'MC',
                correctOption:this.state.question.correctOption,
                options:this.state.question.options
            }
        })

    }
    setDescription(text){
        this.setState({
            question:{
                title:this.state.question.title,
                subtitle: text,
                points: this.state.question.points.toString(),
                type: 'MC',
                correctOption:this.state.question.correctOption,
                options:this.state.question.options
            }
        })

    }
    setPoints(text){
        this.setState({
            question:{
                title:this.state.question.title,
                subtitle: this.state.question.subtitle,
                points: text.toString(),
                type: 'MC',
                correctOption:this.state.question.correctOption,
                options:this.state.question.options
            }
        })

    }
    setCorrectOption(option){

        this.setState({
            question:{
                title:this.state.question.title,
                subtitle: this.state.question.subtitle,
                points: this.state.question.points.toString(),
                type: 'MC',
                correctOption:option,
                options:this.state.question.options
            }
        });

    }


    render(){
        return(
            <ScrollView>
                <Text h4>Multiple Choice Question</Text>
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
                    Add options
                </FormLabel>
                <FormInput
                    value={this.state.textInput}
                    onChangeText={text => this.setText(text)}/>
                <Button
                    onPress={() => this.addMcqOption()}
                    title="Add Option"/>
                {this.state.mcqArray.map((option, index) => (
                    <View
                        key={index}
                        style={{
                            flexDirection: 'row'
                        }}>

                        <CheckBox title={option}
                                  checked={this.state.question.correctOption === option}
                                  onPress={() => this.setCorrectOption(option)}/>

                        <Icon
                            name="trash"
                            type="font-awesome"
                            onPress={() => this.deleteOption(index)}
                        />
                    </View>
                ))}

                <Text h4>Preview</Text>

                <Text>{this.state.question.title}</Text>
                <Text>Points: {this.state.question.points}</Text>
                <Text>{this.state.question.subtitle}</Text>
                {this.state.mcqArray.map((option, index) => (
                    <View
                        key={index}
                        style={{
                            flexDirection: 'row'
                            }}>

                            <CheckBox
                                title={option}
                                checked={this.state.question.correctOption===option}
                            />
                    </View>
                ))}
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
