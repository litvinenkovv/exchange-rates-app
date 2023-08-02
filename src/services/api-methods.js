import apiService from './api-service';

export function loadRates(params, setRates, setRatesLoaded, setLoadingHasErrors, setRatesDate) {
    apiService
    .get("/latest", params )
    .then((res) => {
        if (res.data.rates === undefined) {
            setRates({});
            setRatesLoaded(true);
            setLoadingHasErrors(true);
        } else {
            setRates(res.data.rates);
            setRatesDate(res.data.timestamp);
            setRatesLoaded(true);
            setLoadingHasErrors(false);
        }
    })
    .catch((err) => {
        console.warn("[ERROR] fetching rates:", err);
        setRatesLoaded(false);
        setLoadingHasErrors(true);
    });
}