import React from 'react'
import {ScrollView, Button} from 'react-native'
import {Text, ListItem} from 'react-native-elements'
import ExamServices from "../services/ExamServices";

export default class ExamList extends React.Component{
    constructor(props){
        super(props);
        this.examServices = ExamServices.instance
        this.state={
            exams:[],
            lessonId: 1
        }
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

    render(){
        return(
            <ScrollView>
                <Text h4>Exams</Text>
                <Button title="Add widgets"
                        onPress={() => this.props.navigation.navigate("ExamWidget",{
                            lessonId: this.state.lessonId
                        })}/>
                {this.state.exams.map((exam, index) => {
                    return(
                        <ListItem
                            onPress={()=>this.props.navigation.navigate("ExamWidget",{
                                lessonId: this.state.lessonId,
                                examId: exam.id,
                                exam: exam
                            })}
                            key={index}
                            title={exam.text}
                            subtitle={exam.description}/>
                    )
                })}
            </ScrollView>
        )
    }
}
