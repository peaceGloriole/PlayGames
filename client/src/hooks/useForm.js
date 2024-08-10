import { useState } from "react";

export function useForm(initialValues) {
    const [values, setValues] = useState(initialValues);

    const changeHandler = (e) => {
        setValues(oldValue => ({
            ...oldValue,
            [e.target.name]: e.target.value
        }));
    };

    return { values };
}