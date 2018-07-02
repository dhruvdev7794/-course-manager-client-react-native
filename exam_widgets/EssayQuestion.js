import React from 'react'
import {ScrollView, View, Button} from 'react-native'
import {Text, FormInput, FormLabel} from 'react-native-elements'


export default class EssayQuestion extends React.Component{

    constructor(props){
        super(props);
        this.state={
            lessonId:1,
            exam:{
                text:'',
                description:'',
                points:0,
                questionType:'Essay'
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

    render(){
        return(
            <ScrollView>
                <Text h4>Essay Question</Text>
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


                <Text h4>Preview</Text>

                <Text>{this.state.exam.title}</Text>
                <Text>Points: {this.state.exam.points}</Text>
                <Text>Description:  {this.state.description}</Text>
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