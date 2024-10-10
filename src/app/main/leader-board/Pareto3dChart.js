import Plot from 'react-plotly.js';

const Pareto3dChart = ({ data }) => {
    return (
        <Plot
            data={[
                {
                    x: data.x,
                    y: data.y,
                    z: data.z,
                    mode: 'markers',
                    type: 'scatter3d',
                    marker: {
                        color: data.color || 'blue', // Optional color customization
                        size: 3, // Marker size
                    },
                    text: data.uid, // Array of ids to show on hover
                    hovertemplate:
                        '<b>UID</b>: %{text}<br>' + // Display custom id
                        '<b>Params</b>: %{x}<br>' + // Display x as Params
                        '<b>Flops</b>: %{y}<br>' + // Display y as Flops
                        '<b>Accuracy</b>: %{z}<br>' + // Display z as Accuracy
                        '<extra></extra>', // Remove extra information
                },
            ]}
            layout={{
                scene: {
                    xaxis: { title: 'Params', color: '#ffffff', gridcolor: '#444', tickcolor: '#ffffff' },
                    yaxis: { title: 'Flops', color: '#ffffff', gridcolor: '#444', tickcolor: '#ffffff' },
                    zaxis: { title: 'Accuracy', color: '#ffffff', gridcolor: '#444', tickcolor: '#ffffff' },
                    bgcolor: '#222', // Background color of the 3D plot area
                },
                paper_bgcolor: '#111827', // Outer background color
                plot_bgcolor: '#333333', // Plot area background color
                font: {
                    color: '#ffffff', // Font color for titles, labels, etc.
                },
            }}
            config={{
                displaylogo: false, // Removes the Plotly logo
                displayModeBar: true, // Optional: controls the mode bar (you can set it to false to hide it entirely)
            }}
        />
    );
};

export default Pareto3dChart;
