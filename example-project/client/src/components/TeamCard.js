

import { useNavigate } from "react-router-dom";


    
    function TeamCard( {name, id, handleTeamClick, TeamId, setSetId, setTeamName } ) {
        //const {name, image_url} = service;
      //   should we also do rating? can't access it from the current table, though
      
          function handleClicking(){
            handleTeamClick()
            setTeamId(service.id)
            setTeamName(name)
          }
      
        const navigate = useNavigate();
        return (
            <li onClick={() => handleClicking()} className="individual-card">
              <div className="container-card">
                <div className="row">
                  <div className="col">
                    <div className="card h-100">
                      <img className="card-image" variant="top" src={image_url} alt={name}/>
                      <div className="card-text">
                        <h3>{name}</h3>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
        );
      }
      
      export default TeamCard;

