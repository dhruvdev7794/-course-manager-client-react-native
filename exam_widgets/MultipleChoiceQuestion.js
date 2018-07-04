import React from 'react'
import {Text, Icon, FormLabel, FormInput} from 'react-native-elements'
import {ScrollView, Button, TextInput, View} from 'react-native'

export default class MultipleChoiceQuestion extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lessonId: 1,
            textInput:'',
            mcqArray: [],
            points: 0,
            exam:{
                text:'',
                description:'',
                points:0,
                questionType:'mcq'
            }
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
        console.log("clicked");
    }
    deleteOption(index){

    }
    correctOption(index){

    }

    setTitle(text){
        this.setState({
            exam:{
                title:text,
                description: this.state.exam.description,
                points: this.state.exam.points.toString(),
                questionType: 'Essay'
            }
        })

    }
    setDescription(text){
        this.setState({
            exam:{
                title:this.state.exam.title,
                description: text,
                points: this.state.exam.points.toString(),
                questionType: 'Essay'
            }
        })

    }
    setPoints(text){
        this.setState({
            exam:{
                title:this.state.exam.title,
                description: this.state.exam.description,
                points: text.toString(),
                questionType: 'Essay'
            }
        })

    }


    render(){
        return(
            <ScrollView>
                <Text h4>Multiple Choice Question</Text>
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

                <FormLabel>
                    Points
                </FormLabel>
                <FormInput
                    value={this.state.exam.points.toString()}
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

                <Text h4>Preview</Text>

                <Text>{this.state.exam.title}</Text>
                <Text>Points: {this.state.exam.points}</Text>
                <Text>Description:  {this.state.description}</Text>
                {this.state.mcqArray.map((option, index) => (
                    <View
                        style={{
                            flexDirection: 'row'
                            }}>

                            <Text key={index}>{option}</Text>

                            <Icon
                                name="trash"
                                type="font-awesome"
                                onPress={() => this.deleteOption(index)}
                            />
                            <Icon
                                name="check"
                                type="font-awesome"
                                onPress={() => this.correctOption(index)}
                            />
                    </View>
                ))}
                <Button
                    title="Submit"
                    onPress={() => this.submitBtn()}
                />
            </ScrollView>
        )
    }
}
