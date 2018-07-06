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
        const lessonId = navigation.getParam("lessonId");
        if(lessonId!=null){
            this.setState({lessonId});
        }

        fetch("https://dhruv-sharma-course-mgmt.herokuapp.com/api/lesson/"+lessonId+"/widget")
            .then(response => (response.json()))
            .then(widgets => this.setState({widgets}))
    }

    render(){
        return(
            <ScrollView>
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