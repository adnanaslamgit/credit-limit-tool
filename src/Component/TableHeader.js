import React from "react";

const TableHeader = props => {
  return (
    <thead>
      <tr>
        {props.headElements.map((el, index) => {
          return (
            <th scope="col" key={index}>
              {el}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
