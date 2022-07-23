import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

export const exportWorkingHoursReportPdf = (data, values) => {
  const { listWorkingHours, from, until } = data;
  const startDate = moment(from).format("YYYY-MM-DD");
  const dueDate = moment(until).format("YYYY-MM-DD");
  const workingHoursList = [];

  listWorkingHours.map((item, index) => {
    workingHoursList.push({
      no: index + 1,
      employeeNik: item.employee_nik,
      employeeName: item.employee_name,
      noService: item.no_service,
      customerName: item.customer_name,
      type: item.job_type,
      totalHours: item.total_hours,
      status: item.status,
      createdDate: item.created,
      doneDate: item.done,
    });
  });

  const doc = new jsPDF();
  // doc.text({from_left}, {from_top})
  doc.setFontSize(20);
  doc.setFont("courier");
  doc.text("Jam Kerja Karyawan", 100, 20, "center");
  doc.setFontSize(16);
  doc.text("PT Rutan", 100, 30, "center");

  doc.setFontSize(12);

  //   Line 1
  doc.text(15, 42, `Dari Tanggal`);
  doc.text(`: ${startDate ?? "-"}`, 50, 42);
  doc.text(15, 49, `Sampai Tanggal`);
  doc.text(`: ${dueDate ?? "-"}`, 50, 49);

  // Check if filtered by branch
  if (values) {
    if (values.branch) {
      const splitBranch = values.branch.split("|");
      doc.text(15, 56, `Cabang`);
      doc.text(`: ${splitBranch[1] ?? "-"}`, 50, 56);
    }
  }

  // drawCell is function for styling font, color and add content to every cell
  const drawCell = (dataCell) => {
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

  const headTable = [
    [
      "No",
      "NIK",
      "Nama Karyawan",
      "No. Service",
      "Nama Customer",
      "Dibuat",
      "Jam Kerja",
      "Status",
      "Tanggal Selesai",
    ],
  ];

  doc.autoTable({
    startY: values ? 65 : 60,
    body: workingHoursList,
    theme: "plain",
    head: headTable,
    headStyles: { halign: "center", valign: "middle" },
    styles: { overflow: "linebreak", fontSize: 9, columnWidth: "auto" },
    columns: [
      { header: "No", dataKey: "no" },
      { header: "NIK", dataKey: "employeeNik" },
      { header: "Nama Karyawan", dataKey: "employeeName" },
      { header: "No. Service", dataKey: "noService" },
      { header: "Nama Customer", dataKey: "customerName" },
      { header: "Dibuat", dataKey: "createdDate" },
      { header: "Jam Kerja", dataKey: "totalHours" },
      { header: "Status", dataKey: "status" },
      { header: "Tanggal Selesai", dataKey: "doneDate" },
    ],
    willDrawCell: drawCell,
    didParseCell: didParseCell,
    columnStyles: {
      0: { columnWidth: 28 },
      1: { columnWidth: 20 },
      // 2: { halign: "center" },
      // 3: { halign: "center" },
      // 4: { halign: "center" },
      // 5: { halign: "center" },
      // 6: { halign: "center" },
    },
    tableLineColor: [0, 0, 0],
    tableLineWidth: 0.3,
  });

  //   Export
  doc.save("working-hours.pdf");
};
