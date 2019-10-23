import React from 'react';
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import Carrello from "./Carrello";
import { createStackNavigator } from 'react-navigation-stack';

class Detail extends React.Component {

    state={
        item: null,
        count: 0,
        orderPrice: 0.0,
    }

    static navigationOptions = ({navigation}) => {
        return{
            title: "Dettagli",
            headerLeft: (
                <View>
                    <TouchableOpacity 
                        onPress={ () => navigation.goBack()}>
                        <MaterialIcons 
                        style={{paddingHorizontal: 5, marginBottom: 32}}
                        name={"arrow-back"}
                        size={40} 
                        color={"black"}
                        />
                    </TouchableOpacity>          
                </View>
            ),
            headerRight: (
                <View></View>
            )
        }   
    }

    _addSpace = array => {
        var contain = [];
        for(var i = 0; i < array.length; i++) {
            if(i < array.length-1) {
                contain += array[i] + ", ";
            }
            else {
                contain += array[i];
            }
        }
        return contain;
    }

    _increaseCount = () => {
        let valPrice = this.state.orderPrice + this.state.item.price;
        this.setState({count: this.state.count + 1, orderPrice: valPrice});
    }

    _decreaseCount = () => {
        let val = this.state.count;
        if(val === 0)
            return;
        let valPrice = this.state.orderPrice - this.state.item.price;
        this.setState({count: this.state.count - 1, orderPrice: valPrice});
    }

    _order = () => {
        let item = {
            name: this.state.item.name,
            count: this.state.count,
            orderPrice: this.state.orderPrice,
        }

        this.props.navigation.navigate("Carrello", {
            data: item
        });

        Alert.alert(
          'Aggiunto al carrello',
          'Il tuo ordine è stato aggiunto',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        );
      }

    componentWillMount() {
        var component = this.props.navigation.getParam("data");
        this.setState({item: component})
    }

    render() {
        var ingredients = this._addSpace(this.state.item.ingredients)
        return(
            <View style={styles.container}>
                <Image source={{uri: this.state.item.image}} style={styles.img} />
                <View style={styles.text}>
                    <Text numberOfLines={2} style={{fontSize: 23, fontWeight: "bold"}}> {this.state.item.name} </Text>
                    <Text style={{fontSize: 23}}> {this.state.item.price}€ </Text>
                </View>
                <View style={{marginLeft: 20, marginTop: -30}}>
                    <Text 
                        style={{fontSize: 20, color:'gray'}}> INGREDIENTI: {ingredients} 
                    </Text>
                </View>
                <View style={styles.order}>
                    <TouchableOpacity
                        onPress={this._decreaseCount}
                    >
                        <Ionicons
                            name={"ios-remove-circle-outline"}
                            size={50} 
                            color={"#00E5EE"}
                        />
                    </TouchableOpacity>

                    <Text style={{fontSize: 25, paddingHorizontal: 25}} > {this.state.count} </Text>

                    <TouchableOpacity
                        onPress={this._increaseCount}
                    >
                        <Ionicons
                            name={"ios-add-circle-outline"}
                            size={50} 
                            color={"#00E5EE"}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.viewButton}>
                    <TouchableOpacity
                        onPress={this._order}
                    >
                        <View style={styles.buttonOrder}>
                            <Text style={{fontSize: 23}}> Aggiungi al carrello - {this.state.orderPrice}€ </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

// rendere Detail uno StackNavigator crea problemi poichè si avranno più stack annidati e di conseguenza
// più header, da risolvere
const detailNavigator = createStackNavigator({
    Detail: Detail,
    Carrello: Carrello,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#EAEAEA",
        borderBottomWidth: 2,
        borderBottomColor: "#AAAAAA", 
        height: 35,
      },
      headerTintColor: "black",
      headerTitleStyle: {  
        flex: 1,
        textAlign: "center",    
        marginBottom: 40,
        fontWeight: "bold",
        fontSize: 28 
      },
    }
  },
);

export default detailNavigator;

// da sistemare lo StyleSheet, gestirlo bene tramite il flexbox
// sistemare anche lo stile del bottone per aggiungere al carrello perchè in base alla lunghezza del prezzo si allarga o si stringe

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    img: {
        width: "100%",
        height: 250,
    },
    text: {
        flex: 1, 
        flexDirection: "row", 
        justifyContent: "space-between", 
        marginTop: 15,
        paddingHorizontal: 15,
    },
    order: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
    },
    viewButton: {
        flex: 1, 
        flexDirection: "row", 
        justifyContent: "center", 
        alignItems: "center",
    },  
    buttonOrder: {
        justifyContent: "center",
        alignItems: "center",
        
        height: 70,
        backgroundColor: "#00E5EE", 
        paddingHorizontal: 10,
        paddingVertical: 0,
    }
})