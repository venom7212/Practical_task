import React, { useState } from 'react';
import star from '../resources/star.png'
import views from '../resources/views.png'
import comment from '../resources/comment_icon.png'
import tap from '../resources/tap.png'
import cross from '../resources/icon.png'

const Card = ({cardData, key, onclick }) => {
    const [visible, setVisible] = useState(true)
    const { owner, name, watchers_count, stargazers_count, html_url, description } = cardData
    const { id, login, html_url: ownerLink, avatar_url } = owner;

    return (
        <div key={key} className='one_card'>
            <div className='name_project' onClick={() => { window.open(html_url); }}>{name}</div>
            <img className='cross' onClick={()=>{onclick(id)}} src={cross} alt="cross" />
            {visible ? <div>
                <div className='avatar_author'>
                    <div className='avatar'>
                        <img className='avatar_img' src={avatar_url} alt='avatar_url'></img>
                    </div>
                    <div className='author' onClick={() => { window.open(ownerLink); }}>{login}</div>
                    <img className='tap' onClick={() => setVisible(!visible)} src={tap} alt='tap'></img>
                </div>
                <div className='counts_info'>
                    <div className='stargazers_count'>
                        <img className='star_img' src={star} alt='star'></img>
                        <div className='star_count' >{stargazers_count}</div>
                    </div>
                    <div className='watchers_count'>
                        <img className='watcher_img' src={views} alt='star'></img>
                        <div className='watcher_count' >{watchers_count}</div>
                    </div>
                </div>
                <div className='comment_div'>
                    <input
                        className='comment_input'
                        // value={searchValue}
                        placeholder='Комментарий к проекту'
                    // onChange={(e) => (inputHandler(e))}
                    >
                    </input>
                    <div className='comment_img_div'>
                        <img className='comment_img' src={comment} alt="comment" />
                    </div>
                </div>
            </div>
                :
                <div className='description_block'>
                    <div onClick={() => setVisible(!visible)} className='description'>Description: </div>
                    <div onClick={() => setVisible(!visible)} className='description'>{description}</div>
                    <img className='tap' onClick={() => setVisible(!visible)} src={tap} alt='tap'></img>
                </div>
            }
        </div>
    )
}
export default Card