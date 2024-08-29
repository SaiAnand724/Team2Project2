import { SponsorInterface } from "../Interfaces/SponsorInterface";
import { UserInterface } from "../Interfaces/UserInterface";

export const sponsorStore:any = {
    loggedInSponsor: {
        sponsorId: "", 
        username: "",
        category: "",
        name: "",
        budget: 0,
        jwt: ""
    } as SponsorInterface, 
}

export const userStore:any = {
    loggedInUser: {
        userId: "",
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        role: "",
        jwt: ""
    } as UserInterface,
}

// Not best practice to keep this here, but for the sake of the project, we will keep it here
export const store = {
    backendURL: "http://localhost:8080",
}