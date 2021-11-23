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

    smallItem: {
        width: '20%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },

    item: {
        width: '35%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    }
});

const Thead = () => (
    <View style={styles.container}>
        <Text style={styles.smallItem}>Folio</Text>
        <Text style={styles.smallItem}>SKU</Text>
        <Text style={styles.smallItem}>ID Proveedor</Text>
        <Text style={styles.item}>Fecha</Text>
        <Text style={styles.item}>Hora</Text>
        <Text style={styles.smallItem}>Cantidad</Text>
        <Text style={styles.item}>Costo Unitario</Text>
        <Text style={styles.item}>Costo Total</Text>
    </View>
);

export default Thead;