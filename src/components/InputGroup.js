import React from "react";

function InputGroup({ value, currency, ratesLoaded, rates, onChangeValue, onChangeCurrency }) {
    return (
        <div className="input-group input-group-lg mt-3">
        <input
            type="number"
            min={0}
            step={.01}
            max={9999999999}
            value={value}
            onChange={onChangeValue}
            className="form-control w-50"
            aria-label="From"
            aria-describedby="inputGroup-sizing-sm"
        />
        <select
            value={currency}
            className="form-control w-50 text-end form-select"
            id="inputGroupSelect01"
            name="select From currency"
            onChange={onChangeCurrency}
        >
            {ratesLoaded &&
                Object.keys(rates).map((key) => (
                    <option key={key} value={key}>
                        {key}
                    </option>
                ))}
        </select>
    </div>
    );
}

export default InputGroup;