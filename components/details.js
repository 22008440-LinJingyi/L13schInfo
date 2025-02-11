import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, ScrollView } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    info: {
        fontSize: 16,
        marginVertical: 5,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#007BFF',
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default function Details({ route }) {
    const { item } = route.params;

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{item.school_name}</Text>
            <Text style={styles.info}>ID: {item._id}</Text>
            <Text style={styles.info}>Type: {item.type_code}</Text>
            <Text style={styles.info}>Address: {item.address}</Text>
            <Text style={styles.info}>Postal Code: {item.postal_code}</Text>
            <Text style={styles.info}>Contact: {item.telephone_no}</Text>

            {item.url_address && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => Linking.openURL(item.url_address)}>
                    <Text style={styles.buttonText}>Visit School Website</Text>
                </TouchableOpacity>
            )}
        </ScrollView>
    );
}

