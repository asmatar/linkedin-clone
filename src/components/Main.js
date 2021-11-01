import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import styled from 'styled-components';
import db from '../firebase';
import { getArticlesAPI } from '../redux/actions';
import PostModal from './PostModal';
const Main = ({user, loading, getArticles, articles, 
    // handleLike
}) => {
console.log(articles)

    // modal 0: state for the modal, close
    const[showModal, setShowModal] =useState('close')
    // const[showComment, setShowComment] =useState(false)
    // console.log(showComment)

    useEffect(()=> {
        getArticles()
    }, [])
    
    // modal 2. On click we exécute this code
    const handleClick = (event) => {
        // event.preventDefault();
        // if showMdal is 'open' we change the value to 'close'
        switch(showModal) {
            case 'open':
                setShowModal('close');
                break;
                // if showMdal is 'close' we change the value to 'open'
                case 'close':
                    setShowModal('open');
                    break;
                    // by default it's 'close'
                    default:
                        setShowModal('close')
                        break
                    }
                }
                const increment = firebase.firestore.FieldValue.increment(1);
                const handleLike = (id) => {
                    db.collection('article').doc(id).update({
                        // like: parseInt(4)
            like: increment
        })
    }
    const handleShowComment = (id, post) => {
        console.log(post)
        db.collection('article').doc(id).update({
        post : !post
    })
    }
    return (
        <>
        {
            articles.length === 0 ? (
            <p>Articles are loading</p>)
            :(
        <Container>
            <ShareBox>  
              <div>
                { user && user.photoURL ?
                <img src={user.photoURL} alt="" />
                :
                <img src="/images/user.svg" alt="" />
            }
                <button
                // modal 1 : on click we call handleclick
                onClick = {()=>handleClick()}
                disabled={loading ? true : false}
                >Start a post</button>
            </div>
            <div>
              
                <button>
                    <img src="/images/photo-icon.png" alt="" />
                    <span onClick = {()=>handleClick()}
                disabled={loading ? true : false}>Photo</span>
                </button>
                <button>
                    <img src="/images/video-icon.png" alt="" />
                    <span  onClick = {()=>handleClick()}
                disabled={loading ? true : false}>Video</span>
                </button>
                <button>
                    <img src="/images/even-icon.png" alt="" />
                    <span>Event</span>
                </button>
                <button>
                    <img src="/images/article-icon.png" alt="" />
                    <span  onClick = {()=>handleClick()}
                disabled={loading ? true : false}>Write article</span>
                </button>
            </div>
            </ShareBox>
            <Content>
                {
                    loading && <img src="/images/Spinner-5.gif" alt="" />
                }
                {
                    articles.length > 0 && articles.map((article, key) => (
                <Article key={key}>
                   { console.log(article.info.actor.image)}
                 
                    <SharedActor>
                        <a>
                            <img src={article.info.actor.image} alt="" />
                            <div>
                                <span>{article.info.actor.title}</span>
                                <span>{article.info.actor.description}</span>
                                <span>{article.info.actor.date.toDate().toLocaleDateString()}</span>
                            </div>
                        </a>
                        <button>
                            <img src="/images/elipsis.png" alt="" />
                        </button>
                    </SharedActor>
                    <Description>
                    {article.info.description}
                    </Description>
                    <SharedImg>
                        <a>
                        {
                           !article.info.haredImg && article.info.video ? <ReactPlayer width={'100%'} url={article.info.video} />
                        : (
                            article.info.haredImg && <img src={article.info.haredImg} alt="" />
                        ) 
                        }
                        </a>
                    </SharedImg>
                    <SocialCounts>
                        <li>
                            <button>
                                <span>{article.info.like} </span>
                                <img src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb" alt="" />
                                {/* <span>75</span>
                                <img src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f" alt="" /> */}
                                
                            </button>
                        </li>
                        <li>
                            <a>{article.info.comments} comments</a>
                        </li>
                    </SocialCounts>
                    <SocialAction>
                        <button>
                           {/* { console.log(article.id)}  */}
                            <img src="/images/like-icon.png" alt="" />
                            <span onClick={(event)=>
                                handleLike(article.id)}>Like</span>
                        </button>
                        <button onClick={()=> handleShowComment(article.id, article.info.post)}>
                            <img src="/images/comment-icon.png" alt="" 
                             />
                            <span
                           >
                            Comments
                            </span>
                        </button>
                        <button>
                            <img src="/images/share-icon.png" alt="" />
                            <span>Share</span>
                        </button>
                        <button>
                            <img src="/images/send-icon.png" alt="" />
                            <span>Send</span>
                        </button>
                    </SocialAction>
                   {
                       article.info.post &&
                       <Comments>    
                        <img src={user.photoURL} alt="" />
                        <AddComment placeholder='add a comment'>
                        </AddComment>
                        <button type='submit'> send</button>
                        </Comments>
                   }
                    
                </Article>
                    ))}
            </Content>
            
            {/* modal 3 : pass the props into the modal */}
            <PostModal showModal={showModal} handleClick={handleClick} />
        </Container>
         )} 
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
        loading: state.articleState.loading,
        articles: state.articleState.articles
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getArticles: () => dispatch(getArticlesAPI()),
        // handleLike: (id) => dispatch(handleLikeUp(id))
    }
}

export default connect (mapStateToProps,mapDispatchToProps )(Main) 

const Comments = styled.div`
display: flex;
align-items: center;
    text-align: left;
    img{
        width: 48px;
        height: 48px;
        border-radius: 50%;
        margin-left: 21px;
        margin-bottom: 8px;
    }
    button{
        margin-left: 10px;
        border: none;
        &:hover{
            color: grey;
        }
    }
`
const AddComment = styled.input`
      padding: 16px;
      align-items: center;
      border-radius: 45px;
      box-sizing: border-box;
      max-height: 32px;
      width: 65%;
      margin-bottom: 10px;
      margin-top: 5px;
      margin-left: 10px;

`

const Container = styled.div`
    grid-area: main;
    position: relative;
    /* width: 538px; */
`
const CommonCard = styled.div`
    text-align: center;
    overflow: hidden;
    margin-bottom: 8px;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
    border: none;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 /20%);
`
const ShareBox = styled(CommonCard)`
    display: flex;
    flex-direction: column;
    color: #958b7b;
    margin: 0 0 8px;
    background: white;
    div {
        button {
            outline: none;
            color: rgba(0, 0, 0, 0.6);
            font-size: 14px;
            line-height: 1.5;
            min-height: 48px;
            background: transparent;
            border: none;
            display: flex;
            align-items: center;
            font-weight: 600;
            &:hover{
                transition: background-color 0.5s;
                background-color: rgba(209,207,208,0.8);
                cursor: pointer;
            }
        }
        &:first-child{
            display: flex;
            align-items: center;
            padding: 8px 16px 0px 16px;
            img {
                width: 48px;
                border-radius: 50%;
                margin-right: 8px;
            }
            button{
                margin: 4px 0;
                flex-grow: 1;
                border-radius: 35px;
                padding-left: 16px;
                border: 1px solid rgba(0, 0, 0, 0.15);
                background-color: white;
                text-align: left;
            }
        }
        &:nth-child(2) {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            padding-bottom: 4px;
             button {
                img {
                    margin: 0 4px 0 -2px;
                    width: 22px;
                }
                span {
                    color: #70b5f9;
                }
            }
            
        }
    }
`
const Article = styled(CommonCard)`
    padding: 0;
    margin: 0 0 8px;
    overflow: visible;
`
const SharedActor = styled.div`
    padding-right: 40px;
    flex-wrap: nowrap;
    padding: 12px 16px 0;
    margin-bottom: 8px;
    align-items: center;
    display: flex;
    a {
        margin-right: 12px;
        flex-grow: 1;
        overflow: hidden;
        display: flex;
        text-decoration: none;

        img {
            width: 48px;
            height: 48px;
        }
        & > div {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            flex-basis: 0;
            margin-left: 8px;
            overflow: hidden;
            span {
                text-align: left;
                
                &:first-child {
                    font-size: 14px;
                    font-weight: 700;
                    color: rgba(0, 0, 0, 1);
                }

                &:nth-child(n + 1) {
                    font-size: 12px;
                    color: rgba(0, 0, 0, 0.6)
                }
            }
        }
    }
    button {
        position: absolute;
        right: 12px;
        top:0;
        background: transparent;
        border: none;
        outline: none;
        img {
             width: 35px;
            height: 30px
        }
       
    }
`
const Description = styled.div`
    padding: 0 16px;
    overflow: hidden;
    color: rgba(0,0,0,0.9);
    font-size: 14px;
    text-align: left;;
`
const SharedImg = styled.div`
    margin-top: 8px;
    width: 100%;
    display: block;
    position: relative;
    background-color: #f9fafb;
    img {
        object-fit: contain;
        width: 100%;
        height: 100%;
    }
`
const SocialCounts = styled.ul`
    line-height: 1.3;
    display: flex;
    align-items: flex-start;
    overflow: auto;
    margin: 0 16px;
    padding: 8px 0;
    border-bottom: 1px solid #e9e5df;
    list-style: none;
    li {
        margin-right: 5px;
        font-size: 12px;
        button {
            display: flex;
            border: none;
            background-color: white;
        }
    }
`
const SocialAction = styled.div`
    align-items: center;
    display: flex;
    justify-content: flex-start;
    margin: 0;
    min-height: 40px;
    padding: 4px 8px;
    button {
        display: inline-flex;
        align-items: center;
        padding: 8px;
        height: 40px;
        color: #0a66c2;
        border: none;
        background-color: white;

        @media (min-width: 768px) {
            margin-left: 8px;
        }
        img {
            width: 25px;
        }
    }
`
const Content = styled.div`
    text-align: center;
    & > img {
        width: 30px;
    }
`
