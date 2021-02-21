import React, { Component } from "react";
import CsvParse from "@vtex/react-csv-parse";
import TableInformation from "./Component/TableInformation";
import "./style.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      clusters: [], // TODO: Group errors inside clusters itself
      clusterErrors: []
    };
  }

  //handle validation for CSV File Upload
  pattern = "^.+.(xlsx|xls|csv)$";

  handleData = data => {
    const parent = {};
    const children = {};
    const limit = {};
    const utilisation = {};
    const nodes = [];
    const combinedUtilisation = {};
    const clusters = [];
    const clusterErrors = [];

    this.setState({ data: data });

    for (let i = 0; i < data.length; i++) {
      data[i].Limit = parseInt(data[i].Limit);
      data[i].Utilisation = parseInt(data[i].Utilisation);
      nodes.push(data[i].Entity);
      limit[data[i].Entity] = data[i].Limit;
      utilisation[data[i].Entity] = data[i].Utilisation; // TODO sum up?
      if (data[i].Parent) {
        parent[data[i].Entity] = data[i].Parent;
        if (children[data[i].Parent]) {
          children[data[i].Parent].push(data[i].Entity);
        } else {
          children[data[i].Parent] = [data[i].Entity];
        }
      }
    }

    const dfs = (cur, clusterId) => {
      combinedUtilisation[cur] = utilisation[cur];
      if (!clusters[clusterId]) clusters[clusterId] = [];
      clusters[clusterId].push(cur);
      if (children[cur]) {
        children[cur].forEach(child => {
          dfs(child, clusterId);
          combinedUtilisation[cur] += combinedUtilisation[child];
        });
      }
    };

    let clusterId = 0;
    for (let i = 0; i < nodes.length; i++) {
      if (!parent.hasOwnProperty(nodes[i])) {
        dfs(nodes[i], clusterId);
        clusterId++;
      }
    }

    for (let i = 0; i < clusters.length; i++) {
      const entities = clusters[i];
      clusterErrors[i] = [];
      for (let j = 0; j < entities.length; j++) {
        const entity = entities[j];
        if (combinedUtilisation[entity] > limit[entity]) {
          clusterErrors[i].push(
            `limit breach at ${entity} (limit = ${limit[entity]}, direct
              utilisation = ${utilisation[entity]}, combined utilisation = ${
              combinedUtilisation[entity]
            }).`
          );
        }
      }
    }
    console.log(clusterErrors);
    this.setState({
      clusters,
      combinedUtilisation,
      limit,
      utilisation,
      clusterErrors
    });
  };

  handleError = err => {
    this.setState({ data: err });
  };

  render() {
    const keys = ["Entity", "Parent", "Limit", "Utilisation"];
    const { data, clusters, clusterErrors } = this.state;
    return (
      <div className="main-container">
        <div className="input-data">
          <CsvParse
            keys={keys}
            onDataUploaded={this.handleData}
            onError={this.handleError}
            render={onChange => (
              <input type="file" onChange={onChange} accept=".csv" />
            )}
          />
        </div>
        {clusters.map((entities, i) => (
          <div className="data-output">
            Entities :{" "}
            {entities.map((entity, index) => (
              <div>
                {entity}
                {index === entities.length - 1 ? ":" : "/"}
              </div>
            ))}
            {clusterErrors[i].length === 0 ? (
              <div>No limit breaches</div>
            ) : (
              clusterErrors[i].map(error => {
                return <div>{error}</div>;
              })
            )}
          </div>
        ))}
        <TableInformation itemList={data} keys={keys} />
      </div>
    );
  }
}
