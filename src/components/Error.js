import React from "react";

function Error({textError, text=""}) {
    return <div className="error-text">
        {textError}
        {((text.length > 0) && <div className="error-small-text">
            {text}
        </div>)}
    </div>;
}

export default Error;
