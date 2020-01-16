import React, {useState, useRef, useEffect} from "react";

import {
    tagDisplayClass,
    tagList,
    tagClass
} from "./styles/TagInput.module.scss"

//graphql
import {useQuery} from '@apollo/react-hooks'
import {GET_ALL_TAGS} from '../../graphql/events.query'

const tagSorter = (str1, str2) => {
    const shorterStrLen = str1.length < str2.length ? str1.length : str2.length;
  
    for(let i = 0; i < shorterStrLen; i++) {
      if(str1[i] !== str2[i]) {
        return str1[i] < str2[i] ? 1 : -1
      }
    }
    return 0;
  }

const TagInput = ({selectedTags, setSelectedTags}) => {
    const {data, loading, error} = useQuery(GET_ALL_TAGS);

    const [hasFocus, setHasFocus] = useState();
    const tagDisplay = useRef(null);

    const findSelectedTagIndex = tagId => {
        return selectedTags.findIndex(selectedTag => {
            return tagId === selectedTag.id;
        });
    }
    
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

    data.tags = data.tags.sort(tagSorter);

     return (
        <div>
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
                            data.tags.map((tag, idx) => (
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
};

export default TagInput;