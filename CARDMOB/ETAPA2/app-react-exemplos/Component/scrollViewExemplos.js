import React, {Component} from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

class ScrollViewExemple extends Component {
    state = {
        names: [
            {"name": "Jeremy", "id": 1},
            {"name": "Bonnie", "id": 2},
            {"name": "Lexi", "id": 3},
            {"name": "Elena", "id": 4},
            {"name": "Stefan", "id": 5},
            {"name": "Caroline", "id": 6},
            {"name": "Damon", "id": 7},
            {"name": "Tyler", "id": 8},
            {"name": "Rebekah", "id": 9},
            {"name": "Klaus", "id": 10},
            {"name": "Elijah", "id": 11},
            {"name": "Hayley", "id": 12}

        ]
    }

    render () {
        return(
            <View>
                <ScrollView>
                    {
                        this.state.names.map((item, index) => (
                            <View
                                key={item.id}
                                style={StyleSheet.item}
                            >
                                <Image source={require('../assets/favicon.png')} />
                                <Text>{item.name}</Text>
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
        );
    }
}

export default ScrollViewExemple;

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 30,
        margin: 2,
        borderColor: '#2a4944',
        borderWidth: 1,
        backgroundColor: '#d2f7f1'
    }
});