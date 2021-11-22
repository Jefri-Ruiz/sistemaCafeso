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
        <Text style={styles.text}>SKU</Text>
        <Text style={styles.text}>Descripcion</Text>
        <Text style={styles.text}>Costo Unitario</Text>
        <Text style={styles.text}>Unidad de medida</Text>
        <Text style={styles.text}>Stock en Sistema</Text>
        <Text style={styles.text}>Valor del Almacen</Text>
    </View>
);

export default Thead;