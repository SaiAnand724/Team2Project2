# React Components with API Integration

## 1. Utility Components

### ThemeProvider
- **Functionality:** Manages and provides theme context for light/dark mode.
- **Endpoints:** None directly associated with this component.

### ErrorBoundary
- **Functionality:** Catches JavaScript errors in the component tree and displays an error message.
- **Endpoints:** None directly associated with this component.

### ToastNotification
- **Functionality:** Displays toast notifications for alerts and messages.
- **Endpoints:** None directly associated with this component.

### ThemeSwitcher
- **Functionality:** Allows users to toggle between light and dark modes.
- **Endpoints:** None directly associated with this component.

## 2. Common Components

### Navbar
- **Functionality:** Provides navigation links and theme switcher.
- **Endpoints:** None directly associated with this component.

### Footer
- **Functionality:** Displays footer information.
- **Endpoints:** None directly associated with this component.

### Button
- **Functionality:** Customizable button component used throughout the app.
- **Endpoints:** None directly associated with this component.

### Modal
- **Functionality:** Generic modal component for displaying dialogs and forms.
- **Endpoints:** None directly associated with this component.

### Loader
- **Functionality:** Displays a loading spinner or animation during data fetching.
- **Endpoints:** None directly associated with this component.

## 3. Player Components

### PlayerList
- **Functionality:** Displays a list of players.
- **Endpoints:**
  - `GET /players` to fetch all players.
- **Functions:**
  - `fetchPlayers()`: Fetches and displays a list of players.

### PlayerCard
- **Functionality:** Shows individual player details.
- **Endpoints:**
  - `GET /player/{playerId}` to fetch details of a specific player.
- **Functions:**
  - `fetchPlayerDetails(playerId)`: Fetches details of a specific player.

### PlayerInvite
- **Functionality:** Allows managers to invite players to a team.
- **Endpoints:**
  - `POST /team/proposal` to send a team invite.
- **Functions:**
  - `sendPlayerInvite(playerId, teamId)`: Sends an invite to a player.

### PlayerDetails
- **Functionality:** Displays detailed information about a specific player.
- **Endpoints:**
  - `GET /player/{playerId}` to fetch player details.
- **Functions:**
  - `fetchPlayerDetails(playerId)`: Fetches detailed information about a player.

### PlayerStats (Stretch goal)
- **Functionality:** Shows player statistics and performance metrics.
- **Endpoints:** ?

## 4. Sponsor Components

### SponsorList
- **Functionality:** Displays a list of sponsors.
- **Endpoints:**
  - `GET /sponsors` to fetch all sponsors.
- **Functions:**
  - `fetchSponsors()`: Fetches and displays a list of sponsors.

### SponsorCard
- **Functionality:** Shows individual sponsor details.
- **Endpoints:**
  - `GET /sponsor/{sponsorId}` to fetch details of a specific sponsor.
- **Functions:**
  - `fetchSponsorDetails(sponsorId)`: Fetches details of a specific sponsor.

### SponsorProposal
- **Functionality:** Allows sponsors to send proposals to teams.
- **Endpoints:**
  - `POST /sponsor/proposal` to send a proposal.
- **Functions:**
  - `sendSponsorProposal(teamId, amount)`: Sends a proposal to a team.

### SponsorDetails
- **Functionality:** Displays detailed information about a specific sponsor.
- **Endpoints:**
  - `GET /sponsor/{sponsorId}` to fetch sponsor details.
- **Functions:**
  - `fetchSponsorDetails(sponsorId)`: Fetches detailed information about a sponsor.

### SponsorBudget
- **Functionality:** Manages and displays sponsor budget information.
- **Endpoints:**
  - `GET /sponsor/balance` to fetch the remaining balance.
  - `PATCH /sponsor/budget/{newBudget}` to update the budget.
- **Functions:**
  - `fetchSponsorBalance()`: Retrieves the remaining balance.
  - `updateSponsorBudget(newBudget)`: Updates the sponsor’s budget.

## 5. Proposal Components

### ProposalList
- **Functionality:** Displays a list of proposals (PlayerInvite or SponsorProposal).
- **Endpoints:**
  - `GET /proposals` to fetch all proposals.
- **Functions:**
  - `fetchProposals()`: Fetches and displays a list of proposals.

### ProposalCard
- **Functionality:** Shows details of a specific proposal.
- **Endpoints:**
  - `GET /proposal/{proposalId}` to fetch details of a specific proposal.
- **Functions:**
  - `fetchProposalDetails(proposalId)`: Fetches details of a specific proposal.

### ProposalForm
- **Functionality:** Form for creating and submitting new proposals.
- **Endpoints:** None directly associated with this component.

### ProposalDetails
- **Functionality:** Displays detailed information about a specific proposal.
- **Endpoints:**
  - `GET /proposal/{proposalId}` to fetch proposal details.
- **Functions:**
  - `fetchProposalDetails(proposalId)`: Fetches detailed information about a proposal.

### ProposalStatus
- **Functionality:** Displays and manages the status of proposals.
- **Endpoints:**
  - `PATCH /proposal/team/{decision}` or `PATCH /proposal/sponsor/{decision}` to respond to proposals.
- **Functions:**
  - `respondToProposal(proposalId, decision)`: Accepts or rejects a proposal.

## 6. Team Components

### TeamList
- **Functionality:** Displays a list of teams.
- **Endpoints:**
  - `GET /teams` to fetch all teams.
- **Functions:**
  - `fetchTeams()`: Fetches and displays a list of teams.

### TeamCard
- **Functionality:** Shows details of a single team.
- **Endpoints:**
  - `GET /team/{teamId}` to fetch details of a specific team.
- **Functions:**
  - `fetchTeamDetails(teamId)`: Fetches details of a specific team.

### TeamInvite
- **Functionality:** Allows managers to send team invitations to players.
- **Endpoints:**
  - `POST /team/proposal` to send a team invite.
- **Functions:**
  - `sendTeamInvite(playerId, teamId)`: Sends an invite to a player.

### TeamDetails
- **Functionality:** Displays detailed information about a specific team.
- **Endpoints:**
  - `GET /team/{teamId}` to fetch team details.
- **Functions:**
  - `fetchTeamDetails(teamId)`: Fetches detailed information about a team.

### TeamManager
- **Functionality:** Manages team-related tasks (create, edit, manage).
- **Endpoints:**
  - `POST /team` to create a new team.
  - `PATCH /team/name/{newTeamName}` to change the team name.
- **Functions:**
  - `createTeam(name)`: Creates a new team.
  - `editTeamName(teamId, newTeamName)`: Updates the team name.

## 7. Dashboard Components

### Dashboard
- **Functionality:** Main dashboard view with an overview of key metrics and data.
- **Endpoints:** ?

### PlayerOverview
- **Functionality:** Summary of player-related data.
- **Endpoints:** ?

### TeamOverview
- **Functionality:** Summary of team-related data.
- **Endpoints:** ?

### SponsorOverview
- **Functionality:** Summary of sponsor-related data.
- **Endpoints:** ?

### ProposalOverview
- **Functionality:** Summary of proposal-related data.
- **Endpoints:** ?

## 8. Auth Components

### LoginForm
- **Functionality:** Handles user login (user or sponsor).
- **Endpoints:**
  - `POST /auth/login` to log in a user.
  - `POST /sponsor/login` to log in a sponsor.
- **Functions:**
  - `login(username, password)`: Submits login credentials and retrieves user or sponsor details.

### RegisterForm
- **Functionality:** Handles user registration.
- **Endpoints:**
  - `POST /create` to create a new user.
  - `POST /sponsor` to create a new sponsor.
- **Functions:**
  - `registerUser(username, password, name, role)`: Registers a new user.
  - `registerSponsor(username, password, category, name, budget)`: Registers a new sponsor.

### AuthProvider
- **Functionality:** Context provider for managing authentication state.
- **Endpoints:** ?

### PrivateRoute
- **Functionality:** Ensures only authenticated users can access certain routes.
- **Endpoints:** None directly associated with this component.


#some instructions


After cloning and opening the frontend project on VSCode...

`cd frontend ` - make sure you are in the right directory


`npm install` - install node modules from the json file


`npm install react-router-dom` - for navigation to different pages


`npm install axios` - for HTTP requests


`npm install react-bootstrap bootstrap` - for bootstrap styles, UI components, etc


`npm install react-toastify` - for toast alerts and error handling


`npm install react-tool-tip` - may use for providing info when hovering


`npm start`  to start the application

- and Ctrl + C (or Control + C) to 


