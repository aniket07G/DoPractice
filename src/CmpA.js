import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Dimensions, ActivityIndicator, FlatList } from "react-native";
import Like from "react-native-vector-icons/FontAwesome";
import Dislike from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowHight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const CmpA = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [likedItems, setLikedItems] = useState([]);

    const loadStoredId = async () => {
        const ids = await getItem();
        const onlyIds = ids.map(item => item.id);
        setLikedItems(onlyIds);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://reqres.in/api/users?page=2');
                const responseData = await response.json();
                console.log(responseData.data);
                setData(responseData.data);

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
        loadStoredId();
    }, [])

    const storeItem = async (newItem) => {
        try {
            const existingItems = await getItem();
            const updatedItems = [...existingItems, newItem];
            await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
            setLikedItems(prev => [...prev, newItem.id]);
        } catch (error) {
            console.error("Failed to store item", error);
        }
    }

    const getItem = async () => {
        try {
            const storedItems = await AsyncStorage.getItem('items');
            const mainData = storedItems != null ? JSON.parse(storedItems) : [];
            console.log("mainData", mainData);
            return mainData;
        } catch (error) {
            console.error("Error in getItem:", error);
            return [];
        }
    };


    const handlelike = async (data) => {
        const retrivedItems = await getItem();
        let isExist = false;
        for (let i = 0; i < retrivedItems.length; i++) {
            if (data.id === retrivedItems[i].id) {
                isExist = true;
                break;
            }
        }
        console.log("checking", isExist)
        if (!isExist) {
            await storeItem(data);
        }
    }

    const handledislike = async (data) => {
        const retrivedItems = await getItem();
        let isExist = false;
        console.log(retrivedItems);
        for (let i = 0; i < retrivedItems.length; i++) {
            if (data.id === retrivedItems[i].id) {
                isExist = true;
                break;
            }
        }
        console.log("isExisted", isExist)
        if (isExist) {
            const updatedItems = retrivedItems.filter(item => item.id !== data.id);
            await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
            setLikedItems(prev => prev.filter(id => id !== data.id));
        }
    }

    const doLike = (item) => {
        return likedItems.includes(item.id);
    };

    const getColorForButton = (item, type) => {
        const likeStatus = doLike(item);
        if (likeStatus === null) return "black";
        if (likeStatus === true && type === "like") return "blue";
        if (likeStatus === false && type === "dislike") return "red";
        return "black";
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text1}>List</Text>
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
                        <View style={styles.iconcontainer}>
                            <TouchableOpacity onPress={() => handlelike(item)}>
                                <Like name="thumbs-o-up" size={windowWidth * 0.09} color={getColorForButton(item, "like")} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handledislike(item)}>
                                <Dislike name="thumbs-o-down" size={windowWidth * 0.09} color={getColorForButton(item, "dislike")} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

            />
            <TouchableOpacity style={styles.fvtcontainer} onPress={()=>navigation.navigate("CmpB")}>
                <Text style={styles.fvttext}>Favourite Item</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: windowWidth,
        height: windowHight * 0.08,
        alignItems: 'center',
        backgroundColor: '#28abfa',
        justifyContent: 'center',
        position: 'relative',
    },
    text1: {
        fontSize: windowWidth * 0.07,
        color: 'white',
        fontWeight: '600'
    },
    flatlistContainer: {
        flex: 1,
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
        flex: 3
    },
    iconcontainer: {
        height: windowHight * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2,
        flexDirection: 'row',
        gap: 13
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
    fvtcontainer: {
        backgroundColor: '#28abfa',
        width: windowWidth,
        height: windowHight * 0.08,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    fvttext: {
        color: '#FFFFFF',
        fontWeight: '800',
        fontSize: windowWidth * 0.05
    }
})

export default CmpA;