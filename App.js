import React from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, Button } from 'react-native';
import FixedHeader from './elements/FixedHeader'
import TextHeadings from './elements/Textheadings'
import Icons from './elements/Icons'
import Exam from './elements/Exam'
import QuestionTypeButtonGroupChoose from './elements/QuestionTypeButtonGroupChoose';
import QuestionTypePicker from './elements/QuestionTypePicker';
import TrueFalseQuestionEditor from './elements/TrueFalseQuestionEditor';
import {createStackNavigator} from 'react-navigation'

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
                <Button title="Go to Screen A"
                        onPress={() => this.props.navigation
                            .navigate('ScreenA')}/>
                <Button title="Go to Screen B"
                        onPress={() => this.props.navigation
                            .navigate('ScreenB')}/>

                <TrueFalseQuestionEditor/>
                <QuestionTypeButtonGroupChoose/>
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
    Home: { screen: Home },
    ScreenA: { screen: ScreenA },
    ScreenB: { screen: ScreenB }
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
