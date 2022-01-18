import React from 'react';

import Select from 'react-select';
import styles from './CustomSelect.module.css'

const CustomSelect = (props) => {

    const className = props?.className ? props.className : ""
    const classNameSelect = props?.classNameSelect ? props.classNameSelect : ""
    const {message, label, placeholder, name, options, onChange, value, defaultInputValue} = props

    const colourStyles = {
        menuPortal: base => ({...base, zIndex: 9999,backgroundColor:'red'}),
        menu: provided => ({ ...provided, zIndex: 9999 }),
        control: styles => ({...styles, backgroundColor: 'white'}),
        option: (provided, state) => {
            return ({
                ...provided,
                backgroundColor: state.isSelected ? "#157646" : "transparent",
                color: state.isSelected ? "#fff" : "#000",

                // backgroundColor: state.data === state.selectProps.value ? `#157646` : `transparent`,
                textAlign: 'right',
                '&:hover': {
                    color: "#fff",
                    background: "#15764685",
                },
            });
        },
        multiValue: (styles, {data}) => {
            return {
                ...styles,
                color: "#FFFFFF",
                backgroundColor: "#109d58",
            };
        },
        menuList: (styles, {data}) => ({
            ...styles,
            maxHeight: 140,
        }),
        multiValueLabel: (styles, {data}) => ({
            ...styles,
            color: data.color,
        }),
        multiValueRemove: (styles, {data}) => ({
            ...styles,
            color: data.color,
            ':hover': {
                backgroundColor: data.color,
                color: 'white',
            },
        }),
    };

    return (
        <div className={`custom-input flex-fill ${className}`}>
            <div className="d-flex flex-column flex-fill mb-3 px-2">
                {label && <label className="form-label">{label}</label>}

                <Select
                    className={`${styles.customSelect} custom-select ${classNameSelect}`}
                    placeholder={placeholder}
                    isMulti={false}
                    isClearable
                    menuPortalTarget={typeof window !== "undefined" && document.body}
                    value={defaultInputValue}
                    name={"form-field-name"}
                    options={options}
                    onChange={data => onChange ? onChange(data) : {}}
                    //menuPortalTarget={document.body}
                    styles={colourStyles}
                    // defaultInputValue={defaultInputValue}
                    noOptionsMessage={() => 'لا يوجد خيارات'}
                />

                {message && <div className="form-text">We'll never share your email with anyone else.</div>}
            </div>
        </div>
    );

}

export default CustomSelect
