import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, FlatList, Text, StyleSheet, Dimensions, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Back from "react-native-vector-icons/FontAwesome6";

const windowHight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const CmpB = ({ navigation }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getLikedItems = async () => {
            try {
                const storedItems = await AsyncStorage.getItem('items');
                const mainData = storedItems != null ? JSON.parse(storedItems) : [];
                setData(mainData);
            } catch (error) {
                console.error("Error in getItem:", error);
            }

        }
        getLikedItems();
    }, [])

    const handleBack = () => {
        navigation.goBack("CmpA");
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.arroback} onPress={() => handleBack()}>
                    <Back name='arrow-left-long' size={windowWidth * 0.08} color={'#FFFFFF'} />
                </TouchableOpacity>
                <Text style={styles.cmpbtext}>Favourite Item</Text>
            </View>
            <FlatList
                style={styles.flatlistContainer}
                data={data}
                renderItem={({ item }) => (
                    <View style={styles.itemcontainer}>
                        <View style={styles.avatarcontainer}>
                            <Image style={styles.avatarpic} source={{ uri: item.avatar }} />
                        </View>
                        <View style={styles.namecontainer}>
                            <View style={styles.fullnamecontainer}>
                                <Text style={styles.nametext}>{item.first_name}</Text>
                                <Text style={styles.nametext}>{item.last_name}</Text>
                            </View>
                            <Text style={styles.emailtext}>{item.email}</Text>

                        </View>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        width: windowWidth,
        height: windowHight * 0.08,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#28abfa',
        position: 'relative',
        flexDirection: 'row'
    },
    cmpbtext: {
        fontSize: windowWidth * 0.07,
        color: 'white',
        fontWeight: '600'
    },
    arroback: {
        position: 'absolute',
        left: windowWidth * 0.03,
    },
    itemcontainer: {
        flex: 1,
        flexDirection: 'row',
        height: windowHight * 0.1,
        width: windowWidth * 0.95,
        alignSelf: 'center',
        margin: windowWidth * 0.015,
        backgroundColor: "#F8F9FA",
        borderRadius: windowWidth * 0.03,
        alignItems: 'center',
    },
    avatarcontainer: {
        height: windowHight * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    namecontainer: {
        height: windowHight * 0.1,
        justifyContent: 'center',
        paddingLeft: windowWidth * 0.03,
        flex: 4
    },
    avatarpic: {
        width: 65,
        height: 65,
        borderRadius: 50,
    },
    fullnamecontainer: {
        flexDirection: 'row',
        gap: 8
    },
    nametext: {
        fontSize: windowWidth * 0.05,
        fontWeight: '600'
    },
    emailtext: {
        fontSize: windowWidth * 0.03,
        color: '#28abfa'
    },

})

export default CmpB;