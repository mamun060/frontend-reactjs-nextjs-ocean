import React, { memo } from "react";

interface ChildComponentProps {
    name: string;
}

const ChildComponent = memo(({ name }: ChildComponentProps) => {
    return (
        <div className=" w-full mx-auto">
            <p className=" text-2xl text-orange-700 font-extrabold">{name}</p>
        </div>
    );
})
 
export default ChildComponent;