import React from 'react';
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'

class CourseList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            courses:[]
        };
        fetch('http://localhost:8080/api/course')
            .then(response => (response.json()))
            .then(courses => {
                this.setState({courses:courses})
            })
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