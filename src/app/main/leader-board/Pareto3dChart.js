import Plot from 'react-plotly.js';
import Plotly from 'plotly.js-basic-dist';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import './plot.css';

const Pareto3dChart = ({ data }) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div className='flex justify-center items-center w-full h-full'>
      <div className='h-[60vh] max-width:[480px]:h-[50vh]'>
        <Plot
          data={[
            {
              x: data.x,
              y: data.y,
              z: data.z,
              mode: 'markers',
              type: 'scatter3d',
              marker: {
                color: data.color || 'blue',
                size: 3,
              },
              text: data.uid,
              hovertemplate:
                '<b>UID</b>: %{text}<br>' +
                '<b>Flops</b>: %{y}<br>' +
                '<b>Accuracy</b>: %{z}<br>' +
                '<extra></extra>',
            },
          ]}
          layout={{
            height: 550,
            autosize: true,
            scene: {
              xaxis: { title: 'Params', color: '#ffffff', gridcolor: '#444', tickcolor: '#ffffff' },
              yaxis: { title: 'Flops', color: '#ffffff', gridcolor: '#444', tickcolor: '#ffffff' },
              zaxis: { title: 'Accuracy', color: '#ffffff', gridcolor: '#444', tickcolor: '#ffffff' },
              bgcolor: '#151c2b',
            },
            paper_bgcolor: '#111827',
            font: {
              color: '#ffffff',
            },
          }}
          config={{
            displaylogo: false,
            displayModeBar: !isMobile ,
          }}
          useResizeHandler
          style={{ width: '100%', height: '100%' }} // Make the plot responsive
          plotly={Plotly}
        />
      </div>
    </div>
  );
};

export default Pareto3dChart;

