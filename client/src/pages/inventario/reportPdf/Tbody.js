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
    },

    bigItem: {
        width: '50%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    }
});


const Tbody = ({ inventario }) => {
    const rows = inventario.map(inventario =>
        <View style={styles.row} key={inventario.idinventario}>
            <Text style={styles.smallItem}>{inventario.idinventario}</Text>
            <Text style={styles.item}>{inventario.fecha}</Text>
            <Text style={styles.item}>{inventario.hora}</Text>
            <Text style={styles.smallItem}>{inventario.sku}</Text>
            <Text style={styles.bigItem}>{inventario.descripcion}</Text>
            <Text style={styles.smallItem}>{inventario.stocksistema}</Text>
            <Text style={styles.smallItem}>$ {inventario.stockfisico}</Text>
            <Text style={styles.item}>$ {inventario.preciounitario}</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment>)
};

export default Tbody;