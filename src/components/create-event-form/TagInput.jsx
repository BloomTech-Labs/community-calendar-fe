import React, {useState, useRef, useEffect} from "react";

import {
    tagInput,
    tagList
} from "./styles/TagInput.module.scss"

//graphql
import {useQuery} from '@apollo/react-hooks'
import {GET_ALL_TAGS} from '../../graphql/events.query'

const TagInput = ({selectedTags, setSelectedTags}) => {
    const {data, loading, error} = useQuery(GET_ALL_TAGS);

    // const [newTags, setNewTags] = useState();
    const [hasFocus, setHasFocus] = useState();
    const element = useRef(null);

    const findSelectedTagIndex = tagId => {
        return selectedTags.findIndex(selectedTag => {
            return tagId === selectedTag.id;
        });
    }
    
    const addSelectedTag = e => {
        //tag has not already been selected
        // console.log(selectedTags, newTag)
        const newTag = {title: e.target.innerHTML, id: e.target.getAttribute("tag_id")};

        if(findSelectedTagIndex(newTag.id) === -1) 
            setSelectedTags([...selectedTags, newTag]);
    }
        
    const handleClick = event => {
        setHasFocus(element.current.contains(event.target));
    }; 
        
        console.log(hasFocus);
    useEffect(() => {
        
        //componentDidMount
        document.addEventListener("click", handleClick);
        
        //componentWillUnmount
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

    console.log(selectedTags);

    // return (
    //     <div className={tagInput} ref={element}>
    //         <div>
    //             {
    //                 selectedTags.length === 0 
    //                 ? <p>select tags </p>
    //                 : selectedTags.map(tag => (<span>{tag.title}&nbsp;</span>))
    //             }
    //         </div>
    //         {
    //             hasFocus && 
    //             (
    //                 <div className={tagList}>
    //                     {
    //                         data.tags.map((tag, idx) => <p key={tag.id} tag_id={tag.id} onClick={e => addSelectedTag(e)}>{tag.title}</p>)
    //                     }
    //                 </div>
    //             )
    //         }
    //     </div>
    // );
    console.log(hasFocus)
    return (
        <div>
            <div ref={element}>
                {                    
                    selectedTags.length === 0 
                    ? <p>select tags </p>
                    : selectedTags.map(tag => (<span>{tag.title}&nbsp;</span>))
                }
            </div>
            {                
                hasFocus && 
                (
                    <div className={tagList}>
                        {
                            data.tags.map((tag, idx) => <p key={tag.id} tag_id={tag.id} onClick={e => addSelectedTag(e)}>{tag.title}</p>)
                        }
                    </div>
                )
            }
        </div>
    );
};

export default TagInput;