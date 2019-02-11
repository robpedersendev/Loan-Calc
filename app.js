// Listen for submit
//This selects the form and makes it wait for an event of 'submit' and then runs the function
document.getElementById('loan-form').addEventListener('submit', function(e){
  // Hide results
  document.getElementById('results').style.display = 'none';
  
  // Show loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);

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

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);

    // Show results
    document.getElementById('results').style.display = 'block';

    // Hide loader
    document.getElementById('loading').style.display = 'none';

  } else {
    showError('Please check your numbers');
  }
}

// Show Error
function showError(error){
  // Hide results
  document.getElementById('results').style.display = 'none';
  
  // Hide loader
  document.getElementById('loading').style.display = 'none';

  // Create a div
  const errorDiv = document.createElement('div');

  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add class
  errorDiv.className = 'alert alert-danger';

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear error
function clearError(){
  document.querySelector('.alert').remove();
}