import React from "react"

function User(props){

    return (
        <div className="Users">
            <p>{props.firstName}</p>
            <p>{props.email}</p>
            <p>{props.phoneNum}</p>
            <p>{props.dob}</p>
        </div>
    )
}

export default User