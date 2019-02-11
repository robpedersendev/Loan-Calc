// Listen for submit
//This selects the form and makes it wait for an event of 'submit' and then runs the function
document.getElementById('loan-form').addEventListener('submit', function(e){
  // Hide results
  //This line of code grabs the div with the id of 'results' and sets its display style to none
  document.getElementById('results').style.display = 'none';
  
  // Show loader
  //This line of code grabs the div with the id of 'loading' and sets its display style to block
  document.getElementById('loading').style.display = 'block';

  //This line of code sets the setTimeout method, and calls the function 'calculateResults' and then (counting in milliseconds) determines how long before it times out
  setTimeout(calculateResults, 2000);
  //This line of code prevents the browser from refreshing after the submit action is activated
  e.preventDefault();
});

// Calculate Results
//Create a function that calculate the results 
function calculateResults(){
  //Displays 'Calculating...' in the console
  console.log('Calculating...');
  // UI Vars
  //Create variables that are assigned to the input fields and the result fields

  //Input variables
  //Assigns the first entry field to amount
  const amount = document.getElementById('amount');
    //Assigns the second entry field to interest
  const interest = document.getElementById('interest');
    //Assigns the third entry field to years
  const years = document.getElementById('years');

  //Output variables
    //Assigns the first output field to monthlyPayment
  const monthlyPayment = document.getElementById('monthly-payment');
  //Assigns the second output field to totalPayment
  const totalPayment = document.getElementById('total-payment');
  //Assigns the third output field to totalInterest
  const totalInterest = document.getElementById('total-interest');

  //Calulation variables set to decimal friendly value
  //Assigns principal to the value of the amount variable
  const principal = parseFloat(amount.value);
  //Assigns calculateInterest to the value of the interest variable divided by 100 then divided by 12
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  //Assigns calculatedInterest to the value of the years variable multiplied by 12
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  //Asigns variable 'x' to equal '1 + calculatedInterest' to the power of 'calculatedPayments'
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  //Assigns variable 'monthly' to equal 'principal * x * calculatedInterest' divided by 'x - 1'
  const monthly = (principal*x*calculatedInterest)/(x-1);

  //If the value of the 'monthly' variable is infinite
  if(isFinite(monthly)) {
    //Then set the value of the 'monthlyPayment' variable to equal the value of the 'monthly' variable with a max of two digits after the decimal point
    monthlyPayment.value = monthly.toFixed(2);
    //Then set the value of the 'totalPayment' variable to equal the 'monthly' variable multiplied by the 'calculatedPayments' variable with a max of two digits after the decimal point
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    //Then set the vlaue of the 'totalInterest' variable to equal 'monthly * calculatedPayments' minus 'principal' with a max of two digits after the decimal point
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);

    // Show results
    //Then grab the div with the id of 'results' and set its display style to block.
    document.getElementById('results').style.display = 'block';

    // Hide loader
    //Then grab the div with the id of 'loading' and set its display to none.
    document.getElementById('loading').style.display = 'none';
    //Otherise do this
  } else {
    //Call a function that displays an error message that says "Please check your numbers" 
    showError('Please check your numbers');
  }
}

// Show Error
//This function is called 'showError' with a parameter of 'error'
function showError(error){
  // Hide results
  //This line of code grabs the div with the id of 'results' and sets its display style to none
  document.getElementById('results').style.display = 'none';
  
  // Hide loader
  //This line of code grabs the div with the id of 'loading' and sets its display style to none
  document.getElementById('loading').style.display = 'none';

  // Create a div
  //This line of code creates a variable called 'errorDiv' that is assigned to create a new HTML element, 'div'
  const errorDiv = document.createElement('div');

  // Get elements
  //This line of code creates a variable called 'card' and it is assigned to the div with the class of 'card'
  const card = document.querySelector('.card');
  //Then create a variable called 'heading' that is assigned to the div with the class of 'heading
  const heading = document.querySelector('.heading');

  // Add class
  //This line of code assigns the variable 'errorDiv' a classname of 'alert' and 'alert-danger'
  errorDiv.className = 'alert alert-danger';

  // Create text node and append to div
  //This line of code creates a textNode of the error message that was passed through to this function earlier and appends this as a child to the previously created "div" via the variable 'errorDiv'
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  //This line of code is inserting the variable 'errorDiv' between the variable 'card' and the variable 'heading'
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  //This line of code uses the timeout method and calls the function 'clearError' after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear error
//Create a function called clearError
function clearError(){
  //This line of code removes the div with the class of 'alert'
  document.querySelector('.alert').remove();
}