
// import readCSV from "../utils/read-csv";
import FCM_ALGO from "./fcm-algo";
import SSFCM_ALGO from "./ssfcm-algo";

const Caculation = ( 
  type:string, 
  dataUpload:any, 
  fuzzyness:number,
  clusters:number, 
  maxIteration:number,
  epsilon:number
 ) => {
    if(type === 'FCM'){
      return FCM_ALGO(
        dataUpload,
        fuzzyness,
        clusters,
        maxIteration, 
        epsilon)
      }
    // }else{
    //   return SSFCM_ALGO(type, 
    //     data,
    //     label, 
    //     //maxIteration, 
    //     epsilon, 
    //     k, 
    //     pointNumber)
    // }
    
}
export default Caculation;
  