import firebase from 'firebase';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { postArticleAPI } from '../redux/actions';

function PostModal( {showModal, handleClick, user, postArticlee }) {
    // state to catch the inputarea value
    const [editorText, setEditorText] = useState('')
    const [shareImage, setShareImage] = useState('')
    const [videoLink, setVideoLink] = useState('')
    // conditional input video-image 0: state which change the render
    const [assetArea, setAssetArea] = useState('')

    const handleChange = (event) => {
        // image : if no image or undifined, show error message
        const image = event.target.files[0]
        if (image === '' || image=== undefined) {
            alert(`not an image, the file is a ${typeof image}`)
            return
        } 
        // if no error actualize the image value in the state
        setShareImage(image)
    }
    // conditional input video-image 2: we pass the value 'image' or 'video' to setAssetArea which change the property assetArea in the state
    const switchAssetArea = (area) => {
        setShareImage('');
        setVideoLink('');
        setAssetArea(area);
    }
    const postArticle = (event) => { 
        
        event.preventDefault();
        if(event.target !== event.currentTarget){
            return;
        }

        const payload = {
            image: shareImage,
            video: videoLink,
            user: user,
            description: editorText,
            timestamp: firebase.firestore.Timestamp.now()
        };
        postArticlee(payload);
        reset(event)
    }
    // modal 5: we execute reset => éxécute handleclick, and refresh the input
    const reset = (event) => {
        setEditorText('');
        setShareImage('');
        setVideoLink('');
        handleClick(event)
    }
    return (
        <>
        {/* modal 6 : ONLY if showModal is 'open' we show the code */}
        { showModal === 'open' &&
        <Container>
            <Content>
                <Header>
                    <h2>create a post</h2>
                    {/* modal 4 : on click we callback reset */}
                    <button onClick={(event) => reset(event)}>
                        <img src="/images/close-icon.png" alt="" />
                    </button>
                </Header>
                <SharedContent>
                    <UserInfo>
                        { 
                        user.photoURL ?  (<img src={user.photoURL} alt="" />)
                        : 
                        <img src="/images/user.svg" alt="" />
                        }
                        <span>{user.displayName}</span>
                    </UserInfo>
                    <Editor>
                        <textarea 
                        placeholder='What do you want to talk about?'
                        autoFocus={true}
                        value = {editorText}
                        onChange = {(event) =>setEditorText(event.target.value) }
                        />
                         {/* conditional input video-image 3: if the value is 'image' show this */}
                        { assetArea === 'image' ?
                        <UploadImage>
                            <input 
                            type="file" 
                            accept='images/gif, image/jpeg, image/png ' 
                            name='image' 
                            id='file' 
                            style={{display: 'none'}}
                            onChange={handleChange}
                            />
                            <p>
                                <label htmlFor="file">
                                    Select an image to share
                                </label>
                            </p>
                            {shareImage && <img src={URL.createObjectURL(shareImage)} alt="" /> }
                            </UploadImage>
                            // if not and the value is 'media' show that
                            :
                            assetArea === 'media' &&
                            <>
                            <input type="text" placeholder=' please input a video-link'
                            value={videoLink}
                            onChange={event => {setVideoLink(event.target.value)}}
                            />
                            {
                                videoLink && (<ReactPlayer width={'100%'} url={videoLink} />)
                            }
                            </>
                        }

                    </Editor>
                </SharedContent>
                <ShareCreation>
                    <AttachAssets>
                        {/* conditional input video-image 1: on click we callback the function switchAssetArea passing the value 'image' or video' */}
                        <AssetButton onClick={()=> switchAssetArea('image')}>
                            <img src="/images/photo-icon.png" alt="" />
                        </AssetButton>
                        <AssetButton onClick={()=> switchAssetArea('media')}>
                            <img src="/images/assets-video.jpg" alt="" />
                        </AssetButton>
                    </AttachAssets>

                    <ShareComment>
                        <AssetButton>
                            <img src="/images/comment-icon.png" alt="" />
                            Anyone
                        </AssetButton>
                    </ShareComment>
                    <PostButton
                    disabled={!editorText ? true : false}
                    onClick={(event) => postArticle(event)}
                    >
                        Post
                    </PostButton>
                </ShareCreation>
            </Content>
        </Container>
        }
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.userState.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
     postArticlee: (payload) => {
         dispatch(postArticleAPI(payload))
     }
    }
}

export default connect (mapStateToProps,mapDispatchToProps )(PostModal)

const Container = styled.div`
    position: fixed;
    top: 0;
    left:0;
    right:0;
    bottom: 0;
    z-index: 888;
    color: black;
    background-color: rgba(0,0,0,0.8);
    animation: fadeIn 0.3s;
`
const Content = styled.div`
    width: 100%;
    max-width: 552px;
    background-color: white;
    max-height: 90%;
    overflow: initial;
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    top: 32px;
    margin: 0 auto;
`
const Header = styled.div`
    display: block;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(0,0,0,0.15);
    font-size: 16px;
    line-height: 1.5;
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgba(0,0,0,0.6);
    button {
        height: 40px;
        width: 40px;
        min-width: auto;
        color: rgba(0,0,0,0.15);
        img {
            pointer-events: none;
            width: 100%;
        }
    }
`
const SharedContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    background: transparent;
    vertical-align: baseline;
    padding: 8px 12px;
`
const UserInfo = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 24px;
    svg, img {
        width: 48px;
        height: 48px;
        background-clip: content-box;
        border: 2px solid transparent;
        border-radius: 50%;
    }
    span {
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5;
        margin-left: 5px;
    }
`
const ShareCreation = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 24px 12px 16px;
`
const AssetButton = styled.button`
    display: flex;
    align-items: center;
    height: 40px;
    min-width: auto;
    color: rgba(0,0,0,0.5);
    img {
        width: 30px;
    }
`
const AttachAssets = styled.div`
    align-items: center;
    display: flex;
    padding-right: 8px;
    img {
        width: 30px;
    }
    ${AssetButton} {
        width: 45px;
    }
`
const ShareComment = styled.div`
    padding-left: 8px;
    margin-right: auto;
    border-left: 1px solid rgba(0,0,0,0.15);
`
const PostButton = styled.button`
    min-width: 60px;
    border-radius: 20px;
    padding-left: 16px;
    padding-right: 16px;
    background: ${props => props.disabled ? 'rgba(137,196,244,0.8)' : '#0a66c2'};
    color: ${props => props.disabled ? 'rgba(1,1,1,0.2)' :  "white"};

    &:hover {
        background: ${props => props.disabled ? 'rgba(0,0,0,0.08)' :  "#004182"};;
    }
`

const Editor = styled.div`
    padding: 12px 24px;
    textarea {
        width: 100%;
        min-height: 100px;
        resize: none;
    }
    input {
        width: 100%;
        height: 35px;
        font-size: 16px;
        margin-bottom: 20px;
    }
`
const UploadImage = styled.div`
    text-align: center;
    img {
        width: 100%;
    }
`
