import React, {useEffect, useMemo, useState} from "react";
import {useAppContext} from "../../../context/AppContext";
import GroupInline from "../../../shared/ui/group_inline/GroupInline";
import Typography from "../../../shared/ui/typography/Typography";
import Select, {components} from "react-select";
import Logger from "../../../internal/Logger";

import styles from './eventLocationsSelect.module.css';
import SelectIcon from '../../../assets/icons/location_on_FILL0_wght400_GRAD0_opsz48.svg'
export default function EventLocationSelect({upsertFields=f=>f}) {

    const logger = useMemo(()=>new Logger('EventLocationSelect'), [])
    // const { dataHandler } = useAppContext();
    // const { cities } = dataHandler;

    const cities = [
        {name: "Онлайн"},
        {name: "Астана"},
        {name: "Алматы"},
        {name: "Караганда"},
    ];

    const [inputText, setInputText] = useState('')

    const handleInputChange = (inputText, meta) => {
        if (meta.action !== 'input-blur' && meta.action !== 'menu-close') {
            setInputText(inputText)
        }
    }

    const [cityOptions, setCityOptions] = useState([]);

    useEffect(()=>{
        const c = cities.map(obj => ({label: obj.name, value: obj.name,}));
        logger.log({cities, cityOptions: c});
        setCityOptions(c);
    },[])

    const [selectOption, setSelectOption] = useState(null)

    const handleOnSelect = (e) => {
        setSelectOption(e.value)
    }

    useEffect(()=>{
        upsertFields({city: selectOption});
        console.log(selectOption)
    }, [selectOption])


    const DropdownIndicator = (props) => {
        return (
            components.DropdownIndicator && (
                <components.DropdownIndicator {...props}>
                    <SelectIcon />
                </components.DropdownIndicator>
            )
        )
    }


    return(<>
        <div className={styles.EventLocationSelect}>
            <Typography size={18} weight={600}>Мероприятия в </Typography>
            <Select
                placeholder={'Выберите город'}
                isSearchable={false}
                options={cityOptions}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        border: '1px solid rgba(30, 38, 47, 0.06)',
                        boxShadow: '2px 4px 4px rgba(30, 38, 47, 0.02)',
                        borderRadius: 10,
                        marginLeft: 10,
                        fontSize: '20px',
                        padding: 4,
                        color: '#3e6ad7',
                        flexDirection: 'row-reverse',
                    }),
                    clearIndicator: (base) => ({
                        ...base,
                        position: 'absolute',
                        right: 0,
                    }),
                    dropdownIndicator: (base) => ({
                        ...base,
                        padding: 0,
                    })
                }}
                name={'city'}
                components={{
                    // …
                    DropdownIndicator,
                    IndicatorSeparator: () => null,
                }}
                value={cityOptions.find(obj => obj.value === selectOption)}
                onChange={handleOnSelect}
                required
            />
        </div>
    </>)
}