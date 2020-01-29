import React from "react";

import {
    banner,
    container
} from "./styles/AboutUs.module.scss"

const AboutUs = () => {
    return (
        <div className={container}>
            <div className={banner}>
                <h1>More than just events</h1>
            </div>
        </div>
    )
}

export default AboutUs;