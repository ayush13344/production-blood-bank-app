import React from "react";

const InputType = ({labelFor,labelText,inputType,value,onChange,name}) => {
    return (
        <>
            <div className="mb-3">
                <label htmlFor={labelFor} className="form-label">{labelText}</label>
                <input  className="form-control" id="exampleInputEmail1" type={inputType}
                name={name} value={value} onChange={onChange} />
            </div>
        </>
    );
};
export default InputType;