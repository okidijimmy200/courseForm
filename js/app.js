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
})();