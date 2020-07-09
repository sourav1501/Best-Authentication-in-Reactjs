import React from 'react'
import { Link, withRouter } from "react-router-dom"
import { isAuth, signout } from '../auth/helpers'
function Layout({ children, match, history }) {
    const isActive = (path) => {
        // if(history.location.pathname===path){

        if (match.path === path) {
            return { color: '#000' }

        } else {
            return { color: '#fff' }
        }
    }
    const nav = () => (
        <ul className='nav nav-tabs bg-primary'>
            <li className="nav-item">
                <Link to="/" className="nav-link" style={isActive('/')}>Home</Link>
            </li>
            {!isAuth() &&
                <React.Fragment>
                    <li>
                        <Link to="/signup" className="nav-link" style={isActive('/signup')}>Signup</Link>

                    </li>
                    <li>
                        <Link to="/signin" className="nav-link" style={isActive('/signin')}>Signin</Link>

                    </li>
                </React.Fragment>
            }

            {
                isAuth() &&
                <React.Fragment>
                    <li>
                        <span  className="nav-link"  
                        style={isActive('/signout')}
                        onClick={() => {
                            signout(() => {
                                history.push('/')
                            })
                        }}
                        >Signout</span>

                    </li>
                </React.Fragment>
            }
            {
                isAuth() && isAuth().role=='admin'&&(
                    <li>
                        <Link  to="/admin" className="nav-link" style={isActive('/admin')}>{isAuth().name}</Link>

                    </li>
                )
                }
                 {
                isAuth() && isAuth().role==='subscriber'&& (
                    <li>
                        <Link  to="/private" className="nav-link" style={isActive('/private')}>{isAuth().name}</Link>

                    </li>
                )
                }
        </ul>
    )
    return (
        <React.Fragment>
            {nav()}
            <div className="container">{children}</div>
        </React.Fragment>
    )
}
export default withRouter(Layout)