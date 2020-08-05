//import React from 'react';
import React,{useState,useContext,} from 'react'
import {UserContext} from '../../App'
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css'
function Login()
{
	const {state,dispatch}=useContext(UserContext)
const history=useHistory();
	//const[name,setName]=useState("")
	const[password,setPassword]=useState("")
	const[email,setEmail]=useState("")
	const Postdata=()=>{
		fetch("/signin",{
			method:"post",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify({
				
				password,
				email
			})
		}).then(res=>res.json()).then(data=>{
			if(data.error){
				M.toast({html:data.error})
			}
			else
			{
				localStorage.setItem("jwt",data.token)
				localStorage.setItem("user",JSON.stringify(data.user))
				//console.log(data);
				dispatch({type:"USER",payload:data.user})
				M.toast({html:"signed in success"})
				history.push('/')
			}
		})
	}



	return(
		<div>
		<div className="card auth">
		<h2>Instagram</h2>
		<input type="text" placeholder="email"
		value={email} onChange={ (e)=>setEmail(e.target.value)}/>
		<input type="text" placeholder="password"
		value={password} onChange={ (e)=>setPassword(e.target.value)}/>
		<button className="btn waves-effect waves-light" onClick={()=>Postdata()}>login</button>
		<h5>
		<Link to="/signup" >Dont have an account?</Link>
		</h5>
		</div>
		</div>
		);
}
export default Login;