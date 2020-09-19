import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
//Context
import organizationContext from '../../context/organizations/organizationContext';
import authContext from '../../context/auth/authContext';
//style
import './getOrganizations.css'

const GetOrganizations = () => {

    //Context
    const OrganizationContext = useContext(organizationContext);
    const { getOrganizations, organizations } = OrganizationContext;
    const AuthContext = useContext(authContext);
    const { user } = AuthContext;

    useEffect(() => {
        if (user) {
            getOrganizations(user.email);
        }
    }, [])

    return (
        <div>
            {
                organizations ? organizations.map(org => {
                    return (<li className="my-3" key={org._id}><Link to={`/dashboard/${org._id}`}><img className="organizations-logo" src={org.photo} alt="..." />{org.name}</Link></li>)
                })
                    : null
            }
        </div>


    )
}

export default GetOrganizations
