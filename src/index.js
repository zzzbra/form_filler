const email = prompt("Enter an email: ")

const formFields = {
  email: email,
  access_code: "123456",
  password: "Test1234!",
  first_name: "Slim",
  last_name: "Gaillard",
  billing_address_line_1: "428 Franklin Ave",
  billing_address_line_2: "2",
  billing_address_city: "Brooklyn",
  billing_address_state: "NY",
  billing_address_postal_code: "11238"
};

// Fill in fields
Object.entries(formFields).forEach(([name, value]) => {
  document.querySelector(`input[name="${name}"]`).value = value;
});

// Submit Form
// const submitButton = document.querySelector("button[type='submit']");

