import { FormLabel, Select, Text } from "@chakra-ui/react"
import { useState } from "react"

export let FormSelect = ({ placeholder, label, name, value, onChangeTxt, options, error }) => {

    // console.log("ssssssssssssssssssssssss", name, value);

    let [focus, setFocus] = useState(false)

    return (
        <div style={{ position: 'relative' }}>
            {focus || value ?
                <FormLabel className={"formLabelOnFocus"} color={'#FE5454'}>
                    {label}
                </FormLabel>
                : null
            }
            <Select
                // mb={'3rem'}
                className={(focus || value) ? 'formInputFocus' : 'formInput'}
                id={name}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                value={value}
                onChange={e => onChangeTxt(name, e.target.value)}
                placeholder={!(focus || value) ? label : placeholder}
                _placeholder={{ color: 'rgba(0, 0, 0, 0.6)', fontWeight: 'normal', fontSize: 16 }}
                sx={{
                    paddingTop: (focus || value) ? '1rem' : '0rem', marginBottom: (focus || value) ? '15px' : '0px', paddingBottom: '0', height: '3rem',
                    color: 'rgba(0, 0, 0, 0.6)', fontWeight: 'normal', fontSize: 16
                }}
            >
                <option key={"-1"} value={""}>
                    Select
                </option>
                {options && options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </Select>
            {error ? <Text color="#FE5454" ml={4} fontSize={12} fontWeight={'normal'}>{error}</Text> : null}
        </div>
    );
}