import React from 'react'
import {ScrollView} from 'react-native'
import {Text, ButtonGroup} from 'react-native-elements'
import AssignmentWidget from "../exam_widgets/AssignmentWidget";

class AddWidget extends React.Component{
    static navigationOptions = {title: 'Add Widget'};
    constructor(props){
        super(props);
        this.state={
            widgetTypes:['Exam', 'Assignment'],
            selected: 0,
            lessonId: 1
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
                <Text h3>Add Widget</Text>
                <ButtonGroup
                    onPress={select => this.setState({
                        selected: select
                    })}
                    selectedIndex={this.state.selected}
                    buttons={this.state.widgetTypes}
                />
                <Text>{this.state.selected}</Text>
                {this.state.selected===1 && <AssignmentWidget lessonId={this.state.lessonId} navigation={this.props.navigation}/>}
            </ScrollView>
        )
    }
}

export default AddWidget