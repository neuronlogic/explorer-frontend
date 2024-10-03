import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import TableHead from '@mui/material/TableHead';
import { lighten, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const rows = [
  {
    id: 'uid',
    align: 'left',
    disablePadding: true,
    label: 'UID',
    sort: true,
  },
  {
    id: 'accuracy',
    align: 'left',
    disablePadding: false,
    label: 'Accuracy',
    sort: true,
  },
  {
    id: 'params',
    align: 'left',
    disablePadding: false,
    label: 'Params',
    sort: true,
  },
  {
    id: 'flops',
    align: 'left',
    disablePadding: false,
    label: 'Flops',
    sort: true,
  },
  {
    id: 'score',
    align: 'left',
    disablePadding: false,
    label: 'Score',
    sort: true,
  },
  {
    id: 'block',
    align: 'right',
    disablePadding: false,
    label: 'Block',
    sort: true,
  },
  {
    id: 'reward',
    align: 'right',
    disablePadding: false,
    label: 'Reward',
    sort: true,
  },
  {
    id: 'eval_date',
    align: 'right',
    disablePadding: false,
    label: 'Evaluate Date',
    sort: true,
  },
];

function MinersTableHeader(props) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className="h-48 sm:h-64">
        {rows.map((row) => {
          return isMobile ? (
            <></>
          ) : (
            <TableCell
              sx={{
                backgroundColor: (currentTheme) =>
                  currentTheme.palette.mode === 'light'
                    ? lighten(currentTheme.palette.background.default, 0.4)
                    : lighten(currentTheme.palette.background.default, 0.02),
              }}
              className="p-4 md:p-16"
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? 'none' : 'normal'}
              sortDirection={props.order.id === row.id ? props.order.direction : false}
            >
              {row.sort && (
                <Tooltip
                  title="Sort"
                  placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={props.order.id === row.id}
                    direction={props.order.direction}
                    onClick={createSortHandler(row.id)}
                    className="font-semibold"
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              )}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default MinersTableHeader;
