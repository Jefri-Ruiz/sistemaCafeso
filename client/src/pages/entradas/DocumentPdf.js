import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const DocumentPdf = ({ entradas }) => {

    const styles = StyleSheet.create({
        general: {
            marginVertical: '30',
            fontSize: '12',
        },
        
        thead: {
            backgroundColor: '#DADADA',
            marginHorizontal: '30',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },

        trow: {
            backgroundColor: '#F3F1F1',
            marginHorizontal: '30',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },

        text: {
            textAlign: 'center'
        }
    });

    return (
        <Document>
            <Page size="A4" style={styles.general}>
                <Text style={styles.text}>Entradas</Text>
                <View style={styles.thead}>
                    <Text style={styles.text}>Folio</Text>
                    <Text style={styles.text}>SKU</Text>
                    <Text style={styles.text}>ID Proveedor</Text>
                    <Text style={styles.text}>Fecha</Text>
                    <Text style={styles.text}>Hora</Text>
                    <Text style={styles.text}>Cantidad</Text>
                    <Text style={styles.text}>Costo Unitario</Text>
                    <Text style={styles.text}>Costo Total</Text>
                </View>
                {entradas.map(entrada => (
                    <View style={styles.trow} key={entrada.folio}>
                        <Text style={styles.text}>{entrada.folio}</Text>
                        <Text style={styles.text}>{entrada.sku}</Text>
                        <Text style={styles.text}>{entrada.idproveedor}</Text>
                        <Text style={styles.text}>{entrada.fecha}</Text>
                        <Text style={styles.text}>{entrada.hora}</Text>
                        <Text style={styles.text}>{entrada.cantidad}</Text>
                        <Text style={styles.text}>$ {entrada.costounitario}</Text>
                        <Text style={styles.text}>$ {entrada.costototal}</Text>
                    </View>
                ))}
            </Page>
        </Document>

    )
};

export default DocumentPdf;