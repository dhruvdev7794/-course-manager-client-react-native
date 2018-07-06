import React from 'react';
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class CourseList extends React.Component{
    static navigationOptions = {title: 'Courses'}
    constructor(props){
        super(props);
        this.state={
            courses:[]
        };
        fetch('https://dhruv-sharma-course-mgmt.herokuapp.com/api/course')
            .then(response => (response.json()))
            .then(courses => {
                this.setState({courses:courses})
            })
    }

    componentDidMount(){
        const {navigation} = this.props
    }

    render(){
        return(
            <View>
                <Text h2>Courses</Text>
                {this.state.courses.map((course, index) => (
                    <ListItem
                        onPress={() => this.props.navigation.navigate("ModuleList",
                            {courseId: course.id})}
                        title={course.title}
                        key={index}/>
                ))}
            </View>
        )
    }

}

export default CourseList