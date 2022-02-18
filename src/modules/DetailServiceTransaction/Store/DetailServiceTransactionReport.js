import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "jspdf-autotable";

const columns = [
  { header: "Europe", dataKey: "europe" },
  { header: "Asia", dataKey: "asia" },
];

export const exportDetailServicePdf = () => {
  const doc = new jsPDF();

  doc.autoTable({
    columnStyles: { 0: { halign: "center" } },
    margin: { top: 90, left: 16 },
    head: [
      ["No", "NIK", "Nama Karyawan", "No. Telepon", "Alamat", "Tanggal Mulai"],
    ],
    body: [
      [
        "1",
        "000011",
        "EKO P JIYANI (TRAINEE)",
        "085774008499",
        "JLN UTAN PANJANG III RT/RW 013/006KEL/DESA HARAPAN MULIA KEC KEMAYORAN JAKARTA PUSAT",
        "11 Ferbruary 2022",
      ],
      [
        "2",
        "000012",
        "EKI P JIYANI (TRAINEE)",
        "085774008499",
        "JLN UTAN PANJANG III RT/RW 013/006KEL/DESA HARAPAN MULIA KEC KEMAYORAN JAKARTA PUSAT",
        "11 Ferbruary 2022",
      ],
      // ...
    ],
  });

  doc.setFontSize(20);
  doc.setFont("Times-Roman", "bold");
  doc.text("E-Report PT. Rutan", 100, 20, "center");
  doc.setFontSize(12);
  doc.setFont("Times-Roman", "regular");
  //   Line 1
  doc.text(20, 32, `Tipe`);
  doc.text(": REPAIR", 50, 32);
  doc.text(115, 32, `Status Trans`);
  doc.text(": REPAIR", 145, 32);
  //   Line 2
  doc.text(20, 39, `Unit`);
  doc.text(": FIX HUSKER", 50, 39);
  doc.text(115, 39, `Job Perform`);
  doc.text(": Service HU 10 PP", 145, 39);
  //   Line 3
  doc.text(20, 46, `Model (SN)`);
  doc.text(": HU10PP (2032001112)", 50, 46);
  doc.text(115, 46, `Start - Due`);
  doc.text(": 2022-02-11 - 2022-02-11", 145, 46);
  //   Line 4
  doc.text(20, 53, `Job Forms`);
  doc.text(": P.M", 50, 53);
  doc.text(115, 53, `Dibuat`);
  doc.text(": 2022-02-11 19:12:56", 145, 53);
  //   Line 5
  doc.text(20, 60, `Customer`);
  doc.text(": PB SHINTA (KAB SIDRAP)", 50, 60);
  doc.text(115, 60, `Lokasi`);
  doc.text(": Kab sidrap", 145, 60);
  //   Line 6
  doc.text(20, 67, `Warranty`);
  doc.text(": No-Warranty", 50, 67);

  //   Technition
  doc.setFontSize(16);
  doc.setFont("Times-Roman", "regular");
  doc.text("Teknisi", 20, 80);
  doc.line(20, 85, 200, 85);

  //   Export
  doc.save("table.pdf");
};

export const exportTemplatePdf = () => {
  window.html2canvas = html2canvas;
  let doc = new jsPDF({
    orientation: "landscape",
    unit: "px",
    // format: [4, 2]
  });

  let content = document.getElementById("content-22");
  console.log("content", content);
  console.log("document.body", document.body);
  doc.html(content, {
    callback: function (doc) {
      console.log("in callback");
      doc.save("test.pdf");
    },
  });
};
