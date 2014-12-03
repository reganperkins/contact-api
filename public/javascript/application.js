// searching contacts,
// viewing a contact, 
// deleting contacts) should be available through the web 
// interface. Each one should have a separate endpoint (route) to 
// accomplish the task.


$(function() {

  var handlers = {
    getContacts: function() {
      $.getJSON('/contacts', handlers.processContacts);
    }, 
    processContacts: function(data) {
      var table = $("#contacts").find('tbody').empty();
      $.each(data, function(index, contact) {
        var tr = $("<tr>").appendTo(table);
        $("<td>").text(contact.firstname).appendTo(tr);
        $("<td>").text(contact.lastname).appendTo(tr);
        $("<td>").text(contact.email).appendTo(tr);
        $("<td>").text('Remove').appendTo(tr);
      });

      $("#results").removeClass('hide');
    },

    addContacts: function(e) {
      e.preventDefault();
      
      var newContact = {
        firstname : $('#first-name').val(),
        lastname : $('#last-name').val(),
        email : $('#email').val()
      }; 

      $(':text, input[type=email]').val('');
      // console.log(values);
      $.post('/contacts/create', newContact, handlers.addedContact, 'json');
    },
    addedContact: function(data) {
      if (data.result) {
        handlers.getContacts();
      } else {
        alert("You screwed something up.");
      }
    },
    removeContact: function() {
      $.post('/delete', newContact, handlers.addedContact, 'json');
    }
  };

  $(function() {
    $("#getContacts").on('click', handlers.getContacts);
    $('#addNew').on("submit", handlers.addContacts);
    $('this').on("click", handlers.removeContact);
  });


});


