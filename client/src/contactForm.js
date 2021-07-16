import React, { useState, useEffect } from 'react';
import fire from './fire';

//contact form takes user inputs for name, address....
const ContactForm = (props) => {

    const {currentId, contactObjects, addOrEdit}  = props;

    const initialFieldValues = {
        name: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
        address2: ''
    }
    
    var [values, setValues] = useState(initialFieldValues);

    //if no input yet set to empty, else set values to user inputs
    useEffect(() => {
        if (props.currentId == '')
            setValues({ ...initialFieldValues })
        else
            setValues({
                ...props.contactObjects[props.currentId]
            })
    }, [props.currentId, props.contactObjects])

    //save user inputs to values to save to firebase
    const handleInputChange = e => {
        var { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleValidation = values => {
       
        //let fields caused an issue with refreshing and not inputting data
        //let fields = this.values.fields;
        let errors = {};
        let formIsValid = true;

        //---Name---
        if(values.name =='' || values.name==null){
            formIsValid = false;
            errors["name"] = "Cannot be empty";
            alert("Name cannot be empty");
         }else{
 
         if(!values.name.match(/^[a-zA-Z\s]*$/)){
             formIsValid = false;
             errors["name"] = "Only letters";
             alert("Letters only in name field");
          }
         else if (values.name.length > 50) {
            errors.name = 'The name provided is too long - max 50 characters please'
            }        
        }  

         //---Address 1---
         if(values.address =='' || values.address==null){
            formIsValid = false;
            errors["address"] = "Cannot be empty";
            alert("address cannot be empty");
         }else{
 
         if(!values.address.match(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/)){
             formIsValid = false;
             errors["address"] = "Only letters";
             alert("Letters and numbers only in address field");
          }
         else if (values.address.length > 100) {
            errors.name = 'The address provided is too long - max 100 characters please'
            }        
        }


         //---Address 2---
         if(values.address2 != null && values.address2!=''){
            if(!values.address2.match(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/)){
             formIsValid = false;
             errors["address2"] = "Only letters";
             alert("Letters and number only in address2 field");
          }
         else if (values.address2.length > 100) {
            errors.name = 'The address provided is too long - max 100 characters please'
            alert("Address2 is too long");
            }        
        }

         //----City----
         if(values.city =='' || values.city==null){
            formIsValid = false;
            errors["city"] = "Cannot be empty";
            alert("city cannot be empty");
         }else{
 
         if(!values.city.match(/^[a-zA-Z]+$/)){
             formIsValid = false;
             errors["city"] = "Only letters";
             alert("Letters only in city field");
          }
         else if (values.name.length > 100) {
            errors.name = 'The city provided is too long - max 50 characters please'
            }        
        }

        //----State----
        if(values.state =='' || values.state==null){
            formIsValid=false;
            alert("State cannot be empty");
        }

   
        else if(!values.state.match(/^[a-zA-Z\s]*$/)){
            formIsValid=false;
            alert("Invalid selection");
        }

         //----Zipcode---
         if(values.zipcode =='' || values.zipcode==null){
            formIsValid = false;
            errors["zipcode"] = "Cannot be empty";
            alert("zipcode cannot be empty");
         }else{
 
         if(!values.zipcode.match(/^[0-9]([0-9]|-(?!-))+$/)){
             formIsValid = false;
             errors["zipcode"] = "Only numbers";
             alert("Numbers only in name field");
          }
            else if (values.zipcode.length > 9) {
                errors.zipcode = 'The name provided is too long - max 50 characters please'
                formIsValid=false;
                alert("Zip code too long");
            }  
            else if(values.zipcode.length < 5){
                formIsValid=false;
                alert("Zip code too short");
            }
            
            else if (!values.zipcode.match(/^[0-9]{5}(-[0-9]{3})?$/) || !values.zipcode.match(/^(?:\d{5})?$/)){
                formIsValid=false;
                alert("Incorrect zip-code format");
            }
        }


        //alert(values.delivery_date);

       //this.setState({errors: errors});
       return (formIsValid);
   }

   //submitting form to firebase and prevent page refresh
   const handleFormSubmit = e => {
    e.preventDefault()

    if(handleValidation(values)){
        props.addOrEdit(values);
    }
    }
    //alert(values["name"]);

    //alert(props.contactObjects[0]["name"]);
    return (
        <form autoComplete="off" onSubmit={handleFormSubmit}>
            <section className = "contact">
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-user"></i>
                    </div>
                </div>
                <div className = 'Name'>
                <input className="form-control" name="name" placeholder="Full Name"
                    value={values.name}
                    onChange={handleInputChange}
                />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                        </div>
                    </div>

                    <input className="form-control" name="address" placeholder="Address Line 1"
                        value={values.address}
                        onChange={handleInputChange}
                    />
                </div>
                
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                        </div>
                    </div>
                    <input className="form-control" name="city" placeholder="City"
                        value={values.city}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                        </div>
                    </div>

                    <input className="form-control" name="address2" placeholder="Address Line 2"
                        value={values.address2}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="form-group input-group col-md-0">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                    </div>
                </div>
                <select className="form-control" name="state" 
                    value={values.state}
                    //pull down option for state
                    onChange={handleInputChange}>
                        <option value="DEFAULT" disabled>Select your state</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                </select>			
            </div>
            <div className="form-group input-group col-md-0">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                    </div>
                </div>
                <input className="form-control" name="zipcode" placeholder="Zipcode"
                    value={values.zipcode}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <div className="savebtn">
                <input //save button
                type="submit" value={props.currentId == "" ? "Save" : "Update"} className="btn btn-primary btn-block" />
                </div>
                </div>
            </section>
        </form>
    );
}

export default ContactForm;
