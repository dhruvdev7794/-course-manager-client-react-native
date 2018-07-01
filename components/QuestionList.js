import React from 'react';
import {Text, ListItem} from 'react-native-elements';
import {ScrollView, Picker} from 'react-native';

class QuestionList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            widgets:[],
            questions:[],
            examId: 1,
            lessonId: 1,
            newQuestion:''
        }
    }
    componenetDidMount(){
        const {navigation} = this.props;
        const examId = navigation.getParam("examId");
        const lessonId = navigation.getParam("lessonId");
        this.setState({
            examId: examId,
            lessonId: lessonId
        });

        fetch("http://localhost:8080/api/exam/"+examId+"/question")
            .then(response => (response.json()))
            .then(questions => this.setState({questions: questions}));
    }
    render(){
        return(
            <ScrollView>
                <Text h2>Exams</Text>
                <Picker
                    selectedValue={this.state.questionType}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({questionType: itemValue})}>
                    <Picker.Item value="MC" label="Multiple choice" />
                    <Picker.Item value="ES" label="Essay" />
                    <Picker.Item value="TF" label="True or false" />
                    <Picker.Item value="FB" label="Fill in the blanks" />
                </Picker>



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

            </ScrollView>
        )
    }
}

export default QuestionList;