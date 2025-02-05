import { useRef, useEffect, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useValidator } from 'src/app/contexts/ValidatorProvider';
import { selectMiner, selectMiners } from './store/minersSlice';

export default function ModelViewer() {
  const iframeRef = useRef(null);
  const selectedMiner = useSelector(selectMiner);
  const miners = useSelector(selectMiners);
  const { selectedValidator, dataset } = useValidator();

  const minerInfo = useMemo(() => {
    return miners.find((miner) => miner.uid === selectedMiner) || null;
  }, [miners, selectedMiner]);

  const sendMessageToIframe = useCallback(() => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow.postMessage(
        { selectedValidator, dataset, selectedMiner, minerInfo },
        '*'
      );
    }
  }, [selectedValidator, dataset, selectedMiner, minerInfo]);

  useEffect(() => {
    sendMessageToIframe();
  }, [selectedValidator, dataset, selectedMiner, sendMessageToIframe]);

  return (
    <iframe
      ref={iframeRef}
      src={process.env.REACT_APP_MODEL_VIEWER}
      style={{ width: '100%', height: '100%', border: 'none' }}
      title="Model Visualizer"
    />
  );
}
