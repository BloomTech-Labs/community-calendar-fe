import React, {useState, useEffect} from 'react';

//graphql
import {useQuery} from '@apollo/react-hooks';
import {GET_EVENTS} from '../graphql/events.query';

//event cards
import EventListCard from "../components/events/EventListCard";

const NavbarSearchDisplay = props => {
    const {loading, error, data} = useQuery(GET_EVENTS);
    const searchString = props.match.params.query;

    console.log("helo word");
    
    return (
        <div className="navbarSearchDisplay">
            { loading && <p>Loading...</p>}
            {error && <p>Error!</p>}
            {
                data && data.events.map(event => {
                        return new RegExp(searchString, "i").test(event.title) 
                        ?   <EventListCard
                                item={event}
                                key={event.id}
                                // useListView={useListView}
                                useListView={true}
                            />
                        : null
                    })
            }
            {/* {!loading && data && !data.events.length && <p>No events matching search query</p>} */}
            {!(loading || error) && <p>No events matching search query</p>}
        </div>
    )
};

export default NavbarSearchDisplay;
