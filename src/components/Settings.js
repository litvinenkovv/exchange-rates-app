import React, { useEffect } from "react";
import { ApiKeyContext } from "../App";
import Error from './Error';

function Settings() {

    const [formVisible, setFormVisible] = React.useState(false);
    const { accessKey, setAccessKey } = React.useContext(ApiKeyContext);

    const changeFormVisiblity = () => {
        setFormVisible(!formVisible);
        
        setTimeout(() => {
            window.scrollTo({
                top: 100,
                left: 0,
                behavior: 'smooth'
              });
        }, 200);
    }
    
    const onChangeApiKey = (event) => {
        setAccessKey(event.target.value);
        localStorage.setItem("accessKey", event.target.value);
    };

    useEffect(() => {
        const key = localStorage.getItem("accessKey");
        if (key) {
            setAccessKey(key)
        };
    }, []);

    return (
        <>
            <div className="settings mx-auto col-10 col-md-8 col-lg-6" onClick={changeFormVisiblity}>
                <span>Settings</span>
            </div>
            {formVisible && (
                <div className="settings-form">
                    <div className="mx-auto col-10 col-md-8 col-lg-6 mb-3 row">
                        <div className="input-group mb-3">
                            <label htmlFor="inputKey" className="col-sm-2 col-form-label">
                                API Key
                            </label>
                            <input
                                type="text"
                                value={accessKey}
                                id="inputKey"
                                className={accessKey === "" ? "form-control is-invalid" : "form-control"}
                                placeholder="API key"
                                aria-label="API key"
                                aria-describedby="button-addon2"
                                onChange={onChangeApiKey}
                                required
                            />
                        </div>
                            {(accessKey === "") && 
                            <div >
                                 <Error textError={"Please fill in the access key"} text={"Get you api key on fixer.io site."}/>
                            </div>}
                    </div>
                </div>
            )}
        </>
    );
}

export default Settings;
