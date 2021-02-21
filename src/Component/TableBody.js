import React from "react";

const TableBody = props => {
  return (
    <tbody>
      {props.userData.map((data, index) => {
        return (
          <tr key={index}>
            <th scope="row">{data.Entity}</th>
            <td>{data.Parent}</td>
            <td>{data.Limit}</td>
            <td>{data.Utilisation}</td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
