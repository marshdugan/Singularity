import React, { useState, useEffect } from "react";
import "./style.css";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import Library from "../../components/Library"
import UserPageDeck from "../UserPageDeck";
import UserPageCards from "../UserPageCards";
import UserPageStats from "../UserPageStats";
import UserPageAvatar from "../UserPageAvatar";
import API from '../../utils/API'

function UserPage(props) {
  // const [cards, setCards] = useState([])

  const [user, setUser] = useState("")
  const [avatar, setAvatar] = useState("")


  useEffect(() => {
    API.getOneUser(props.user)
    .then(res => {
      setUser(res.data.name)
      setAvatar(res.data.avatar)
    })
    .catch(err => console.log(err))
    var el = document.querySelectorAll(".tabs");
    var instance = M.Tabs.init(el, {});
  }, []);

  return (
    <>
      {/* <img class="headerPhoto" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/feac120a-4482-4a91-9cee-fce7fbde0dbe/dawwejk-40a4c28d-0e29-49c0-8bea-848ca6b52f71.jpg/v1/fill/w_1024,h_1266,q_75,strp/ashton__c__by_astri_lohne_dawwejk-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI2NiIsInBhdGgiOiJcL2ZcL2ZlYWMxMjBhLTQ0ODItNGE5MS05Y2VlLWZjZTdmYmRlMGRiZVwvZGF3d2Vqay00MGE0YzI4ZC0wZTI5LTQ5YzAtOGJlYS04NDhjYTZiNTJmNzEuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.tuRmJARhtoN9PY1Hmr9HHJoaTQ0J-bly2LMIHVIWj_E" alt="cover" /> */}
      <img className="profilePic center" src={avatar} alt="Avatar" style={{ marginTop: "15px" }}/>
      <h3 className="center-align">{user}</h3>
      <nav className="nav-extended">
        <div className="nav-content">
          <ul className="tabs tabs-transparent">
            <li className="tab"><a href="#decks">Decks</a></li>
            <li className="tab"><a className="active" href="#cards">Cards</a></li>
            <li className="tab"><a href="#stats">Stats</a></li>
            <li className="tab"><a href="#avatar">Avatar</a></li>
          </ul>
        </div>
      </nav>
      <div id="decks" className="col s12">
        <UserPageDeck user={props.user}/>
      </div>
      <div id="cards" className="col s12">
        <UserPageCards user={props.user}/>
      </div>
      <div id="stats" className="col s12">
        <UserPageStats user={props.user}/>
      </div>
      <div id="avatar" className="col s12">
        <UserPageAvatar user={props.user}/>
      </div>
    </>
  );
}

export default UserPage;
