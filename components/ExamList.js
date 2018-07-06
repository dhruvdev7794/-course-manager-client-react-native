import React from 'react'
import {ScrollView, Button, View} from 'react-native'
import {Text, ListItem, Icon} from 'react-native-elements'
import ExamServices from "../services/ExamServices";
let self;
export default class ExamList extends React.Component{
    constructor(props){
        super(props);
        this.examServices = ExamServices.instance
        this.state={
            exams:[],
            lessonId: 1
        }
        self = this;
    }

    componentDidMount(){
        const {navigation} = this.props;
        const lessonId = navigation.getParam("lessonId");
        console.log(lessonId);
        if(lessonId!=null){
            this.setState({lessonId});
            this.examServices.findExamByLesson(lessonId)
                .then(exams => this.setState({exams}))
        }

        console.log(this.state.exams);

    }

    deleteOption(exam){
        this.examServices.deleteExam(exam.id)
            .then(function (res) {
                self.examServices.findExamByLesson(self.state.lessonId)
                    .then(exams => self.setState({exams}))
            })
    }

    render(){
        return(
            <ScrollView>
                <Text h4>Exams</Text>
                <Button title="Add Exam"
                        onPress={() => this.props.navigation.navigate("ExamWidget",{
                            lessonId: this.state.lessonId
                        })}/>
                {this.state.exams.map((exam, index) => {
                    return(
                        <View key={index}>
                        <ListItem
                            onPress={()=>this.props.navigation.navigate("QuestionList",{
                                lessonId: this.state.lessonId,
                                examId: exam.id,
                                exam: exam
                            })}

                            title={exam.text}
                            subtitle={exam.description}/>
                            <Icon
                                name="trash"
                                type="font-awesome"
                                onPress={() => this.deleteOption(exam)}
                            />
                        </View>
                    )
                })}
            </ScrollView>
        )
    }
}
