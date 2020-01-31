import React from "react";

import {
    section1,
    section2,
    section3,
    section4,
    botDiv,
    midDiv,
    topDiv,
} from "./OurMission.module.scss";

const OurMission = () => {
    return (
        <>
            <section id={section1}>
                <div>
                    <h2 className="is-bold is-size-3 is-family-secondary">
                        OUR<br/>MISSION
                    </h2>
                </div>
                <div>
                    <p>
                    Our platform should make discovering a local event on any given day as easy and as rewarding as finding something new to watch on Netflix. A local event app serving municipalities and neighborhoods. See the events happening in your local area in an intuitive way.
                    </p>
                </div>
            </section>

            <section id={section2}>
                {/* <div className={botDiv}>
                    <div className={midDiv}>
                        <div className={topDiv}/>
                    </div>
                </div> */}
                {/* <div className={botDiv}/> */}
                {/* <div className={midDiv}/>
                <div className={topDiv}/>  */}
                <div>
                    <div/>
                </div>
            </section>
        </>
    );
}

export default OurMission;