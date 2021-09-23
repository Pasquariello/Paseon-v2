import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from 'src/actions/accountActions';

import { faHome, faUserPlus, faUser, faPlus, faKey, faHammer, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {Box, IconButton, Card, Paper, CardContent, Typography, Grid, CardActions, Button, Link} from '@mui/material';
import { useHistory } from 'react-router';

import './navigation.css';
import logo from 'src/assets/images/PaseonLogo_BlackBackground.png';


export default function Navigation() {
	const dispatch = useDispatch();

	// eslint-disable-next-line no-unused-vars
	const [ activeNav, setActiveNav ] = useState('');
	const history = useHistory();

	const [ hoverState, setHoverState ] = useState(false)


	const toggleState = () => {
		setHoverState(!hoverState)
	} 


	return(
		<div  onMouseEnter={()=> setHoverState(true)} onMouseLeave={()=> setHoverState(false)}
			// onClick={()=> toggleState()} // Need onClick for mobile view!
			className={`${hoverState ?  'sidenav-active' : 'sidenav-hidden'} sidenav`}
		>
			<ul>
				<div className="navWrap">
					<Button className="navbar-toggler" onClick={() => toggleState()} type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
						<span className={hoverState ? 'active' : ''} style={{display:'block', margin: '0 auto'}}>
							<div className="toggle-btn type11"></div>
						</span>
					</Button>
					{/* <span className="logoFont"
						style={{visibility: hoverState ? 'visible': 'hidden', position: 'absolute', color: 'white'}}
					>
						<div style={{background: 'red', display: 'flex', alignItems: 'center'}}>
                        <Link href="/app/dashboard" color="inherit">
							<img width={100} src={logo}/>
                        </Link>
						</div>
					</span> */}
       
				</div>

				<hr></hr>
				<li 
					className={`
                        ${hoverState ? 'activePathOpen' : 'activePathClosed'}
                        myElem sidebar-item
					`}
					onClick={()=>  {
						history.push('/app/dashboard')
						setActiveNav('home')
					}}
                > 
						<Button size="small" className="btn btn-link">
							<Typography>
								<span 
									className="icon"
								> 
									<FontAwesomeIcon fixedWidth width="0" icon={faHome} color="white"/>
								</span>
                                <span 
                                    className="item-title"
									style={{visibility: hoverState ? 'visible': 'hidden' }}
								>Home</span>
							</Typography>
						</Button>
				</li>
				<li 
					className={`
                        ${hoverState ? 'activePathOpen' : 'activePathClosed'}
                        myElem sidebar-item
					`}
					onClick={() => {
						history.push('/app/form-builder')
					}}
                > 
                    <Button 
                        size="small"
						className="btn btn-link" 
					>
						<Typography>
							<span 
								className="icon"
							> 
								<FontAwesomeIcon fixedWidth width="0" icon={faHammer} color="white"/>
							</span>
							<span className="item-title"
								style={{visibility: hoverState ? 'visible': 'hidden'}}
							>Build New Form</span>
						</Typography>
					</Button>
				</li>
				<li 
					className={`
                        ${hoverState ? 'activePathOpen' : 'activePathClosed'}
                        myElem sidebar-item
					`}
					onClick={()=>  {
						history.push('/app/dashboard')
						setActiveNav('home')
					}}
                > 
						<Button size="small" className="btn btn-link">
							<Typography>
								<span 
									className="icon"
								> 
									<FontAwesomeIcon fixedWidth width="0" icon={faUser} color="white"/>
								</span>
                                <span 
                                    className="item-title"
									style={{visibility: hoverState ? 'visible': 'hidden' }}
								>Account Details</span>
							</Typography>
						</Button>
				</li>
				
				<li 
					className={`
                        ${hoverState ? 'activePathOpen' : 'activePathClosed'}
                        myElem sidebar-item
                    `}
				> 
                    <Button 
                        size="small"
						className="btn btn-link" 
						onClick={()=> dispatch(logout())}
					>
						<Typography>
							<span className="icon"> 
								<FontAwesomeIcon fixedWidth width="0" icon={faSignOutAlt} color="white"/>
							</span>
							<span className="item-title" style={{visibility: hoverState ? 'visible': 'hidden'}}>
                                Sign Out
							</span>
						</Typography>
					</Button>
				</li>
			</ul>
		</div>
	)
}
