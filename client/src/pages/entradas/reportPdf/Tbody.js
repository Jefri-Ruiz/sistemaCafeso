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


const Tbody = ({ entradas }) => {
    const rows = entradas.map(entrada =>
        <View style={styles.row} key={entrada.folio}>
            <Text style={styles.text}>{entrada.folio}</Text>
            <Text style={styles.text}>{entrada.sku}</Text>
            <Text style={styles.text}>{entrada.idproveedor}</Text>
            <Text style={styles.text}>{entrada.fecha}</Text>
            <Text style={styles.text}>{entrada.hora}</Text>
            <Text style={styles.text}>{entrada.cantidad}</Text>
            <Text style={styles.text}>$ {entrada.costounitario}</Text>
            <Text style={styles.text}>$ {entrada.costototal}</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment>)
};

export default Tbody;