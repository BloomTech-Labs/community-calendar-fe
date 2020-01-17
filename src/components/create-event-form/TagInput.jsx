/**
 */
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
    console.log(tagInput);

    const filterTags = tag => {
        if(tagInput.length === 0)
            return true;

        return new RegExp(`\\b${tagInput}`, "i").test(tag.title);
    };

    const tagSorter = (tag1, tag2) => {
        const str1 = tag1.title.toLowerCase();
        const str2 = tag2.title.toLowerCase();
        const shorterStrLen = str1.length < str2.length ? str1.length : str2.length;
      
        for(let i = 0; i < shorterStrLen; i++) {
          if(str1[i] !== str2[i]) {
            return str1[i] < str2[i] ? -1 : 1
          }
        }
        return str1.length < str2.length ? -1 : 1;
    }

    const findSelectedTagIndex = tagId => {
        return selectedTags.findIndex(selectedTag => {
            return tagId === selectedTag.id;
        });
    }

    const addSelectedTag = tag => {
        // const newTag = {title: e.target.getAttribute("tag_title"), id: e.target.getAttribute("tag_id")};
        console.log(tag);
        
        //tag has not already been selected
        if(findSelectedTagIndex(tag.id) === -1) 
            setSelectedTags([...selectedTags, tag]);
    }

    const removeSelectedTag = tagId => {
        const index = findSelectedTagIndex(tagId);
        setSelectedTags([...selectedTags.slice(0, index), ...selectedTags.slice(index + 1)]);
    }

    const hideTags = e => {
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
                    selectedTags.map(tag => (
                            <span key={tag.id} className={`${tagClass} is-family-primary`}>
                                {tag.title}
                                <span onClick={() => removeSelectedTag(tag.id)}>&#x274C;</span>
                            </span>
                        )
                    )
                }
            </div>
            {/* where tags are searched for */}
            <input onChange={handleTagInputChange} ref={tagInputRef} value={tagInput} placeholder="Enter tags"/>
            {/* where suggested tags are displayed */}
            <div className={suggestedTags} ref={suggestedTagsRef}>
                {

                    data.tags
                    .filter(filterTags)
                    .sort(tagSorter)
                    .map((tag) => (
                            <p 
                                key={tag.id} 
                                tag_id={tag.id}
                                tag_title={tag.title}
                                onClick={() => addSelectedTag(tag)}
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