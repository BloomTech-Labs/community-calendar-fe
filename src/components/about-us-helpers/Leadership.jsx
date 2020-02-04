import React from "react";

import {
    bgSquare1,
    bgSquare2,
    container,
    section1,
    section2,
} from "./Leadership.module.scss";

const teamMembers =[
    {name: "Skyler Dowdy", role: "Team Lead", imagePath: require(`../../assets/images/team-members/skyler.jpg`).default},
    {name: "Jan Patrick Eliares", role: "UX/UI Designer", imagePath: require(`../../assets/images/team-members/jp.png`).default},
    {name: "Nora Barazanchi", role: "UX/UI Designer", imagePath: require(`../../assets/images/team-members/placeholder.jpg`).default},
    {name: "Louis Gelinas", role: "Engineer", imagePath: require(`../../assets/images/team-members/louis.jpg`).default},
    {name: "Mark King", role: "Engineer", imagePath: require(`../../assets/images/team-members/mark.jpg`).default},
    {name: "Westley Strellis", role: "Engineer", imagePath: require(`../../assets/images/team-members/westley.png`).default},
    {name: "Basil Havens", role: "Mobile Engineer", imagePath: require(`../../assets/images/team-members/basil.jpg`).default},
    {name: "Ben Rogers", role: "Engineer", imagePath: require(`../../assets/images/team-members/ben.jpg`).default},
    {name: "Tyler Berrett", role: "Mobile Engineer", imagePath: require(`../../assets/images/team-members/tyler.jpg`).default},
    {name: "Jordan Christensen", role: "Mobile Engineer", imagePath: require(`../../assets/images/team-members/jordan.png`).default},
    {name: "Justin Gent", role: "Mobile Engineer", imagePath: require(`../../assets/images/team-members/justin.jpg`).default},
    {name: "Lowell Jacobs", role: "Engineer", imagePath: require(`../../assets/images/team-members/lowell.jpg`).default},
];

const Leadership = () => {
    return (
        <div id={container}>
            <section id={section1}>
                <h2 className="is-bold is-size-3 is-family-secondary">
                    OUR<br/>LEADERSHIP
                </h2>
                <p>
                    Our strength stems from individuality of the team that collides with great communication and deliverence.
                </p>
            </section>
            <section id={section2}>
                <div id={bgSquare1}/>
                <div id={bgSquare2}/>

                <h3>OUR TEAM</h3>

                {
                   teamMembers.map(member => 
                        <div>
                            <img src={member.imagePath}/>
                            <p className="color_black is-bold is-family-secondary">{member.name}</p>
                            <p className="color_chalice">{member.role}</p>
                        </div>
                   )
                }
            </section>
        </div>
    );
}

export default Leadership;