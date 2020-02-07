import React, {useState} from "react";
import OurMission from "../components/about-us-helpers/OurMission";
import Leadership from "../components/about-us-helpers/Leadership";

import {
    banner,
    container,
    buttonContainer, 
    buttonSelected
} from "./styles/AboutUs.module.scss"

const ourMission = 1;
const leadership = 2;

const AboutUs = () => {
    //if selectedPage = ourMission display our mission component
    //if selectedPage = leadership display leadership component
    const [selectedPage, setSelectedPage] = useState(ourMission);

    console.log(selectedPage);

    return (
        <div className={container}>
            <div className={banner}>
                <h1>More than just events</h1>
            </div>
            <div className={buttonContainer}>
                {/* buttons for selecting which "page" to display */}
                {/* <div style={{borderBottom: selectedPage === ourMission ? "1px solid red" : "none"}} onClick={() => setSelectedPage(ourMission)}><span>OUR MISSION</span></div>
                <div style={{borderBottom: selectedPage === leadership ? "1px solid red" : "none"}} onClick={() => setSelectedPage(leadership)}><span>LEADERSHIP</span></div> */}
                <div className={selectedPage === ourMission ? buttonSelected : ""} onClick={() => setSelectedPage(ourMission)}><span>OUR MISSION</span></div>
                <div className={selectedPage === leadership ? buttonSelected : ""} onClick={() => setSelectedPage(leadership)}><span>LEADERSHIP</span></div>
            </div>
            {selectedPage === ourMission ? <OurMission/> : <Leadership/>}
        </div>
    )
}

export default AboutUs;