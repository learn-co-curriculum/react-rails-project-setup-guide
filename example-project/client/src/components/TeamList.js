import React from 'react';
import TeamCard from './TeamCard'

function TeamList ( {services, id, handleTeamClick, TeamId, setTeamId, setTeamName } ) {

    return (
        <ul className="cards">{services.map((service) => {
            return <TeamCard  id = {id} key = {service.id} service = {service} handleTeamClick={handleTeamClick} TeamId={TeamId} setTeamId={setTeamId} setTeamName={setTeamName}/>
        })}</ul>
      );
};

export default TeamList;