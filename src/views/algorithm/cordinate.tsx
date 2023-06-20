// interface ClusterGraphProps {
//   data: { x: number; y: number; cluster: number }[];
// }

// const ClusterGraph: React.FC<ClusterGraphProps> = ({ data }) => {
//   // Tạo một object chứa các điểm trong từng cụm cluster
//   const clusters: any = {};
//   data.forEach((point) => {
//     if (!clusters[point.cluster]) {
//       clusters[point.cluster] = [];
//     }
//     const item = Object.values(point)
//     clusters[point.cluster].push({
//         x: item[0],
//         y: item[1],
//         cluster: item[2]
//     });
//   });

//   // Tạo các dataset cho từng cụm cluster
//   const datasets = Object.keys(clusters).map((cluster) => ({
//     label: `Cluster ${cluster}`,
//     data: clusters[cluster],
//     backgroundColor: `rgba(${Math.floor(Math.random() * 256)},${Math.floor(
//       Math.random() * 256
//     )},${Math.floor(Math.random() * 256)},0.3)`,
//   }));

//   // Định nghĩa dữ liệu cho biểu đồ
//   const chartData = {
//     datasets,
//   };

//   // Định nghĩa các tùy chọn cho biểu đồ
//   const chartOptions = {
//     scales: {
//       xAxes: [
//         {
//           type: 'linear',
//           position: 'bottom',
//         },
//       ],
//     },
//   };

//   return <Scatter data={chartData} options={chartOptions} />;
// };

import { Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";

// Dữ liệu mẫu về các điểm và cụm của chúng
// const data = [
//   {
//     points: [
//       { x: 10, y: 20 },
//       { x: 15, y: 10 },
//       { x: 20, y: 25 },
//       { x: 30, y: 30 },
//     ],
//   },
//   {
//     points: [
//       { x: 5, y: 15 },
//       { x: 25, y: 20 },
//       { x: 35, y: 15 },
//       { x: 40, y: 30 },
//     ],
//   },
// ];

const Chart = ({ dataInput}: any) => {
  // Tạo một object chứa các điểm trong từng cụm cluster
  const data: any = [];

  dataInput.forEach((point: any) => {
    if (!data[point.cluster]) {
      data[point.cluster] = { points: [] };
    }
    const item = Object.values(point);
    data[point.cluster].points.push({
      x: item[0],
      y: item[1]
    });
  });
  return (
    <ScatterChart width={300} height={300}>
      <XAxis
        type="number"
        dataKey="x"
        label={{
          value: "X Coordinate",
          position: "insideBottomRight",
          offset: 0,
        }}
      />
      <YAxis
        type="number"
        dataKey="y"
        label={{ value: "Y Coordinate", angle: -90, position: "insideLeft" }}
      />
      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
      {data.map((cluster: any, index: any) => (
        <Scatter
          key={index}
          data={cluster.points}
          fill={`rgba(${Math.random() * 255},${Math.random() * 255},${
            Math.random() * 255
          },0.6)`}
        />
      ))}
    </ScatterChart>
  );
};

export default Chart;
