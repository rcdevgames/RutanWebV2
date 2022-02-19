import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

const columns = [
  { header: "Europe", dataKey: "europe" },
  { header: "Asia", dataKey: "asia" },
];

export const exportDetailServicePdf = (data) => {
  const {
    selectedJobService,
    selectedServiceEmployeeList,
    selectedServiceSummary,
    selectedServiceMedia,
    selectedServiceDailies,
    selectedServiceHistories,
  } = data;
  const startDate = moment(selectedJobService.start).format("YYYY-MM-DD");
  const dueDate = moment(selectedJobService.due).format("YYYY-MM-DD");
  const employeeList = [];
  const dailyList = [];

  selectedServiceEmployeeList.map((item, index) => {
    employeeList.push({
      no: index + 1,
      nik: item.nik,
      name: item.name,
      phone: item.phone,
      address: item.address,
      startDate: item.created_date,
    });
  });

  selectedServiceDailies.map((item, index) => {
    dailyList.push({
      no: index + 1,
      name: item.employee_name,
      description: item.description,
      start: moment(item.daily_start).format("DD-MMM-YYYY"),
      end: moment(item.daily_end).format("DD-MMM-YYYY"),
      time: moment(item.daily_end).format("HH:mm:ss"),
    });
  });

  const doc = new jsPDF();
  // doc.text({from_left}, {from_top})
  doc.setFontSize(20);
  doc.setFont("Times-Roman", "bold");
  doc.text("E-Report PT. Rutan", 100, 20, "center");

  doc.setFontSize(10);
  doc.setFont("Times-Roman", "regular");
  //   Line 1
  doc.text(20, 32, `Tipe`);
  doc.text(`: ${selectedJobService.type}`, 50, 32);
  doc.text(115, 32, `Status Trans`);
  doc.text(`: ${selectedJobService.status}`, 145, 32);
  //   Line 2
  doc.text(20, 39, `Unit`);
  doc.text(`: ${selectedJobService.unit ?? "-"}`, 50, 39);
  doc.text(115, 39, `Job Perform`);
  doc.text(`: ${selectedJobService.job_perform ?? "-"}`, 145, 39);
  //   Line 3
  doc.text(20, 46, `Model (SN)`);
  doc.text(`: ${selectedJobService.model ?? "-"}`, 50, 46);
  doc.text(115, 46, `Start - Due`);
  doc.text(`: ${startDate} - ${dueDate}`, 145, 46);
  //   Line 4
  doc.text(20, 53, `Job Forms`);
  doc.text(`: ${selectedJobService.job_form_name ?? "-"}`, 50, 53);
  doc.text(115, 53, `Dibuat`);
  doc.text(`: ${selectedJobService.created_date ?? "-"}`, 145, 53);
  //   Line 5
  doc.text(20, 60, `Customer`);
  doc.text(`: ${selectedJobService.customer_name ?? "-"}`, 50, 60);
  doc.text(115, 60, `Lokasi`);
  doc.text(`: ${selectedJobService.location ?? "-"}`, 145, 60);
  //   Line 6
  doc.text(20, 67, `Warranty`);
  doc.text(
    `: ${selectedJobService.warranty ? "Warranty" : "No-Warranty"}`,
    50,
    67
  );
  //   Line 7
  doc.text(20, 75, `PIC`);
  doc.text(`: ${selectedJobService.customer_pic_name ?? "-"}`, 50, 75);

  // === Technition ===
  doc.setFontSize(16);
  doc.setFont("Times-Roman", "regular");
  doc.text("Teknisi", 20, 87);
  doc.line(20, 92, 200, 92);

  doc.autoTable({
    margin: { top: 95, left: 16 },
    body: employeeList,
    columns: [
      { header: "No", dataKey: "no" },
      { header: "NIK", dataKey: "nik" },
      { header: "Nama Karyawan", dataKey: "name" },
      { header: "No. Telepon", dataKey: "phone" },
      { header: "Alamat", dataKey: "address" },
      { header: "Tanggal Mulai", dataKey: "startDate" },
    ],
  });

  // === Checklist ===
  if (selectedJobService.is_external) {
    doc.setFontSize(16);
    doc.setFont("Times-Roman", "regular");
    const employeeDistance = employeeList.length * 10;
    doc.text("Checklist", 20, 110 + employeeDistance);
    doc.line(20, 117 + employeeDistance, 200, 117 + employeeDistance);
    doc.addPage();
  }

  // Gambar - Gambar
  doc.setFontSize(16);
  doc.setFont("Times-Roman", "regular");
  const employeeDistance = employeeList.length * 10;
  doc.text("Gambar - Gambar", 20, 110 + employeeDistance);
  doc.line(20, 117 + employeeDistance, 200, 117 + employeeDistance);

  // Catatan Teknisi
  doc.addPage();
  doc.setFontSize(16);
  doc.setFont("Times-Roman", "regular");
  doc.text("Catatan Teknisi", 20, 20);
  doc.line(20, 25, 200, 25);

  doc.autoTable({
    margin: { top: 30, left: 16 },
    body: dailyList,
    columns: [
      { header: "No", dataKey: "no" },
      { header: "Karyawan", dataKey: "nik" },
      { header: "Deskripsi", dataKey: "name" },
      { header: "Mulai", dataKey: "phone" },
      { header: "Selesai", dataKey: "address" },
      { header: "Jam", dataKey: "startDate" },
    ],
  });

  // Laporan Akhir
  doc.setFontSize(16);
  doc.setFont("Times-Roman", "regular");
  const dailiesDistance = dailyList.length * 10;
  doc.text("Laporan Akhir", 20, 50 + dailiesDistance);
  doc.line(20, 55 + dailiesDistance, 200, 55 + dailiesDistance);

  // === Signature ===
  doc.addPage();
  doc.setFontSize(16);
  doc.setFont("Times-Roman", "regular");
  //   Line 1
  doc.text(50, 32, `Customer`);
  doc.text(140, 32, `Teknisi`);

  //   Line 2
  doc.setFontSize(12);
  const customerNameDistance = 50 - selectedJobService.customer_name.length + 5;
  const customerPicDistance =
    140 - selectedJobService.customer_pic_name.length + 5;
  doc.text(
    customerNameDistance,
    60,
    `(${selectedJobService.customer_name.toUpperCase()})`
  );
  doc.text(
    customerPicDistance,
    60,
    `(${selectedJobService.customer_pic_name.toUpperCase()})`
  );

  doc.setFontSize(16);
  doc.text(80, 90, `MENGETAHUI`);

  //   Line 1
  doc.text(45, 120, `Coordinator /`);
  doc.text(130, 120, `Branch Manager /`);
  doc.text(45, 127, `Supervisor`);
  doc.text(130, 127, `Service Manager`);

  doc.text(45, 163, `(...........................)`);
  doc.text(130, 163, `(...........................)`);

  //   Export
  doc.save("table.pdf");
};
