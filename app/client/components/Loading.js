import React from "react";

const Loading = ({ show, text }) => {
    return show &&
        <div>
            <object data="/assets/img/loading.spinner.svg" />
            <span style={{ fontSize: 20 }}>{text || "LOADING.."}</span>
        </div>
}

export default Loading;