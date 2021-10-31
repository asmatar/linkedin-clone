import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getFriendAPI } from '../redux/actions';

const RightSide = ({getFriend, friends}) => {
 
  useEffect(()=> {
   
    getFriend()
  }, [])

  let listee = friends.sort(() => Math.random() - 0.5).slice(0,3)
  return (
        <Container>
            <FollowCard>
                <Title>
                    <h2>refresh random friend from db </h2>
                    <img src="/images/feed-icon.svg" alt="" />
                </Title>
                {
                  listee.map(friend=>{
                    return (
                      <FeedList key={friend.name}>
                      <Avatar >
                      <img src={friend.picture} alt="" />
                      </Avatar>
                      <Info>
                        <Name>
                         { friend.name}
                        </Name>
                        <p>{ friend.profession}</p>
                        <button>Follow</button>
                      </Info>
                  </FeedList>
                    )
                  })
                }
               < Recommendation>
                    View all recommendations
                    <img src="/images/right-icon.svg" alt="" />
                </Recommendation>
            </FollowCard>    
            <BannerCard>
                <img
                src="/images/job.jpg"
                alt=""
                />
            </BannerCard>    
        </Container>
    )
}
const mapStateToProps = (state) => {
  return {
     friends: state.friendState.friends
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFriend: () => dispatch(getFriendAPI())
  }
}

export default connect (mapStateToProps,mapDispatchToProps )(RightSide) 

const Container = styled.div`
    grid-area: rightside;
    position: relative;
    width: 100%;
    /* width: 250px; */
    /* @media (min-width: 768px) and (max-width: 900px) {
        width: 220px;   
        padding: 0 5px;
    } */
`
const FollowCard = styled.div`
    text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  padding: 12px;
`
const Title = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  width: 100%;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 10px;
`
const FeedList = styled.div`
  line-height: 18px;
  display: flex;
  /* margin-top: 16px; */
  /* li {
    display: flex;
    align-items: center;
    margin: 12px 0;
    position: relative;
    font-size: 14px;
    & > div {
      display: flex;
      flex-direction: column;
    } */
    p{
      color:grey;
      font-size: 12px;
    }
    button {
      background-color: transparent;
      color: rgba(0, 0, 0, 0.6);
      /* box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.6); */
      padding: 16px;
      align-items: center;
      border-radius: 40px;
      box-sizing: border-box;
      font-weight: 600;
      display: inline-flex;
      justify-content: center;
      max-height: 32px;
      /* max-width: 480px; */
      width: 94px;
      text-align: center;
      outline: none;
      margin-bottom: 10px;
      margin-top: 5px;
    }
`
const Info = styled.div`
text-align: left;
`
const Name = styled.div`
  font-weight: bold;
  font-size: 12px;

`
const Avatar = styled.div`
img{
   /* background-image: url("https://static-exp1.licdn.com/sc/h/1b4vl1r54ijmrmcyxzoidwmxs"); */
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    width: 48px;
    height: 48px;
    margin-right: 8px;
    border-radius: 50%;
}
   
`
const Recommendation = styled.a`
  color: #0a66c2;
  display: flex;
  align-items: center;
  font-size: 14px;
`;
const BannerCard = styled(FollowCard)`
  img {
    width: 100%;
    height: 100%;
  }
`;
