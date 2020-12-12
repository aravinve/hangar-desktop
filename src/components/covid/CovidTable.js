function CovidTable({detail}) {
  return (
    <>
      <tbody className="bg-secondary text-primary text-sm">
        <tr className="p-2">
          <td className="p-2">{detail.countryRegion} </td>
          <td className="p-2">
            {detail.provinceState !== null
              ? detail.provinceState
              : 'Province Data Not Available'}
          </td>
          <td className="p-2">{detail.active} </td>
          <td className="p-2">{detail.confirmed} </td>
          <td className="p-2">{detail.recovered} </td>
          <td className="p-2">{detail.deaths} </td>
          <td className="p-2">{detail.incidentRate} </td>
        </tr>
      </tbody>
    </>
  );
}
export default CovidTable
