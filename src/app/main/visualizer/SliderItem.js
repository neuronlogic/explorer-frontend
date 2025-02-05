import * as React from 'react';
import { Typography, Slider, Box } from '@mui/material';

import formatUnit from 'src/app/utils/functions';

function valuetext(value) {
  return `${value}°C`;
}

export default function SliderItem({ title, min, max, onValueChange }) {
  const [value, setValue] = React.useState([min, max]);

  React.useEffect(() => {
    setValue([min, max]);
  }, [min, max]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <Box sx={{ width: 200 }}>
      <Typography className="text-gray-100 font-bold" variant="body2">
        {title}
      </Typography>
      <Slider
        className="flex-1"
        getAriaLabel={() => 'Temperature range'}
        value={value}
        step={0.1}
        min={min}
        max={max}
        size="small"
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
      <Box className="flex justify-between items-center gap-4">
        <Typography
          className="text-12"
          variant="body2"
          onClick={() => setValue([min, value[1]])}
          sx={{ cursor: 'pointer' }}
        >
          {formatUnit(min)}
        </Typography>
        <Typography
          className="text-12"
          variant="body2"
          onClick={() => setValue([value[0], max])}
          sx={{ cursor: 'pointer' }}
        >
          {formatUnit(max)}
        </Typography>
      </Box>
    </Box>
  );
}
