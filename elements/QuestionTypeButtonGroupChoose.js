import React from 'react';
import {ButtonGroup} from 'react-native-elements';
import {Alert} from 'react-native';

class QuestionTypeButtonGroupChoose extends React.Component{
    constructor(props){
        super(props);
        this.state={
            selectedQuestionTypeIndex: 0
        }
    }

    selectQuestionType = (newQuestionTypeIndex) => {
        this.setState({
            selectedQuestionTypeIndex: newQuestionTypeIndex
        })
    }
    render () {
        const buttons = ['Multiple Choice',
            'Fill in the blank', 'Essay', 'True or\nfalse']
        return (
            <ButtonGroup
                onPress={this.selectQuestionType}
                selectedIndex={this.state.selectedQuestionTypeIndex}
                buttons={buttons}
                containerStyle={{height: 75}}/>
        )
    }
}

export default QuestionTypeButtonGroupChoose