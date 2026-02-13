/**
 * @fileoverview New User Invoice PDF Component
 * Generates a professional invoice for new user registrations
 * @version 2.0.0
 */

import React from "react";
import {
  Page,
  Document,
  Image,
  StyleSheet,
  View,
  Text,
  Font,
} from "@react-pdf/renderer";

import Logo from "../../assets/UnderDogs_logo.png";
import { getBranchAddress } from "../../config/branchConfig";

// Register fonts
import Roboto from "../../assets/fontsource/Roboto-Bold.ttf";
import Roboto_Medium from "../../assets/fontsource/Roboto-Medium.ttf";

Font.register({
  family: "Roboto",
  src: Roboto,
  fontStyle: "normal",
  fontWeight: "bold",
});

Font.register({
  family: "Roboto-Medium",
  src: Roboto_Medium,
  fontStyle: "normal",
  fontWeight: "normal",
});

// Modern color palette
const COLORS = {
  primary: "#1a1a2e", // Dark navy
  secondary: "#16213e", // Slightly lighter navy
  accent: "#e94560", // Vibrant coral/red
  light: "#f8f9fa", // Off-white
  dark: "#0f0f1a", // Near black
  muted: "#6c757d", // Gray
  border: "#dee2e6", // Light border
  white: "#ffffff",
  success: "#10b981", // Green for totals
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.white,
    fontFamily: "Roboto-Medium",
    fontSize: 10,
    padding: 0,
  },

  // Header Section
  header: {
    backgroundColor: COLORS.white,
    padding: 30,
    paddingBottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 3,
    borderBottomColor: COLORS.accent,
  },
  logo: {
    width: 160,
    height: 55,
    objectFit: "contain",
  },
  invoiceTitle: {
    alignItems: "flex-end",
  },
  invoiceText: {
    fontSize: 32,
    fontFamily: "Roboto",
    color: COLORS.primary,
    letterSpacing: 2,
  },
  invoiceMeta: {
    marginTop: 8,
    alignItems: "flex-end",
  },
  metaRow: {
    flexDirection: "row",
    marginTop: 4,
  },
  metaLabel: {
    fontSize: 9,
    color: COLORS.muted,
    marginRight: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  metaValue: {
    fontSize: 10,
    color: COLORS.primary,
    fontFamily: "Roboto",
  },

  // Body Section
  body: {
    padding: 30,
    paddingTop: 25,
  },

  // Two Column Layout
  twoColumn: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  column: {
    width: "48%",
  },

  // Section Headers
  sectionTitle: {
    fontSize: 8,
    color: COLORS.muted,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 4,
  },

  // Customer Info
  customerName: {
    fontSize: 14,
    fontFamily: "Roboto",
    color: COLORS.dark,
    marginBottom: 4,
  },
  customerDetail: {
    fontSize: 10,
    color: COLORS.muted,
    marginBottom: 2,
  },

  // Info Box
  infoBox: {
    backgroundColor: COLORS.light,
    borderRadius: 4,
    padding: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  infoLabel: {
    fontSize: 9,
    color: COLORS.muted,
  },
  infoValue: {
    fontSize: 10,
    color: COLORS.dark,
    fontFamily: "Roboto",
  },

  // Table
  table: {
    marginTop: 10,
    marginBottom: 25,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: COLORS.secondary,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  tableHeaderCell: {
    color: COLORS.white,
    fontSize: 9,
    fontFamily: "Roboto",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  tableCell: {
    fontSize: 10,
    color: COLORS.dark,
  },
  tableCellMuted: {
    fontSize: 10,
    color: COLORS.muted,
  },

  // Column widths
  colSubscription: { width: "30%" },
  colType: { width: "20%" },
  colCardio: { width: "15%" },
  colRegFee: { width: "17%" },
  colFees: { width: "18%", textAlign: "right" },

  // Totals Section
  totalsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  totalsBox: {
    width: 220,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  totalLabel: {
    fontSize: 10,
    color: COLORS.muted,
  },
  totalValue: {
    fontSize: 10,
    color: COLORS.dark,
  },
  grandTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.primary,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 4,
  },
  grandTotalLabel: {
    fontSize: 11,
    color: COLORS.white,
    fontFamily: "Roboto",
  },
  grandTotalValue: {
    fontSize: 14,
    color: COLORS.white,
    fontFamily: "Roboto",
  },

  // Additional Details
  additionalSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  detailItem: {
    width: "50%",
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 8,
    color: COLORS.muted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 11,
    color: COLORS.dark,
    fontFamily: "Roboto",
  },
  pendingBadge: {
    backgroundColor: COLORS.accent,
    color: COLORS.white,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 3,
    fontSize: 10,
    fontFamily: "Roboto",
  },
  paidBadge: {
    backgroundColor: COLORS.success,
    color: COLORS.white,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 3,
    fontSize: 10,
    fontFamily: "Roboto",
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.light,
    padding: 20,
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerLeft: {
    flexDirection: "column",
  },
  footerCompany: {
    fontSize: 10,
    fontFamily: "Roboto",
    color: COLORS.dark,
    marginBottom: 2,
  },
  footerAddress: {
    fontSize: 9,
    color: COLORS.muted,
  },
  footerRight: {
    alignItems: "flex-end",
  },
  footerContact: {
    fontSize: 9,
    color: COLORS.muted,
    marginBottom: 2,
  },
  footerWebsite: {
    fontSize: 10,
    color: COLORS.accent,
    fontFamily: "Roboto",
  },

  // Thank you message
  thankYou: {
    marginTop: 30,
    marginBottom: 60,
    textAlign: "center",
  },
  thankYouText: {
    fontSize: 12,
    color: COLORS.primary,
    fontFamily: "Roboto",
  },
  thankYouSubtext: {
    fontSize: 9,
    color: COLORS.muted,
    marginTop: 4,
  },
});

/**
 * Format currency with rupee symbol
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
const formatCurrency = (amount) =>
  `Rs. ${Number(amount || 0).toLocaleString("en-IN")}`;

/**
 * Format date to readable format
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/**
 * NewUserInvoice Component
 * Generates a professional PDF invoice for new user registrations
 */
const NewUserInvoice = ({ user }) => {
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
    registrationFees = 0,
    feesAmount = 0,
    transaction_type,
    planEnds,
    pending_amount = 0,
    branch,
  } = user;

  const total = Number(registrationFees) + Number(feesAmount);
  const currentDate = formatDate(new Date());
  const formattedPlanEnds = formatDate(planEnds);
  const branchAddress = getBranchAddress(branch || "branch1");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image src={Logo} style={styles.logo} />
          <View style={styles.invoiceTitle}>
            <Text style={styles.invoiceText}>INVOICE</Text>
            <View style={styles.invoiceMeta}>
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Invoice No</Text>
                <Text style={styles.metaValue}>#{invoice_id}</Text>
              </View>
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>Date</Text>
                <Text style={styles.metaValue}>{currentDate}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Body */}
        <View style={styles.body}>
          {/* Customer & Payment Info */}
          <View style={styles.twoColumn}>
            <View style={styles.column}>
              <Text style={styles.sectionTitle}>Billed To</Text>
              <Text style={styles.customerName}>{name}</Text>
              <Text style={styles.customerDetail}>ID: {id}</Text>
              <Text style={styles.customerDetail}>{mobile}</Text>
              {email && <Text style={styles.customerDetail}>{email}</Text>}
            </View>
            <View style={styles.column}>
              <Text style={styles.sectionTitle}>Payment Details</Text>
              <View style={styles.infoBox}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Payment Mode</Text>
                  <Text style={styles.infoValue}>{mode_of_payment}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Transaction Type</Text>
                  <Text style={styles.infoValue}>{transaction_type}</Text>
                </View>
                <View style={[styles.infoRow, { marginBottom: 0 }]}>
                  <Text style={styles.infoLabel}>Plan Valid Until</Text>
                  <Text style={styles.infoValue}>{formattedPlanEnds}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Items Table */}
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, styles.colSubscription]}>
                Subscription
              </Text>
              <Text style={[styles.tableHeaderCell, styles.colType]}>Type</Text>
              <Text style={[styles.tableHeaderCell, styles.colCardio]}>
                Cardio
              </Text>
              <Text style={[styles.tableHeaderCell, styles.colRegFee]}>
                Reg. Fee
              </Text>
              <Text style={[styles.tableHeaderCell, styles.colFees]}>
                Amount
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.colSubscription]}>
                {subscription}
              </Text>
              <Text style={[styles.tableCellMuted, styles.colType]}>
                {subscription_type}
              </Text>
              <Text style={[styles.tableCellMuted, styles.colCardio]}>
                {cardio}
              </Text>
              <Text style={[styles.tableCell, styles.colRegFee]}>
                {formatCurrency(registrationFees)}
              </Text>
              <Text style={[styles.tableCell, styles.colFees]}>
                {formatCurrency(feesAmount)}
              </Text>
            </View>
          </View>

          {/* Totals */}
          <View style={styles.totalsContainer}>
            <View style={styles.totalsBox}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Subscription Fee</Text>
                <Text style={styles.totalValue}>
                  {formatCurrency(feesAmount)}
                </Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Registration Fee</Text>
                <Text style={styles.totalValue}>
                  {formatCurrency(registrationFees)}
                </Text>
              </View>
              {pending_amount > 0 && (
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Pending Amount</Text>
                  <Text style={[styles.totalValue, { color: COLORS.accent }]}>
                    {formatCurrency(pending_amount)}
                  </Text>
                </View>
              )}
              <View style={styles.grandTotalRow}>
                <Text style={styles.grandTotalLabel}>Total Paid</Text>
                <Text style={styles.grandTotalValue}>
                  {formatCurrency(total)}
                </Text>
              </View>
            </View>
          </View>

          {/* Thank You */}
          <View style={styles.thankYou}>
            <Text style={styles.thankYouText}>
              Thank you for joining Underdogs Fitness!
            </Text>
            <Text style={styles.thankYouSubtext}>
              We're excited to have you as part of our fitness family.
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <Text style={styles.footerCompany}>Underdogs Fitness</Text>
            <Text style={styles.footerAddress}>
              {branchAddress}
            </Text>
          </View>
          <View style={styles.footerRight}>
            <Text style={styles.footerContact}>Questions? Contact us</Text>
            <Text style={styles.footerWebsite}>www.underdogsfitness.in</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default NewUserInvoice;
