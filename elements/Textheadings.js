import React from 'react'
import { View } from 'react-native'
import { Text, Divider } from 'react-native-elements'
const TextHeadings = () => (
    <View>
        <Text h1>Welcome!</Text>
        <Divider style={{
            backgroundColor: 'blue'
        }}/>
        <Text h2>Welcome h2</Text>
        <Text h3>Welcome h3</Text>
    </View>)
export default TextHeadings
