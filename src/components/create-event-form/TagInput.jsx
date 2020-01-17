import React, {useState, useRef, useEffect} from "react";

import {
    tagDisplayClass,
    tagList,
    tagClass
} from "./styles/TagInput.module.scss"

//graphql
import {useQuery} from '@apollo/react-hooks'
import {GET_ALL_TAGS} from '../../graphql/events.query'


// const TagInput = React.forwardRef(({
//     // filterTags,
//     handleKeyDown,
//     handleClick,
//     removeSelectedTag,
//     addSelectedTag,
//     // findSelectedTagIndex,
//     tagSorter,
//     selectedTags,
//     hasFocus,
//     tagDisplay    
// }) => {
const TagInput = React.forwardRef((props, tagDisplay) => {

    const {
            filterTags,
            handleKeyDown,
            handleClick,
            removeSelectedTag,
            addSelectedTag,
            // findSelectedTagIndex,
            tagSorter,
            selectedTags,
            hasFocus,
            tagSearch,
            setTagSearch
        } = props

    const {data, loading, error} = useQuery(GET_ALL_TAGS);

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

    // data.tags = data.tags.sort(tagSorter);

    //clear tag search when component loses focus
    !hasFocus && tagSearch.length && setTagSearch("");

    // console.log(data.tags.filter(filterTags));

     return (
        <div onKeyDown={handleKeyDown} tabIndex="0">
            <div className={tagDisplayClass} ref={tagDisplay}>
                {                    
                    selectedTags.length === 0 
                    ?   <p>select tags </p>
                    :   selectedTags.map(tag => (
                                <span key={tag.id} className={`${tagClass} is-family-primary`}>
                                    {tag.title}
                                    <span onClick={() => removeSelectedTag(tag.id)}>&#x274C;</span>
                                </span>
                            )
                        )
                }
            </div>
            {                
                hasFocus && 
                (
                    <div className={tagList}>
                        {
                            data.tags
                            .filter(filterTags)
                            .sort(tagSorter)
                            .map((tag) => (
                                    <p 
                                        key={tag.id} 
                                        tag_id={tag.id}
                                        tag_title={tag.title}
                                        onClick={e => addSelectedTag(e)}>
                                        {tag.title}
                                    </p>
                                )
                            )
                        }
                    </div>
                )
            }
        </div>
    );
});

const TagInputHelpers = ({selectedTags, setSelectedTags}) => {
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

    const [hasFocus, setHasFocus] = useState();

    //filter tags based on what user types
    //clear tagSearch when user clicks off TagInput
    const [tagSearch, setTagSearch] = useState("");

    const tagDisplay = useRef(null);
    
    const addSelectedTag = e => {
        //tag has not already been selected
        const newTag = {title: e.target.getAttribute("tag_title"), id: e.target.getAttribute("tag_id")};
        // const newTag = {title: e.target.innerHTML, id: e.target.getAttribute("tag_id")};

        if(findSelectedTagIndex(newTag.id) === -1) 
            setSelectedTags([...selectedTags, newTag]);
    }

    const removeSelectedTag = tagId => {
        const index = findSelectedTagIndex(tagId);
        setSelectedTags([...selectedTags.slice(0, index), ...selectedTags.slice(index + 1)]);
    }
        
    const handleClick = event => {
        setHasFocus(tagDisplay.current.contains(event.target));
    };

    const handleKeyDown = event => {
        console.log(hasFocus);
        if(hasFocus) {
            setTagSearch(tagSearch + event.key);
            console.log(tagSearch);
        }
    };

    const filterTags = tag => {
        if(tagSearch.length === 0)
            return true;

        return new RegExp(`\\b${tagSearch}`, "i").test(tag.title);
        // return tag.title.toLowerCase().includes(tagSearch.toLowerCase());
    };
    
    return (
        <TagInput 
            filterTags={filterTags} 
            handleKeyDown={handleKeyDown}
            handleClick={handleClick}
            removeSelectedTag={removeSelectedTag}
            addSelectedTag={addSelectedTag}
            findSelectedTagIndex={findSelectedTagIndex}
            tagSorter={tagSorter}
            tagSearch={tagSearch}
            setTagSearch={setTagSearch}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            hasFocus={hasFocus}
            ref={tagDisplay}
            filterTags={filterTags}
        />
    )
}

export default TagInputHelpers;