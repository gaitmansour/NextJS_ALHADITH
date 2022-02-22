import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import styles from './SearchInput.module.css'
import Link from 'next/link'
//import KeyboardedInput from "react-touch-screen-keyboard";
import {useRouter} from 'next/router'
import KeyboardedInput from 'react-touch-screen-keyboard/lib/KeyboardedInput'
import keyboardedInput from "react-touch-screen-keyboard/lib/KeyboardedInput";

const SearchInput = (props) => {
    // console.log(props.history)
    // const navigate = useHistory();

    const className = props?.className ? props.className : ''
    let Myinput = useRef()
    const initInput = props?.value || ''
    const [input, setInput] = useState(initInput)
    const [InputShow, setInputShow] = useState(false)
    const [Click, setClick] = useState(false)
    let route = useRouter()
    const goToSearchPage = () => {
        route.push({
            pathname: '/search',
            search: '',
            query: {keywords: input},
        })
        /*props.history && props.history.push({
                pathname: '/search',
                search: '',
                state: {keywords: input}
            })*/
        // console.log('input=================', input)
    }

    useEffect(() => {
        checkSizeWindow()
        if (typeof window !== undefined) {
            window.addEventListener('resize', checkSizeWindow)
            // Remove event listener on cleanup
            return () => {
                if (typeof window !== undefined) {
                    window.removeEventListener('resize', checkSizeWindow)
                }
            }
        }
    }, [])
    useEffect(() => {
        if (Click) {
            Myinput.current.focus()

        }
    })
    const checkSizeWindow = () => {
        if (typeof window !== undefined && window.innerWidth <= 850) {
            setInputShow(true)
        } else {
            setInputShow(false)
        }
        //var x = document.getElementById("inputdiv");
    }

    const CustomMapping = [
        ['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض'],
        ['ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي'],
        ['؟', '!', '-', '،', '.', 'ء', 'ؤ', 'ى', 'ة', 'أ', 'إ', 'ٱ', 'آ', 'ئ'],
    ]

    /*
                          styles.keyboardAdditionalButton,
                          styles.keyboardButton,
                          styles.keyboardSubmitButton,styles.keyboardRow,styles.keyboardNumberButton*/

    return (
        <div
            id={'inputdiv'}
            className={`${styles.boxSearch} box-search d-flex align-items-center justify-content-between flex-fill ${className}`}
        >
            {props?.clickSearch ? (
                <div
                    className='d-flex align-items-center align-self-center btn m-0 p-0'
                    onClick={props?.clickSearch}
                >
                    <div
                        className={`${styles.iconSearch} icon-search p-3`}
                        style={props.styleSerachIcon}
                    />
                </div>
            ) : (
                <div
                    className='d-flex align-items-center align-self-center btn m-0 p-0'
                    onClick={goToSearchPage}
                >
                    <div
                        className={`${styles.iconSearch} icon-search p-3`}
                        style={props.styleSerachIcon}
                    />
                </div>
            )}

            {InputShow ? (
                <input
                    value={props.input}
                    className={`flex-fill mx-1 px-2 ${props.className} ${styles.inputSearch}`}
                    placeholder={'البحث في منصة الحديث النبوي الشريف'}
                    //color={'red'}
                    style={{color: 'red'}}
                    color={'red'}
                    onChange={props.onChange}
                />
            ) : (Click ? <>
                        <KeyboardedInput
                            //id={"keyboardinput"}
                            value={props.input}
                            onChange={props.onChange}
                            isDraggable={true} // optional, default is `true`
                            //opacity={0.7}
                            onFocus={() => !Myinput.current.focus()}
                            onBlur={() => setClick(false)}
                            placeholder={'البحث في منصة الحديث النبوي الشريف'}
                            //onFocus={props.onChange}
                            defaultKeyboard={CustomMapping}
                            required
                            showShift={false}
                            showSymbols={false}
                            ref={Myinput}
                            inputClassName={`${styles.input} inputClass h5 input text-dark ${props.inputClassName}`}
                            isFirstLetterUppercase={false}
                            keyboardClassName={`testme  p-2`}
                            containerClassName={`conatiner ${props.conatinerClassName} `}
                            enabled
                        />
                        <i
                            className='far fa-keyboard mx-3 fa-1x'
                            style={props.styleIcon}
                            onClick={() => {
                                setClick(!Click)
                                Myinput.current.focus()
                            }}
                        />
                    </> :
                    <>
                        <input
                            value={props.input}
                            className={`flex-fill mx-1 px-2 ${props.className} ${styles.inputSearch}`}
                            placeholder={'البحث في منصة الحديث النبوي الشريف'}
                            //color={'red'}
                            style={{color: 'red'}}
                            color={'red'}
                            onChange={props.onChange}
                        />
                        <i
                            className='far fa-keyboard mx-3 fa-1x'
                            style={props.styleIcon}
                            onClick={() => {
                                setClick(true)
                            }}
                        />
                    </>
            )}
            {props.onClickSettings ? (
                <div
                    className={styles.iconFilter}
                    onClick={props.onClickSettings}
                    style={props.styleFilter}
                    title='البحث المتخصص'
                />
            ) : (
                <Link
                    className='d-flex align-items-center align-self-center btn m-0 p-0'
                    href={{
                        pathname: '/search',
                        query: {},
                    }}
                    passHref={true}
                    as={'/search'}
                >
                    <div
                        className={styles.iconFilter}
                        style={props.styleFilter}
                        title='البحث المتخصص'
                    />
                </Link>
            )}
        </div>
    )
}

export default SearchInput
