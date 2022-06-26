import React, { Component, Fragment } from "react";

class Footer extends Component {
  render() {
    return (
      <Fragment>
        <footer className="site-footer">
          <div className="container">
            <div className="row">
              <div className="col-md-8"></div>
              <div className="col-md-3 col-md-offset-1"></div>
            </div>

            <p className="colophon">Develop and design by: Mohammad-HGH</p>
          </div>
        </footer>
        {/* <!-- .site-footer --> */}
      </Fragment>
    );
  }
}

export default Footer;
