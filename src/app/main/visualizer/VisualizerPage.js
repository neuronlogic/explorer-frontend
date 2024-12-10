import { useRef, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useValidator } from 'src/app/contexts/ValidatorProvider';

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
  const iframeRef = useRef(null);
  const { selectedValidator, dataset } = useValidator();

  const sendMessageToIframe = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow.postMessage({selectedValidator, dataset}, '*')
    }
  };

  useEffect(() => {
    sendMessageToIframe();
  }, [selectedValidator, dataset]);

  return (
    <Root
      content={
        <div className="w-full h-full">
          <iframe
            ref={iframeRef}
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

export default VisualizerPage;
