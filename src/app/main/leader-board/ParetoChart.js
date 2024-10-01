import { ScatterChart } from '@mui/x-charts/ScatterChart';
import formatNumber from 'src/app/utils/functions';

export default function ParetoChart(props) {
  const { data } = props;

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <ScatterChart
        height={300}
        series={[
          {
            data: (data || []).map((v) => ({
              x: v.params,
              y: v.accuracy,
              id: v.uid,
            })),
            valueFormatter: ({ x, y, id }) => `${id} (${formatNumber(x)}, ${y}%)`,
            label: 'Params vs Accuracy',
          },
        ]}
      />
      <ScatterChart
        height={300}
        series={[
          {
            data: (data || []).map((v) => ({
              x: v.flops,
              y: v.accuracy,
              id: v.uid,
            })),
            valueFormatter: ({ x, y, id }) => `${id} (${formatNumber(x)}, ${y}%)`,
            label: 'Flops vs Accuracy',
          },
        ]}
      />
    </div>
  );
}
