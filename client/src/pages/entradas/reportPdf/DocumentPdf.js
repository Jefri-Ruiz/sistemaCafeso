import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import Thead from "./Thead";
import Tbody from "./Tbody";

const DocumentPdf = ({ entradas }) => {

    const styles = StyleSheet.create({

        title: {
            marginTop: '30',
            marginBottom: '10',
            fontSize: '12',
            textAlign: 'center'
        },

        tableContainer: {
            marginHorizontal: '30',
            flexDirection: 'row',
            flexWrap: 'wrap',
            borderWidth: 1,
            borderColor: '#bff0fd',
            fontSize: '10'
        }
    });

    return (
        <Document>
            <Page size="A4">
                <View style={styles.title}>
                    <Text>Entradas</Text>
                </View>
                <View style={styles.tableContainer}>

                    <Thead />
                    <Tbody entradas={entradas} />                   
                </View>
            </Page>
        </Document>

    )
};

export default DocumentPdf;