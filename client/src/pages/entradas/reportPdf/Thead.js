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
        <Text style={styles.text}>Folio</Text>
        <Text style={styles.text}>SKU</Text>
        <Text style={styles.text}>ID Proveedor</Text>
        <Text style={styles.text}>Fecha</Text>
        <Text style={styles.text}>Hora</Text>
        <Text style={styles.text}>Cantidad</Text>
        <Text style={styles.text}>Costo Unitario</Text>
        <Text style={styles.text}>Costo Total</Text>
    </View>
);

export default Thead;