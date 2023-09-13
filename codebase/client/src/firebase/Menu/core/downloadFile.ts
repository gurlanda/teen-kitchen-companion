async function downloadFile(downloadUrl: string) {
  try {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open('GET', downloadUrl);
    xhr.send();
  } catch (error) {
    console.log(error);
  }
}

export default downloadFile;
