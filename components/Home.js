import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: 'grey',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    searchBox: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    item: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 5,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
     },
});


export default function Home({ navigation }) {
    const [originalData, setOriginalData] = useState([]);
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetch('https://data.gov.sg/api/action/datastore_search?resource_id=d_688b934f82c1059ed0a6993d2a829089')
            .then((response) => response.json())
            .then((json) => {
                setOriginalData(json.result.records);
                setData(json.result.records);
            })
    }, []);

    const filterData = (text) => {
        setSearchQuery(text);
        if (text !== "") {
            const filteredData = originalData.filter((item) =>
                item.school_name && item.school_name.toLowerCase().includes(text.toLowerCase())
            );
            setData(filteredData);
        } else {
            setData(originalData);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SINGAPORE SCHOOLS</Text>
            <TextInput
                style={styles.searchBox}
                placeholder="Search"
                value={searchQuery}
                onChangeText={filterData}
            />
            <FlatList
                data={data}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => navigation.navigate('Details', { item })}
                    >
                        <Text style={styles.itemTitle}>{item.school_name}</Text>
                        <Text>Type: {item.type_code}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

