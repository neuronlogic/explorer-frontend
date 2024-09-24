import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import FuseLoading from '@fuse/core/FuseLoading';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import _ from 'lodash';
import formatNumber from 'src/app/utils/functions';
import { PrevIcon, NextIcon } from 'src/assets/icons/svg';
import { getMiners, selectMiners, selectMinersSearchText } from './store/minersSlice';
import MinersTableHeader from './MinersTableHeader';

function MinersTable() {
  const dispatch = useDispatch();
  const miners = useSelector(selectMiners);
  const searchText = useSelector(selectMinersSearchText);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1); // Start from page 1
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({ direction: 'asc', id: 'uid' });

  const pageCount = Math.ceil(data.length / rowsPerPage);

  useEffect(() => {
    dispatch(getMiners()).then(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    const filteredData = searchText.length
      ? _.filter(miners, (item) =>
          item.uid.toString().toLowerCase().includes(searchText.toLowerCase())
        )
      : miners;
    setData(filteredData);
    setPage(1); // Reset page to 1 when data changes
  }, [miners, searchText]);

  const handleRequestSort = (event, property) => {
    const isAsc = order.id === property && order.direction === 'asc';
    setOrder({ direction: isAsc ? 'desc' : 'asc', id: property });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }

  if (!data.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There are no miners!
        </Typography>
      </motion.div>
    );
  }

  const sortedData = _.orderBy(
    data,
    [(item) => item[order.id] ?? item[order.id]],
    [order.direction]
  );

  const displayedData = sortedData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div className="w-full flex flex-col p-32">
      <FuseScrollbars className="overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <MinersTableHeader
            order={order}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
          />
          <TableBody>
            {displayedData.map((row) => (
              <TableRow
                className="h-72 cursor-pointer"
                hover
                role="checkbox"
                tabIndex={-1}
                key={row.uid}
                onClick={() => window.open(`https://huggingface.co/${row.hf_account}`, '_blank')}
              >
                <TableCell className="p-4 md:p-16">{row.uid}</TableCell>
                <TableCell className="p-4 md:p-16">{row.accuracy}</TableCell>
                <TableCell className="p-4 md:p-16">{formatNumber(row.params)}</TableCell>
                <TableCell className="p-4 md:p-16">{formatNumber(row.flops)}</TableCell>
                <TableCell className="p-4 md:p-16">{row.score.toFixed(5)}</TableCell>
                <TableCell className="p-4 md:p-16">{row.block}</TableCell>
                <TableCell className="p-4 md:p-16" align="right">
                  <i
                    className={clsx(
                      'inline-block w-12 h-12 rounded-full mx-8',
                      row.reward ? 'bg-green' : 'bg-red'
                    )}
                  />
                </TableCell>
                <TableCell className="p-4 md:p-16" align="right">
                  {row.eval_date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <Pagination
        count={pageCount}
        page={page}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        sx={{
          mt: 2,
          justifyContent: 'center',
          display: 'flex',
          '& .MuiPaginationItem-root': {
            color: '#808B9B',
            border: 'none',
          },
          '& .MuiPaginationItem-root.Mui-selected': {
            backgroundColor: '#61F0FE',
            color: '#101820',
            '&:hover': {
              backgroundColor: '#03C1DB',
            },
          },
        }}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            components={{
              previous: PrevIcon,
              next: NextIcon,
            }}
          />
        )}
      />
    </div>
  );
}

export default MinersTable;
