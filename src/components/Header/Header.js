import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom'
import { HashLink} from 'react-router-hash-link';
import { withRouter } from "react-router-dom";

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            loginVisible: false,
            isLogged: 
            JSON.parse(localStorage.getItem('logged')),
            username:'',
            password:'',
            error:false
        }
        this.toggleLogin = () => {
            this.setState({ loginVisible: !this.state.loginVisible })
        }
        this.login = (e) => {
            e.preventDefault()
            if(this.state.username==='' || this.state.password===''){
                this.setState({error:true})
            }
            else{
                localStorage.setItem('logged',true)
                this.setState({loginVisible:false,isLogged:true })
                this.setState({error:false})
            }
        }
        this.logout = ()=>{
            if(props.history.location.pathname=== '/mymeals'){
                props.history.push('/')
            }
            localStorage.setItem('logged',false)
            this.setState({loginVisible:false,isLogged:false })
        }
        this.getInputValue=(e)=>{
            this.setState({[e.target.name]:e.target.value})
        }
    }
    render() {
        const { location } = this.props
        const { value, loginVisible, isLogged,error } = this.state
        return (
            <div className='header'>
                <div className='header-links'>
                    {(location.pathname !== '/') ? <Link to='/'>HOME</Link> : null}
                    <HashLink to='/#about'>ABOUT</HashLink>
                    <HashLink to='/#contact'>CONTACT</HashLink>
                    {isLogged && <Link to='/mymeals'>MY MEALS</Link>}
                </div>
                <div className='header-searchbox-wrapper'>
                    <div className='header-searchbox'>
                        <input type='text' name='value' onChange={this.getInputValue} placeholder='Search recipes' />
                        <div className='icon-wrapper'>
                            <Link to={`/search/${value}`}>></Link>
                        </div>
                    </div>
                </div>
                <div className='login-wrapper'>
                    <img src='../assets/icons/user.png' onClick={this.toggleLogin} alt='user'/>
                    {loginVisible &&
                        <div className='login-form'>
                            {!isLogged ?
                                <form>
                                    <input type='text' name='username' placeholder='Username' onChange={this.getInputValue} value={this.state.username}/>
                                    <input type='password' name='password'autoComplete='true' placeholder='Password' onChange={this.getInputValue} value={this.state.password}/>
                                    <p className={`login-message ${error?'show':'hide'}`}>All fields required</p>
                                    <input type='submit' value='LOGIN' onClick={this.login} />
                                </form> : 
                                <div className='logout-wrapper'>
                                    <input type='button' onClick={this.logout} value='LOGOUT'/>
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
        )
    }

}
export default withRouter(Header);
