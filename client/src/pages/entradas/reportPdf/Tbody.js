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
        width: '30%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    }
});


const Tbody = ({ entradas }) => {
    const rows = entradas.map(entrada =>
        <View style={styles.row} key={entrada.folio}>
            <Text style={styles.smallItem}>{entrada.folio}</Text>
            <Text style={styles.smallItem}>{entrada.sku}</Text>
            <Text style={styles.smallItem}>{entrada.idproveedor}</Text>
            <Text style={styles.item}>{entrada.fecha}</Text>
            <Text style={styles.item}>{entrada.hora}</Text>
            <Text style={styles.smallItem}>{entrada.cantidad}</Text>
            <Text style={styles.item}>$ {entrada.costounitario}</Text>
            <Text style={styles.item}>$ {entrada.costototal}</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment>)
};

export default Tbody;