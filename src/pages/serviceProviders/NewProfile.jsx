import { useState, useRef }     from "react";
import { useNavigate }          from "react-router-dom";
import { QueryClient }          from "react-query";
import { Btn, Loading }         from "components";
import { Input }                from "components/Input";
import { errorAlert }           from "functions/utils/Alert";
import { newProfile }           from "functions/creates/Users";
import { useServices }          from "functions/reads/Services";
import { InputLabel, MenuItem, FormControl, Select, InputAdornment } from '@mui/material'
import { MultiSelect }          from "react-multi-select-component";
import { getAuth }              from "firebase/auth";


export default function () {

    const [ features, setFeatures ] = useState([]);

    const [ inputs, setInputs ]     = useState({
        charge_rate: "Job",
        experience: "Expert (6+ years)",
    });

    const [ load, setLoad ]         = useState(false);

    const [ options, setOptions ] = useState([]);

    const [ services, setServices ] = useState([]);

    const [ service, setService ] = useState([]);

    const user = getAuth().currentUser;

    const [ image, setImage ] = useState(user.photoURL ? user.photoURL : `/images/pedwuma.jpg`);

    const navigate = useNavigate();

    const queryClient = new QueryClient();

    const { data, isLoading, isError } = useServices();

    
    const inputRef = useRef();

    console.log(data);

    const handleSelected = (value) => {

        if(value.length > 0) {

            console.log(value);
            setService([value[0]]);
    
            setOptions( value[0]['value']['Service Provided'].map( (item, index) => { return {label: item.Name, value: index} }));
        }
        else {
            setService(value);
            setOptions([]);
            setServices([]);
        }
    }

    const handleSubmit = () => {

        setLoad(true);

        if(!checkInputs()) {
            setLoad(false);
            return false;
        } 

        newProfile({...inputs, service_category: value[0]['value']['Category Name'], services: services.map( item => item.label )}).then( result => {

            if(result == "success") {
                errorAlert({
                    icon: 'success',
                    title: 'Plan Created Successfully'
                });
                
                queryClient.invalidateQueries();
                
                navigate('/admin/plans');
            }
            else if (result == "exists") {
                errorAlert({
                    title: 'Plan Exists',
                    text: `A plan with the name ${inputs.name} already exists, please use a different name and try again.`,
                });
            }

            else {
                errorAlert({
                    title: 'System Busy',
                    text: 'Please try again later'
                });
            }

            setLoad(false);
        });

    }

    const checkInputs = () => {
        const values = Object.values(inputs);

        console.log(values);

        //prompt for empty inputs
        const empty_inputs = 
            () => errorAlert({
                title: 'Empty Inputs',
                text: 'Please check all inputs and try again'
            });


        if(values.length < 3 || inputs.charge_rate.replaceAll(" ", "") == "" || inputs.amount.replaceAll(" ", "") == "") {
            empty_inputs();
            return false;
        }
        

        if (services.length <= 0) {
            errorAlert({
                title: 'No Service Selected',
                text: 'Please select a service and try again'
            });

            return false;
        }


        return true;
    }

    const handleImage = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <div>
            <Loading load={load} />
            
            <Btn.SmallBtn onClick={() => navigate(-1)} >Back</Btn.SmallBtn>

            <div className="mx-auto max-w-[500px]">
                <div className="flex items-center justify-between">

                    <h1 className="orb text-xl mb-3">New Profile</h1>


                </div>
                <div className="w-full bg-white rounded shadow-lg p-5">

                    <div className="mx-auto h-[200px] w-[200px] rounded-full shadow p-1 relative">
                        <img src={image} className="object-cover h-full w-full rounded-full shadow" />
                        <div onClick={() => inputRef.current.click()} className="absolute top-0 left-0 bg-black bg-opacity-50 h-full w-full rounded-full flex items-center justify-center text-center text-white">
                            Click to Upload Profile Image
                            <input onChange={handleImage} ref={inputRef} type="file" name="image" accept="image/*" className="h-0 w-0 p-0 m-0 overflow-hidden opacity-0" />
                        </div>
                    </div>

                    <div className="mb-3 bg-white relative z-20">
                        <label className="text-xs">Choose a service category</label>
                        <MultiSelect
                            options={typeof(data) == "undefined" ? [] : data.map(item => { return {label: item["Category Name"], value: item} })}
                            value={service}
                            onChange={handleSelected}
                            isLoading={isLoading || isError || typeof(data) == "undefined" || (typeof(data) != "undefined" && data.length <= 0)}
                            labelledBy="Select"
                        />

                    </div>

                    <div className="mb-6 bg-white relative z-10">
                        <label className="text-xs">What services can you render?</label>
                        <MultiSelect
                            options={options}
                            value={services}
                            onChange={setServices}
                            labelledBy="Select"
                        />

                    </div>

                    <FormControl fullWidth sx={{marginBottom: "1.5rem"}}>
                        <InputLabel id="demo-simple-select-label">How do you charge?</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={typeof(inputs.charge_rate) == "undefined" ? "Job" : inputs.charge_rate}
                            onChange={(e) => setInputs({...inputs, charge_rate: e.target.value})}
                            label="How do you charge?"
                            startAdornment={<InputAdornment position="start">I Charge</InputAdornment>}
                            size="small"
                            // onChange={handleChange}
                        >
                            <MenuItem value={"Job"}>Per Job</MenuItem>
                            <MenuItem value={"Day"}>Per Day</MenuItem>
                            <MenuItem value={"Hour"}>Per Hour</MenuItem>
                            <MenuItem value={"6 Hours"}>Every 6 hours</MenuItem>
                            <MenuItem value={"12 Hours"}>Every 12 hours</MenuItem>
                        </Select>
                    </FormControl>

                    <Input 
                        name="amount"
                        placeholder="e.g 300"
                        label="How much do you charge"
                        type="number"
                        size="small"
                        onChange={(e) => setInputs({...inputs, amount: e.target.value})}
                        startAdornment={<InputAdornment position="start">Ghc</InputAdornment>}

                    />

                    <FormControl fullWidth sx={{marginBottom: "1.5rem"}}>
                        <InputLabel id="demo-simple-select-label">Level of Experience</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={typeof(inputs.experience) == "undefined" ? "Expert (6+ years)" : inputs.experience}
                            onChange={(e) => setInputs({...inputs, experience: e.target.value})}

                            label="Level of Experience"
                            startAdornment={<InputAdornment position="start"></InputAdornment>}
                            size="small"
                            // onChange={handleChange}
                        >
                            <MenuItem value={"Expert (6+ years)"}>Expert (6+ years)</MenuItem>
                            <MenuItem value={"Professional (3+ years)"}>Professional (3+ years)</MenuItem>
                            <MenuItem value={"Beginner(6 months - 1+ year)"}>Beginner(6 months - 1+ year)</MenuItem>
                        </Select>
                    </FormControl>

                    <Input 
                        name="experience"
                        placeholder=""
                        label="images / files of works you have done"
                        type="file"
                        size="small"
                        onChange={(e) => setInputs({...inputs, experiences: e.target.files})}
                    />


                    
                    <Input 
                        name="certifications"
                        placeholder=""
                        label="images / files of certificates you have"
                        type="file"
                        size="small"
                        onChange={(e) => setInputs({...inputs, certifications: e.target.files})}
                    />

                    <Input 
                        name="references"
                        placeholder=""
                        label="images / files of references you have"
                        type="file"
                        size="small"
                        onChange={(e) => setInputs({...inputs, references: e.target.files})}
                    />


                    <Btn.SmallBtn onClick={handleSubmit} fullWidth>Create Profile</Btn.SmallBtn>
                </div>
            </div>
        </div>
    );
}