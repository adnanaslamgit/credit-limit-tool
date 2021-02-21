import React, { Component } from "react";
import TableHeader from "../Component/TableHeader";
import TableBody from "../Component/TableBody";

export default class TableInformation extends Component {
  render() {
    return (
      <table className="table table-hover table-dark">
        <TableHeader headElements={this.props.keys} />
        <TableBody userData={this.props.itemList} />
      </table>
    );
  }
}
