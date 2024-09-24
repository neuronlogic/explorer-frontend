import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from './store';
import LeaderBoardHeader from './LeaderBoardHeader';
import MinersTable from './MinersTable';

function LeaderBoardPage() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <div className="max-w-[1200px] w-full mx-auto">
      <LeaderBoardHeader />
      <MinersTable />
    </div>
  );
}

export default withReducer('leaderBoard', reducer)(LeaderBoardPage);
