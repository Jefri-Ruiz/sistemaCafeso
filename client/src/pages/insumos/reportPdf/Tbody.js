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


const Tbody = ({ insumos }) => {
    const rows = insumos.map(insumo =>
        <View style={styles.row} key={insumo.sku}>
            <Text style={styles.text}>{insumo.sku}</Text>
            <Text style={styles.text}>{insumo.descripcion}</Text>
            <Text style={styles.text}>{insumo.costounitario}</Text>
            <Text style={styles.text}>{insumo.unidadmedida}</Text>
            <Text style={styles.text}>{insumo.stocksistema}</Text>
            <Text style={styles.text}>$ {insumo.valoralmacen}</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment>)
};

export default Tbody;