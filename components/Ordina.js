import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default class Ordina extends React.Component {

    state = {
        listItem: [],
    }

    componentDidMount() {
        this.setState({listItem: this.props.navigation.getParam("list")});
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={{fontSize: 20}}> Sono Ordina </Text>
                <TouchableOpacity onPress={this.props.navigation.getParam("onClear")}>
                    <View style={styles.confirmButton}>
                        <Text style={{fontSize: 20, color: "white", fontWeight: "bold"}}> Conferma </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    confirmButton: {
        backgroundColor: "#00E5EE",
        width: "90%",
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 20,
    }
})