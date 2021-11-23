import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
    },
    text: {
        width: '30%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    }
});


const Tbody = ({ productos }) => {
    const rows = productos.map(producto =>
        <View style={styles.row} key={producto.sku}>
            <Text style={styles.text}>{producto.sku}</Text>
            <Text style={styles.text}>{producto.descripcion}</Text>
            <Text style={styles.text}>$ {producto.preciounitario}</Text>
            <Text style={styles.text}>{producto.iva} %</Text>
            <Text style={styles.text}>$ {producto.preciopublico}</Text>
            <Text style={styles.text}>{producto.stocksistema}</Text>
            <Text style={styles.text}>$ {producto.valoralmacen}</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment>)
};

export default Tbody;