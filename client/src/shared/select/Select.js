import React, {useEffect, useMemo, useState} from "react";
import {components} from "react-select";
import Logger from "../../internal/Logger";

export default function Select({upsertFields=f=>f, options}) {

    const logger = useMemo(()=>new Logger('Select'), [])
    const DropdownIndicator = (props) => {
        return (
            components.DropdownIndicator && (
                <components.DropdownIndicator {...props}>
                    <SearchIcon />
                </components.DropdownIndicator>
            )
        )
    }

    const SearchIcon = () => (
        <svg
            width="22"
            height="22"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="38" cy="40" r="20.5" stroke="currentColor" strokeWidth="7" />
            <path
                d="M76.0872 84.4699C78.056 86.4061 81.2217 86.3797 83.158 84.4109C85.0943 82.442 85.0679 79.2763 83.099 77.34L76.0872 84.4699ZM50.4199 59.2273L76.0872 84.4699L83.099 77.34L57.4317 52.0974L50.4199 59.2273Z"
                fill="currentColor"
            />
        </svg>
    )

    const [inputText, setInputText] = useState('')

    const handleInputChange = (inputText, meta) => {
        if (meta.action !== 'input-blur' && meta.action !== 'menu-close') {
            setInputText(inputText)
        }
    }

    const [cityOptions, setCityOptions] = useState([]);
    useEffect(()=>{
        const c = options.map(obj => ({label: obj.name, value: obj.name,}));
        logger.log({options, cityOptions: c});
        setCityOptions(c);
    },[options])

    const [selectOption, setSelectOption] = useState(null)

    const handleOnSelect = (e) => {
        setSelectOption(e.value)
    }

    useEffect(()=>{
        upsertFields({city: selectOption});
        console.log(selectOption)
    }, [selectOption])


    return(<>
        <Select
            placeholder={'Введите город'}
            options={cityOptions}
            styles={{
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    border: '1px solid rgba(30, 38, 47, 0.06)',
                    boxShadow: '2px 4px 4px rgba(30, 38, 47, 0.02)',
                    borderRadius: 16,
                    padding: '8px 8px',
                    fontSize: '14px',
                    color: '#a3a1a1',
                    marginBottom: '10px',
                }),
                clearIndicator: (base) => ({
                    ...base,
                    position: 'absolute',
                    right: 0,
                }),
            }}
            name={'city'}
            components={{
                // …
                DropdownIndicator,
                IndicatorSeparator: () => null,
            }}
            value={cityOptions.find(obj => obj.value === selectOption)}
            inputValue={inputText}
            onInputChange={handleInputChange}
            onChange={handleOnSelect}
            required
        />
    </>)
}