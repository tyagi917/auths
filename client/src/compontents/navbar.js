import React,{useContext} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {UserContext} from '../App'

function Navbar()
 {
  const{state,dispatch}=useContext(UserContext)
  const history=useHistory()

  
  const renderList=()=>{
    console.log(state);
    if(state){
      return[
    
      
        <li>  <button className="btn waves-effect waves-light" onClick={()=>{
          localStorage.clear()
          dispatch({type:"CLEAR"})
          history.push('/signin')}}>logout</button></li>
      
        
      
      ]
    }
    else
    {
      return[
    
      <li><Link to="/signin">Login</Link></li>,
        <li><Link to="/signup">Signup</Link></li>

      ]
    }
  }



		return(  
  
	
	<nav>
    <div className="nav-wrapper">
    <Link to={state?"/":"/signin"} className="brand-logo left" >Instagram</Link>
      
      <ul id="nav-mobile" className="right hide-on-med-and-down">
      {renderList()}
      </ul>
    </div>
  </nav>
	
	
        
		);
}
export default Navbar;