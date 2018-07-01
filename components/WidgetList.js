import React from 'react';
import {View} from 'react-native';
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
            <View>
                <Text h2>Widgets</Text>
                {this.state.widgets.map(
                    (widget, index) => (
                        <ListItem
                            onPress={() =>{
                                if(widget.widgetType === 'Exam'){
                                    // this.props.navigation
                                    //     .navigate("QuestionList", {examId: widget.id})
                                }
                                else{
                                    this.props.navigation
                                    .navigate("AssignmentWidget", {examId: widget.id})
                                }
                            }}

                            key={index}
                            subtitle={widget.widgetType}
                            title={widget.text}/>))}
            </View>
        )
    }
}

export default WidgetList;