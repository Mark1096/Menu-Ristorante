import React from 'react';
import { View, Text, StyleSheet } from "react-native";

export default class CartComponent extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <View style={{flexDirection: "row"}}>
                    <Text style={styles.textCount}> {this.props.data.count}x </Text>
                    <Text style={{fontSize: 18}}> {this.props.data.name} </Text>
                </View>
                <Text style={styles.textPrice}> {this.props.data.orderPrice}€ </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        marginHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "gray",
    },
    textCount: {
        fontSize: 18,
        color: "#00E5EE",
    },
    textPrice: {
        fontSize: 18,
        color: "gray",
    },
})