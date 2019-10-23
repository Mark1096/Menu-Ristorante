import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default class FilterItem extends React.Component {
    render() {
        var {ingredient} = this.props.data;
        var {select} = this.props.data;
        return (
            <TouchableHighlight onPress={this.props.onToggle} underlayColor={'#EAEAEA'}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.text}> { ingredient } </Text>
                    </View>
                    <View>
                        {select ? (
                            <MaterialIcons 
                                name={"check-box"}
                                size={40} 
                                color={"blue"}
                            />
                        ) : (
                            <MaterialIcons 
                                name={"check-box-outline-blank"}
                                size={40} 
                                color={"blue"}
                            />
                        )}
                    </View>
                    
                </View>
            </TouchableHighlight>
        )
    }
} 

const styles = StyleSheet.create({
    container: { 
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: "space-between",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        marginHorizontal: 10,
    },
    text: {
        fontSize: 22,
        color: "black",
    }
})