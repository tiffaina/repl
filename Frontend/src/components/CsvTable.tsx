/**
 * These are the props for the CsvTable component.
 * - data is a list of list of string, representing the rows of data returned by a view
 * or search command, or an empty table for a command that does not return data (a mode,
 * load_file, or unrecognized command)
 */
interface CsvTableProps {
  data: string[][];
  ariaLabel: string;
}

/**
 * This component is called as part of the REPlHistory command, for every table that
 * needs to be displayed in the command history area.
 * @param props is the interface above containing the arguments to CsvTable
 * @returns an HTML table containing the CSV data output by a command
 */
export default function CsvTable(props: CsvTableProps) {
  const rows = props.data.map((row: string[], index: number) => {
    return (
      <tr key={`row-${index}`}>
        {row.map((column: string, index2: number) => {
          return (
            <td
              key={`cell-${index2}`}
              aria-label={
                props.ariaLabel +
                "cell" +
                String(index) +
                "," +
                String(index2)
              }
            >
              {column}
            </td>
          );
        })}
      </tr>
    );
  });

  return (
    <table aria-label={props.ariaLabel}>
      <tbody>{rows}</tbody>
    </table>
  );
}
