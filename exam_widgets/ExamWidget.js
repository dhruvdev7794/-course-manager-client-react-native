import React from 'react';
import {Text, ButtonGroup} from 'react-native-elements';
import {ScrollView} from 'react-native';

class ExamWidget extends React.Component{

    constructor(props){
        super(props);
        this.state={
            examId:1,
            lessonId: 1,
            isNew: true,
            widgetTypes:['Multiple Choice',
                'Fill in the blank', 'Essay', 'True or\nfalse'],
            selected: 0,
        }
    }



    render(){
        return(
            <ScrollView>
                <Text h2>Exam Widget</Text>
                <ButtonGroup
                    onPress={select => this.setState({
                        selected: select
                    })}
                    selectedIndex={this.state.selected}
                    buttons={this.state.widgetTypes}
                    containerStyle={{height: 75}}
                />
            </ScrollView>
        )
    }
}

export default ExamWidget;