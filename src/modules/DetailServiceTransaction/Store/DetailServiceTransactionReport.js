import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

export const exportDetailServicePdf = (data) => {
  const {
    selectedJobService,
    selectedServiceEmployeeList,
    selectedServiceSummary,
    selectedServiceMedia,
    selectedServiceDailies,
    selectedServiceHistories,
    selectedServiceChecklist,
  } = data;
  const startDate = moment(selectedJobService.start).format("YYYY-MM-DD");
  const dueDate = moment(selectedJobService.due).format("YYYY-MM-DD");
  const employeeList = [];
  const dailyList = [];
  const checklistData = [];

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

  selectedServiceChecklist.map((item, index) => {
    checklistData.push({});
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
  doc.setFont("courier", "bold");
  doc.text("E-Report PT. Rutan", 100, 20, "center");

  doc.setFontSize(10);
  doc.setFont("courier");
  //   Line 1
  doc.text(15, 32, `Tipe`);
  doc.text(`: ${selectedJobService.type}`, 50, 32);
  doc.text(100, 32, `Status Trans`);
  doc.text(`: ${selectedJobService.status}`, 130, 32);
  //   Line 2
  doc.text(15, 39, `Unit`);
  doc.text(`: ${selectedJobService.unit ?? "-"}`, 50, 39);
  doc.text(100, 39, `Job Perform`);
  doc.text(`: ${selectedJobService.job_perform ?? "-"}`, 130, 39);
  //   Line 3
  doc.text(15, 46, `Model (SN)`);
  doc.text(`: ${selectedJobService.model ?? "-"}`, 50, 46);
  doc.text(100, 46, `Start - Due`);
  doc.text(`: ${startDate} - ${dueDate}`, 130, 46);
  //   Line 4
  doc.text(15, 53, `Job Forms`);
  doc.text(`: ${selectedJobService.job_form_name ?? "-"}`, 50, 53);
  doc.text(100, 53, `Dibuat`);
  doc.text(`: ${selectedJobService.created_date ?? "-"}`, 130, 53);
  //   Line 5
  doc.text(15, 60, `Customer`);
  doc.text(`: ${selectedJobService.customer_name ?? "-"}`, 50, 60);
  doc.text(100, 60, `Lokasi`);
  doc.text(`: ${selectedJobService.location ?? "-"}`, 130, 60);
  //   Line 6
  doc.text(15, 67, `Warranty`);
  doc.text(
    `: ${selectedJobService.warranty ? "Warranty" : "No-Warranty"}`,
    50,
    67
  );
  //   Line 7
  doc.text(15, 75, `PIC`);
  doc.text(`: ${selectedJobService.customer_pic_name ?? "-"}`, 50, 75);

  // === Technition ===
  doc.setFontSize(16);
  doc.setFont("courier");
  doc.text("Teknisi", 15, 87);
  doc.line(15, 92, 200, 92);

  // doc.autoTable({
  //   margin: { top: 95, left: 16 },
  //   body: employeeList,
  //   columns: [
  //     { header: "No", dataKey: "no" },
  //     { header: "NIK", dataKey: "nik" },
  //     { header: "Nama Karyawan", dataKey: "name" },
  //     { header: "No. Telepon", dataKey: "phone" },
  //     { header: "Alamat", dataKey: "address" },
  //     { header: "Tanggal Mulai", dataKey: "startDate" },
  //   ],
  // });

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

  doc.autoTable({
    startY: 95,
    body: employeeList,
    theme: "plain",
    headStyles: { halign: "center" },
    styles: { overflow: "linebreak" },
    columns: [
      { header: "No", dataKey: "no" },
      { header: "NIK", dataKey: "nik" },
      { header: "Nama Karyawan", dataKey: "name" },
      { header: "No. Telepon", dataKey: "phone" },
      { header: "Alamat", dataKey: "address" },
      { header: "Tanggal Mulai", dataKey: "startDate" },
    ],
    willDrawCell: drawCell,
    didParseCell: didParseCell,
    columnStyles: {
      0: { halign: "center" },
    },
    tableLineColor: [0, 0, 0],
    tableLineWidth: 0.3,
  });

  const employeeDistance = employeeList.length ? employeeList.length * 10 : 10;

  // === Checklist ===
  if (selectedJobService.is_external) {
    doc.setFontSize(16);
    doc.setFont("courier");
    doc.text("Checklist", 15, 130 + employeeDistance);
    doc.line(15, 137 + employeeDistance, 200, 137 + employeeDistance);
    // doc.addPage();
  }

  // Gambar - Gambar
  const imageCollections = [
    {
      path: "https://drive.google.com/uc?id=1hwrQUgM6CvBwxIZUu1fRASxKQr0FxfsM",
      title: "Image 1",
    },
    {
      path: "https://drive.google.com/uc?id=1hwrQUgM6CvBwxIZUu1fRASxKQr0FxfsM",
      title: "Image 2",
    },
    {
      path: "https://drive.google.com/uc?id=1hwrQUgM6CvBwxIZUu1fRASxKQr0FxfsM",
      title: "Image 3",
    },
    {
      path: "https://drive.google.com/uc?id=1hwrQUgM6CvBwxIZUu1fRASxKQr0FxfsM",
      title: "Image 4",
    },
  ];

  doc.setFontSize(16);
  doc.setFont("courier");
  const checklistDistance = checklistData.length
    ? checklistData.length * 10
    : 10;
  const totalImageDistance = checklistDistance + employeeDistance;
  doc.text("Gambar - Gambar", 15, 137 + totalImageDistance);
  doc.line(15, 144 + totalImageDistance, 200, 144 + totalImageDistance);
  selectedServiceMedia.map((item, index) => {
    doc.addImage(item.path, "JPEG", 10, 30, 150, 76);
  });

  // convert to base64
  const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
    });
  };

  imageCollections.map((item, index) => {
    if (index % 2 == 0) {
      // This is even
      doc.addImage(
        item.path,
        "JPEG",
        15, // left
        200, // top
        65, // width
        65 // height
      );
    } else {
      // This is odd
      doc.addImage(
        item.path,
        "JPEG",
        15 + index * 110, // left
        200, // top
        65, // width
        65 // height
      );
    }
  });

  // Catatan Teknisi
  doc.addPage();
  doc.setFontSize(16);
  doc.setFont("courier");
  doc.text("Catatan Teknisi", 15, 20);
  doc.line(15, 25, 200, 25);

  // doc.autoTable({
  //   margin: { top: 30, left: 16 },
  //   body: dailyList,
  //   columns: [
  //     { header: "No", dataKey: "no" },
  //     { header: "Karyawan", dataKey: "name" },
  //     { header: "Deskripsi", dataKey: "description" },
  //     { header: "Mulai", dataKey: "start" },
  //     { header: "Selesai", dataKey: "end" },
  //     { header: "Jam", dataKey: "time" },
  //   ],
  // });
  doc.autoTable({
    // startY: 95,
    margin: { top: 30, left: 15 },
    body: dailyList,
    theme: "plain",
    headStyles: { halign: "center" },
    styles: { overflow: "linebreak" },
    columns: [
      { header: "No", dataKey: "no" },
      { header: "Karyawan", dataKey: "name" },
      { header: "Deskripsi", dataKey: "description" },
      { header: "Mulai", dataKey: "start" },
      { header: "Selesai", dataKey: "end" },
      { header: "Jam", dataKey: "time" },
    ],
    willDrawCell: drawCell,
    didParseCell: didParseCell,
    columnStyles: {
      0: { halign: "center" },
    },
    tableLineColor: [0, 0, 0],
    tableLineWidth: 0.3,
  });

  // Laporan Akhir
  doc.setFontSize(16);
  doc.setFont("courier");
  const dailiesDistance = dailyList.length * 10;
  doc.text("Laporan Akhir", 15, 50 + dailiesDistance);
  doc.line(15, 55 + dailiesDistance, 200, 55 + dailiesDistance);

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
  doc.save(`detail-service-${selectedJobService.id}.pdf`);
};
