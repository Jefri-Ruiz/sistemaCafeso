import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        backgroundColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    text: {
        width: '30%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    }
});

const Thead = () => (
    <View style={styles.container}>
        <Text style={styles.text}>No</Text>
        <Text style={styles.text}>Razon Social</Text>
        <Text style={styles.text}>RFC</Text>
        <Text style={styles.text}>Telefono</Text>
        <Text style={styles.text}>Correo</Text>
        <Text style={styles.text}>Direccion</Text>
    </View>
);

export default Thead;