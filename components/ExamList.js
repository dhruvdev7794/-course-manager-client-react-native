import React from 'react'
import {ScrollView} from 'react-native'
import {Text} from 'react-native-elements'

export default class ExamList extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <ScrollView>
                <Text h4>Exams</Text>
            </ScrollView>
        )
    }
}
