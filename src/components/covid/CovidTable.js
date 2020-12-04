function CovidTable({detail}) {
  return (
    <>
      <tbody>
        <tr>
          <td>{detail.countryRegion} </td>
          <td>
            {detail.provinceState !== null
              ? detail.provinceState
              : ''}{' '}
          </td>
          <td>{detail.active} </td>
          <td>{detail.confirmed} </td>
          <td>{detail.recovered} </td>
          <td>{detail.deaths} </td>
          <td>{detail.incidentRate} </td>
        </tr>
      </tbody>
    </>
  );
}
export default CovidTable
