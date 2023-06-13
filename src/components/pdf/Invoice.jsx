
import React from 'react';
import { Page, Document, Image, StyleSheet, View, Text, Font, RadialGradient } from '@react-pdf/renderer';
import Logo from '../../assets/UnderDogs_logo.png';

//fonts 
import Roboto from '../../assets/fontsource/Roboto-Bold.ttf';
import Roboto_Medium from '../../assets/fontsource/Roboto-Medium.ttf';
Font.register(({
    family: 'Roboto',
    src: Roboto,
    fontStyle: 'normal',
    fontWeight: 'bold'
}))
Font.register(({
    family: 'Roboto-medium',
    src: Roboto_Medium,
    fontStyle: 'normal',
    fontWeight: 'medium'
}))


const THEME_COLOUR = 'rgb(214, 89, 51)';

const styles = StyleSheet.create({
    h1font: {
        fontSize: 26,
        fontWeight: 'demibold'
    },
    h2font: {
        fontSize: 14,
        fontWeight: 'demibold',
        textAlign: 'center',
        color: 'white',
        padding: 4,
    },
    h3font: {
        fontSize: 18,
        fontWeight: 'demibold'
    },

    pfont: {
        fontSize: 12,
        fontWeight: 'medium',
        margin: 2,
        fontFamily: 'Roboto-medium'

    },
    page: {
        fontSize: 12,
        paddingTop: 30,
        paddingLeft: 30,
        paddingRight: 30,
        lineHeight: 1.3,
        flexDirection: 'column',
        fontFamily: 'Roboto'
    },
    FlexRow: {
        display: 'flex',
        flexDirection: "row",
        minWidth: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    invoiceHeaderRow: {
        backgroundColor: THEME_COLOUR,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 2,
        color: 'white',
        padding: 2,
        minWidth: '150px',
        maxWidth: '150px',
        margin: 3,
    },
    totalSectionRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontWeight: 'extrabold',
        fontSize: '14',
        gap: 2,
        padding: 2,
        minWidth: '200px',
        maxWidth: '200px',
        margin: 3,
        border: 1,
    },
    totalSectionRowlast: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontWeight: 'demibold',
        fontSize: '16',
        color: 'white',
        gap: 2,
        padding: 4,
        minWidth: '200px',
        maxWidth: '200px',
        margin: 3,
        backgroundColor: THEME_COLOUR
    },
    totalSectionFont: {
        color: 'black',
    },

    logo: {
        display: 'flex',
        width: 250,
        height: 100,
        alignSelf: 'flex-start',
        margin: -1
    },


    details: {
        marginVertical: 10,
        padding: 5,
        borderRadius: '50%',

    },
    headerLeftcolumn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '50%',
        marginLeft: 4
    },
    headerRightcolumn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        maxWidth: '50%',
    },
    table: {
        display: 'table',
        width: '100%',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottom: 2,
        fontFamily: 'Roboto-medium',
        fontWeight: 'medium',
        borderBottomColor: THEME_COLOUR,
        width: '100%',

    },
    tableCell: {
        padding: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        fontSize: 12,
        width: '20%',
        minHeight: 4,

    },
    tableHeader: {
        width: '20%',
        backgroundColor: THEME_COLOUR,
        color: 'white',
        fontWeight: 'extrabold',
        fontSize: 14,
        padding: 10,

    },

    footer: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: 30,
        left: '5%',
        right: '10%',
        minWidth: '100%',
        borderTop: 3,
        borderTopColor: THEME_COLOUR,
        padding: 4,
    },


});


const DummyData = {
    about: {
        name: 'paras',
        mobile: "7765546",
        email: "p@gmail.com",
    },
    plan: {
        name: 'student plan',
        plan: 'Monthly',
        price: '5000',
        timespan: '5 Months '
    }

}
const Invoice = ({ invoice }) => (
    <Document>
        <Page size="A4" style={styles.page}>

            <View style={styles.FlexRow}>
                <View style={styles.headerLeftcolumn}>
                    <Image src={Logo} style={styles.logo}></Image>
                    <Text style={styles.h3font}>Invoice to :</Text>
                    <Text style={styles.pfont}>{DummyData.about.name}</Text>
                    <Text style={styles.pfont}>{DummyData.about.mobile}</Text>
                    <Text style={styles.pfont}>{DummyData.about.email}</Text>
                </View>
                <View style={styles.headerRightcolumn}>
                    <Text style={styles.h1font}>INVOICE</Text>
                    <View style={styles.invoiceHeaderRow}>
                        <Text style={styles.h2font}>Invoice</Text>
                        <Text style={styles.h2font}>0019</Text>
                    </View>
                    <View style={styles.invoiceHeaderRow}>
                        <Text style={styles.h2font}>Date</Text>
                        <Text style={styles.h2font}>Current Date</Text>
                    </View>

                </View>

            </View>
            <View style={styles.details}>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={[styles.tableCell, styles.tableHeader]}>
                            <Text>Subscription</Text>
                        </View>
                        <View style={[styles.tableCell, styles.tableHeader]}>
                            <Text>Type</Text>
                        </View>
                        <View style={[styles.tableCell, styles.tableHeader]}>
                            <Text>Price</Text>
                        </View>
                        <View style={[styles.tableCell, styles.tableHeader]}>
                            <Text>Time</Text>
                        </View>
                        <View style={[styles.tableCell, styles.tableHeader]}>
                            <Text>Total</Text>
                        </View>
                    </View>
                    {/* {your data here  } */}
                    <View style={styles.tableRow}>
                        <View style={styles.tableCell}>
                            <Text>{DummyData.plan.name}</Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text>{DummyData.plan.plan}</Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text>{DummyData.plan.price}</Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text>{DummyData.plan.timespan}</Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text>{DummyData.plan.price}</Text>
                        </View>
                    </View>
                    {/* {your data here  } */}
                    <View style={styles.tableRow}>
                        <View style={styles.tableCell}>
                            <Text>{DummyData.plan.name}</Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text>{DummyData.plan.plan}</Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text>{DummyData.plan.price}</Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text>{DummyData.plan.timespan}</Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text>{DummyData.plan.price}</Text>
                        </View>
                    </View>

                </View>
            </View>
            <View style={styles.FlexRow}>
                <View style={styles.headerLeftcolumn}>
                    <Text style={styles.h3font}>Payment Info</Text>
                    <View style={styles.FlexRow}>
                        <Text style={styles.pfont}>Account No</Text>
                        <Text style={styles.pfont}> +012345678</Text>
                    </View>
                    <View style={styles.FlexRow}>
                        <Text style={styles.pfont}>Name</Text>
                        <Text style={styles.pfont}>Lorem Ipsum </Text>
                    </View>
                    <View style={styles.FlexRow}>
                        <Text style={styles.pfont}>Bank Account</Text>
                        <Text style={styles.pfont}>012345678</Text>
                    </View>

                </View>
                <View style={styles.headerRightcolumn}>
                    <View style={styles.totalSectionRow}>
                        <Text style={styles.totalSectionFont}>Sub total</Text>
                        <Text style={styles.totalSectionFont}> 20</Text>
                    </View>
                    <View style={styles.totalSectionRow}>
                        <Text style={styles.totalSectionFont}>Tax</Text>
                        <Text style={styles.totalSectionFont}>10 </Text>
                    </View>
                    <View style={styles.totalSectionRowlast}>
                        <Text>Total</Text>
                        <Text>100 </Text>
                    </View>
                </View>
            </View>
            <View style={styles.footer}>
                <Text style={styles.pfont}>Phone Number</Text>
                <Text style={styles.pfont}> Website link </Text>
                <Text style={styles.pfont}> Address </Text>
            </View>


        </Page>
    </Document>
);


export default Invoice;
