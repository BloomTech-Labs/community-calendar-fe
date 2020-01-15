import React, {useState, useRef, useEffect} from "react";

//graphql
import {useQuery} from '@apollo/react-hooks'
import {GET_ALL_TAGS} from '../../graphql/events.query'

const TagInput = () => {
    const {serverTags, loading, error} = useQuery(GET_ALL_TAGS);
    const [newTags, setNewTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const element = useRef(null);

    console.log("TagInput rendering");

    const handleClick = event => {
        console.log(element.current.contains(event.target));
        // setShowDropdown(element.contains(event.target));
        console.log("showDropdown:", showDropdown);
    }

    useEffect(() => {
        // setClickEventListener(
        //     document.addEventListener("click", (e) => {
        //         console.log("stop clicking!!!!!");
        //     })
        // )

        document.addEventListener("click", handleClick);

        return () => {
            console.log("clickEventListener", handleClick);
            document.removeEventListener("click", handleClick);
        };
    }, []);

    if(loading) {
        return <div>Loading tags</div>
    }

    if(error) {
        return <div>Error loading tags</div>
    }

    return (
        <div ref={element}>select tags</div>
    );
}

export default TagInput;