import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import Rating from '../../components/boo-scale/rating.component';
//subcomponents
import Story from './Story';
import StoryDisplay from './StoryDisplay';
import WriteStory from './WriteStory';
import Comments from '../../components/comments/comments';

const StoriesPage = () => {
    const currentUser = useSelector(selectCurrentUser);
    const [view, setView] = useState('storyList');
    const [allStories, setAllStories] = useState([]);
    const [selectedStory, setSelected] = useState({authorId: '', createdAt: '', id: '', images: '', title: '', story: '', description: ''});
    const [isLoading, setIsLoading] = useState(true);

    //get stories from database
    const updateStoryList = () => {
        axios.get('/api/story/allStories')
        .then(result => {
            setAllStories(result.data.reverse());
        })
        .catch((err:Error) => console.error(err));
    }

    //on initializing, get all stories from database
    if(isLoading) {
        updateStoryList();
        setIsLoading(false);
    }

    //view handler handles changing views
    const viewHandler = (view:any, props:any) => {
        setView(view);
        if(props) {
            setSelected(props);
        }
        if(view === 'storyList') {
            updateStoryList();
        }
    }

    return (
        <div id="stories_page">
            {view === 'storyList' && <button onClick={() => viewHandler('write', null)} style={{minWidth: 110, maxWidth: 200, background: 'black', color: 'lime', borderRadius: '45%'}}>Write a Story</button>}
            {view === 'storyList' && !allStories.length && <div>Loading...</div>}
            <>
            {view === 'storyList' && allStories.map(((story:{authorId:String, createdAt:String, id:string, images:any, title:String, story:String, description?:String}, index:any) => {
                return <div key={index}>
                        <Story test={viewHandler} story={story} key={index} />
                        <br style={{margin: 5}}></br>
                       </div>
            }))}
            </>
            {view === 'story' && 
            <>
            <StoryDisplay story={selectedStory} backHandler={viewHandler}/>
                <Comments category={selectedStory} type={'stories'} />
                <Rating id={selectedStory.id} type={'stories'} />
            </>
            }
            {view === 'write' && <WriteStory backHandler={viewHandler}/>}
        </div>
    );
}

export default StoriesPage;