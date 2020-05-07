import React, { useState, useEffect } from 'react'
import './style.css'
import API from "../../utils/API"
import GameCard from "../GameCard/index"

function UserPageAvatar(props) {

    const changeAvatar = e => {
        const obj = {
            user: props.user,
            avatar: e.target.src
        }
        API.changeAvatar(obj)
        .then(res => {
            alert("Avatar changed successfully.")
            console.log(res)
        })
        .catch(err => console.log(err))
    }


    return (
        <>
            <h4>Pick Your Avatar</h4>

            <div>
                <img className="profilePic newAvatar" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/feac120a-4482-4a91-9cee-fce7fbde0dbe/dawwejk-40a4c28d-0e29-49c0-8bea-848ca6b52f71.jpg/v1/fill/w_1024,h_1266,q_75,strp/ashton__c__by_astri_lohne_dawwejk-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI2NiIsInBhdGgiOiJcL2ZcL2ZlYWMxMjBhLTQ0ODItNGE5MS05Y2VlLWZjZTdmYmRlMGRiZVwvZGF3d2Vqay00MGE0YzI4ZC0wZTI5LTQ5YzAtOGJlYS04NDhjYTZiNTJmNzEuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.tuRmJARhtoN9PY1Hmr9HHJoaTQ0J-bly2LMIHVIWj_E" onClick={changeAvatar} alt="Avatar" style={{ marginLeft: "20px" }}/>

                <img className="profilePic newAvatar" src="https://cdnb.artstation.com/p/assets/images/images/004/406/191/large/astri-lohne-sjursen-tyrande-copy.jpg?1483476556" alt="Avatar" onClick={changeAvatar} style={{ marginLeft: "20px" }}/>

                <img className="profilePic newAvatar" src="https://cdnb.artstation.com/p/assets/images/images/005/820/491/large/astri-lohne-sjursen-sesshomaru.jpg?1493987630" alt="Avatar" onClick={changeAvatar} style={{ marginLeft: "20px" }}/>

                <img className="profilePic newAvatar" src="https://cdna.artstation.com/p/assets/images/images/013/040/564/large/astri-lohne-megan.jpg?1543674510" alt="Avatar" onClick={changeAvatar} style={{ marginLeft: "20px" }}/>

                <img className="profilePic newAvatar" src="https://cdna.artstation.com/p/assets/images/images/004/986/510/large/astri-lohne-sjursen-corvus.jpg?1487682920" alt="Avatar" onClick={changeAvatar} style={{ marginLeft: "20px" }}/>

                <br />

                <h4>Locked</h4>

                <img className="profilePic newAvatar locked" src="https://cdna.artstation.com/p/assets/images/images/005/438/184/large/astri-lohne-sjursen-amelielr.jpg?1491160000" alt="Avatar" style={{ marginLeft: "20px" }}/>

                <img className="profilePic newAvatar locked" src="https://cdnb.artstation.com/p/assets/images/images/008/533/537/large/astri-lohne-ishtyh-final-small.jpg?1513361080" alt="Avatar" style={{ marginLeft: "20px" }}/>

                <img className="profilePic newAvatar locked" src="https://cdnb.artstation.com/p/assets/images/images/019/469/361/large/andres-rios-0at.jpg?1563635703" alt="Avatar" style={{ marginLeft: "20px" }}/>


                
            </div>
        </>
    )
}

export default UserPageAvatar;