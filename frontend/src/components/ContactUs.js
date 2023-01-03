import { Box } from "@mui/system";
import { Paper } from "@mui/material";

const BoxCss = {
    px: '25px',
    py: '10px',
    width: {xs:"80%", sm:"80%", lg:"60%"},
    height: "50%",
    border: "1px solid lightgrey",
    marginTop: "30px",
    marginBottom: "30px",
    position: "absolute",
    left: {xs:"10%", sm:"10%", lg:"20%"},
    // backgroundColor:"rgb(253, 244, 219)"
}
const ContactUs = () => {
    return(
    <Box sx={BoxCss} component={Paper}> 
        <h2>聯絡方式</h2>
        <li>電話：0912345678</li>
        <li>地址：台灣大學心理學系</li>
    </Box>
    )
}
export default ContactUs;