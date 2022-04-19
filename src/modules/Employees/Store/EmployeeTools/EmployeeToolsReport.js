import jsPDF from "jspdf";
import "jspdf-autotable";

export const generateEmployeeToolsReport = async (data) => {
  const { selectedEmployeeData, listEmployeeTools } = data;
  const newListData = [];

  // eslint-disable-next-line array-callback-return
  await listEmployeeTools.map((item, index) => {
    newListData.push({ no: index + 1, name: item.name, check: "-" });
  });

  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.setFont("courier");
  doc.text("Peralatan Karyawan", 100, 20, "center");

  doc.setFontSize(12);
  doc.setFont("courier");
  //   Line 1
  doc.text(15, 42, `Karyawan`);
  doc.text(`: ${selectedEmployeeData.name.toUpperCase()}`, 50, 42);

  doc.text(15, 49, `Cabang`);
  doc.text(`: ${selectedEmployeeData.branch_name ?? "-"}`, 50, 49);

  // drawCell is function for styling font, color and add content to every cell
  const drawCell = (dataCell) => {
    let docCell = dataCell.doc;

    // --> Draw Circle shape for checklist
    if (dataCell.cell.section === "body" && dataCell.column.index === 2) {
      // --> set width of line Circle
      docCell.setLineWidth(0.3);
      // --> set fill color of circle
      doc.setFillColor(255, 255, 255);
      // --> Draw circle :)
      // penjelasan parameter (x, y, r(panjang jari-jari lingkaran), style ("F"|"FD"))
      doc.circle(dataCell.cell.x + 22, dataCell.cell.y + 4, 2, "FD");
    }
    // --> This for custom styling font too
    // else if (dataCell.column.dataKey === "no") {
    //   docCell.setFont("Verdana", "bold");
    //   docCell.setFontSize(12);
    // }
  };

  // --> didParseCell is function for styling border, line, etc of every cell
  const didParseCell = (dataCell) => {
    let s = dataCell.cell.styles;
    s.lineColor = [0, 0, 0];
    s.lineWidth = 0.1;
    s.font = "courier";

    // --> This for spesific custom cell with spesific index
    // if (dataCell.row.index === 1) {
    //   s.lineColor = [0, 0, 0];
    //   s.borders = "t";
    // }
  };

  doc.autoTable({
    startY: 57,
    body: newListData,
    theme: "plain",
    headStyles: { halign: "center" },
    styles: { overflow: "linebreak" },
    columns: [
      { header: "#", dataKey: "no" },
      { header: "Nama Peralatan", dataKey: "name" },
      { header: "Check", dataKey: "" },
    ],
    willDrawCell: drawCell,
    didParseCell: didParseCell,
    columnStyles: {
      0: { halign: "center" },
    },
    tableLineColor: [0, 0, 0],
    tableLineWidth: 0.3,
  });

  // === Signature ===
  doc.addPage();
  doc.setFontSize(16);
  doc.setFont("Times-Roman", "regular");
  //   Line 2
  doc.setFontSize(12);

  doc.setFontSize(16);
  doc.text(80, 90, `MENGETAHUI`);

  //   Line 1
  doc.text(45, 120, `Karyawan`);
  doc.text(130, 120, `Coordinator /`);
  doc.text(130, 127, `Supervisor`);

  doc.text(45, 163, `(...........................)`);
  doc.text(130, 163, `(...........................)`);

  //   Export
  doc.save(
    `Peralatan-Karyawan-${selectedEmployeeData.name.replace(" ", "-")}.pdf`
  );
};
