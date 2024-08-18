import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"

export const SponsorCard: React.FC = () => {

    const SponsPropDet = (
        <CardContent>
            
        </CardContent>
    )
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2">Bruh</Typography>
                <CardActions>
                    <Button>Learn More</Button>
                </CardActions>
            </CardContent>
        </Card>
    )

}

{/*Endpoints:
	GET /sponsor/{sponsorId} to fetch details of a specific sponsor.

o	Functions:
	fetchSponsorDetails(sponsorId): Fetches details of a specific sponsor.
*/}