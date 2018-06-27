import React from 'react';
import {View} from 'react-native'
import {FormLabel, FormInput, FormValidationMessage, Button, CheckBox} from 'react-native-elements';

class TrueFalseQuestionEditor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title:'',
            description: '',
            points: 0,
            isTrue: true
        }
    }

    updateForm(newState){
        this.setState(newState);
    }
    render(){
        return(
            <View>
                <FormLabel
                    onChangeTest = {text => this.updateForm({title:text})}>
                    Title
                </FormLabel>
                <FormInput />
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel
                    onChangeTest = {text => this.updateForm({description:text})}>
                    Description
                </FormLabel>
                <FormInput />
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>

                <CheckBox onPress={() => this.updateForm({isTrue: !this.state.isTrue})}
                          checked={this.state.isTrue} title='The answer is true'
                    />

                <Button	backgroundColor="green"
                           color="white"
                           title="Save"/>
                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"/>



            </View>
        )
    }
}

export default TrueFalseQuestionEditor;
