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
    }
});


const Tbody = ({ salidas }) => {
    const rows = salidas.map(salida =>
        <View style={styles.row} key={salida.folio}>
            <Text style={styles.smallItem}>{salida.folio}</Text>
            <Text style={styles.smallItem}>{salida.sku}</Text>
            <Text style={styles.smallItem}>{salida.idcliente}</Text>
            <Text style={styles.item}>{salida.fecha}</Text>
            <Text style={styles.item}>{salida.hora}</Text>
            <Text style={styles.smallItem}>{salida.cantidad}</Text>
            <Text style={styles.item}>$ {salida.preciopublico}</Text>
            <Text style={styles.smallItem}>{salida.descuento} %</Text>
            <Text style={styles.item}>$ {salida.montototal}</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment>)
};

export default Tbody;