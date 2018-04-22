window.onload = function (){
    //buttons
    var addButton = document.getElementById('addButton');
    var contactList = document.getElementById('contactList');
    var saveButton = document.getElementById('saveButton');
    var cancelButton = document.getElementById('cancelButton');
    var addForm = document.querySelector('.addForm');//addFrom
    

    //Form Fields
    var name = document.getElementById('name');
    var phone = document.getElementById('phone');
    var email = document.getElementById('email');
    var address = document.getElementById('address');
    var city = document.getElementById('city');

    //create storage array
    var addressBook = [];
    var addBookDiv = document.querySelector('.addBook');
    

    //Event Listener
    addButton.addEventListener('click', function(){
          addForm.style.display='block';
    })

    cancelButton.addEventListener('click', function(){  
        addForm.style.display ='none';
        })

     saveButton.addEventListener('click', addToBook);

     addBookDiv.addEventListener('click', removeEntry);

     //creating a json structure
     function jsonStructure(name,phone,email,address,city){
         this.name = name;
         this.phone = phone;
         this.email = email;
         this.address = address;
         this.city = city;
     }
     

     function addToBook(){
         var isNull = name.value!='' && phone.value!='' && email.value!='' && address.value!='' && city.value!='';

         if(isNull){
             //add the content o the form to the addressbook and localStorage
             var obj = new jsonStructure(name.value,phone.value,email.value,address.value,city.value);//creating an array from json constructor
             addressBook.push(obj); //pushing the obj array to the addressbook
             localStorage['addBook'] = JSON.stringify(addressBook);//pushing the addbook content to the localStorage which only store strings

             //hide the form panel
             addForm.style.display = 'none';

             //clear the form
             clearForm();

             //update & display the form records
             showAddressBook();
         }
         
     }



     function removeEntry(e){
         if (e.target.classList.contains('delButton')){
             var remID = e.target.getAttribute('data-id');
             //remove the JSON ENTRY FROM THE ARRAY IN THE LOCAL STORAGE
             addressBook.splice(remID, 1);
             localStorage['addBook'] = JSON.stringify(addressBook)
             showAddressBook();
         }

     }


     //clearning the form fields after saving a contact details
     function clearForm(){
         var frm = document.querySelectorAll('.contact-field');
         for(var i in frm){
             frm[i].value = '';
         }
     }

     //showing the addressBook
     function showAddressBook(){
         //check if key 'addBook' exit in localStorage if not create it
         //if it exit, load contents from local storage and display on page
         if(localStorage['addBook']===undefined){
             localStorage['addBook'] = '[]';

         }else{
             addressBook = JSON.parse(localStorage['addBook']);
             addBookDiv.innerHTML = '';
             for(var i in addressBook){
               var str = '<div class="entry">';
               str += '<div class="name"><p>' + addressBook[i].name + '</p></div>';
               str += '<div class="phone"><p>' + addressBook[i].phone + '</p></div>';
                str += '<div class="email"><p>' + addressBook[i].email + '</p></div>';
                str += '<div class="address"><p>' + addressBook[i].address + '</p></div>';
                str += '<div class="city"><p>' + addressBook[i].city + '</p></div>';
                str += '<div class="del"><a href="#" class="delButton" data-id="' + i + '">Delete</a></div>';
            str += '</div>';
            addBookDiv.innerHTML += str;

             }
         }
     }

     
     showAddressBook();
}

    