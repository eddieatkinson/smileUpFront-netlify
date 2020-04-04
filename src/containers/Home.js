import React, { Component } from 'react';
import { connect } from 'react-redux';
import mainSmiles from '../assets/main-smiles.jpg';
import home1 from '../assets/home1.jpg';
import home2 from '../assets/home2.jpg';
import home3 from '../assets/home3.jpg';

import LogoutAction from '../actions/LogoutAction';
import Quotes from '../components/Quotes';
import Contact from '../components/Contact';
import { secretName } from '../utilities';

class Home extends Component {
  state = {
    keystrokes: '',
  }

  buttonClicked() {
    this.props.LogoutAction();
    localStorage.removeItem('smileUpToken');
  }

  renderLogoutButton() {
    if (this.props.auth.token){
      return (
        <button onClick={this.buttonClicked.bind(this)}>Logout</button>
      )
    }
    return null;
  }

  detectKeys(event) {
    const newKeystrokes = this.state.keystrokes + event.key;
    this.setState({
      keystrokes: newKeystrokes,
    });
    const name = secretName;
    if (this.state.keystrokes.toLowerCase().includes(name)) {
      this.setState({
        keystrokes: ''
      });
      this.props.history.push('/signin');
    }
  }

  componentDidMount(){
    document.addEventListener("keydown", this.detectKeys.bind(this));
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.detectKeys.bind(this));
  }

  render() {
    return (
      <div>
        <img className='home-image' src={mainSmiles} alt='smiling children' />
        <div className='text-block home-text'>
          <h1>Welcome to the SmileUp! Charitable Foundation!</h1>
          <p>
            We believe that EVERY CHILD should live a life full of hope, joy, and purpose and we believe this can be done by getting
            children involved in volunteerism and community service efforts that focus on helping other children.<br /><br /> 
            Our mission is to get children involved in volunteerism and community service by partnering with charities and outreach
            organizations that focus on helping children, ultimately bringing a smile and purpose to the lives of ALL children. We
            work with volunteers, donors and SmileUp! Ambassadors to bring joy, restore hope, and provide purpose to every child we
            come into contact with, in hopes to fulfill our organization's motto: "Sometimes your joy is the source of your SMILE, but
            sometimes your SMILE can be the source of your joy!"<br /><br /> 
            To see how we have been making an impact, visit and join our <a className='fb-link' href='https://www.facebook.com/smileupfoundation' target='_blank' rel="noopener noreferrer">Facebook page!</a> 
          </p>
        </div>
        <div className='home-images'>
          <div>
            <img src={home1} alt='image1' />
          </div>
          <div>
            <img src={home2} alt='image2' />
          </div>
          <div>
            <img src={home3} alt='image3' />
          </div>
        </div>
        <Quotes />
        <Contact />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps, {
  LogoutAction,
})(Home);
