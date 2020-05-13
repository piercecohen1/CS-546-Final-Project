(function ($) {
    var myNewTaskForm = $("#new-tips-form"),
      newNameInput = $("#title"),
      newDecriptionArea = $("#description"),
      todoArea = $("#tips-area");
  
    // function bindEventsToTodoItem(todoItem) {
    //   todoItem.find('.finishItem').on('click', function (event) {
    //     event.preventDefault();
    //     var currentLink = $(this);
    //     var currentId = currentLink.data('id');
  
    //     var requestConfig = {
    //       method: 'POST',
    //       url: '/api/todo/complete/' + currentId
    //     };
  
    //     $.ajax(requestConfig).then(function (responseMessage) {
    //       var newElement = $(responseMessage);
    //       bindEventsToTodoItem(newElement);
    //       todoItem.replaceWith(newElement);
    //     });
    //   });
    // }
  
    // todoArea.children().each(function (index, element) {
    //   bindEventsToTodoItem($(element));
    // });
  
    myNewTaskForm.submit(function (event) {
      event.preventDefault();
  
      var newName = newNameInput.val();
      var newDescription = newDecriptionArea.val();
      var newContent = $('#new-content');
  
      if (newName && newDescription) {
        var useJson = false;
        if (useJson) {
          var requestConfig = {
            method: 'POST',
            url: '/tips',
            contentType: 'application/json',
            data: JSON.stringify({
              title: newName,
              tips: newDescription
            })
          };
  
          $.ajax(requestConfig).then(function (responseMessage) {
            console.log(responseMessage);
            newContent.html(responseMessage.message);
            //                alert("Data Saved: " + msg);
          });
        } else {
          var requestConfig = {
            method: 'POST',
            url: '/api/todo.html',
            contentType: 'application/json',
            data: JSON.stringify({
              name: newName,
              description: newDescription
            })
          };
  
          $.ajax(requestConfig).then(function (responseMessage) {
            console.log(responseMessage);
            var newElement = $(responseMessage);
            bindEventsToTodoItem(newElement);
  
            todoArea.append(newElement);
          });
        }
      }
    });
  })(window.jQuery);
  