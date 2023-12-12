import React from 'react';
import { CommunityListProps } from '../../interfaces/community-interfaces.tsx';
import  CommunityItemContainer  from '../../containers/CommunityItemContainer.tsx';
import styles from './CommunityList.module.scss';
import { Link } from 'react-router-dom';

const CommunityList : React.FC<CommunityListProps> = ({communities}) => {
    return (
        <div className={styles.parentContainer}>
            <div className={styles.communityListWithHeading}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.heading}>Discover Communities</h1>
                    <Link to="/new-community" className={styles.createButton}>
                        Create Community
                    </Link>
                </div>
                <div className={styles.communityListContainer}>
                    <ul className={styles.communityList}>
                        {communities.map((community, idx) => (
                            <li className={styles.communityItem} key={`community-${idx + 1}`}>
                                <CommunityItemContainer community={community} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CommunityList;