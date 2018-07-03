import React from 'react'
import {Text, FormInput, FormLabel} from 'react-native-elements'
import {ScrollView, Button} from 'react-native'

export default class FillInTheBlanksQuestionWidget extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lessonId: 1,
            exam:{
                title: '',
                description: '',
                points: 0,
                questionType: 'FillInTheBlanks'
            }
        }
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

    submitBtn(){
        console.log("Submit button clicked")
    }

    displayDescription(){

    }

    render(){
        return(
            <ScrollView>
                <Text h4> Fill in the Blanks</Text>
                <FormLabel>
                    Title
                </FormLabel>
                <FormInput
                    value={this.state.exam.title}
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


                <Text h4>Preview</Text>
                <Text h3>{this.state.exam.title}</Text>
                <Text h4>Points: {this.state.exam.points.toString()}</Text>
                <Text h4>{this.displayDescription(this.state.exam.description)}</Text>

                <Button
                    title="Submit"
                    onPress={() => this.submitBtn()}/>

            </ScrollView>
        )
    }
}