class FormFiller {
  static STORAGE_KEY = "FFD";

  constructor () {
    if (FormFiller._instance) {
      return FormFiller._instance;
    }

    const stringified = document.cookie.split("; ").find((row) => row.startsWith(FormFiller.STORAGE_KEY + "="))?.split("=")[1];
    
    if (stringified) {
      this.formFields = JSON.parse(stringified);
    } else {
      this.email = prompt("Enter an email: ");
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
            email: this.email,
            "dob-month": "02",
            "dob-day": "26",
            "dob-year": "1989",
            "phone": "0000000000",
            "id_number": "143869634",
          }
        }
      ];
    }
    FormFiller._instance = this;
    document.cookie = FormFiller.STORAGE_KEY + "=" + JSON.stringify(this.formFields);
  }

  fillForm () {
    let formFields; 
    if (this.formFields) {
      formFields = this.formFields;
      console.info("Retrieved form fields from memory: ", formFields);
    } else {
      const stringified = document.cookie.split("; ").find((row) => row.startsWith(formFields.STORAGE_KEY + "="))?.split("=")[1];
      formFields = JSON.parse(stringified);
      console.info("Retrieved form fields from storage: ", formFields);
    }
    // Only assume that we match the start of the path -- this allows us to just build one set of
    // form values for a section of a site (where multiple pages have similar prefixed paths) or to
    // apply to forms where we don't have control over the end of the path (due to some nonce)
    const currentPathnameRe = new RegExp(`^${window.location.pathname}`);
    const match = formFields.find(({ pathname }) => {
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
