import React from 'react';
import {View} from 'react-native'
import {ListItem} from 'react-native-elements'

const questions = [
    {	title: 'Question 1', subtitle: 'Multiple choice',
        icon: 'list'},
    {	title: 'Question 2', subtitle: 'Fill-in the blanks',
        icon: 'code'},
    {	title: 'Question 3', subtitle: 'True or false',
        icon: 'check'},
    {	title: 'Question 4', subtitle: 'Essay',
        icon: 'subject'}]


export default class Exam extends React.Component{

    render(){
        return(
            <View>
                {
                    questions.map( (question, index)=> (
                        <ListItem
                            subtitle={question.subtitle}
                            key={index}
                            leftIcon={{name:question.icon}}
                            title={question.title}
                        />
                    ))
                }
            </View>
        )
    }
}