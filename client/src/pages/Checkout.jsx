import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from '../components/AddressForm';
import PaymentForm from '../components/PaymentForm';
import Review from '../components/Review';
import { useState } from 'react';
import Swal from 'sweetalert2'
import withReactContent from '@sweetalert/with-react';

const steps = ['Shipping address', 'Payment details', 'Review your order'];

const theme = createTheme();
// const MySwal = withReactContent(Swal);
export default function Checkout() {

  const [activeStep, setActiveStep] = React.useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [stateId, setStateId] = useState(1);
  // const showAlert = () => {
  //   MySwal.fire('Hello!', 'This is a SweetAlert dialog.', 'success');
  // };
  // const handleAlertClose = () => {
  //   setShowAlert(false);
  // };

  // const MySwal = withReactContent(Swal);

  // if (showAlert) {
  //   MySwal.fire({
  //     title: 'Alert',
  //     text: 'This is a SweetAlert dialog shown based on a condition.',
  //     icon: 'success',
  //     onClose: handleAlertClose,
  //   });
  // }
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state:"",
    zip:"",
    country:"",
    cardName:"",
    cardNumber:"",
    cardCVV:"",
    cardExpiry:""
  });

  const handleNext = () => {
    const regex = /^[a-zA-Z]+$/;
    const zipRegex=/^\d{6}$/;
    const cardCVVRegex = /^\d{3}$/;
    const cardNumRegex = /^(\d{4}\s?){3}\d{4}$/;

     if(activeStep === 0 && formData.firstName !== "" && formData.lastName !== "" && formData.address1 !== "" && formData.city!== "" && formData.state !== "" && formData.zip !== "" && formData.country !== "")
      {
        if(!regex.test(formData.firstName) || !regex.test(formData.lastName))
        {
          alert("Please enter correct Username")
   
        }
        else if(!zipRegex.test(formData.zip))
        {
          alert("Please enter correct Zip Code")
        }
        else{
        setActiveStep(activeStep + 1);
        }
      }   
     else if(activeStep === 1 && formData.cardName !== "" && formData.cardNumber !== "" && formData.cardCVV !== "" && formData.cardExpiry !== "")
      {
        if(!regex.test(formData.cardName) || !cardCVVRegex.test(formData.cardCVV) || !cardNumRegex.test(formData.cardNumber) )
        {
          alert("Please enter correct Card Details")
        }
        else{
        setActiveStep(activeStep + 1);
        }
      }
     else if(activeStep === 2)
     {
      setActiveStep(activeStep + 1);
      Swal.fire(
        'Thank you!',
        'Your order has been placed!',
        'success'
      )
     }
     else{
         alert("All Fields are required");
     }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleFormChange =(e)=>{
    console.log(e)
    setFormData({...formData,[e.target.name]: e.target.value})
    // setStateId(e.target.id)
    
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm handleFormChange={handleFormChange} formData={formData}/>;
      case 1:
        return <PaymentForm handleFormChange={handleFormChange} formData={formData}/>;
      case 2:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              {/* <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography> */}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

// Changes

// Add Sweet alert for popup after placing order ---> DONE
// Add more validations (yup or regex) like in postal code for 6 digit  ---> DONE
// Country dropdown countrystate district and use Select Box of mui  ---> Done
// Add Contact Number 
