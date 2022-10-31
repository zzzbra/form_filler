class FormFiller {

  constructor () {
    if (FormFiller._instance) {
      return FormFiller._instance;
    }
    // TODO: pass this in as an init config function
    // collect the information that we will need to fill in all the forms 
    this.email = prompt("Enter an email: ");
    this.phoneNumber = prompt("Enter a phone number:");
    this.formFields = [
      {
        pathname: "/",
        formFields: {
          email: this.email,
          access_code: "123456",
          password: "Test1234!",
          first_name: "First",
          last_name: "Lastname",
          billing_address_line_1: "428 Franklin Ave",
          billing_address_line_2: "2",
          billing_address_city: "Brooklyn",
          billing_address_state: "NY",
          billing_address_postal_code: "11238"
        }
      },
      // stripe steps -- url is the same for all, so just include all possible inputs here
      {
        pathname: "/d/setup/c/",
        formFields: {
          phone: this.phoneNumber,
          email: this.email,
          "dob-month": "02",
          "dob-day": "26",
          "dob-year": "1989",
          "phone": "2016653631",
          "id_number": "143869634",
        }
      }
    ];
    FormFiller._instance = this;
  }

  fillForm () {
    // Only assume that we match the start of the path -- this allows us to just build one set of
    // form values for a section of a site (where multiple pages have similar prefixed paths) or to
    // apply to forms where we don't have control over the end of the path (due to some nonce)
    const currentPathnameRe = new RegExp(`^${window.location.pathname}`);
    const match = this.formFields.find(({ pathname }) => {
      return currentPathnameRe.test(pathname);
    });
    if (match.formFields) {
      Object.entries(match.formFields).map(([name, value]) => {
        const input = document.querySelector(`input[name="${name}"]`)
        if (input) {
          input.value = value;
          input.focus();
          input.blur();
        }
      }).reduce((p, f) => p.then(f), Promise.resolve());
    } else {
      throw new Error('No matching route!')
    }
  }
}

// run as singleton
window.myFormFiller = window.myFormFiller || new FormFiller();

window.myFormFiller.fillForm();
