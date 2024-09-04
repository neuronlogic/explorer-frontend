import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
  },
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
}));

function ExplorerPage(props) {

  return (
    <Root
      content={
        <div className="w-full h-full">
          <iframe
            src={process.env.REACT_APP_MODEL_VIEWER}
            style={{ width: '100%', height: '100%', border: 'none' }}
            title="Model Visualizer"
          />
        </div>
      }
      scroll="content"
    />
  );
}

export default ExplorerPage;
