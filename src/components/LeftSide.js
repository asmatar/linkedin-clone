// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const LeftSide = ({user}) => {
  const [showMore, setShowMore] = useState(true)

  useEffect(() => {
    window.addEventListener('resize', (event)=> {
      if(event.currentTarget.innerWidth > 768){
        setShowMore(true)
      } else {
        setShowMore(false)
      }
    })
  }, [])
    return (
        <Container>
            <ArtCard>
                <UserInfo>
                    <CardBackground />
                    <a href='/#'>
                        <Photo>
                          <img src={user && user.photoURL ? user.photoURL : 'nobody'} alt="" />
                        </Photo>
                        <Link>Welcome { user ? user.displayName : 'there !' }
                        </Link>  
                    </a>
                    <a href='#'>
                        <AddPhotoText>
                            add a photo
                        </AddPhotoText>
                    </ a>
                </UserInfo>
                {/* show more condition */}
              {
                showMore ? (<> <Widget>
                  <a href='#'>
                    <div>
                          <span>connection</span>
                          <span>grow your nextwork</span>
                    </div>
                    <img src="/images/widget-icon.svg" alt="widget-icon" />
                  </a>
              </Widget>
              <Item>
                  <span>
                      <img src="/images/item-icon.svg" alt="widget" />
                      My Items
                  </span>
              </Item></>) : ('')
              }
               
            </ArtCard>
            {
              showMore ? (<> <MyPages>
                <h2>My pages</h2>
                <a href='https://arthur-deruelle.netlify.app/' target='blank'>
                  <p> My Portfolio</p>
                </a>
                <a href='https://arthur-drl-amazon.netlify.app/' target='blank'>
                <p> Amazon Clone</p>
                </a>
                
              </MyPages>
  
              <CommunityCard>
                  <a href='#'>
                      <span>Groups</span>
                  </a>
                  <a href='#'>
                      <span>
                          Events
                          <img src="/images/plus-icon.svg" alt="plus-icon" />
                      </span>
                  </a>
                  <a href='#'>
                      <span>Follow hashtag</span>
                  </a>
                  <a href='#'>
                      <span>Discover more</span>
                  </a>
              </CommunityCard>
              {/*  show more end */}
              <ShowMore onClick={()=> setShowMore(!showMore)}>Show more 
                {/* <ArrowDropDownIcon></ArrowDropDownIcon>  */}
                </ShowMore></>) : ( <ShowMore onClick={()=> setShowMore(!showMore)}>Show more 
              {/* <ArrowDropDownIcon></ArrowDropDownIcon>  */}
              </ShowMore>)
            }
           
        </Container>
    )
}
const mapStateToProps = (state) => ({
  user: state.userState.user
})

const mapDispatchToProps = (dispatch) =>{
  return {

  }
}


export default connect(mapStateToProps, mapDispatchToProps )(LeftSide)

const Container = styled.div`
    grid-area: leftside;
        /* @media (min-width: 768px) and (max-width: 900px) {
            width: 220px;   
        padding: 0 5px;
    
    } */
`

const ArtCard = styled.div`
    text-align: center;
    overflow: hidden;
    margin-bottom: 8px;
    background-color: #fff;
    border-radius: 5px;
    transition: box-shadow 83ms;
    position: relative;
    border: none;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);

`
const UserInfo = styled.div`
    border-bottom: 1px solid rgba(0, 0,0 , 0.15);
    padding: 12px 12px 16px;
    word-wrap: break-word;
    word-break: break-word;
`
const CardBackground = styled.div`
    background:  url('/images/card-bg.svg');
    background-position: center;
    background-size: 462px;
    height: 54px;
    margin: -12px -12px 0;
`
const Photo = styled.div`
  img{
    box-shadow: none;
      width: 72px;
  height: 72px;
  box-sizing: border-box;
  background-clip: content-box;
  background-color: white;
  background-position: center;
  background-size: 60%;
  background-repeat: no-repeat;
  border: 2px solid white;
  margin: -38px auto 12px;
  border-radius: 50%;
  }
  /* background-image: url("/images/photo.svg"); */

`

const Link = styled.div`
    font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.9);
  font-weight: 600;
`
const AddPhotoText = styled.div`
    color: #0a66c2;
    margin-top: 4px;
    font-size: 12px;
    line-height: 1.33;
    font-weight: 400;
`
const Widget = styled.div`
border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding-top: 12px;
  padding-bottom: 12px;
  & > a {
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 12px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
    div {
      display: flex;
      flex-direction: column;
      text-align: left;
      span {
        font-size: 12px;
        line-height: 1.333;
        &:first-child {
          color: rgba(0, 0, 0, 0.6);
        }
        &:nth-child(2) {
          color: rgba(0, 0, 0, 1);
        }
      }
    }
  }
  svg {
    color: rgba(0, 0, 0, 1);
  }
`
const Item = styled.a`
    border-color: rgba(0, 0, 0, 0.8);
  text-align: left;
  padding: 12px;
  font-size: 12px;
  display: block;
  span {
    display: flex;
    align-items: center;
    color: rgba(0, 0, 0, 1);
    svg {
      color: rgba(0, 0, 0, 0.6);
    }
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`
const MyPages = styled(ArtCard)`
  text-align: left;
  padding: 4px 12px 4px 12px;
  line-height: 20px;
  margin-bottom: 8px;
  h2{
    margin-bottom: 8px;
  }
  a{
    font-size: 12px;
    color: red;
    text-decoration:none;
    font-weight: bold;
    &:hover{
      text-decoration: underline;
    }
  }
`
const CommunityCard = styled(ArtCard)`
  padding: 8px 0 0;
  text-align: left;
  display: flex;
  flex-direction: column;
  a {
    color: black;
    padding: 4px 12px 4px 12px;
    font-size: 12px;
    &:hover {
      color: #0a66c2;
    }
    span {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &:last-child {
      color: rgba(0, 0, 0, 0.6);
      text-decoration: none;
      border-top: 1px solid #d6cec2;
      padding: 12px;
      &:hover {
        background-color: rgba(0, 0, 0, 0.08);
      }
    }
    
  }
`
const ShowMore = styled.button`
display: none;
color: grey;
font-weight: bold;
background-color: #F3F2EF;
width: 100%;
border: none;
font-size: 13px;
padding: 5px 0;
&:hover{
  background-color: #E5E4E1 ;
}
@media(max-width: 768px) {
  display: block;
}
`