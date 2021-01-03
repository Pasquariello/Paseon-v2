import React, { useState } from 'react';

import { faHome, faUserPlus, faKey, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {Box, IconButton, Card, Paper, CardContent, Typography, Grid, CardActions, Button, Link} from '@material-ui/core';


import './navigation.css';


export default function Navigation() {
    console.log('HELLO')
	// eslint-disable-next-line no-unused-vars
	const [ activeNav, setActiveNav ] = useState('');

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
					<span className="logoFont"
						style={{visibility: hoverState ? 'visible': 'hidden', position: 'absolute', color: 'white'}}
					>
                        <Link href="/app/dashboard" color="inherit">
						    <Typography variant="h5">Paseon</Typography>
                        </Link>
					</span>
       
				</div>

				<hr></hr>
				<li 
					className={`
                        ${hoverState ? 'activePathOpen' : 'activePathClosed'}
                        myElem sidebar-item
                    `}
                > 
						<Button size="small" className="btn btn-link" onClick={()=>setActiveNav('home')}>
							<Typography>
								<span 
									className="icon"
								> 
									<FontAwesomeIcon fixedWidth width="0" icon={faHome} color="white"/>
								</span>
                                <span 
                                    className="item-title"
									style={{visibility: hoverState ? 'visible': 'hidden' , position: 'absolute'}}
								>Home</span>
							</Typography>
						</Button>
				</li>
				{/* <li className={`${activeNav === 'addUser' && 'activePath'} myElem sidebar-item`}>  */}
				<li 
					className={`
                        ${hoverState ? 'activePathOpen' : 'activePathClosed'}
                        myElem sidebar-item
                    `}
                > 
                    <Button 
                        size="small"
						className="btn btn-link" 
					>
						<Typography>
							<span 
								className="icon"
							> 
								<FontAwesomeIcon fixedWidth width="0" icon={faUserPlus} color="white"/>
							</span>
							<span className="item-title"
								style={{visibility: hoverState ? 'visible': 'hidden' , position: 'absolute'}}
							>Register New User</span>
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
					>
						<Typography >
							<span className="icon"> 
								<FontAwesomeIcon fixedWidth width="0" icon={faKey} color="white"/>
							</span>
							<span className="item-title" style={{visibility: hoverState ? 'visible': 'hidden' , position: 'absolute'}}>
                                Generate Token
							</span>
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
						onClick={()=> console.log('SIGN OUT')}
					>
						<Typography>
							<span className="icon"> 
								<FontAwesomeIcon fixedWidth width="0" icon={faSignOutAlt} color="white"/>
							</span>
							<span className="item-title" style={{visibility: hoverState ? 'visible': 'hidden' , position: 'absolute'}}>
                                Sign Out
							</span>
						</Typography>
					</Button>
				</li>
			</ul>
		</div>
	)
}
