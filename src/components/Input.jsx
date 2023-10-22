import { useState } from "react";
import { FormControl, OutlinedInput, InputLabel, InputAdornment, IconButton } from "@mui/material";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export function AutoSelect( { ...params}) {
  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: 300 }}
      options={[{name: 'country1'}]}
      autoHighlight
      getOptionLabel={(option) => option.label}

      {...params}
    />
  );
}



export const Input = ({ containerStyle={marginBottom: "1.5rem", width: "100%"}, ...props }) => {
    return (
        <FormControl sx={containerStyle}>
            <InputLabel htmlFor="outlined-adornment-amount" size="small">{props?.label}</InputLabel>
            <OutlinedInput 
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start"><i className={`bi bi-input`}></i></InputAdornment>}

                {...props}

            />
            <div className="text-xs text-red-500">{props?.helperText}</div>
        </FormControl>
    );
}

export const Password = ({ item = {}, inputOnChange=() => {}, userInputs={}, containerStyle={marginBottom: "1.5rem", width: "100%"} }) => {

    const [ show, setShow ] = useState(false);

    return (
        <FormControl sx={containerStyle}>
            <InputLabel htmlFor="outlined-adornment-amount">{item.label}</InputLabel>
            <OutlinedInput

                error={item.error}

                id="outlined-adornment-amount"

                startAdornment={<InputAdornment position="start"><i className={`bi bi-${item.icon}`}></i></InputAdornment>}

                type={ show ? "text" : "password"}

                endAdornment={
                    <InputAdornment position="start">
                        <IconButton onClick={() => setShow(!show)}>
                            <i className={`bi bi-${!show ? 'eye-slash' : 'eye'}`}></i>
                        </IconButton>
                    </InputAdornment>
                }

                label={item.label}

                name={item.name}

                placeholder={item.placeholder}

                onChange={(e) => inputOnChange(e, item)}

                value={userInputs[item.name]}

                fullWidth

                size="small"

            />
            <div className="text-xs text-red-500">{item?.helperText}</div>
        </FormControl>
    );
}


export const Password2 = ({ containerStyle={marginBottom: "1.5rem", width: "100%"}, icon="shield-check", ...props }) => {

    const [ show, setShow ] = useState(false);

    return (
        <FormControl sx={containerStyle}>
            <InputLabel htmlFor="outlined-adornment-amount">{props.label}</InputLabel>
            <OutlinedInput

                id="outlined-adornment-amount"

                startAdornment={<InputAdornment position="start"><i className={`bi bi-${icon}`}></i></InputAdornment>}

                type={ show ? "text" : "password"}

                endAdornment={
                    <InputAdornment position="start">
                        <IconButton onClick={() => setShow(!show)}>
                            <i className={`bi bi-${!show ? 'eye-slash' : 'eye'}`}></i>
                        </IconButton>
                    </InputAdornment>
                }

                placeholder={"p@55W0rD"}

                fullWidth

                {...props}
            />
            <div className="text-xs w-full">{props?.helperText}</div>
        </FormControl>
    );
}