import React from 'react';
import {Text, ListItem, ButtonGroup} from 'react-native-elements';
import {ScrollView, Picker} from 'react-native';
import MultipleChoiceQuestion from "../exam_widgets/MultipleChoiceQuestion";
import EssayQuestion from "../exam_widgets/EssayQuestion";
import TrueOrFalseQuestionWidget from "../exam_widgets/TrueOrFalseQuestionWidget";
import FillInTheBlanksQuestionWidget from "../exam_widgets/FillInTheBlanksQuestionWidget";

class QuestionList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            widgets:[],
            questions:[],
            examId: 1,
            lessonId: 1,
            newQuestion:'',
            widgetTypes:['Multiple Choice',
                'Fill in the blank', 'Essay', 'True or\nfalse'],
            selected: 0,
        }
    }
    componentDidMount(){
        const {navigation} = this.props;
        const examId = navigation.getParam("examId");
        const lessonId = navigation.getParam("lessonId");
        this.setState({
            examId: examId,
            lessonId: lessonId
        });
        console.log("http://localhost:8080/api/exam/"+examId+"/question");
        fetch("http://localhost:8080/api/exam/"+examId+"/question")
            .then(response => (response.json()))
            .then(questions => this.setState({questions: questions}));
    }
    render(){
        return(
            <ScrollView>
                <Text h2>Exams</Text>

                {this.state.questions.map((question, index) => (
                    <ListItem
                        key={index}
                        subtitle={question.subtitle}
                        title={question.title}
                        onPress={() => {
                            if(question.type==="TF"){

                            }
                            else if(question.type === "MC"){

                            }
                            else if(question.type === "FB"){

                            }
                            else if(question.type === "ES"){

                            }
                        }}/>
                ))}
                <Text>{JSON.stringify(this.state.questions)}</Text>
                <ButtonGroup
                    onPress={select => this.setState({
                        selected: select
                    })}
                    selectedIndex={this.state.selected}
                    buttons={this.state.widgetTypes}
                    containerStyle={{height: 75}}
                />
                <Text>{this.state.selected}</Text>
                {this.state.selected===0 && <MultipleChoiceQuestion examId={this.state.examId} lessonId={this.state.lessonId} navigation={this.props.navigation}/>}
                {this.state.selected===1 && <FillInTheBlanksQuestionWidget examId={this.state.examId} lessonId={this.state.lessonId} navigation={this.props.navigation}/>}
                {this.state.selected===2 && <EssayQuestion examId={this.state.examId} lessonId={this.state.lessonId} navigation={this.props.navigation}/>}
                {this.state.selected===3 && <TrueOrFalseQuestionWidget examId={this.state.examId} lessonId={this.state.lessonId} navigation={this.props.navigation}/>}

            </ScrollView>
        )
    }
}

export default QuestionList;