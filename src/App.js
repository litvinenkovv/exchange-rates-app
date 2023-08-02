import React, { useEffect, useRef, useState, useMemo, createContext } from "react";
import "./App.scss";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Settings from "./components/Settings";
import InputGroup from "./components/InputGroup";
import { loadRates } from "./services/api-methods";

export const ApiKeyContext = createContext({
    accessKey: "",
    setApiKey: () => {},
});

function App() {
    const [accessKey, setAccessKey] = useState("");

    const valueApiContext = useMemo(() => ({ accessKey, setAccessKey }), [accessKey]);

    const [ratesLoaded, setRatesLoaded] = useState(false);
    const [loadingHasErrors, setLoadingHasErrors] = useState(false);

    const [rates, setRates] = useState({});

    const currencyFromRef = useRef();
    const currencyToRef = useRef();

    const [priceFrom, setPriceFrom] = useState(0);
    const [priceTo, setPriceTo] = useState(0);

    const [ratesDate, setRatesDate] = useState("");

    const onChangePriceFrom = (event) => {
        if (!event.target.value) {
            event.target.value = 0;
            return ;
        }
        const value = event.target.value;
        event.target.value = value;
        changePriceFrom(value);
    };

    const onChangePriceTo = (event) => {
        if (!event.target.value) {
            event.target.value = 0;
            return ;
        }
        const value = event.target.value;
        event.target.value = value;
        changePriceTo(event.target.value);
    };

    const changePriceFrom = function (value) {
        const price = value / rates[currencyFromRef.current];
        const result = price * rates[currencyToRef.current];
        setPriceTo(parseFloat(result).toFixed(2));
        setPriceFrom(parseFloat(value));
    };

    const changePriceTo = function (value) {
        const result = (rates[currencyFromRef.current] / rates[currencyToRef.current]) * value;
        setPriceFrom(parseFloat(result).toFixed(2));
        setPriceTo(parseFloat(value));
    };

    const onChangeCurrencyFrom = (event) => {
        if (!ratesLoaded) return;
        currencyFromRef.current = event.target.value;
        changePriceTo(priceTo);
    };

    const onChangeCurrencyTo = (event) => {
        if (!ratesLoaded) return;
        currencyToRef.current = event.target.value;
        changePriceFrom(priceFrom);
    };

    useEffect(() => {
        currencyFromRef.current = "EUR";
        currencyToRef.current = "UAH";
    }, []);

    useEffect(() => {
        if (!accessKey) {
            setRatesLoaded(true);
            setLoadingHasErrors(true);
            return;
        };

        const params =   { params: { access_key: accessKey } } ;

        loadRates(params, setRates, setRatesLoaded, setLoadingHasErrors, setRatesDate);

    }, [accessKey]);

    return (
        <div className="App container">
            <main>
                <div>
                    <div className="row align-items-center main-form">
                        <div className="mx-auto col-10 col-md-8 col-lg-6">
                            {/* Form*/}
                            <form className="form-example" action="" method="post">
                                {ratesLoaded && !loadingHasErrors ? (
                                    <>
                                        <div className="currency-text-from">
                                            {priceFrom} {currencyFromRef.current} equals
                                        </div>

                                        <div className="currency-text-to">
                                            <span>
                                                {priceTo} {currencyToRef.current}
                                            </span>
                                        </div>
                                        <div className="currency-text-date">
                                            {" "}
                                            {new Date(ratesDate * 1000).toLocaleDateString("en-GB", {
                                                day: "numeric",
                                                month: "short",
                                                hour: "numeric",
                                                minute: "2-digit",
                                                hourCycle: "h12",
                                            }) + " UTC"}{" "}
                                            · Disclaimer{" "}
                                        </div>
                                        <InputGroup
                                            value={priceFrom}
                                            currency={currencyFromRef.current}
                                            ratesLoaded={ratesLoaded}
                                            rates={rates}
                                            onChangeValue={onChangePriceFrom}
                                            onChangeCurrency={onChangeCurrencyFrom}
                                        />
                                        <InputGroup
                                            value={priceTo}
                                            currency={currencyToRef.current}
                                            ratesLoaded={ratesLoaded}
                                            rates={rates}
                                            onChangeValue={onChangePriceTo}
                                            onChangeCurrency={onChangeCurrencyTo}
                                        />
                                    </>
                                ) : (
                                    <>
                                        {!ratesLoaded && <Loader />}
                                        {loadingHasErrors ? <Error textError={"ERROR - rates not loaded. Try to reload the page, please."} text={"Or enter the correct api key"} /> : <></>}
                                    </>
                                )}
                            </form>
                            {/* Form end */}
                        </div>
                    </div>
                </div>

                <ApiKeyContext.Provider value={valueApiContext}>
                    {useMemo(
                        () => (
                            <>
                                <footer>
                                    <Settings />
                                </footer>
                            </>
                        ),
                        []
                    )}
                </ApiKeyContext.Provider>
            </main>
        </div>
    );
}

export default App;
