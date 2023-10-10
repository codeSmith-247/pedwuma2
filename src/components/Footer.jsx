

import { FormControl, InputLabel, OutlinedInput, InputAdornment } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Btn } from "./";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


export default function () {
    return (
        <footer className="bg-black text-white mt-10">
            <ThemeProvider theme={darkTheme}>
                <div className="big p-10 max-[1165px]:p-5 max-[800px]:flex-col flex items-center justify-between gap-2">
                    <div className="flex flex-grow items-center justify-between gap-5 max-[1165px]:flex-col max-[1165px]:items-start">
                        <div className=" text-center w-max max-[800px]:w-full ">
                            <div className="font-bold text-4xl orb my-5 flex items-center gap-2 justify-center">
                                <img src="/images/logo.png" className="object-cover h-[60px] w-[60px]" />
                                <span className="orb">PEDWUMA</span>
                            </div>
                            <div className="flex items-center max-[800px]:justify-center gap-6 bottom-12 right-1 p-3">
                                <div className="h-[45px] w-[140px] border-2 active:border-black hover:border-blue-600 shadow relative group bg-black px-3 rounded-md">
                                    <img src="/images/playstore.jpg" className="object-contain h-full w-full rounded-md" />
                                </div>
                                <div className="h-[45px] w-[140px] border-2 active:border-black hover:border-blue-600 shadow relative group bg-black px-3 rounded-md">
                                    <img src="/images/appstore.png" className="object-contain h-full w-full rounded-md" />
                                </div>
                            </div>
                        </div>

                        <div className="max-[1165px]:mt-5 max-[800px]:text-center items-center flex-col max-[450px]:flex w-1/2 max-[1165px]:w-full text-sm">
                            <h3 className="orb text-xl max-[1165px]:text-start max-[800px]:text-center">Contact Information</h3>
                            <div className="max-[1165px]:flex flex-wrap max-[800px]:justify-center max-[450px]:block">
                                <div className="orb bg-[#000] shadow rounded my-1 py-1 px-1">+23302300923</div>
                                <div className="orb bg-[#000] shadow rounded my-1 py-1 px-1">+23302300923</div>
                                <div className="orb bg-[#000] shadow rounded my-1 py-1 px-1">+23302300923</div>
                                <div className="orb bg-[#000] shadow rounded my-1 py-1 px-1">pedwuma@gmail.com</div>
                            </div>
                        </div>
                    </div>

                    <form className="max-w-[500px] max-[800px]:max-w-full max-[800px]:mt-10">
                        <h2 className="orb text-2xl font-semibold mb-5 max-[800px]:text-center">Send Us A MEssage</h2>
                        <FormControl fullWidth sx={{marginBottom: "2rem"}}>
                            <InputLabel htmlFor="outlined-adornment-amount">Your Email</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start"> <i className="bi bi-envelope"></i> </InputAdornment>}
                                label="Your Email"
                                name="location"
                                placeholder="E.g youremail@gmail.com"
                                sx={{
                                    borderColor: 'blue'
                                }}
                                size="small"
                            />

                        </FormControl>

                        <FormControl fullWidth sx={{marginBottom: "2rem"}}>
                            <InputLabel htmlFor="outlined-adornment-amount">Your Contact</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start"><i className="bi bi-phone"></i></InputAdornment>}
                                label="Your Contact"
                                name="service"
                                placeholder="E.g 0508009009"
                                sx={{
                                    borderColor: 'blue'
                                }}
                                size="small"
                                
                            />
                        </FormControl>

                        <FormControl fullWidth sx={{marginBottom: "1rem"}}>
                            <InputLabel htmlFor="outlined-adornment-amount">Your Message</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start"><i className="bi bi-boy-text"></i></InputAdornment>}
                                label="Your Message"
                                name="service"
                                placeholder="Type your message here..."
                                sx={{
                                    borderColor: 'blue'
                                }}
                                size="small"
                                multiline
                                rows={3}
                            />
                        </FormControl>

                        <Btn.SmallBtn fullWidth>Send Message</Btn.SmallBtn>

                    </form>
                </div>
                <div className="small text-gray-500 px-10 py-5 border-t border-gray-800 flex max-[765px]:flex-col max-[765px]:gap-5 items-center justify-between max-[1165px]:text-xs">
                    <div className="flex gap-3">
                        <span className="hover:text-blue-600">Privacy Policy</span>
                        <span className="hover:text-blue-600">Terms & Conditions</span>
                    </div>

                    <span>All copyright (C) 2022 Reserved</span>

                    <div className="flex gap-6 text-xl">
                        <i className="hover:text-blue-600 bi bi-twitter"></i>
                        <i className="hover:text-blue-600 bi bi-facebook"></i>
                        <i className="hover:text-blue-600 bi bi-instagram"></i>
                        <i className="hover:text-blue-600 bi bi-linkedin"></i>
                        <i className="hover:text-blue-600 bi bi-google"></i>
                    </div>
                </div>
            </ThemeProvider>
        </footer>
    );
}