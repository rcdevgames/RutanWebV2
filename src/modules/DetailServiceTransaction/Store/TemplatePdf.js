import React from "react";
import ReactDOM from "react-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Invoice from "./Invoice";

const TemplatePdf = () => {
  React.useEffect(() => {
    window.html2canvas = html2canvas;
    var doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      // format: [4, 2]
    });

    var content = document.getElementById("content-22");
    console.log("content", content);
    console.log("document.body", document.body);
    doc.html(content, {
      callback: function (doc) {
        console.log("in callback");
        doc.save();
      },
    });
  }, []);

  return (
    <div className="content-22" id="content-22">
      <Invoice />
    </div>
  );
};
export default TemplatePdf;
