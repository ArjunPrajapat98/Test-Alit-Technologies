import React from 'react'

export default function CommonButton(props) {
    let { onClick, name, isDisabled = false } = props
    return (
        <>
            <button className="commonBtn" onClick={onClick} disabled={isDisabled}>
                {name}
            </button>
        </>
    )
}