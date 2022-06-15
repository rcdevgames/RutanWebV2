import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

export const exportMonitoringEmployeePdf = (data, values) => {
  const { listMonitoringEmployee, from, until } = data;
  const startDate = moment(from).format("YYYY-MM-DD");
  const dueDate = moment(until).format("YYYY-MM-DD");
  const monitoringEmployeeList = [];

  listMonitoringEmployee.map((item, index) => {
    monitoringEmployeeList.push({
      no: index + 1,
      nik: item.employee_nik,
      name: item.employee_name,
      phone: item.phone,
      address: item.address,
      type: item.job_type,
      status: item.job_status,
      branch: item.branch_name,
      customer: item.customer_name,
      createdDate: item.created_date,
    });
  });

  const doc = new jsPDF();
  // doc.text({from_left}, {from_top})
  doc.setFontSize(20);
  doc.setFont("courier");
  doc.text("Monitoring Karyawan", 100, 20, "center");
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
      { content: "Tanggal", rowSpan: 2, halign: "center" },
      {
        content: "Karyawan",
        colSpan: 4,
        styles: { halign: "center", fillColor: [255, 255, 255] },
      },
      {
        content: "Service",
        colSpan: 4,
        styles: { halign: "center", fillColor: [255, 255, 255] },
      },
    ],
    [
      "NIK",
      "Nama Karyawan",
      "Cabang",
      "Tipe",
      "Customer",
      "Unit",
      "Model",
      "Status",
    ],
  ];

  doc.autoTable({
    startY: values ? 65 : 60,
    body: monitoringEmployeeList,
    theme: "plain",
    head: headTable,
    headStyles: { halign: "center", valign: "middle" },
    styles: { overflow: "linebreak", fontSize: 9, columnWidth: "auto" },
    columns: [
      { header: "Tanggal", dataKey: "createdDate" },
      { header: "NIK", dataKey: "nik" },
      { header: "Nama Karyawan", dataKey: "name" },
      { header: "Cabang", dataKey: "branch" },
      { header: "Tipe", dataKey: "type" },
      { header: "Customer", dataKey: "customer" },
      { header: "Unit", dataKey: "units" },
      { header: "Model", dataKey: "unit_models" },
      { header: "Status", dataKey: "status" },
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
  doc.save("monitoring-employee.pdf");
};
