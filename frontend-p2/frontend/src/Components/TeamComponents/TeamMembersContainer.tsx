import { useEffect, useState } from "react"
import { TeamMembers } from "./TeamList"
import { UserInterface } from "../../Interfaces/UserInterface"

export const TeamMembersContainer:React.FC = () => {
    const [teamMemberList, setTeamMemberList] = useState<UserInterface[]>([]) /** */

    const [teamMember, setTeamMember] = useState<UserInterface>()

    useEffect(() => {

    }, [teamMemberList]);

    return (
        <div className="team-members-container">
            <div style={{ textAlign: 'center', marginRight: '225px' }}>
                <TeamMembers teamMembers={teamMemberList}></TeamMembers>
            </div>
        </div>
    )
}

{/*Functionality: Manages team-related tasks (create, edit, manage).
o	Endpoints:
	POST /team to create a new team.
	PATCH /team/name/{newTeamName} to change the team name.

o	Functions:
	createTeam(name): Creates a new team.
	editTeamName(teamId, newTeamName): Updates the team name.
 */}