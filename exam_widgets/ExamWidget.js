import React from 'react';
import {Text, ButtonGroup} from 'react-native-elements';
import {ScrollView} from 'react-native';
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import EssayQuestion from "./EssayQuestion";
import TrueOrFalseQuestionWidget from "./TrueOrFalseQuestionWidget";

class ExamWidget extends React.Component{

    static navigationOptions = {title: 'Exam Widget'};
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

    componentDidMount(){
        const {navigation} = this.props;
        const lessonId = navigation.getParam("lessonId");
        this.setState({
            lessonId: lessonId
        })
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
                <Text>{this.state.selected}</Text>
                {this.state.selected===0 && <MultipleChoiceQuestion lessonId={this.state.lessonId} navigation={this.props.navigation}/>}
                {this.state.selected===1 && <EssayQuestion lessonId={this.state.lessonId} navigation={this.props.navigation}/>}
                {this.state.selected===2 && <EssayQuestion/>}
                {this.state.selected===3 && <TrueOrFalseQuestionWidget/>}

            </ScrollView>
        )
    }
}

export default ExamWidget;