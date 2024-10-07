import { useState, useCallback } from 'react';
import {
  TableCell,
  TableRow,
  TableSortLabel,
  Tooltip,
  TableHead,
  Select,
  MenuItem,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { lighten } from '@mui/material/styles';
import { ArrowIcon } from 'src/assets/icons/svg';

// Define row configuration as a constant for clarity and reusability
const rows = [
  { id: 'uid', align: 'left', disablePadding: true, label: 'UID', sort: true },
  { id: 'accuracy', align: 'left', disablePadding: false, label: 'Accuracy', sort: true },
  { id: 'params', align: 'left', disablePadding: false, label: 'Params', sort: true },
  { id: 'flops', align: 'left', disablePadding: false, label: 'Flops', sort: true },
  { id: 'score', align: 'left', disablePadding: false, label: 'Score', sort: true },
  { id: 'block', align: 'right', disablePadding: false, label: 'Block', sort: true },
  { id: 'reward', align: 'right', disablePadding: false, label: 'Reward', sort: true },
  { id: 'eval_date', align: 'right', disablePadding: false, label: 'Evaluate Date', sort: true },
];

function MinersTableHeader({ order, onRequestSort }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // State for the selected option in mobile view
  const [option, setOption] = useState('uid');

  // Memoize the sorting handler to prevent unnecessary re-renders
  const createSortHandler = useCallback(
    (property) => (event) => {
      onRequestSort(event, property);
    },
    [onRequestSort]
  );

  // Handle option change in mobile view
  const handleChange = (event) => {
    const newOption = event.target.value;
    setOption(newOption);
    createSortHandler(newOption)(event); // Trigger sorting based on the new selection
  };

  // Styles for the select component and table cell backgrounds
  const selectStyles = {
    minWidth: 150,
    '&.Mui-focused fieldset': {
      borderColor: '#4B5565 !important', // Desired border color
    },
  };

  const tableCellBackground = (currentTheme) =>
    currentTheme.palette.mode === 'light'
      ? lighten(currentTheme.palette.background.default, 0.4)
      : lighten(currentTheme.palette.background.default, 0.02);

  if (isMobile) {
    return (
      <div className='flex justify-end mb-10'>
        <Select
          value={option}
          onChange={handleChange}
          className="border-gray-70 bg-gray-80 rounded-8 focus:border-gray-60"
          IconComponent={ArrowIcon}
          sx={selectStyles}
        >
          {rows.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              <Typography className="text-16 leading-20 font-space">{item.label}</Typography>
            </MenuItem>
          ))}
        </Select>
      </div>
    );
  }

  return (
    <TableHead>
      <TableRow className="h-48 sm:h-64">
        {rows.map((row) => (
          <TableCell
            key={row.id}
            align={row.align}
            padding={row.disablePadding ? 'none' : 'normal'}
            sortDirection={order.id === row.id ? order.direction : false}
            sx={{ backgroundColor: tableCellBackground(theme) }}
            className="p-4 md:p-16"
          >
            {row.sort && (
              <Tooltip
                title="Sort"
                placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
                enterDelay={300}
              >
                <TableSortLabel
                  active={order.id === row.id}
                  direction={order.direction}
                  onClick={createSortHandler(row.id)}
                  className="font-semibold"
                >
                  {row.label}
                </TableSortLabel>
              </Tooltip>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default MinersTableHeader;
