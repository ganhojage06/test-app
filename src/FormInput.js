import { FormLabel, Input, Text } from "@chakra-ui/react"
import { useState } from "react"

export let FormInput = ({ placeholder, label, name, value, onChangeTxt, maxLength, error }) => {

    // console.log("ssssssssssssssssssssssss", name, value);

    let [focus, setFocus] = useState(false)

    return <div style={{ position: 'relative' }}>
        {focus || value ?
            <FormLabel className={"formLabelOnFocus"} color={'#FE5454'}>
                {label}
            </FormLabel> : null}
        <Input className={(focus || value) ? 'formInputFocus' : 'formInput'}
            id={name}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            maxLength={maxLength}
            placeholder={!(focus || value) ? label : placeholder}
            value={value}
            onChange={e => onChangeTxt(name, e.target.value)}
            _placeholder={{ color: 'rgba(0, 0, 0, 0.6)', fontWeight: 'normal', fontSize: 16 }}
        />
        {error ? <Text color="#FE5454" ml={4} fontSize={12} pt={'0.3rem'} fontWeight={'normal'}>{error}</Text> : null}
    </div>
}