import React from 'react';
import { Text, View, TextInput, StyleSheet } from "react-native";

export default class SearchBar extends React.Component {

    state = {
        text: "",
    }

    _save = input => {
        this.setState({text: input});
    }

    render() {
        return(
        <View style={styles.searchBar} >
            <TextInput style={styles.searchText}
                underlineColorAndroid="transparent"
                placeholder="Cerca nel menù per nome o categoria"
                onChangeText={this._save}
                onSubmitEditing={ () => this.props.onSubmit(this.state.text)}
            />
        </View>
        )
    }

}

const styles = StyleSheet.create({
    searchBar: {
      width: "100%",
      height: 55,
      marginTop: 10,
      marginBottom: 30,
      borderWidth: 0,
      borderRadius: 15,
      backgroundColor: "#F5F5F5",
      color: "gray",
      justifyContent: "center",
    },
    searchText: {
      fontSize: 20,
    }
  })