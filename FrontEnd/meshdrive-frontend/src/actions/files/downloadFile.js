import { DOWNLOAD_FILE } from "./types";
import axios from "axios";
export const downloadFileSuccess = () => {
    return {
        type: DOWNLOAD_FILE,
        payload: "true"
      };
  }

export default function downloadFile(id) {
  return dispatch => {

    
    axios({
        url: "https://mysterious-plains-65246.herokuapp.com/downloadFile/"+id,
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        responseType: 'blob', // important
      }).then((response) => {

        
      /*  const blob = new Blob([response.data], {type: response.data.type});
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const contentDisposition = response.headers['content-disposition'];
        let fileName = 'unknown';
        if (contentDisposition) {
            const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
            if (fileNameMatch.length)
                fileName = fileNameMatch[0];
        }
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);*/
        //___________________________________________________________________________________
        
       /* const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download',"Bilal.pdf");
        document.body.appendChild(link);
        link.click();
          link.parentElement.removeChild(link)*/
      
    
      });
    /*fetch("https://mysterious-plains-65246.herokuapp.com/downloadFile/"+id)
      .then(


      )
      .then(d_file => dispatch(downloadFile()))
      .catch(error => console.log(error));*/
  };
}