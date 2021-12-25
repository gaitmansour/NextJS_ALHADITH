import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import styles from './SearchInput.module.css';
import Link from "next/link";
import KeyboardedInput from "react-touch-screen-keyboard";
const SearchInput = (props) => {
    // console.log(props.history)
    // const navigate = useHistory();
    const initInput = props?.value || ""
    const [input, setInput] = useState(initInput)
    const [InputShow, setInputShow] = useState(false)

    const goToSearchPage = () => {
        props.history && props.history.push({
            pathname: '/search',
            search: '',
            state: {keywords: input}
        })
        // console.log('input=================', input)
    }


    useEffect(() => {
        checkSizeWindow();
        if (typeof window !== undefined) {
            window.addEventListener("resize", checkSizeWindow);
            // Remove event listener on cleanup
            return () =>{if (typeof window !== undefined) {
                window.removeEventListener("resize", checkSizeWindow);
            }}
        }
    }, [])

    const checkSizeWindow = () => {
        if (typeof window !== undefined && window.innerWidth <= 450) {
            setInputShow(true)
        } else {
            setInputShow(false)
        }
        //var x = document.getElementById("inputdiv");


    }


    const className = props?.className ? props.className : ""
    let Myinput = useRef(null);
    const CustomMapping = [
        ["ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج"],
        ["ش", "س", "ي", "ب", "ل", "ا", "ت", "ن", "م", "ك", "ط", "د"],
        ["ذ", "ئ", "ء", "ؤ", "ر", "ل", "ى", "ة", "و", "ز", "ظ"]
    ];

    /*
                        styles.keyboardAdditionalButton,
                        styles.keyboardButton,
                        styles.keyboardSubmitButton,styles.keyboardRow,styles.keyboardNumberButton*/

    return (
        <div id={"inputdiv"}
             className={`${styles.boxSearch} box-search d-flex align-items-center justify-content-between flex-fill ${className}`}>
            {props?.clickSearch ?
                <div className="d-flex align-items-center align-self-center btn m-0 p-0"
                     onClick={props?.clickSearch}>
                    <div className={`${styles.iconSearch} icon-search p-3`} style={props.styleSerachIcon}/>
                </div> :
                <div className="d-flex align-items-center align-self-center btn m-0 p-0"
                     onClick={goToSearchPage}>
                    <div className={`${styles.iconSearch} icon-search p-3`} style={props.styleSerachIcon}/>
                </div>}

            {InputShow ?
                <input value={props.input}
                       className={`flex-fill mx-1 px-2 ${props.className}`}
                       placeholder={props.placeholder}
                       //color={'red'}
                       style={{color:'red'}}
                       color={'red'}
                       onChange={props.onChange}/> :
                <>
                    <KeyboardedInput
                        //id={"keyboardinput"}
                        value={props.input}
                        onChange={props.onChange}
                        isDraggable={true} // optional, default is `true`
                        //opacity={0.7}
                        onFocus={() => !Myinput.current.focus()}
                        onBlur={() => Myinput.current}
                        placeholder={props.placeholder}
                        //onFocus={props.onChange}
                        defaultKeyboard={CustomMapping}
                        //required
                        showShift={false}
                        showSymbols={false}
                        ref={Myinput}
                        inputClassName={`${styles.input} text-dark ${props.inputClassName}`}
                        isFirstLetterUppercase={false}
                        keyboardClassName={`${styles.testme} testme p-2`}
                        containerClassName={styles.conatiner}
                        enabled
                    />
                    <i className="far fa-keyboard mx-3 fa-1x"
                       style={props.styleIcon}
                       onClick={() => Myinput.current.focus()}/>
                </>}
            {props.onClickSettings ?
                <div className={styles.iconFilter} onClick={props.onClickSettings} style={props.styleFilter}
                     title="البحث المتخصص"/> :
                <Link className="d-flex align-items-center align-self-center btn m-0 p-0"
                      href={{
                          pathname: '/search',
                          query: {}
                      }}>
                    <div className={styles.iconFilter} style={props.styleFilter} title="البحث المتخصص"/>
                </Link>
            }
        </div>
    );
}

export default SearchInput
