import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const DetailServiceReportComponent = () => {
  return (
    <PDFViewer style={{ flex: 1 }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Section #1</Text>
          </View>
          <View style={styles.section}>
            <Text>Section #2</Text>
          </View>
          <View style={styles.section}>
            <Image
              style={{
                width: 300,
                height: 100,
              }}
              src="https://cors-anywhere.herokuapp.com/https://drive.google.com/file/d/1hwrQUgM6CvBwxIZUu1fRASxKQr0FxfsM/view"
            />
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default DetailServiceReportComponent;
