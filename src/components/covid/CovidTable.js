import React from 'react';

function CovidTable(props) {
  return (
    <React.Fragment>
      <tbody>
        <tr>
          <td>{props.detail.countryRegion} </td>
          <td>
            {props.detail.provinceState !== null
              ? props.detail.provinceState
              : ''}{' '}
          </td>
          <td>{props.detail.active} </td>
          <td>{props.detail.confirmed} </td>
          <td>{props.detail.recovered} </td>
          <td>{props.detail.deaths} </td>
          <td>{props.detail.incidentRate} </td>
        </tr>
      </tbody>
    </React.Fragment>
  );
}
export default CovidTable;
