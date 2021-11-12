import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import styled from 'styled-components'
import LeftSide from './LeftSide'
import Main from './Main'
import RightSide from './RightSide'

function Home({user}) {

    return (
        <Container>
            {
                !user && <Redirect to = '/' />
            }
            <Section>
                <h5>
                    <a>
                        Hiring in a hurry ? -
                    </a>
                    <p>Find talented pros in record time with Upwork and keep business moving</p>
                </h5>
            </Section>

            <Layout>
                <LeftSide />
                <Main />
                <RightSide />            
            </Layout>
        </Container>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.userState.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
     
    }
}
export default connect (mapStateToProps, mapDispatchToProps )(Home)


const Container = styled.div`
    margin: 0 auto;
    padding-top: 52px;
    max-width: 1100px;

    `
const Content = styled.div`
    max-width: 1128px;
    margin-left: auto;
    margin-right: auto;
    
    `
const Section = styled.section`
    min-height: 50px;
    padding: 16px 0;
    box-sizing: content-box;
    text-align: center;
    text-decoration: underline;
    display: flex;
    justify-content: center;
    h5 {
        color: #0a66c2;
        font-size: 14px;
        a {
            font-weight: 700;
        }
    }
    p {
        font-size: 14px;
        color: #434649;
        font-weight: 600;
    }
    
    
    @media (max-width: 768px) {
        flex-direction: column;
        padding: 0 5px;
    }
    `
const Layout = styled.div`
    position: relative;
    display: grid;
    grid-template-areas: 'leftside main rightside';
    /* grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr); */
    column-gap: 25px;
    row-gap: 25px;
    grid-template-rows: auto;
    margin: 25px 0;
    
    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 0 15px;
    }
`
