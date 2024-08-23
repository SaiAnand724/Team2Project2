import { SponsorInterface } from "../Interfaces/SponsorInterface";
import { UserInterface } from "../Interfaces/UserInterface";

export const sponsorStore:any = {
    loggedInSponsor: {
        sponsorId: "385c9913-1e20-4bdb-8701-6ac6fe27b9bd", //<- replace with actual sponsor ID when testing
        username: "sponsor1",
        password: "password",
        category: "Sports",
        name: "SportsSponsor",
        budget: 10000.00
    } as SponsorInterface, 
    loggedIn: false,
    baseURL: "http://localhost:8080"
}

export const userStore:any = {
    loggedInUser: {
        userId: "df3e9990-48e0-4ba8-9eb7-3c8bc17a1203", //<- replace with actual user ID when testing
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        role: ""
    } as UserInterface,
    loggedIn: false,
    baseURL: "http://localhost:8080/"
}