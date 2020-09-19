import { useState, useEffect } from "react";
const useForm = (initialState, validate, submit) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [submitForm, setSubmitForm] = useState(false);
    useEffect(() => {
        if (submitForm) {
            const noErrors = Object.keys(errors).length === 0;
            if (noErrors) {
                submit();
            }
            setSubmitForm(false);
        }
    }, [errors, submit, submitForm]);
    const handleOnChange = (ev) => {
        setValues({
            ...values,
            [ev.target.name]: ev.target.value,
        });
    };
    const handleOnSubmit = (ev) => {
        ev.preventDefault();
        const errorValidate = validate(values);
        setErrors(errorValidate);
        setSubmitForm(true);
    };

    const cleanForm = ()=>{
        setValues(initialState)
    }

    return {
        values,
        errors,
        handleOnChange,
        handleOnSubmit,
        cleanForm
    };
};

export default useForm;