import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

export const exportMonitoringEmployeePdf = (data) => {
  const { listMonitoringEmployee, from, until } = data;
  const startDate = moment(from).format("YYYY-MM-DD");
  const dueDate = moment(until).format("YYYY-MM-DD");
  const monitoringEmployeeList = [];

  listMonitoringEmployee.map((item, index) => {
    monitoringEmployeeList.push({
      no: index + 1,
      nik: item.nik,
      name: item.name,
      phone: item.phone,
      address: item.address,
      startDate: item.created_date,
    });
  });

  const doc = new jsPDF();
  // doc.text({from_left}, {from_top})
  doc.setFontSize(20);
  doc.setFont("Times-Roman", "regular");
  doc.text("Monitoring Employee", 100, 20, "center");
  doc.setFontSize(16);
  doc.text("PT Rutan", 100, 30, "center");

  doc.setFontSize(10);
  doc.setFont("Times-Roman", "regular");
  //   Line 1
  doc.text(20, 42, `Dari Tanggal`);
  doc.text(`: ${startDate ?? "-"}`, 50, 42);
  doc.text(20, 49, `Sampai Tanggal`);
  doc.text(`: ${dueDate ?? "-"}`, 50, 49);

  var res = doc.autoTableHtmlToJson(document.getElementById("table_wrapper"));
  // doc.autoTable(res.columns, res.data, {margin: {top: 80}});

  var header = function (data) {
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.setFontStyle("normal");
    // doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
    doc.text("Management risc", data.settings.margin.left, 50);
  };

  //   Create table
  doc.autoTable({
    margin: { top: 70, left: 16 },
    body: monitoringEmployeeList,
    html: "#table_wrapper",
    columns: [
      { header: "Tanggal", dataKey: "date" },
      { header: "NIK", dataKey: "nik" },
      { header: "Nama Karyawan", dataKey: "name" },
      { header: "Cabang", dataKey: "branch" },
      { header: "Tipe", dataKey: "type" },
      { header: "Customer", dataKey: "customer" },
      { header: "Unit", dataKey: "units" },
      { header: "Model", dataKey: "unit_models" },
      { header: "Status", dataKey: "status" },
    ],
    startY: doc.autoTableEndPosY() + 20,
  });

  //   Export
  doc.save("monitoring-employee.pdf");
};
