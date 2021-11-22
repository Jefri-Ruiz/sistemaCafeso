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


const Tbody = ({ clientes }) => {
    const rows = clientes.map(cliente =>
        <View style={styles.row} key={cliente.idcliente}>
            <Text style={styles.text}>{cliente.idcliente}</Text>
            <Text style={styles.text}>{cliente.nombre}</Text>
            <Text style={styles.text}>{cliente.apellidopaterno}</Text>
            <Text style={styles.text}>{cliente.apellidomaterno}</Text>
            <Text style={styles.text}>{cliente.rfc}</Text>
            <Text style={styles.text}>{cliente.telefono}</Text>
            <Text style={styles.text}>{cliente.correo}</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment>)
};

export default Tbody;