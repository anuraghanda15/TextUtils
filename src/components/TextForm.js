import React, {useState,useEffect} from 'react'



export default function TextForm(props) {
  
  const [text,setText]= useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  // Load available voices when the component mounts
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      setSelectedVoice(availableVoices[0] || null); // Set the default voice
    };
  
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);
  
  const handleSpeech = () => {
    if (!text.trim()) {
      alert('Please enter some text to convert to speech.');
      return;
    }
  
    if (!window.speechSynthesis || !voices.length) {
      alert('Speech synthesis is not supported or no voices are available.');
      return;
    }
  
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.rate = 1;
    utterance.pitch = 1;
  
    window.speechSynthesis.speak(utterance);
  };



  const handleUpClick = ()=>{
    //console.log("UpperCase was Clicked: " + text);
    let newText=text.toUpperCase();
    setText(newText);
  }
  
  const handleLoClick = ()=>{
    //console.log("LowerCase was Clicked: " + text);
    let newText=text.toLowerCase();
    setText(newText);
  }

  const handleClear = ()=>{
    //console.log("LowerCase was Clicked: " + text);
    //let newText=text.toLowerCase();
    setText('');
  }


  const handleOnChange = (event)=>{
    //console.log("on changes text");
    setText(event.target.value);
  }

  const handleCopy = ()=>{
    navigator.clipboard.writeText(text)
  }

  const handleRemoveExtraSpaces = ()=>{
    let newText=text.split(/\s+/)
    setText(newText.join(" "))
  }

  

  return (
    <>
    <div className='container'>
        <h1>{props.heading}</h1>
        <div className="mb-3">
            <textarea className="form-control" value={text} onChange={handleOnChange} id="mybox" rows="12"></textarea>
        </div>
        <button className="btn btn-secondary mx-2" onClick={handleRemoveExtraSpaces}>Remove Extra Spaces</button>
        <button className="btn btn-primary mx-2" onClick={handleUpClick}>Convert to Uppercase</button>
        <button className="btn btn-primary mx-2" onClick={handleLoClick}>Convert to Lowercase</button>
        <button className="btn btn-success mx-2" onClick={handleSpeech}>Text To Speech</button>
        <button className="btn btn-warning mx-2" onClick={handleCopy}>Copy Text</button>
        <button className="btn btn-danger mx-2" onClick={handleClear}>Clear</button>
    </div>
    
    <div className="container my-3">
      <h2>Your Text Summary</h2>
      <p>{text.trim() === "" ? 0 : text.trim().split(/\s+/).length} words and {text.length} characters.</p>
      <p>{0.008 * (text.trim() === "" ? 0 : text.trim().split(/\s+/).length)} Minutes Read</p>
      <h3>Preview</h3>
      <p>{text}</p>
    </div>
    </>
  )
}
