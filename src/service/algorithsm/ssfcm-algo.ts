/**
 * Semi-Supervised Fuzzy C-Means Clustering
 *
 * @param {Array} data - Mảng chứa các điểm dữ liệu cần phân cụm
 * @param {Number} numClusters - Số lượng nhóm cần tạo ra
 * @param {Array} labels - Mảng chứa thông tin về nhãn của một số điểm dữ liệu, nếu có
 * @param {Number} fuzziness - Hệ số mờ. Thường có giá trị từ 1.5 đến 2.0
 * @param {Number} maxIterations - Số lần lặp tối đa cho thuật toán
 * @returns {Array} - Mảng chứa các điểm cluster và ma trận đánh giá liên kết giữa các điểm và các nhóm
 */
function semiSupervisedFuzzyCMeansClustering(data: any, numClusters: any, labels: any, fuzziness: any, maxIterations: any) {
    // Khởi tạo ma trận đánh giá liên kết
    let membershipMatrix: any = [];
    for (let i = 0; i < data.length; i++) {
        membershipMatrix[i] = new Array(numClusters).fill(0);
        if (labels[i]) {
            membershipMatrix[i][labels[i]] = 1;
        }
    }
    // Khởi tạo các centroid ban đầu
    let centroids = [];
    for (let i = 0; i < numClusters; i++) {
        let randomIndex = Math.floor(Math.random() * data.length);
        centroids[i] = data[randomIndex];
    }

    // Khởi tạo ma trận trọng số
    let membershipWeights = [];
    for (let i = 0; i < data.length; i++) {
        membershipWeights[i] = new Array(numClusters).fill(0);
        for (let j = 0; j < numClusters; j++) {
            if (membershipMatrix[i][j] === 1) {
                membershipWeights[i][j] = 1;
            } else {
                let distances = centroids.map((centroid) => getDistance(data[i], centroid));
                let minDistance = Math.min(...distances);
                membershipWeights[i][j] = Math.pow(minDistance / distances[j], 2 / (fuzziness - 1));
            }
        }
    }

    // Lặp lại quá trình phân cụm cho đến khi đạt được số lần lặp tối đa
    let hasError = false;
    for (let iteration = 0; iteration < maxIterations  && !hasError; iteration++) {
        // Cập nhật ma trận đánh giá liên kết
        for (let i = 0; i < data.length && !hasError; i++) {
            for (let j = 0; j < numClusters && !hasError; j++) {
                let sum = 0;
                for (let k = 0; k < numClusters && !hasError; k++) {
                    let distance = getDistance(data[i], centroids[j]);
                    let denominator = getDistance(data[i], centroids[k]);
                    if (denominator === 0) {
                        // Trả về giá trị đặc biệt hoặc thông báo lỗi tương ứng
                        console.error("Error: Denominator is 0");
                        hasError = true; // Gán giá trị true khi gặp lỗi
                        break; // Thoát khỏi vòng lặp
                    }
                    sum += Math.pow(membershipWeights[i][k], fuzziness) * Math.pow(distance / denominator, 2 / (fuzziness - 1));
                }
                membershipMatrix[i][j] = 1 / sum;
            }
        }

        // Cập nhật trọng số
        for (let j = 0; j < numClusters && !hasError; j++) {
            let sumWeights = 0;
            let sumNumerators = new Array(data[0].length).fill(0);
            for (let i = 0; i < data.length && !hasError; i++) {
                sumWeights += Math.pow(membershipMatrix[i][j], fuzziness);
                for (let k = 0; k < data[0].length&& !hasError;  k++) {
                    sumNumerators[k] += Math.pow(membershipMatrix[i][j], fuzziness) * data[i][k];
                }
            }
            centroids[j] = new Array(data[0].length).fill(0);
            for (let k = 0; k < data[0].length && !hasError; k++) {
                if (sumWeights === 0) {
                    // Trả về giá trị đặc biệt hoặc thông báo lỗi tương ứng
                    console.error("Error: sumWeights is 0");
                    hasError = true; // Gán giá trị true khi gặp lỗi
                    break; // Thoát khỏi vòng lặp
                }
                centroids[j][k] = sumNumerators[k] / sumWeights;
            }
        }

        // Cập nhật ma trận trọng số
        for (let i = 0; i < data.length && !hasError; i++) {
            for (let j = 0; j < numClusters && !hasError; j++) {
                if (membershipMatrix[i][j] === 1) {
                    membershipWeights[i][j] = 1;
                } else {
                    let sum = 0;
                    for (let k = 0; k < numClusters&& !hasError; k++) {
                        let distance1 = getDistance(data[i], centroids[j]);
                        let distance2 = getDistance(data[i], centroids[k]);
                        if (distance2 === 0) {
                            // Trả về giá trị đặc biệt hoặc thông báo lỗi tương ứng
                            console.error("Error: distance2 is 0");
                            hasError = true; // Gán giá trị true khi gặp lỗi
                            break; // Thoát khỏi vòng lặp
                        }
                        sum += Math.pow(distance1 / distance2, 2 / (fuzziness - 1));
                    }
                    membershipWeights[i][j] = 1 / sum;
                }
            }
        }
    }

    // Tạo mảng chứa các điểm cluster và ma trận đánh giá liên kết giữa các điểm và các nhóm
    let clusters: any = [];
    for (let i = 0; i < numClusters; i++) {
        clusters[i] = [];
    }
    for (let i = 0; i < data.length; i++) {
        let maxIndex = 0;
        for (let j = 1; j < numClusters; j++) {
            if (membershipMatrix[i][j] > membershipMatrix[i][maxIndex]) {
                maxIndex = j;
            }
        }
        clusters[maxIndex].push(data[i]);
    }
    return [clusters, membershipMatrix, centroids];
}

// Tính khoảng cách giữa hai điểm dữ liệu

// @param { Array } point1 - Mảng chứa thông tin về điểm dữ liệu thứ nhất
// @param { Array } point2 - Mảng chứa thông tin về điểm dữ liệu thứ hai
// @returns { Number } - Khoảng cách giữa hai điểm dữ liệu
function getDistance(point1: any, point2: any) {
    let sumSquares = 0;
    for (let i = 0; i < point1.length; i++) {
        sumSquares += Math.pow(point1[i] - point2[i], 2);
    }
    return Math.sqrt(sumSquares);
}

const SSFCM_ALGO = (type: string,
    data1: any,
    label:string,
    //maxIteration: number,
    epsilon: number,
    k: number,
    pointNumber: number) => {

    // Chuẩn bị dữ liệu đầu vào
    // let data: any = [
    //     [0.2, 0.4],
    //     [0.1, 0.3],
    //     [0.7, 0.9],
    //     [0.8, 1],
    //     [1.2, 1.4],
    //     [1.1, 1.3]
    // ];

    let data = JSON.parse(data1);
    let labels = label.split(',').map(function(item: any) {
        return item.trim() === 'null' ? null : parseInt(item);
      });

    // Chọn giá trị cho các tham số
    let numClusters = k;
    let fuzziness = 1.5;
    let maxIterations = 100;

    // Phân cụm dữ liệu
    let [clusters, membershipMatrix, centroids] = semiSupervisedFuzzyCMeansClustering(data, numClusters, labels, fuzziness, maxIterations);

    // In kết quả phân cụm
    console.log(centroids)
    for (let i = 0; i < clusters.length; i++) {
        console.log(`Cluster ${i}:`);
        for (let j = 0; j < clusters[i].length; j++) {
            console.log(clusters[i][j]);
        }
    }


    return {
        data,
        numClusters: k,
        //maxIteration,
        epsilon,
        centroids: centroids
    }
}
export default SSFCM_ALGO;