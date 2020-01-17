import React, {useState, useRef, useEffect} from "react";

import {
    tagDisplayClass,
    suggestedTags,
    tagClass
} from "./styles/TagInput.module.scss"

//graphql
import {useQuery} from '@apollo/react-hooks'
import {GET_ALL_TAGS} from '../../graphql/events.query'

const TagInput = ({selectedTags, setSelectedTags}) => {

    const {data, loading, error} = useQuery(GET_ALL_TAGS);

    //input field for searching tags
    const [tagInput, setTagInput] = useState("");

    //ref to element for displaying suggested tags to toggle its visibility
    const suggestedTagsRef = useRef(null);

    //ref for tagInput to check if it is focused
    const tagInputRef = useRef(null);

    //handler for when user types in tag input box for searching tags
    const handleTagInputChange = event => {
        setTagInput(event.target.value);
    }

    const filterTags = tag => {
        if(tagInput.length === 0)
            return true;

        return new RegExp(`\\b${tagInput}`, "i").test(tag.title);
    };

    const findSelectedTagIndex = newTagName => {
        return selectedTags.findIndex(tagName => (new RegExp(`^${tagName}$`, "i")).test(newTagName));
    }

    const addSelectedTag = newTagName => {
        //tag has not already been selected
        if(findSelectedTagIndex(newTagName) === -1) 
            setSelectedTags([...selectedTags, newTagName]);
    }

    const removeSelectedTag = tagName => {
        const index = findSelectedTagIndex(tagName);

        if(index >= 0)
            setSelectedTags([...selectedTags.slice(0, index), ...selectedTags.slice(index + 1)]);
    }

    const hideTags = () => {
        suggestedTagsRef.current.style.visibility = "hidden";
    }
    
    const showTags = () => {
        suggestedTagsRef.current.style.visibility = "visible";
    }
        
    const handleClick = event => {
        if(tagInputRef.current.contains(event.target)) {
            showTags()
        } else {
            setTagInput("");
            hideTags();
        } 
    };

    const handleKeyDown = event => {
        if(event.key === "Enter") 
            addSelectedTag(tagInput)
    }

    useEffect(() => {
        
        //componentDidMount
        document.addEventListener("click", handleClick);

        
        //componentWillUnmount
        return () => {
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
        <div>
            {/* where selected tags are displayed */}
            <div className={tagDisplayClass}>
                {
                    selectedTags.map((tagName, idx) => (
                            <span key={idx} className={`${tagClass} is-family-primary`}>
                                {tagName}
                                <span onClick={() => removeSelectedTag(tagName)}>&#x274C;</span>
                            </span>
                        )
                    )
                }
            </div>
            {/* where tags are searched for */}
            <input 
                onChange={handleTagInputChange} 
                ref={tagInputRef} 
                value={tagInput} 
                placeholder="Enter tags"
                onKeyDown={handleKeyDown}
            />
            {/* where suggested tags are displayed */}
            <div className={suggestedTags} ref={suggestedTagsRef}>
                {

                    data.tags
                    .filter(filterTags)
                    .sort()
                    .map((tag, idx) => (
                            <p 
                                key={idx} 
                                onClick={() => addSelectedTag(tag.title)}
                            >
                                {tag.title}
                            </p>
                        )
                    )
                }
            </div>
        </div>
    );
};

export default TagInput;