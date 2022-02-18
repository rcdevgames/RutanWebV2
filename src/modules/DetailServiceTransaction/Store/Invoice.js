import React, { Component, Fragment } from "react";

class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        <div className="container-fluid">
          <section className="invoice-body">
            <div className="invoice-header">
              <h2>Invoice</h2>
              <h4>Sep 02, 2018 - Sep 14, 2018</h4>
            </div>
            <div className="mtb-2">
              <p>Your name</p>
              <p>Street #, Street name</p>
              <p>City, province</p>
              <p>Country, Postal code</p>
            </div>
            <div className="mt-8 row">
              <div className="col-lg-4">
                <h5 className="text-grey"> Billed to</h5>
                <p>Your name</p>
                <p>Street #, Street name</p>
                <p>City, province</p>
                <p>Country, Postal code</p>
              </div>
              <div className="col-lg-4">
                <h5 className="text-grey">Invoice Posted</h5>
                <p>Sep 02,2019</p>
              </div>
              <div className="col-lg-4">
                <h5 className="text-grey">Payment Due</h5>
                <p>Sep 15,2019</p>
              </div>
            </div>
          </section>
        </div>
      </Fragment>
    );
  }
}

export default Invoice;
