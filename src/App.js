import { useState, useEffect, useRef } from 'react';
import './App.css';
import { uploadFile } from './service/api';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');

  const fileInputRef = useRef(); // to preserve the value before rendering.

  //Image url
  const url = 'https://i.pinimg.com/originals/16/46/24/1646243661201a0892cc4b1a64fcbacf.jpg';

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        setResult(response.path);
      }
    }
    getImage();
  }, [file])

  const onUploadClick = () => {
    fileInputRef.current.click();
  }

  useEffect(() => {
    alert("This website is under updates soon it will be responsive 📱. Untill the mobile users are requested to enable the desktop mode on their mobile browser... Thanks for visiting 🍰!!!");
  }, [])

  // Temporary solution for fixing the url value
  var stringValue = `${result}`
  var final = stringValue.substring(stringValue.indexOf("/") + 1)
  var uri = `https://backendpigeon.onrender.com/${final}`
  return (
    <div className='container'>
      <img src={url} className='img' />
      <div className='wrapper'>
        <h1>Simple file sharing!</h1>
        <p>Upload and share the download link.</p>
        <p>Please try to upload the file to the website if the URL will not change!</p>
        <p> or make a website refresh.</p>
        <p> ✅Copy to Clipboard!</p>


        <button onClick={() => onUploadClick()}>Upload</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        <a href={uri} target='_blank'>{uri}</a>
        <CopyToClipboard text={uri} className>
          <button>Copy to clipboard</button>
        </CopyToClipboard>
      </div>
    </div>
  );
}

export default App;
