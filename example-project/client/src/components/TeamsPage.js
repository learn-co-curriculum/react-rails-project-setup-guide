import React, { useState, useEffect } from "react";
// import Players from './Players'
import TeamList from './TeamList'
// import SideBar from "./SideBar";
// import WinnerList from "./WinnerList";
// import PlayerList from './PlayerList'


function TeamPage () {
    const [service, setService] = useState(null);
    const [header, setHeader] = useState(null);
    const [id, setId] = useState("");
    const [winner, setWinner] = useState([]);
    const [team, setTeam] = useState([])
    const [switchTrue, setSwitchTrue] = useState(false)
    const [teamId, setTeamId] = useState(null)
    const [teamName, setTeamName] = useState("")
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        console.log(order) 
      }, [order])
      useEffect(() => {
        fetch(`teams/players`)
        .then((r) => r.json())
      .then((team) => setTeam(team));
  }, []);
  
      useEffect(() => {
          fetch(`/teams`)
          .then((r) => r.json())
        .then((service) => setService(service));
    }, []);
  

  
    const displayedTeams = service

  
    const deliveryPage = <div className="delivery-page">
    <div className="main-column">
      <div className="team-header">
        <span role="img">
            <img className="delivery-picture" src="https://cdn-icons-png.flaticon.com/512/1048/1048329.png"></img>
        </span>
        <h1 className="team-header">{teamName}</h1>
        </div>
      <PlayerList team={team} handleSetOrder={handleSetOrder} teamName={teamName} setDisplay={setDisplay}/>
    </div>
    </div>
  
    const teamPage = 
        <div className="main-column">
          <div className="team-header">
            <span role="img">
              <a href="/">
                <img className="delivery-picture" src="https://cdn-icons-png.flaticon.com/512/1048/1048329.png"></img>
              </a>
            </span>
            <h1 className="team-header">{header}</h1>
          </div>
          <div className="sponsored-team">
            <img className="sponsored-pic" src="https://images.unsplash.com/photo-1629814249584-bd4d53cf0e7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80"/>
            <p className="sponsor-text">Sponsored</p>
          </div>
          <RestaurantSearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm}/>
          <TeamList services={displayedTeams} id={id} handleTeamClick={handleTeamClick} teamId={teamId} setTeamId={setTeamId} setTeamName={setTeamName}/>
        </div>
    
    function handleTeamClick(){
      setSwitchTrue(!switchTrue)
      console.log(switchTrue)
    }
}
  
  export default TeamPage;