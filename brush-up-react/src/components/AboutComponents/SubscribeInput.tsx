import { useEffect, useRef } from "react";

interface SubcribeInputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const SubscribeInput: React.FC<SubcribeInputProps> = () =>{
  const inputRef = useRef(null)

  useEffect(()=> {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  },[])

  const handleClick = () => {
    // if (inputRef.current){
    //   inputRef.current.focus()
    // }
    console.log("Subscribe button clicked");
    
  };

  return (
    <div>
        <input 
          ref={inputRef} 
          type="text" 
          placeholder='Enter your email'
          // value={inputRef.current?.value}
          className='border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
        <button onClick={handleClick} className='bg-blue-500 text-white px-4 py-2 rounded-lg ml-2'>Subscribe</button>
    </div>
  )
}

export default SubscribeInput
