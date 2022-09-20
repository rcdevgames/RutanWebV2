import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

export const exportDetailServicePdfRevision = (data) => {
  const {
    selectedJobService,
    selectedServiceEmployeeList,
    selectedServiceDailies,
    selectedServiceHistories,
    selectedServiceChecklist,
    groupingSelectedServiceMedia,
    groupingSelectedServiceSummary,
    groupingSelectedServiceChecklist,
    selectedUnit,
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

  if (selectedServiceDailies.length > 0) {
    selectedServiceDailies.map((item, index) => {
      dailyList.push({
        no: index + 1,
        name: item.employee_name,
        description: item.description,
        start: moment(item.daily_start).format("DD-MMM-YYYY"),
        end: moment(item.daily_end).format("DD-MMM-YYYY"),
        time: item.hours,
      });
    });
  } else {
    dailyList.push([]);
  }

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
  doc.text(`: ${selectedUnit ?? "-"}`, 50, 39);
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
  const isEven = (n) => {
    return n % 2 === 0;
  };
  // create data by increment the row
  let incrementRow = 0;
  groupingSelectedServiceChecklist.map(
    (itemChecklistGroup, indexChecklistGroup) => {
      itemChecklistGroup.checklist.map(
        (itemChecklistData, indexChecklistData) => {
          checklistData.push(itemChecklistData);
        }
      );
    }
  );

  if (selectedJobService.is_external) {
    doc.setFontSize(16);
    doc.setFont("courier");
    doc.text("Checklist", 15, 130 + employeeDistance);
    doc.line(15, 137 + employeeDistance, 200, 137 + employeeDistance);
    // doc.addPage();
    // drawCell is function for styling font, color and add content to every cell
    const drawCellChecklist = (dataCell) => {
      let docCell = dataCell.doc;

      // --> Draw Circle shape for checklist
      if (
        (dataCell.cell.section === "body" && dataCell.column.index === 1) ||
        (dataCell.cell.section === "body" && dataCell.column.index === 2) ||
        (dataCell.cell.section === "body" && dataCell.column.index === 3) ||
        (dataCell.cell.section === "body" && dataCell.column.index === 4)
      ) {
        // --> set width of line Circle
        docCell.setLineWidth(0.3);
        // --> set fill color of circle
        if (dataCell.cell.text[0] === "false") {
          dataCell.cell.text = "";
          doc.setFillColor(255, 255, 255);
        } else {
          dataCell.cell.text = "";
          doc.setFillColor(0, 0, 0);
        }
        // --> Draw circle :)
        // penjelasan parameter (x, y, r(panjang jari-jari lingkaran), style ("F"|"FD"))
        doc.circle(dataCell.cell.x + 8, dataCell.cell.y + 4, 2, "FD");
      }
      // --> This for custom styling font too
      // else if (dataCell.column.dataKey === "no") {
      // docCell.setFont("Verdana", "bold");
      // docCell.setFontSize(12);
      // }
    };

    // --> didParseCell is function for styling border, line, etc of every cell
    const didParseCellChecklist = (dataCell) => {
      let s = dataCell.cell.styles;
      // s.lineColor = [0, 0, 0];
      // s.lineWidth = 0.1;
      s.font = "courier";
    };

    // Check if the index of data is even or odd
    // groupingSelectedServiceChecklist.map(
    //   (itemChecklistUnit, indexChecklistUnit) => {
    //     doc.text(
    //       15,
    //       50 + dailiesDistance + distancePerUnit,
    //       `UNIT ${itemChecklistUnit.unitName.toUpperCase()}`
    //     );
    //   }
    // );

    checklistData.map((item, index) => {
      if (!isEven(index + 1)) {
        doc.autoTable({
          startY: 170,
          tableWidth: 200,
          margin: {
            top: 30,
          },
          body: item.fields,
          theme: "plain",
          headStyles: { halign: "center" },
          styles: {
            cellPadding: 0,
            rowHeight: 10,
            fillStyle: "S",
            halign: "center",
            valign: "middle",
            fontStyle: "bold",
            lineWidth: 0,
            fontSize: 8,
            textColor: 0,
            overflow: "linebreak",
          },
          columns: [
            { header: item.category_form_name, dataKey: "field_name" },
            { header: "ADJUST", dataKey: "is_adjust" },
            { header: "CHECK", dataKey: "is_check" },
            { header: "REPAIR", dataKey: "is_repair" },
            { header: "REPLACE", dataKey: "is_replace" },
          ],
          columnStyles: {
            0: { cellWidth: 25 },
            1: { cellWidth: 16 },
            2: { cellWidth: 16 },
            3: { cellWidth: 16 },
            4: { cellWidth: 16 },
            // etc
          },
          willDrawCell: drawCellChecklist,
          didParseCell: didParseCellChecklist,
        });
      } else {
        doc.autoTable({
          startY: 170,
          margin: {
            left: 110,
            top: 30,
          },
          tableWidth: 200,
          body: item.fields,
          theme: "plain",
          headStyles: { halign: "center" },
          styles: {
            cellPadding: 0,
            rowHeight: 10,
            fillStyle: "S",
            halign: "center",
            valign: "middle",
            fontStyle: "bold",
            lineWidth: 0,
            fontSize: 8,
            textColor: 0,
            overflow: "linebreak",
          },
          columns: [
            { header: item.category_form_name, dataKey: "field_name" },
            { header: "ADJUST", dataKey: "test1" },
            { header: "CHECK", dataKey: "test2" },
            { header: "REPAIR", dataKey: "test3" },
            { header: "REPLACE", dataKey: "test4" },
          ],
          columnStyles: {
            0: { cellWidth: 25 },
            1: { cellWidth: 16 },
            2: { cellWidth: 16 },
            3: { cellWidth: 16 },
            4: { cellWidth: 16 },
            // etc
          },
          willDrawCell: drawCellChecklist,
          didParseCell: didParseCellChecklist,
        });
      }
    });
  }

  // Gambar - Gambar
  doc.setFontSize(16);
  doc.setFont("courier");
  const checklistDistance = checklistData.length
    ? checklistData.length * 10
    : 10;
  const totalImageDistance = checklistDistance + employeeDistance;
  doc.text("Gambar - Gambar", 15, 155 + totalImageDistance);
  doc.line(15, 144 + totalImageDistance, 200, 144 + totalImageDistance);
  // selectedServiceMedia.map((item, index) => {
  //   doc.addImage(item.path, "JPEG", 10, 30, 150, 76);
  // });

  // Catatan Teknisi
  doc.addPage();
  doc.setFontSize(16);
  doc.setFont("courier");
  doc.text("Catatan Teknisi", 15, 20);
  doc.line(15, 25, 200, 25);

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
  // Laporan Akhir Text
  if (groupingSelectedServiceSummary.length > 0) {
    groupingSelectedServiceSummary.map((itemSummary, indexSummary) => {
      const splitSummary = itemSummary.summary.split("\n");

      const distancePerUnit = (indexSummary + 1) * 15;
      const distanceFromUnitToText = splitSummary.length * 15;
      doc.setFontSize(12);
      doc.setFont("courier");
      doc.text(
        15,
        50 + dailiesDistance + distancePerUnit,
        `UNIT ${itemSummary.unitName.toUpperCase()}`
      );
      doc.line(
        15,
        55 + dailiesDistance + distancePerUnit,
        80,
        55 + dailiesDistance + distancePerUnit
      );
      // This looping for summary
      splitSummary.map((itemTextSummary, indexTextSummary) => {
        const distancePerTextSummary = (indexTextSummary + 1) * 5;
        doc.setFontSize(10);
        doc.text(
          15,
          60 + dailiesDistance + distancePerUnit + distancePerTextSummary,
          itemTextSummary
        );
      });
    });
  }

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
    `(${selectedServiceEmployeeList[0].name.toUpperCase()})`
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
