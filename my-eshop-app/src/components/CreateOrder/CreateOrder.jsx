// CreateOrder.jsx

import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreateOrder = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const steps = ['Step 1', 'Step 2', 'Step 3']; // Define your steps here

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleConfirmOrder = async () => {
    try {
      // Send a request to the /orders API endpoint to create an order
      // Send a request to the /addresses API endpoint to add the address
      // Display the success message
      console.log('Your order is confirmed.');
      navigate('/orders'); // Redirect to the orders page
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div>
      {/* Render the Stepper with your steps */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div>
        {activeStep === steps.length ? (
          <div>
            <p>Your order is confirmed.</p>
          </div>
        ) : (
          <div>
            <div>{/* Render step content based on activeStep */}</div>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={
                  activeStep === steps.length - 1
                    ? handleConfirmOrder
                    : handleNext
                }
              >
                {activeStep === steps.length - 1 ? 'Confirm Order' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateOrder;
