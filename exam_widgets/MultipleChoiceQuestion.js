import React from 'react'
import {Text, Icon} from 'react-native-elements'
import {ScrollView, Button, TextInput, View} from 'react-native'

export default class MultipleChoiceQuestion extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lessonId: 1,
            textInput:'',
            mcqArray: [],
            points: 0
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


    render(){
        return(
            <ScrollView>
                <Text h4>Multiple Choice Question</Text>
                <TextInput
                    onChangeText={text => this.setText(text)}/>
                <Button
                    onPress={() => this.addMcqOption()}
                    title="Add Option"/>
                {this.state.mcqArray.map((option, index) => (
                    <View>
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
                        <View
                            style={{
                                flexDirection: 'row'
                            }}>
                            <Text>Points:</Text>
                            <TextInput
                                onChangeText={points => this.setState({
                                    points: points
                                })}/>
                        </View>

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
