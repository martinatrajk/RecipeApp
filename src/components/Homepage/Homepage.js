import React from 'react'
import './Homepage.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
import headersImg from '../../assets/images/header.png'
import aboutImg from '../../assets/images/about.jpg'

class Homepage extends React.Component {
    constructor(){
        super()
        this.state = {
            categories: [],
            contactData: {
                firstName: '',
                lastName: '',
                email: '',
                message: ''
            },
            error:false,
            messageDelivered:false
        }
        this.formData = (e) => {
            this.setState({
                contactData: { ...this.state.contactData, [e.target.name]: e.target.value }
            })
        }
        this.submitForm = (e) => {
            e.preventDefault()
            const {contactData} = this.state
            const {firstName,lastName,email,message}=contactData
            if(firstName===''||lastName===''||email===''||message===''){
                this.setState({error:true})
            }
            else{
                localStorage.setItem('contactInfo', JSON.stringify(contactData))
                this.setState({error:false})
                this.setState({
                    contactData: { ...contactData, firstName: '',lastName:'',email:'',message:'' }
                ,messageDelivered:true})
            }
        }
    }
    componentDidMount = () => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/categories.php`)
        .then(res => {
          this.setState({categories:res.data.categories})
        })
    }

    render() {
        const {error,categories,contactData,messageDelivered} = this.state
        const {firstName,lastName,email,message}=contactData
        return (
            <div className='homepage'>
                <div className='headers'>
                    <div className='headers-image'>
                        <img src={headersImg} alt='food'></img>
                    </div>
                    <div className='headers-text'>
                        <p className='text-title'>FOOD RECIPES</p>
                        <p className='text-content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    </div>
                    <div className='categories-button'>
                        <a href='#categories' >CATEGORIES</a>
                    </div>
                </div>
                <div className='categories-wrapper' id='categories'>
                    <div className='title-wrapper'>CATEGORIES</div>
                    <div className='category-tickets-wrapper'>
                        {categories.map(category => {
                            return (
                                <Link to={`category/${category.strCategory}`} key={category.idCategory} className='category-ticket'>
                                    <img className='category-image' src={`${category.strCategoryThumb}`} alt='food'></img>
                                    <p>{category.strCategory}</p>
                                </Link>
                            )
                        })}
                    </div>
                </div>
                <div className='about-wrapper' id='about'>
                    <div className='title-wrapper'>
                        <p>ABOUT US</p>
                    </div>
                    <div className='about-content'>
                        <div className='about-text'>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>
                        </div>
                        <div className='about-image-wrapper'>
                            <img src={aboutImg} alt='about'></img>
                        </div>
                    </div>
                </div>
                <div className='contact-wrapper' id='contact'>
                    <div className='title-wrapper'>
                        <p>CONTACT</p>                    
                        </div>
                    <div className='form-wrapper'>
                        <div className={`message-delivered ${messageDelivered?'show':'hide'}`}>THANK YOU FOR YOUR MESSAGE</div>
                        <form>
                            <input onChange={this.formData} type='text' name='firstName' placeholder='First Name' value={firstName} />
                            <input onChange={this.formData} type='text' name='lastName' placeholder='Last Name' value={lastName} />
                            <input onChange={this.formData} type='email' name='email' placeholder='Email' value={email} />
                            <textarea onChange={this.formData} name='message' placeholder='Message' value={message} />
                            <p className={`form-message ${error?'show':'hide'}`}>All fields required</p>
                            <input type='submit' onClick={this.submitForm} value='SEND'/>
                        </form>
                    </div>

                </div>
            </div>
        )
    }
}
export default Homepage