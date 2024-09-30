import React from 'react';
import CreateTeamPopup from './CreateTeamPopup';
import AddMemberPopup from './AddMemberPopup';

import './CreateTeam.css';



const CreateTeam: React.FC = () => {

    return (<>
        <>HELLLLOOOOO</>
        <div>
            <CreateTeamPopup onClose={() => {}} onCreateTeam={() => {}} editName={undefined}/>
        </div>
        <div>
            <AddMemberPopup onClose={() => {}} onAddMember={() => {}} />
        </div>
        </>
    );
};

export default CreateTeam;

