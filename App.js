import React from 'react';
import { StyleSheet, View, StatusBar, ScrollView, Button } from 'react-native';
import FixedHeader from './elements/FixedHeader'
import TextHeadings from './elements/Textheadings'
import Icons from './elements/Icons'
import Exam from './elements/Exam'
import QuestionTypeButtonGroupChoose from './elements/QuestionTypeButtonGroupChoose';
import QuestionTypePicker from './elements/QuestionTypePicker';
import TrueFalseQuestionEditor from './elements/TrueFalseQuestionEditor';
import {createStackNavigator} from 'react-navigation'
import {Text} from 'react-native-elements';
import ScreenX from './elements/ScreenX';
import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList';
import LessonList from './components/LessonList'
import WidgetList from './components/WidgetList'
import QuestionList from './components/QuestionList';
import AssignmentWidget from './exam_widgets/AssignmentWidget'
import AddWidget from './editors/AddWidget'
import EssayQuestion from "./exam_widgets/EssayQuestion";
import TrueOrFalseQuestionWidget from "./exam_widgets/TrueOrFalseQuestionWidget";

class Home extends React.Component{

    static navigationOptions = {
        title:'Home'
    }
    constructor(props){
        super(props);
    }

    render(){
        return(
            <ScrollView>
                <StatusBar/>
                <FixedHeader/>
                <Button title="Courses"
                        onPress={() => this.props.navigation
                            .navigate('CourseList')}/>
                <Button title="Go to Screen A"
                        onPress={() => this.props.navigation
                            .navigate('ScreenA')}/>
                <Button title="Go to Screen B"
                        onPress={() => this.props.navigation
                            .navigate('ScreenB')}/>

                <Button title="Go to Screen X"
                        onPress={() => this.props.navigation
                            .navigate('ScreenX', {parameter: 'some value'})}/>

                {/*<EssayQuestion/>*/}
                <TrueOrFalseQuestionWidget/>
                <QuestionTypePicker/>
                <TextHeadings/>
                <Icons/>
                <Exam/>
            </ScrollView>
        )
    }

}

class ScreenA extends React.Component {
    static navigationOptions = {title: "Screen A"};
    render(){
        return(
            <View>
                <Text h1>Screen A</Text>
                <Button title="Go Home"
                        onPress={() =>this.props
                            .navigation
                            .goBack()} />

            </View>
        )
    }
};

const ScreenB = () => (
    <View>
        <Text h1>Screen B</Text>
    </View>
);

const App = createStackNavigator({
    Home,
    CourseList,
    AddWidget,
    ModuleList,
    QuestionList,
    AssignmentWidget,
    LessonList,
    WidgetList,
    ScreenA,
    ScreenB,
    ScreenX
});

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
