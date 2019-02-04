import React, { Fragment } from "react";

const Error = ({ text }) => {
    return (
        <Fragment>
            {text && <span>{text}</span>}
        </Fragment>
    )
}

export default Error;