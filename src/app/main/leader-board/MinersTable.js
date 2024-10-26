import { useEffect, useState, useMemo } from 'react';
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
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CardItem from 'src/app/components/ui/CardItem';
import { getMiners, selectMiners, selectMinersSearchText } from './store/minersSlice';
import MinersTableHeader from './MinersTableHeader';
import Pareto3dChart from './Pareto3dChart';

function MinersTable() {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const miners = useSelector(selectMiners);
  const searchText = useSelector(selectMinersSearchText);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
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
  const siblingCount = isMediumScreen ? 0 : 1;
  const boundaryCount = isSmallScreen ? 0 : 1;

  const simplifiedData = useMemo(
    () => ({
      x: data.map((item) => item.params),
      y: data.map((item) => item.flops),
      z: data.map((item) => item.accuracy),
      color: data.map((item) => (item.pareto ? 'green' : 'red')),
      uid: data.map((item) => item.uid),
    }),
    [data]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }

  const sortedData = _.orderBy(
    data,
    [(item) => item[order.id] ?? item[order.id]],
    [order.direction]
  );

  const displayedData = sortedData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

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

  return (
    <>
      <div className="flex justify-center w-full h-fit">
        <Pareto3dChart data={simplifiedData} />
      </div>

      <div className="w-full flex flex-col p-16 md:p-32">
        <FuseScrollbars className="overflow-x-auto">
          {isMobile ? (
            <>
              <MinersTableHeader
                order={order}
                onRequestSort={handleRequestSort}
                rowCount={data.length}
              />
              <div className="flex flex-col gap-8">
                {(displayedData || []).map((item) => {
                  return (
                    <CardItem className="" key={item.uid}>
                      <div className="flex justify-between items-center">
                        <Typography className="bg-primary-light hover:bg-primary inline-block w-60 text-center py-2 text-lg rounded-full"
                          onClick={() =>
                            window.open(`https://huggingface.co/${item?.hf_account}`, '_blank')
                          }>
                          {item.uid}
                        </Typography>
                        <div className="flex item-center gap-4">
                          <Typography className="text-grey-500">Reward</Typography>
                          <div className="p-4 md:p-16" align="right">
                            <i
                              className={clsx(
                                'inline-block w-12 h-12 rounded-full mx-8',
                                item.reward ? 'bg-green' : 'bg-red'
                              )}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 mt-12">
                        <div className="flex justify-between items-center">
                          <Typography className="text-grey-400">Accuracy</Typography>
                          <Typography className="text-lg font-bold px-8">
                            {item.accuracy}
                          </Typography>
                        </div>
                        <div className="flex justify-between items-center">
                          <Typography className="text-grey-400">Params</Typography>
                          <Typography className="text-lg font-bold px-8">
                            {formatNumber(item.params)}
                          </Typography>
                        </div>
                        <div className="flex justify-between items-center">
                          <Typography className="text-grey-400">Flops</Typography>
                          <Typography className="text-lg font-bold px-8">
                            {formatNumber(item.flops)}
                          </Typography>
                        </div>
                        <div className="flex justify-between items-center">
                          <Typography className="text-grey-400">Score</Typography>
                          <Typography className="text-lg font-bold px-8">
                            {item?.score.toFixed(5)}
                          </Typography>
                        </div>
                        <div className="flex justify-between items-center">
                          <Typography className="text-grey-400">Block</Typography>
                          <Typography className="text-lg font-bold px-8">{item.block}</Typography>
                        </div>
                        <div className="flex justify-between items-center">
                          <Typography className="text-grey-400">Evaluate Date</Typography>
                          <Typography className="text-lg font-bold px-8">
                            {item.eval_date}
                          </Typography>
                        </div>
                      </div>
                    </CardItem>
                  );
                })}
              </div>
            </>
          ) : (
            <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
              <MinersTableHeader
                order={order}
                onRequestSort={handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {(displayedData || []).map((row) => (
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row?.uid}
                    onClick={() =>
                      window.open(`https://huggingface.co/${row?.hf_account}`, '_blank')
                    }
                  >
                    <TableCell className="p-4 md:p-16">{row?.uid}</TableCell>
                    <TableCell className="p-4 md:p-16">{row?.accuracy}</TableCell>
                    <TableCell className="p-4 md:p-16">{formatNumber(row.params)}</TableCell>
                    <TableCell className="p-4 md:p-16">{formatNumber(row.flops)}</TableCell>
                    <TableCell className="p-4 md:p-16">{row?.score.toFixed(5)}</TableCell>
                    <TableCell className="p-4 md:p-16" align="right">
                      {row?.block}
                    </TableCell>
                    <TableCell className="p-4 md:p-16" align="right">
                      <i
                        className={clsx(
                          'inline-block w-12 h-12 rounded-full mx-8',
                          row.pareto ? 'bg-green' : 'bg-red'
                        )}
                      />
                    </TableCell>
                    <TableCell className="p-4 md:p-16" align="right">
                      {row?.eval_date}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </FuseScrollbars>

        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          siblingCount={siblingCount}
          boundaryCount={boundaryCount}
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
    </>
  );
}

export default MinersTable;
