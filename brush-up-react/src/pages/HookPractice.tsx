import { useState, useEffect, useRef } from "react";

const HookPracticePage = () => {
    const inputRef = useRef();
    const [count, setCount] = useState(0);

    const countHandler = () => {
        setCount( count + 1)
    }

    const countNegative = () => {
        if(count > 0 ){
            setCount( count - 1)
        }
    }

    const focusInput = () => {
        inputRef.current.focus()
    }

    return (
        <>
        <h1>This is hook practice page</h1>
        <div>
            <input ref={inputRef} />
            <button onClick={focusInput}>
                Focus Input
            </button>
        </div>
        <div className="m-auto flex flex-col gap-6 justify-center  items-center h-screen">
            <p>Count clickeck: {count}</p>
            <div className="flex gap-5">
                <button onClick={countNegative} className=" bg-red-500 py-2 px-6 rounded text-white shadow transition-all hover:scale-105 ">-</button>
                <button onClick={countHandler} className=" bg-green-900 py-2 px-6 rounded text-white shadow transition-all hover:scale-105 ">+</button>
            </div>
        </div>
        </>
    );
}
 
export default HookPracticePage;