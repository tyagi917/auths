//import React from 'react';
import React,{useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
function Signup()
{
	const history=useHistory();
	const[name,setName]=useState("")
	const[password,setPassword]=useState("")
	const[email,setEmail]=useState("")
	const Postdata=()=>{
		fetch("/signup",{
			method:"post",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify({
				name,
				password,
				email
			})
		}).then(res=>res.json()).then(data=>{
			if(data.error){
				M.toast({html:data.error})
			}
			else
			{
				M.toast({html:data.message})
				history.push('/signin')
			}
		})
	}

	return(
		<div className="cards">
		<div className="card auth">
		<h2>Instagram</h2>
		<input type="text" placeholder="name"
		value={name} onChange={ (e)=>setName(e.target.value)}/>
		<input type="text" placeholder="email"
		value={email} onChange={ (e)=>setEmail(e.target.value)}/>
		<input type="text" placeholder="password"
		value={password} onChange={ (e)=>setPassword(e.target.value)}/>
		<button className="btn waves-effect waves-light" onClick={()=>Postdata()}>SignUp</button>
		<h5>
		<Link to="/signin" >Already have an account?</Link>
		</h5>
		</div>
		</div>
		);
}
export default Signup;