import React from "react";
import {
  Page,
  Document,
  Image,
  StyleSheet,
  View,
  Text,
  Font,
  Link,
} from "@react-pdf/renderer";
import Logo from "../../assets/UnderDogs_logo.png";
import WebsiteLogo from "../../assets/websitelogo.png";
import AddressLogo from "../../assets/addresslogo.png";

//fonts
import Roboto from "../../assets/fontsource/Roboto-Bold.ttf";
import Roboto_Medium from "../../assets/fontsource/Roboto-Medium.ttf";
Font.register({
  family: "Roboto",
  src: Roboto,
  fontStyle: "normal",
  fontWeight: "bold",
});
Font.register({
  family: "Roboto-medium",
  src: Roboto_Medium,
  fontStyle: "normal",
  fontWeight: "medium",
});

const THEME_COLOUR = "rgb(214, 89, 51)";

const styles = StyleSheet.create({
  h1font: {
    fontSize: 26,
    fontWeight: "demibold",
  },
  h2font: {
    fontSize: 12,
    fontWeight: "demibold",
    textAlign: "center",
    color: "white",
    padding: 3,
  },
  h3font: {
    fontSize: 18,
    fontWeight: "demibold",
    marginBottom: 4,
  },

  pfont: {
    fontSize: 12,
    fontWeight: "medium",
    margin: 0,
    fontFamily: "Roboto-medium",
    marginRight: 12,
  },

  symbol: {
    display: "flex",
    marginRight: 8,
  },

  link: {
    color: "black",
    textDecoration: "none",
    fontSize: "13px",
    left: "4px",
    paddingLeft: "4px",
  },
  page: {
    fontSize: 12,
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    lineHeight: 1.3,
    flexDirection: "column",
    fontFamily: "Roboto",
  },
  FlexRow: {
    display: "flex",
    flexDirection: "row",
    minWidth: "50%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  FlexRow1: {
    display: "flex",
    flexDirection: "row",
    minWidth: "40%",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  rowItem: {
    display: "flex",
    flexDirection: "row",
  },

  invoiceHeaderRow: {
    backgroundColor: THEME_COLOUR,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 2,
    color: "white",
    padding: 2,
    minWidth: "150px",
    maxWidth: "150px",
    left: 48,
  },
  totalSectionRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontWeight: "extrabold",
    fontSize: "14",
    gap: 2,
    padding: 2,
    minWidth: "200px",
    maxWidth: "200px",
    margin: 3,
    border: 1,
  },
  totalSectionRowlast: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontWeight: "demibold",
    fontSize: "16",
    color: "white",
    gap: 2,
    padding: 4,
    minWidth: "200px",
    maxWidth: "200px",
    margin: 3,
    backgroundColor: THEME_COLOUR,
  },
  totalSectionFont: {
    color: "black",
  },

  logo: {
    display: "flex",
    width: 300,
    height: 100,
    alignSelf: "flex-start",
    marginTop: -4,
    marginLeft: -28,
    marginBottom: 8,
  },

  details: {
    marginVertical: 10,
    padding: 5,
    borderRadius: "50%",
  },
  headerLeftcolumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "50%",
    marginLeft: 4,
  },
  headerRightcolumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    maxWidth: "50%",
    marginLeft: 58,
    marginTop: -68,
  },
  headerRightcolumn2: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    maxWidth: "50%",
    marginLeft: 58,
  },
  table: {
    display: "table",
    width: "100%",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: 2,
    fontFamily: "Roboto-medium",
    fontWeight: "medium",
    borderBottomColor: THEME_COLOUR,
    width: "100%",
  },
  tableCellFirst: {
    padding: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    fontSize: 12,
    width: "25%",
    minHeight: 4,
  },
  tableCell: {
    padding: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    fontSize: 12,
    width: "20%",
    minHeight: 4,
  },
  tableHeaderFirst: {
    width: "25%",
    backgroundColor: THEME_COLOUR,
    color: "white",
    fontWeight: "extrabold",
    fontSize: 14,
    padding: 10,
  },
  tableHeader: {
    width: "20%",
    backgroundColor: THEME_COLOUR,
    color: "white",
    fontWeight: "extrabold",
    fontSize: 14,
    padding: 10,
  },

  footer: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: 30,
    left: "5%",
    right: "10%",
    minWidth: "100%",
    borderTop: 3,
    borderTopColor: THEME_COLOUR,
    padding: 4,
  },
  footerItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  footerText: {
    marginLeft: 8,
    gap: "2px",
  },
  logo2: {
    width: 19,
    height: 19,
    marginRight: 4,
  },

  linkText: {
    color: "black",
  },
  phoneNumber: {
    marginTop: 5, // Adjust the margin top value as needed
  },
});

const UpdateSubInvoice = ({ user }) => {
  const {
    invoice_id,
    id,
    name,
    email,
    mobile,
    subscription,
    subscription_type,
    cardio,
    mode_of_payment,
    feesAmount,
    transaction_type,
    planEnds,
    pending_amount,
  } = user;

  const currentDate = new Date()
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");

  const formattedPlanEnds = new Date(planEnds)
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.FlexRow}>
          <View style={styles.headerLeftcolumn}>
            <Image src={Logo} style={styles.logo}></Image>
            <Text style={styles.h3font}>Invoice to:</Text>
            <View style={styles.FlexRow}>
              <View>
                <Text style={styles.pfont}>User ID</Text>
                <Text style={styles.pfont}>Name</Text>
                <Text style={styles.pfont}>Mobile</Text>
              </View>
              <View>
                <Text style={styles.symbol}>:</Text>
                <Text style={styles.symbol}>:</Text>
                <Text style={styles.symbol}>:</Text>
              </View>
              <View>
                <Text style={styles.pfont}>{id}</Text>
                <Text style={styles.pfont}>{name}</Text>
                <Text style={styles.pfont}>{mobile}</Text>
              </View>
            </View>
          </View>
          <View style={styles.headerRightcolumn}>
            <Text style={styles.h1font}>INVOICE</Text>
            <View style={styles.invoiceHeaderRow}>
              <View>
                <Text style={styles.h2font}>Invoice ID</Text>
                <Text style={styles.h2font}>Date</Text>
              </View>
              <View>
                <Text style={styles.h2font}>:</Text>
                <Text style={styles.h2font}>:</Text>
              </View>
              <View>
                <Text style={styles.h2font}>{invoice_id}</Text>
                <Text style={styles.h2font}>{currentDate}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.details}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={[styles.tableCellFirst, styles.tableHeaderFirst]}>
                <Text>Subscription</Text>
              </View>
              <View style={[styles.tableCell, styles.tableHeader]}>
                <Text>Type</Text>
              </View>
              <View style={[styles.tableCell, styles.tableHeader]}>
                <Text>Cardio</Text>
              </View>
              <View style={[styles.tableCell, styles.tableHeader]}>
                <Text>Fees</Text>
              </View>
              <View style={[styles.tableCell, styles.tableHeader]}>
                <Text>Payment mode</Text>
              </View>

              {/* <View style={[styles.tableCell, styles.tableHeader]}>
                <Text>Total</Text>
              </View> */}
            </View>

            {/* {your data here  } */}
            <View style={styles.tableRow}>
              <View style={styles.tableCellFirst}>
                <Text>{subscription}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{subscription_type}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{cardio}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{feesAmount}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{mode_of_payment}</Text>
              </View>

              {/* <View style={styles.tableCell}>
                <Text>{DummyData.plan.total}</Text>
              </View> */}
            </View>
          </View>
        </View>
        <View style={styles.FlexRow}>
          <View style={styles.headerLeftcolumn}>
            <Text style={styles.h3font}>Additional Details</Text>
            <View style={styles.FlexRow}>
              <View>
                <Text style={styles.pfont}>Payment for </Text>
                <Text style={styles.pfont}>Plan Ends on </Text>
                <Text style={styles.pfont}>Pending amount</Text>
              </View>
              <View>
                <Text style={styles.symbol}>:</Text>
                <Text style={styles.symbol}>:</Text>
                <Text style={styles.symbol}>:</Text>
              </View>
              <View>
                <Text style={styles.pfont}>{transaction_type}</Text>
                <Text style={styles.pfont}>{formattedPlanEnds}</Text>
                <Text style={styles.pfont}>{pending_amount}</Text>
              </View>
            </View>
          </View>

          <View style={styles.headerRightcolumn2}>
            <View style={styles.totalSectionRow}>
              <Text style={styles.totalSectionFont}>Sub total</Text>
              <Text style={styles.totalSectionFont}>{feesAmount}</Text>
            </View>
            {/* <View style={styles.totalSectionRow}>
                        <Text style={styles.totalSectionFont}>Registration Fees</Text>
                        <Text style={styles.totalSectionFont}>100</Text>
                    </View> */}
            <View style={styles.totalSectionRowlast}>
              <Text>TOTAL</Text>
              <Text>{feesAmount} </Text>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.footerItem}>
            <Image src={WebsiteLogo} style={styles.logo2} />
            <Text style={styles.footerText}>www.underdogsfitness.in</Text>
          </View>

          <View style={styles.footerItem}>
            <Image src={AddressLogo} style={styles.logo2} />
            <Text style={styles.footerText}>
              1/186, Mariamman Kovil St, Mugalivakkam, Ch-125
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default UpdateSubInvoice;
