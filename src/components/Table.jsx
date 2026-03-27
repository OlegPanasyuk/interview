function Table({ data }) {
  if (!data || data.length === 0) return null;

  const headers = data.filter(item => item.row === 0);
  const bodyItems = data.filter(item => item.row !== 0);

  const maxRow = Math.max(...data.map(item => item.row));
  const maxCol = Math.max(...data.map(item => item.col));

  const getCell = (row, col) => {
    const item = (row === 0 ? headers : bodyItems).find(
      d => d.row === row && d.col === col
    );
    return item?.value ?? '';
  };

  const columns = Array.from({ length: maxCol + 1 }, (_, i) => i);
  const rows = Array.from({ length: maxRow }, (_, i) => i + 1);

  return (
    <table>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col}>{getCell(0, col)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr key={row}>
            {columns.map(col => (
              <td key={col}>{getCell(row, col)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
