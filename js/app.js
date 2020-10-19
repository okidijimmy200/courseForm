//immediately invoked func
(function(){
    //setup event listener for checkfields and hide events
    document.addEventListener('DOMContentLoaded', function(){
        //DOMcontentLoaded when form is loaded 
        const display = new Display(); //new instance
        display.checkFields()
        //disable display btn
        display.hideSubmit();
        
    })
    //what to do incase we r submitting the form(add customer on submit)
document.getElementById('customer-form').addEventListener('submit', function(event){
    //prevent default
    event.preventDefault();
    //grab values accesible to you
    const name = this.querySelector('.name')
    const course = this.querySelector('.course')
    const author = this.querySelector('.author')

    //NB: this keyword points to the parent document ie customer-form in this case

    //create new customer instance
    const customer = new Customer(name.value, course.value, author.value)
    const display = new Display();

    //add 2 methods to display prototypes
    display.feedback(customer);
    display.clearFields();
});
    //1)constructos reponsible for display
    function Display(){
        //pt to instnce created
        this.name = document.getElementById('name')
        this.course = document.getElementById('course')
        this.author = document.getElementById('author')
        this.customers = document.querySelector('.customer-list')
    }
    //method to prototype properties
    //check fields
    Display.prototype.checkFields = function(){
        // console.log(this)
        //unblur event to name, course and author
        this.name.addEventListener('blur', this.validateField)
        this.course.addEventListener('blur', this.validateField)
        this.author.addEventListener('blur', this.validateField)
    }
    //validate ach field
    Display.prototype.validateField = function(){
        // console.log(this)
        //check if value is empty
        if(this.value === ''){
            this.classList.remove('complete');
            this.classList.add('fail');
        } else {
            this.classList.add('complete');
            this.classList.remove('fail');
        }
        //click submit form if all ave btn completed
        const complete = document.querySelectorAll('.complete'); //incase there are 3 complete classes only
        if(complete.length === 3) {
            document.querySelector('.submitBtn').disabled = false
        }
        else {
            document.querySelector('.submitBtn').disabled = true
        }
    }
    //disable submit
    Display.prototype.hideSubmit = function(){
        const btn = document.querySelector('.submitBtn')
        //display property
        btn.disabled = true;
    }
//show loading and feedback(we use keyword for a method in a func)
Display.prototype.feedback = function(customer){
    const feedback = document.querySelector('.feedback');
    const loading = document.querySelector('.loading');

    //show item, alert and alert success
    feedback.classList.add('showItem', 'alert', 'alert-success');
    loading.classList.add('showItem')
// hide the submiy btn when we click the form nd its loading
    const self = this;
    self.hideSubmit()

//setTimeout
setTimeout(function(){
    //remove feedback and loading
    feedback.classList.remove('showItem', 'alert', 'alert-success')
    loading.classList.remove('showItem');
    self.addCustomer(customer)
},4000)
}

//method to display customer
Display.prototype.addCustomer = function(customer){
    // console.log(customer)
    //creating random image
    const random = this.getRandom()
    const div = document.createElement('div');
    div.classList.add('col-11', 'mx-auto', 'col-md-6', 'my-3', 'col-lg-4');
    div.innerHTML= `<div class="card text-left">
    <img src="img/cust-${random}.jpg" class="card-img-top" alt="">
    <div class="card-body">
     <!-- customer name -->
     <h6 class="text-capitalize "><span class="badge badge-warning mr-2">name :</span><span id="customer-name"> ${customer.name}</span></h6>
     <!-- end of customer name -->
     <!-- customer name -->
     <h6 class="text-capitalize my-3"><span class="badge badge-success mr-2">course :</span><span id="customer-course">
     ${customer.course}
      </span></h6>
     <!-- end of customer name -->
     <!-- customer name -->
     <h6 class="text-capitalize"><span class="badge badge-danger mr-2">author :</span><span id="course-author"> ${customer.author}</span></h6>
     <!-- end of customer name -->
    </div>
   </div>
`;
//appendChild
this.customers.appendChild(div);
};
//random number
Display.prototype.getRandom = function(){
    let random = Math.floor(Math.random()*5+1)
    return random;
}

//displayPrototype of clearFields
Display.prototype.clearFields = function(){
    this.name.value = '';
    this.course.value = '';
    this.author.value = '';

    //remove the complete and remove classes
    this.name.classList.remove('complete', 'fail');
    this.course.classList.remove('complete', 'fail');
    this.author.classList.remove('complete', 'fail');
}
    //customer constructorfunc is responsible for all the instances of customers we r creating
    function Customer(name, course, author){
        this.name = name;
        this.course = course;
        this.author = author;
    }
})();