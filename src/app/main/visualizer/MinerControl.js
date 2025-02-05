import { useEffect, useState } from 'react';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Fade,
} from '@mui/material';
import { selectMiner, selectMiners, getMiners, setMiner } from './store/minersSlice';
import { useValidator } from '../../contexts/ValidatorProvider';
import SliderItem from './SliderItem';

export default function MinerControl(props) {
  const { show } = props;

  const [loading, setLoading] = useState(true);
  const [params, setParams] = React.useState([]);
  const [flops, setFlops] = React.useState([]);
  const [accuracy, setAccuracy] = React.useState([0, 100]);
  const [paramsSlider, setParamsSlider] = useState(null);
  const [flopsSlider, setFlopsSlider] = useState(null);
  const [reward, setReward] = React.useState('all');
  const [availableMiners, setAvailableMiners] = useState([]);
  const { selectedValidator, dataset } = useValidator();
  const selectedMiner = useSelector(selectMiner);
  const dispatch = useDispatch();
  const miners = useSelector(selectMiners);
  const handleSliderChange = (newValue, sliderType) => {
    switch (sliderType) {
      case 'params':
        setParams(newValue);
        break;
      case 'flops':
        setFlops(newValue);
        break;
      case 'accuracy':
        setAccuracy(newValue);
        break;
      default:
        break;
    }
  };

  const handleReward = (event, newReward) => {
    setReward(newReward);
  };

  useEffect(() => {
    dispatch(getMiners({ selectedValidator, dataset })).then(() => setLoading(false));
  }, [dispatch, selectedValidator, dataset]);

  useEffect(() => {
    if (miners.length > 0) {
      const calculateMinMax = (data, key) => {
        return data.reduce(
          (acc, current) => {
            if (current[key] < acc.min) acc.min = current[key];
            if (current[key] > acc.max) acc.max = current[key];
            return acc;
          },
          { min: Infinity, max: -Infinity }
        );
      };
      const flopsMinMax = calculateMinMax(miners, 'flops');
      const paramsMinMax = calculateMinMax(miners, 'params');

      setParamsSlider({ from: paramsMinMax.min, to: paramsMinMax.max });
      setFlopsSlider({ from: flopsMinMax.min, to: flopsMinMax.max });

      setParams([paramsMinMax.min, paramsMinMax.max]);
      setFlops([flopsMinMax.min, flopsMinMax.max]);
    }
  }, [miners]);

  useEffect(() => {
    const filteredMiners = miners
      .filter(
        (miner) =>
          miner.params >= params[0] &&
          miner.params <= params[1] &&
          miner.flops >= flops[0] &&
          miner.flops <= flops[1] &&
          miner.accuracy >= accuracy[0] &&
          miner.accuracy <= accuracy[1] &&
          ((reward === 'reward' && miner.reward) || reward === 'all')
      )
      .sort((a, b) => a.uid - b.uid);
    setAvailableMiners(filteredMiners);
  }, [miners, params, flops, accuracy, reward]);

  return (
    <Fade in={show} unmountOnExit>
      <div className="px-20 py-96 flex flex-col gap-4 lg:relative absolute w-[240px] h-full bg-[#111827] ">
        <ToggleButtonGroup
          value={reward}
          exclusive
          onChange={handleReward}
          aria-label="text alignment"
          className="w-full grid grid-cols-2 items-center"
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="reward">Pareto</ToggleButton>
        </ToggleButtonGroup>
        {paramsSlider && flopsSlider && (
          <>
            <SliderItem
              title="Params"
              min={paramsSlider.from}
              max={paramsSlider.to}
              onValueChange={(value) => handleSliderChange(value, 'params')}
            />
            <SliderItem
              title="Flops"
              min={flopsSlider.from}
              max={flopsSlider.to}
              onValueChange={(value) => handleSliderChange(value, 'flops')}
            />
          </>
        )}
        <SliderItem
          title="Accuracy"
          min={0}
          max={100}
          onValueChange={(value) => handleSliderChange(value, 'accuracy')}
        />
        <FormControl className="w-full py-0">
          <InputLabel className="text-16" id="miner-select-label">
            Select Miner UID
          </InputLabel>
          <Select
            labelId="miner-select-label"
            label="Miner"
            className="max-h-[300px] overflow-y-auto"
            value={selectedMiner || ''}
            onChange={(e) => dispatch(setMiner(e.target.value))}
            id="miner-select"
          >
            {availableMiners.map((item) => (
              <MenuItem value={item.uid} key={item.uid}>
                {item.uid}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </Fade>
  );
}
