import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import { signInAPI } from '../redux/actions';

//Login 2 : we pass it on props
function Login({signIn, user}) {
    return (
        <Container>
            {
                user && <Redirect to = '/home' />
            }
            <Nav>
                <a href="/">
                    <img src="/images/login-logo.svg" alt="" />
                </a>
                <Bouton >
                    <Join>Join now</Join>
                    <SignIn>Sign-in</SignIn>
                </Bouton>
            </Nav>
            <Section>
                <Hero>
                    <h1>Welcome to your profesional comunity</h1>
                    <img src="/images/login-hero.svg" alt="login hero" />
                </Hero>
                <Form>
                    {/* Login 1 : on click we callback a function sign in */}
                    <Google onClick={() => signIn()}>
                        <img src="/images/google.svg" alt="" />
                        sign in with google
                    </Google>
                </Form>
            </Section>
        </Container>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.userState.user
    }
}
// Login 3 : sign in, callback another function 'signInAPI' ( action creator)
const mapDispatchToProps = (dispatch) => {
    return {
        signIn : () => {
            dispatch(signInAPI())
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps )(Login)

const Container = styled.div`
  padding: 0px;
`;

const Nav = styled.nav`
  max-width: 1128px;
  margin: auto;
  padding: 12px 0 16px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;
  & > a {
    width: 135px;
    height: 34px;
    @media (max-width: 768px) {
      padding: 0 5px;
    }
  }
`;

const Join = styled.a`
  font-size: 16px;
  padding: 10px 12px;
  text-decoration: none;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.6);
  margin-right: 12px;
  margin: auto;
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 0.9);
    text-decoration: none;
  }
`;

const SignIn = styled.a`
  box-shadow: inset 0 0 0 1px #0a66c2;
  color: #0a66c2;
  border-radius: 24px;
  transition-duration: 167ms;
  font-size: 16px;
  font-weight: 600;
  line-height: 40px;
  padding: 10px 24px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);
  &:hover {
    background-color: rgba(112, 181, 249, 0.15);
    color: #0a66c2;
    text-decoration: none;
  }
`;

const Section = styled.section`
  display: flex;
  align-content: start;
  min-height: 700px;
  padding-bottom: 138px;
  padding-top: 40px;
  padding: 60px 0;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1128px;
  align-items: center;
  margin: auto;
  @media (max-width: 768px) {
    margin: auto;
    min-height: 0px;
  }
`;

const Hero = styled.div`
  width: 100%;
  h1 {
    padding-bottom: 0;
    width: 55%;
    font-size: 56px;
    color: #2977c9;
    font-weight: 200;
    line-height: 70px;
    @media (max-width:1024px) and (min-width:769px) {
        padding-bottom: 0;
        width: 55%;
        font-size: 45px;
        color: #2977c9;
        font-weight: 200;
        line-height: 70px;
    } 
    @media (max-width: 768px) {
      text-align: center;
      font-size: 25px;
      width: 100%;
      line-height: 2;
    }
  }
  img { 
    /* z-index: -1; */
    /* width: 700px;
    height: 670px; */
    width: 700px;
    height: 670px;
    position: absolute;
    bottom: -2px;
    right: -50px;
    @media (max-width:1024px) and (min-width:769px) {
    width: 670px;
    height: 620px;
    }
    @media (max-width: 768px) {
    width: 600px;
    height: 550px;
    left: 50%;
    margin: 20px auto 0;
      position: initial;
      /* height: initial;  */
    /* top: 230px;
      width: initial;
      position: initial;
      height: initial;  */
    }
  }
`;

const Form = styled.div`
  margin-top: 100px;
  width: 408px;
  @media (max-width:1024px) and (min-width:769px) {
  width:70%
  }
  @media (max-width: 768px) {
    margin: 20px auto 0;
  }
`;

const Google = styled.button`
  @media (max-width:1024px) and (min-width:769px) {
  width:40%
  }
  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  height: 56px;
  width: 100%;
  border-radius: 28px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%),
    inset 0 0 0 2px rgb(0 0 0 / 0%) inset 0 0 0 1px rgb(0 0 0 / 0);
  vertical-align: middle;
  z-index: 0;
  transition-duration: 167ms;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);
  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 0.75);
  }
`;

const Bouton =styled.div`
display: flex;
`