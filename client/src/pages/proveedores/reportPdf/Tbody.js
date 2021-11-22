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


const Tbody = ({ proveedores }) => {
    const rows = proveedores.map(proveedor =>
        <View style={styles.row} key={proveedor.idproveedor}>
            <Text style={styles.text}>{proveedor.idproveedor}</Text>
            <Text style={styles.text}>{proveedor.razonsocial}</Text>
            <Text style={styles.text}>{proveedor.rfc}</Text>
            <Text style={styles.text}>{proveedor.telefono}</Text>
            <Text style={styles.text}>{proveedor.correo}</Text>
            <Text style={styles.text}>{proveedor.direccion}</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment>)
};

export default Tbody;