import React from 'react';
import { Select } from 'antd';
import currencyCodes from 'currency-codes';

const { Option } = Select;

const CurrencySelect = ({name, data, onChange, placeholder,disabled}) => {
    // Get all currency codes and their details
    const currencies = currencyCodes.codes().map(code => ({
        code,
        currency: currencyCodes.code(code).currency
    }));

    // Sort the currencies array alphabetically by currency name
    currencies.sort((a, b) => a.currency.localeCompare(b.currency));

    // Map the sorted array to Option elements
    const currencyOptions = currencies.map(({ code, currency }) => (
        <Option key={code} value={code}>
            {`${currency} (${code})`}
        </Option>
    ));

    return (
        <Select 
            name={name}
            value={data}
            onChange={onChange} 
            placeholder={placeholder}
            disabled={disabled}>
            {currencyOptions}
        </Select>
    );
};

export default CurrencySelect;
