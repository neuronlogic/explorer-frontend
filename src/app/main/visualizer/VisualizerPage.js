import { useState, useEffect } from 'react';
import withReducer from 'app/store/withReducer';
import { styled, useTheme } from '@mui/material/styles';
import { IconButton, Hidden } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import reducer from './store';
import ModelViewer from './ModelViewer';
import MinerControl from './MinerControl';

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

function VisualizerPage(props) {
  const theme = useTheme();

  const isPc = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    if (isPc) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [isPc]);

  const [show, setShow] = useState(false);

  return (
    <Root
      content={
        <div className="w-full h-full flex">
          <Hidden lgUp>
            <IconButton
              sx={{
                position: 'absolute',
                top: 40,
                left: 10,
                zIndex: 50,
              }}
              color="inherit"
              size="small"
              onClick={() => setShow(!show)}
            >
              <FuseSvgIcon size={20} color="action">
                heroicons-outline:globe-alt
              </FuseSvgIcon>
            </IconButton>
          </Hidden>
          <MinerControl show={show} />
          <ModelViewer />
        </div>
      }
      scroll="content"
    />
  );
}

export default withReducer('visualizer', reducer)(VisualizerPage);
