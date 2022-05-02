import React from 'react';
import CurrencyExchange from '../../components/CurrencyExchange/CurrencyExchange';
import {CurrencyState, CurrencyType} from '../../redux/currencyReducer';
import {connect, ConnectedProps, useDispatch, useSelector} from 'react-redux';
import {changeCurrency, setAction, setCurrencyAmount} from "../../redux/actions";
import {Dispatch} from 'redux'
import {IGlobalState} from "../../redux/state";
const CurrencyEContainer: React.FC= () => {

    let dispatch = useDispatch<Dispatch>()
    let selectCurrency = useSelector<IGlobalState, CurrencyState>(state => state.currency)
    let currencyRate: number = 0;
    const currenciesName = selectCurrency.currencies.map((currency: CurrencyType) => {
        if (currency.currencyName === selectCurrency.currentCurrency) {
            currencyRate = selectCurrency.isBuying ? currency.buyRate : currency.sellRate;
        }
        return currency.currencyName;
    });

    const changeCurrencyField = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value;
        if (!isFinite(+value)) return;
        if (e.currentTarget.dataset.currency) {
            const trigger: string = e.currentTarget.dataset.currency;
            if (trigger === 'byn') {
                if (value === '') {
                    dispatch(setCurrencyAmount(value, value));
                } else {
                    dispatch(setCurrencyAmount(value, (+Number(value).toFixed(2) / currencyRate).toFixed(2)));
                }
            } else {
                if (value === '') {
                    dispatch(setCurrencyAmount(value, value));
                } else {
                    dispatch(setCurrencyAmount((+Number(value).toFixed(2) * currencyRate).toFixed(2), value));
                }
            }
        }
    };
    const changeAction = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.currentTarget.dataset.action === 'buy' ? dispatch(setAction(true)) : dispatch(setAction(false));
    };

    const changeCurrentCurrency = (e: React.MouseEvent<HTMLLIElement>) => {
        e.currentTarget.dataset.currency && dispatch(changeCurrency(e.currentTarget.dataset.currency));
    };

    return (
        <React.Fragment>
            <CurrencyExchange
                currenciesName={currenciesName}
                currentCurrency={selectCurrency.currentCurrency}
                currencyRate={currencyRate}
                isBuying={selectCurrency.isBuying}
                amountOfBYN={selectCurrency.amountOfBYN}
                amountOfCurrency={selectCurrency.amountOfCurrency}
                changeCurrencyField={changeCurrencyField}
                changeAction={changeAction}
                changeCurrentCurrency={changeCurrentCurrency}
            />
        </React.Fragment>
    );
};

export default CurrencyEContainer;

