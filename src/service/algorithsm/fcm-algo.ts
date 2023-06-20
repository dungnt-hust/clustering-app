
interface DataPoint {
  // Định nghĩa một điểm dữ liệu với nhiều thuộc tính
  [key: string]: number;
}

interface Cluster {
  // Định nghĩa một cụm và trọng số của nó
  center: DataPoint;
  weights: number[];
}

function readCsvFile(data: string){
  // Đọc dữ liệu từ file CSV và chuyển đổi sang mảng các điểm dữ liệu
  let lines = data.trim().split('\n');
  const headers = lines.shift()?.split(',');
  
  // Loại bỏ trường ID trong danh sách headers
  const validHeaders = headers!.filter(header => header.replace(/,/g, '').trim() !== '' && header.toLowerCase() !== 'id');
  
  // Loại bỏ các dòng có giá trị của trường ID
  lines = lines.filter(line => {
    const values = line.split(',');
    return values[0].replace(/,/g, '').trim() !== '';
  });
  
  const result =  lines.map(line => {
    const values = line.split(',').map(parseFloat);
    const point: DataPoint = {};

    for (let i = 0; i < validHeaders.length && i < values.length; i++) {
      point[validHeaders[i]] = values[i+1]; // Bỏ đi giá trị của trường ID
    }
    return point;
  });

  return {
    validHeaders,
    result
  }
} 

function initializeClusters(data: DataPoint[], k: number): Cluster[] {
  // Khởi tạo các cụm bằng cách chọn k điểm ngẫu nhiên từ dữ liệu
  const randomIndices = new Set<number>();
  while (randomIndices.size < k) {
    randomIndices.add(Math.floor(Math.random() * data.length));
  }

  const clusters: Cluster[] = [];
  for (const i of randomIndices) {
    const center: DataPoint = {};
    for (const key of Object.keys(data[i])) {
      center[key] = data[i][key];
    }
    clusters.push({
      center,
      weights: new Array(data.length).fill(0),
    });
  }
  return clusters;
}

function computeDistance(point1: DataPoint, point2: DataPoint): number {
  // Tính khoảng cách Euclid giữa hai điểm
  let sum = 0;
  for (const key of Object.keys(point1)) {
    sum += Math.pow(point1[key] - point2[key], 2);
  }
  return Math.sqrt(sum);
}

function updateWeights(data: DataPoint[], clusters: Cluster[], fuzziness: number): void {
  // Cập nhật ma trận phụ thuộc của các điểm dữ liệu cho từng cụm
  for (let i = 0; i < data.length; i++) {
    const distances = new Array(clusters.length);
    let total = 0;
    for (let j = 0; j < clusters.length; j++) {
      distances[j] = computeDistance(data[i], clusters[j].center);
      distances[j] = Math.max(distances[j], 0.0001); // Tránh chia cho 0
      distances[j] = Math.pow(distances[j], 2 / (fuzziness - 1));
      total += 1 / distances[j];
    }

    for (let j = 0; j < clusters.length; j++) {
      clusters[j].weights[i] = 1 / (distances[j] * total);
    }
  }
}

function updateCenters(data: DataPoint[], clusters: Cluster[], m: number): void {
  // Cập nhật lại tâm của mỗi cụm dựa trên ma trận phụ thuộc mới tính được
  for (let i = 0; i < clusters.length; i++) {
    const center: DataPoint = {};
    let totalWeight = 0;
    for (let j = 0; j < data.length; j++) {
      const weight = Math.pow(clusters[i].weights[j], m);
      totalWeight += weight;
      for (const key of Object.keys(data[j])) {
        if (center[key] === undefined) {
          center[key] = 0;
        }
        center[key] += data[j][key] * weight;
      }
    }

    for (const key of Object.keys(center)) {
      center[key] /= totalWeight;
    }
    clusters[i].center = center;
  }
}

function fuzzyCMeansClustering(data: DataPoint[], k: number, fuzziness: number, maxIterations: number, epsilon: number) {
  // Thuật toán Fuzzy C-Means clustering

  let clusters = initializeClusters(data, k);
  let iterCount = 0;
  let time = Date.now();
  while (iterCount < maxIterations) {
    const oldCenters = clusters.map(cluster => ({ ...cluster.center }));

    updateWeights(data, clusters, fuzziness);
    updateCenters(data, clusters, fuzziness);

    let converged = true;
    for (let i = 0; i < clusters.length; i++) {
      if (!converged) {
        break;
      }
      for (const key of Object.keys(clusters[i].center)) {
        if (Math.abs(clusters[i].center[key] - oldCenters[i][key]) > epsilon) {
          converged = false;
          break;
        }
      }
    }

    if (converged) {
      break;
    }

    iterCount++;
  }

  const dataWithClusterInfo = data.map((datapoint, index) => {
    const clusterWeights = clusters.map(cluster => cluster.weights[index]);
    const maxWeight = Math.max(...clusterWeights);
    const clusterIndex = clusterWeights.indexOf(maxWeight);
    return { ...datapoint, cluster: clusterIndex };
  });

  return {
    clusters: clusters,
    datapoints: dataWithClusterInfo,
    iterCount,
    timeRun: Date.now() - time
  }
}

function computeFPC(clusters: Cluster[]): number {
  console.log(clusters);
  const numClusters = clusters.length;
  const numDataPoints = clusters[0].weights.length;
  let sum = 0;

  for (let i = 0; i < numClusters; i++) {
    let weightSum = 0;
    for (let j = 0; j < numDataPoints; j++) {
      weightSum += Math.pow(clusters[i].weights[j], 2);
    }
    sum += weightSum;
  }

  return sum / numDataPoints;
}



const FCM_ALGO = (
  dataUpload:any, 
  fuzzyness:number,
  clusters:number, 
  maxIteration:number,
  epsilon:number,
) => {

  const {validHeaders, result} = readCsvFile(dataUpload);
  const results = fuzzyCMeansClustering(result, clusters, fuzzyness, maxIteration, epsilon);

  return {
    headers: validHeaders,
    clusters: results.clusters,
    datapoints: results.datapoints,
    iterCount: results.iterCount,
    timeRun: results.timeRun,
    fpc: computeFPC(results.clusters)
  }
}
export default FCM_ALGO;