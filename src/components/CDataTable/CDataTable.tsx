import React from "react";

interface IHeaders {
  title: string;
}

interface IProps {
  headers: IHeaders[];
  data: any[];
}

const CDataTable: React.FC<IProps> = (props) => {
  return (
    <div className="table-responsive">
      <table id="dataTableExample" className="table">
        <thead>
          <tr>
            {props.headers.map((item, index) => (
              <th key={`label-header-${index}`}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2011/04/25</td>
            <td>Tiger Nixon</td>
            <td>System Architect</td>
            <td>Edinburgh</td>
            <td>61</td>
            <td>61</td>
            <td>61</td>
            <td>61</td>
            <td>61</td>
          </tr>
          <tr>
            <td>2</td>
            <td>2009/06/25</td>
            <td>Yuri Berry</td>
            <td>Chief Marketing Officer (CMO)</td>
            <td>New York</td>
            <td>40</td>
            <td>40</td>
            <td>40</td>
            <td>40</td>
            <td>61</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CDataTable;
