import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { TeamProposalInterface } from '../../Interfaces/TeamProposalInterface';
import { sponsorStore } from '../../globalStore/store';

import { toast, ToastContainer } from 'react-toastify';

const SponsorBudget: React.FC<{proposals:TeamProposalInterface[]}> = ({proposals}) => {

  const [currentBudget, setCurrentBudget] = useState<number>(0);
  const [amountSpent, setAmountSpent] = useState<number>(0);

  useEffect(() => {
    // Placeholder API calls to fetch budget data
    const fetchBudgetData = async () => {
      try {
        // Replace with actual API calls
        const r = JSON.parse(localStorage.getItem('loggedInSponsor') ?? "")
        const totalProposalsAmount = proposals.reduce((acc, proposal) => acc + proposal.amount, 0);

        const currentBudget = JSON.parse(localStorage.getItem('loggedInSponsor') ?? "").budget
        setCurrentBudget(currentBudget);

        setAmountSpent(totalProposalsAmount);
      } catch (error) {
        console.error('Error fetching budget data:', error);
        toast.error("Error fetching budget data: " + error)
      }
    };

    fetchBudgetData();
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Overall Sponsorship Budget
          </Typography>
          <Typography variant="h6">
            Current Budget: <span style={{ fontStyle: 'italic' }}>${currentBudget}</span>
          </Typography>
          <Typography variant="h5" component="div" gutterBottom mt={2}>
            Total Budget Spending
          </Typography>
          <Typography variant="h6">
            Amount Spent: <span style={{ fontStyle: 'italic' }}>${amountSpent}</span>
          </Typography>
        </CardContent>
      </Card>
      <ToastContainer/>
    </Box>
  );
};

export default SponsorBudget;

{/* Functionality: Manages and displays sponsor budget information.
o	Endpoints:
	GET /sponsor/balance to fetch the remaining balance.
	PATCH /sponsor/budget/{newBudget} to update the budget.

o	Functions:
	fetchSponsorBalance(): Retrieves the remaining balance.
	updateSponsorBudget(newBudget): Updates the sponsor’s budget.
 */}