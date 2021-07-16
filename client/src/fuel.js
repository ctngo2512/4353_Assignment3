import React, { useState, useEffect } from 'react';
import fire from './fire';
import validator from 'validator';


//form for company fuel inputs
const FuelForm = (props) => {

    //alert(props.userAddress);
    
    const initialFieldValues = {
        gallon_requested: '',
        delivery_address: '',
        delivery_date: '',
        suggested_price: '',
        total_due: ''
    }

    var [values, setValues] = useState(initialFieldValues)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (props.currentId == '')
            setValues({ ...initialFieldValues })
        else{
            setValues({
                ...props.fuelObjects[props.currentId]
            });

           
            
        }
        
            
    }, [props.currentId, props.fuelObjects])


    //alert(initialFieldValues.gallon_requested);

    const handleInputChange = e => {
        var { name, value} = e.target;
        
        setValues({
            ...values,
            [name]: value,
            //pseudo suggested price calculator
            suggested_price: (parseInt(values.gallon_requested))*1.50,
            total_due: (((parseInt(values.gallon_requested))*1.50)*1.10).toFixed(2),
            delivery_address: props.userAddress
        })

    }
    const validateDate = (value) => {
              
        if (validator.isDate(values.delivery_date)) {
          setErrorMessage('Valid Date :)')
        } else {
          setErrorMessage('Enter Valid Date in form of 00/00/0000')
        }
      }

    const handleValidation = values => {
       
        //let fields caused an issue with refreshing and not inputting data
       //let fields = this.values.fields;
        let errors = {};
        let formIsValid = true;

        //date

        //alert(values.delivery_date);

        //gallons requested
        if(values.gallon_requested=='' || values.gallon_requested==null){
           formIsValid = false;
           errors["gallon_requested"] = "Cannot be empty";
           alert("Gallons requested cannot be empty");
        }else{

        if(!values.gallon_requested.match(/^[0-9]+$/)){
            formIsValid = false;
            errors["gallon_requested"] = "Only numbers";
            alert("Numbers only in gallons requested field");
         }  
            
        }
   
       //this.setState({errors: errors});
       return (formIsValid);
   }
    

    const handleFormSubmit = e => {
       
        e.preventDefault()
        if(handleValidation(values)){
         props.gasFormEdit(values);
        }
        
    }

    //validation for fuel form 
    
    return (
        <form autoComplete="off" onSubmit={handleFormSubmit}>
            <section className = "contact">
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text"/>
                    
                </div>
                <input className="form-control" name="gallon_requested" placeholder="Gallons Requested"
                    value={values.gallon_requested}
                    onChange={handleInputChange}
                />
            </div>
            
                <div className="form-group input-group">
                <div className="input-group-prepend"/>
                    
            

<div class="container">
       
     <form>
         
      <div class="col"> 
      
        <div class="form-group">
            <div className="form-group input-group">   
            <div class="input-group-prepend"/>
            <div className="input-group-text"/>

            <input type="date" class="form-control" id="pure-date" name="delivery_date" onChange={handleInputChange} aria-describedby="date-design-prepend"/>
            </div>
          </div>
      </div>
      
          </form>
        
         
 
</div>
                </div>
            <div className="form-group">
                <div className="savebtn">
                <input type="submit" value= "Save" className="btn btn-primary btn-block" />
                </div>
                </div>
            </section>
        </form>
    );
}

export default FuelForm;
