$(function () {

  $("#submitCreate").click(function(e){
    debugger;
    var email = $('#emailCreate').val();
    var name = $('#nameCreate').val();
    var lastname = $('#lastnameCreate').val();
    var dni = $('#dniCreate').val();
    var type = $('#typeCreate').val();
    var institution = $('#institutionCreate').val();
    var delegation = $('#delegationCreate').val();
    var discount = $('#discountCreate').val();
    var city = $('#cityCreate').val();
    var cellphone = $('#cellphoneCreate').val();
    var description = $('#descriptionCreate').val();

    var emailValidated=false;
    var dniValidated=false;

    function emailValidation() {
      emailValidated=true;
    }
    function dniValidation() {
      dniValidated=true;
    }
    if (email) {

      $.ajax({
        url: '/checkemail?email='+email,
        async: false,

        success:(function(data){
          if (data.length>0) {
            console.log(data);
            toastr.error("Email ya registrado, intente con otro");
          }
          else {
            emailValidation();
          }
        }),
        error:(function(){
          toastr.error("Hubo un error");
        })
      });
    }

    if (dni) {

      $.ajax({
        url: '/checkdni?dni='+dni,
        type:"GET",
        async: false,
        success:(function(data){
          if (data.length>0) {
            console.log(data);
            toastr.error("DNI ya registrado, intente con otro");
          }else {
            dniValidation();
          }
        }),
        error:(function(){
          toastr.error("Hubo un error");
        })
      });
    }
    var evt=emailValidated;
    var dvt=dniValidated;

    var data = {
      'email': email,
      'name': name,
      'lastname': lastname,
      'dni': dni,
      'type': type,
      'city': city,
      'institution': institution,
      'delegation':delegation,
      'discount':discount,
      'cellphone': cellphone,
      'description':description

    };
    console.log(data);
    if(email && name && lastname && dni && type && institution && city && emailValidated && dniValidated){
      var preclose = document.getElementById('closeCreate');
      fetch("/usuario/crear",{
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
          credentials: "same-origin"
      }).then(response => {
        console.log(response);
        if (response.ok) {
          $('#emailCreate').val('');
          $('#nameCreate').val('');
          $('#lastnameCreate').val('');
          $('#dniCreate').val('');
          $('#typeCreate').selectedIndex = 1;
          $('#institutionCreate').val('');
          $('#delegationCreate').val('');
          $('#discountCreate').val('');
          $('#cityCreate').val('');
          $('#cellphoneCreate').val('');
          $('#descriptionCreate').val('');
          preclose.click();
          $('#lista_usuarios').DataTable().ajax.reload();
          toastr.success("Usuario Registrado");
        }
        else {
          toastr.error("Hubo un error");
        }
      }).catch(function(){
        toastr.error("Hubo un error");
      });

      }
      else{
        if (!(email && name && lastname && dni && type && city)) {
          toastr.error("Llene todos los campos");
        }
      }
    })


    $("#submitEdit").click(function(e){
      debugger;
      var user = $('#userEdit').val();
      var email = $('#emailEdit').val();
      var name = $('#nameEdit').val();
      var lastname = $('#lastnameEdit').val();
      var dni = $('#dniEdit').val();
      var type = $('#typeEdit').val();
      var institution = $('#institutionEdit').val();
      var delegation = $('#delegationEdit').val();
      var discount = $('#discountEdit').val();
      var city = $('#cityEdit').val();
      var cellphone = $('#cellphoneEdit').val();
      var description = $('#descriptionEdit').val();

      var emailValidated=false;
      var dniValidated=false;

      function emailValidation() {
        emailValidated=true;
      }
      function dniValidation() {
        dniValidated=true;
      }
      if (email) {

        $.ajax({
          url: '/checkemailedit?email='+email+'&user='+user,
          type:'GET',
          async: false,
          success:(function(data){
            console.log(data);
            if (data!=0) {
              console.log(data);
              toastr.error("Email ya registrado, intente con otro");
            }
            else {
              emailValidation();
            }
          }),
          error:(function(){
            toastr.error("Hubo un error");
          })
        });
      }

      if (dni) {
        $.ajax({
          url: '/checkdniedit?dni='+dni+'&user='+user,
          type:"GET",
          async: false,
          success:(function(data){
            console.log(data);
            if (data!=0) {
              console.log(data);
              toastr.error("DNI ya registrado, intente con otro");
            }else {
              dniValidation();
            }
          }),
          error:(function(){
            toastr.error("Hubo un error");
          })
        });
      }
      var evt=emailValidated;
      var dvt=dniValidated;

      var data = {
        'user': user,
        'email': email,
        'name': name,
        'lastname': lastname,
        'dni': dni,
        'type': type,
        'city': city,
        'institution': institution,
        'delegation':delegation,
        'discount':discount,
        'cellphone': cellphone,
        'description':description
      };
      console.log(data);
      if(user && email && name && lastname && dni && type && institution && city && emailValidated && dniValidated){
        var preclose = document.getElementById('closeEdit');
        fetch("/usuario/editar",{
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: "same-origin"
        }).then(response => {
          console.log(response);
          if (response.ok) {
            $('#emailEdit').val('');
            $('#nameEdit').val('');
            $('#lastnameEdit').val('');
            $('#dniEdit').val('');
            $('#typeEdit').selectedIndex = 1;
            $('#institutionEdit').val('');
            $('#delegationEdit').val('');
            $('#discountEdit').val('');
            $('#cityEdit').val('');
            $('#cellphoneEdit').val('');
            $('#descriptionEdit').val('');
            preclose.click();
            $('#lista_usuarios').DataTable().ajax.reload();
            toastr.success("Usuario Editado");
          }
          else {
            toastr.error("Hubo un error");
          }
        }).catch(function(){
          toastr.error("Hubo un error");
        });

        }
        else{
          if (!(user && email && name && lastname && dni && type && city)) {
            toastr.error("Llene todos los campos");
          }
        }
      })



    $("#submitPago").click(function(e){
      debugger;
      var quantity= $('#cantidadPago').val();
      var type = $('#tipoPago').val();
      var user = $('#userPayment').val();
      var data = {
        'quantity': quantity,
        'type': type,
        'user': user
      };
      console.log(data);
      if(quantity && type && user){
        // var preclose = document.getElementById('closePayment');
        fetch("/pagos",{
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: "same-origin"
        }).then(response => {
          //console.log(response.json());
          if (response.ok) {
            $('#cantidadPago').val(0);
            $('#tipoPago').selectedIndex = 1;
            // preclose.click();
            toastr.success("Pago registrado");
            getPayment(user);
            $('#lista_usuarios').DataTable().ajax.reload();
            response.json().then(function (data) {
              $('#allnamePayment').text('Pago [ '+data.name +' '+data.lastname+' ]'+' Debe : '+' S/.'+data.debt);
            })
          }
          else {
            toastr.error("Hubo un error");
          }
        }).catch(function(){
          toastr.error("Hubo un error");
        });
        }
        else{
          if (!(quantity && type && user )) {
            toastr.error("Llene todos los campos");
          }
        }
      })


})
