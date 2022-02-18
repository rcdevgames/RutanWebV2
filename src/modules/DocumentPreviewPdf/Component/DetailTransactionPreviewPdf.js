import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import styled from "styled-components";

const Page = styled.div`
  width: 21cm;
  height: 29.7cm;
  margin: 30mm 45mm 30mm 45mm;
`;

const DetailTransactionPreviewPdf = (props) => {
  React.useEffect(() => {
    // window.html2canvas = html2canvas;
    const doc = new jsPDF();
    doc.fromHTML("#target").html(),
      15,
      15,
      {
        width: 170,
      };

    // var content = document.getElementById("detail-transaction-preview-pdf");
    // console.log("content", content);
    // console.log("document.body", document.body);
    // doc.html(content, {
    //   width: 21,
    //   callback: function (doc) {
    //     console.log("in callback");
    //     doc.save();
    //   },
    // });
  }, []);

  return (
    <div class="page-content d-flex">
      <Page class="card" id="target">
        <div class="card-body">
          <h6 class="card-title">Basic Table</h6>
          <p class="card-description">
            Add class <code>.table</code>
          </p>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>LAST NAME</th>
                  <th>USERNAME</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th>2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th>3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
                <tr>
                  <th>4</th>
                  <td>Larry</td>
                  <td>Jellybean</td>
                  <td>@lajelly</td>
                </tr>
                <tr>
                  <th>5</th>
                  <td>Larry</td>
                  <td>Kikat</td>
                  <td>@lakitkat</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Page>
    </div>
  );
};
export default DetailTransactionPreviewPdf;
