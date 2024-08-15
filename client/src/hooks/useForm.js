import { useEffect, useState } from "react";

export function useForm(initialValues, submitCallBack) {
    const [values, setValues] = useState(initialValues);

    useEffect(() => {
        setValues(initialValues);
    }, [initialValues]);

    const changeHandler = (e) => {
        setValues(oldValue => ({
            ...oldValue,
            [e.target.name]: e.target.value
        }));
    };

    const submitHandler = (e) => {
        e.preventDefault();

        submitCallBack(values);

        setValues(initialValues);
    };

    return {
        values,
        changeHandler,
        submitHandler,
    };
}