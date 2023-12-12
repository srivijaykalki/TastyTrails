import React ,{useState,useEffect} from "react";
import PostList from '../PostList/PostList';
import {CommunityDetailsProps} from '../../interfaces/community-interfaces';
import styles from './CommunityDetails.module.scss';
import { Post } from "../../interfaces/post-interfaces";
/**
 * 
 * This component is called when you want to view the details of a specific community
 * 
 */
const CommunityDetails:React.FC<CommunityDetailsProps> = ({community,postList,isEditable,updateCommunityById})=>{
    const [editedCommunityName, setEditedCommunityName] = useState(community.communityName);    // Name of the community
    const [editedCommunityDescription, setEditedCommunityDescription] = useState(community.description);    // Description of the community 
    const [updateMessage, setUpdateMessage] = useState("");
    const [isEditClicked, setIsEditClicked] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    //onchange functonality for the community name field
    const handleCommunityNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedCommunityName(event.target.value);
    };

    //onchange functonality for the community description field
    const handleCommunityDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedCommunityDescription(event.target.value);
    };

    //Function to update search query
    const onSearch = (query: string) => {
        setSearchQuery(query);
    };

    const filteredPosts = postList.filter((post: Post) =>
        post.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    //Function to update the community
    const updateCommunity = async ()=>{
        setIsEditClicked(true);
        if( editedCommunityName.trim().length === 0|| editedCommunityDescription.trim().length === 0 || (editedCommunityName==community.communityName&&editedCommunityDescription==community.description)){
            setIsEditClicked(false);
            return;
        }
        const updatedCommunity = {
            communityName:editedCommunityName,
            description:editedCommunityDescription
        }
        try{
            await updateCommunityById(updatedCommunity);
            setUpdateMessage("Community updated successfully!");
            setIsEditClicked(false);
        }catch(error){
            setUpdateMessage("Community updated successfully!");
        }
    }
    const edit =()=>{
        setIsEditClicked(true);
    }
    useEffect(() => {
        const clearUpdateMessage = () => {
            setUpdateMessage("");
        };

        // Attach event listener to clear update message on click
        document.addEventListener("click", clearUpdateMessage);

        // Cleanup the event listener when the component is unmounted
        return () => {
            document.removeEventListener("click", clearUpdateMessage);
        };
    }, []);
    return(
        <div className={styles.parentContainer}>
            <div className={styles.communityDetailsContainer}>
                <h2 className={styles.communityDetailsHeading}>Community Details</h2>
                {updateMessage && (
                    <div className={styles.updateMessage}>
                        {updateMessage}
                    </div>
                )}
                {(isEditable&& isEditClicked)?(<>
                <div className={styles.inputContainer}> 
                {/* Div for community Name */}
                    <label htmlFor="communityName" className={styles.inputLabel}>Community Name</label>
                    <input id="communityName" type="text" value={editedCommunityName} onChange={handleCommunityNameChange} className={styles.input}/>   
                </div>
                <div className={styles.inputContainer}>
                    {/* Div for community Description */}
                    <label htmlFor="communityDescription" className={styles.inputLabel}>Community Description</label>
                    <input id="communityDescription" type="text" value={editedCommunityDescription} onChange={handleCommunityDescriptionChange} className={styles.input}/>
                </div>
                </>
                ):(<>
                <div className={styles.inputContainer}>
                    {/* This block is used when he is not the admin */}
                    <strong className={styles.inputLabel}>Community Name</strong> {editedCommunityName}
                </div>
                <div className={styles.inputContainer}>
                    <strong className={styles.inputLabel}>Community Description</strong> {editedCommunityDescription}
                </div>
                </>
                )}
                <div className={styles.inputContainer}>
                    {/* This will shot the members list */}
                    <strong className={styles.inputLabel}>Community Members</strong>
                    <p className={styles.memberCount}>{community?community.members.length:""}</p>
                </div>
                {isEditable && (
                    isEditClicked ? (
                        <div>
                            <button className={styles.updateButton} onClick={updateCommunity}>Update</button>
                        </div>
                    ) : (
                        <div>
                            <button className={styles.updateButton} onClick={edit}>Edit</button>
                        </div>
                    )
                )}
            </div>
            <div className={styles.postListContainer}>
                <h2 className={styles.heading}>{`${community.communityName} Posts`}</h2>
                <PostList posts={filteredPosts} onSearch={onSearch}/>
            </div>
        </div>
    )
}
export default CommunityDetails;