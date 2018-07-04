import React from 'react';
import {ScrollView, Button} from 'react-native';
import {ListItem, Text} from 'react-native-elements';

class WidgetList extends React.Component{
    static navigationOptions = {title: 'Widgets'}
    constructor(props){
        super(props);
        this.state = {
            widgets: [],
            lessonId: 1,
        }
    }

    componentDidMount() {
        const {navigation} = this.props;
        const lessonId = navigation.getParam("lessonId")
        fetch("http://localhost:8080/api/lesson/"+lessonId+"/widget")
            .then(response => (response.json()))
            .then(widgets => this.setState({widgets}))
    }

    render(){
        return(
            <ScrollView>
                {/*<Text h2>Widgets</Text>*/}
                {/*<Button title="Add widgets"*/}
                        {/*onPress={() => this.props.navigation.navigate("AddWidget",{*/}
                            {/*lessonId: this.state.lessonId*/}
                        {/*})}/>*/}
                {/*{this.state.widgets.map(*/}
                    {/*(widget, index) => {*/}
                        {/*return(*/}
                        {/*<ListItem*/}
                            {/*onPress={() =>{*/}
                                {/*if(widget.widgetType === 'Exam'){*/}
                                    {/*// this.props.navigation*/}
                                    {/*//     .navigate("QuestionList", {examId: widget.id})*/}
                                {/*}*/}
                                {/*else{*/}
                                    {/*this.props.navigation*/}
                                        {/*.navigate("AssignmentWidget", {*/}
                                            {/*assignmentId: widget.id,*/}
                                            {/*widget: widget,*/}
                                            {/*lessonId: this.state.lessonId*/}
                                        {/*})*/}
                                {/*}*/}
                            {/*}}*/}
                            {/*key={index}*/}
                            {/*subtitle={widget.title}*/}
                            {/*title={widget.description}/>*/}
                    {/*)})}*/}

                <Button
                    title="Assignments"
                    onPress={() => this.props.navigation.navigate("AssignmentList",{
                        lessonId: this.state.lessonId
                    })}/>
                <Button
                    title="Exams"
                    onPress={() => this.props.navigation.navigate("ExamList",{
                        lessonId: this.state.lessonId
                    })}/>
            </ScrollView>
        )
    }
}

export default WidgetList;