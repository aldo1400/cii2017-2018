
$(function(){

    /*var finestraModal3 = document.getElementById("finestra-modal3"),
      finestraModalObrir3 = document.getElementById("finestra-modal-obrir3"),
      finestraModalTancar3 = document.getElementById("finestra-modal-tancar3");

      finestraModal3.classList.add("js-mostrar3");

      var btnaspa3=$('#finestra-modal-tancar3');
      btnaspa3.click(Aspa3);

      function Aspa3(){
        finestraModal3.classList.remove("js-mostrar3");
      }*/


    //-window.onload = pre_modal;




    function pre_modal(){
      $('#pre_modal').modal('show');
    }
    $('#subscribe').prop('disabled', true);

    toastr.options = {
      "preventDuplicates": true,
      "positionClass": "toast-bottom-right",
      "closeButton": true
    //

    }




   $("#contactBtn").animatedModal({
      animatedOut:'bounceOutDown',
      color:'rgba(0, 0, 0, 0.7)',
   });

   $("#preRegisterBtn").animatedModal({
          modalTarget:'preRegisterModal',
          animatedOut:'bounceOutUp',
          color:'yellow'
        });
    $("#registrate1").animatedModal({
          modalTarget:'preRegisterModal',
          animatedOut:'bounceOutUp',
          color:'yellow'
        });
    $("#registrate2").animatedModal({
          modalTarget:'preRegisterModal',
          animatedOut:'bounceOutUp',
          color:'yellow'
        });
    $("#registrate3").animatedModal({
          modalTarget:'preRegisterModal',
          animatedOut:'bounceOutUp',
          color:'yellow'
        });
    $("#registrate4").animatedModal({
          modalTarget:'preRegisterModal',
          animatedOut:'bounceOutUp',
          color:'yellow'
        });
    $("#registrate5").animatedModal({
          modalTarget:'preRegisterModal',
          animatedOut:'bounceOutUp',
          color:'yellow'
        });
    $("#registrate6").animatedModal({
          modalTarget:'preRegisterModal',
          animatedOut:'bounceOutUp',
          color:'yellow'
        });

  $(".add-participant").click(function () {
    var participant = $($(".participant-temp")[0]).clone();
    participant.removeClass("hide");
    participant.find("input").val("");
    participant.attr('required','');
    if($(".participant").length<4){
      $($(".participant")[$(".participant").length-1]).after(participant);
      $(".delete-participant").unbind('click').click(deleteParticipant)
    }
  })
  $("#preRegisterConcurseBtn").animatedModal({
    modalTarget:'preRegisterConcurseModal',
    animatedOut:'bounceOutUp',
    color:'yellow'

  })

  //
  // $(".preRegisterConcurseForm").submit(function (e) {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   var data = {};
  //   var participants_name = []
  //   var participants_lastname = []
  //   var participants_dni = []
  //   for (var i = 0; i < $(".participant").length; i++) {
  //     participants_name.push($($(".participant")[i]).find("[name='name']").val())
  //     participants_lastname.push($($(".participant")[i]).find("[name='lastname']").val())
  //     participants_dni.push($($(".participant")[i]).find("[name='DNI']").val())
  //   }
  //   data.team = $("[name='team']").val()
  //   data.participants_name = participants_name;
  //   data.participants_lastname = participants_lastname;
  //   data.participants_dni = participants_dni;
  //
  //   $.ajax({
  //     url:'/concurso',
  //     type:'POST',
  //     data:data,
  //     success:function (res) {
  //       $('.closebt').click();
  //       toastr.success('Se preinscribio al concurso =)');
  //     },
  //     error:function (err) {
  //       toastr.error('Intentelo de nuevo');
  //     }
  //
  //   })
  //   // console.log(participants);
  // })
  //
  //
  // function deleteParticipant(e) {
  //   e.preventDefault();
  //   $(this).parent().parent().parent().remove();
  //
  // }
  // $(".delete-participant").click(deleteParticipant)
  //   //SCRIPTS AJAX
  //   $('#subscribe').click(subscribeMailChimp);




    $('#email').on('input',function(e){

      if($(this).val().length-1 >= 0 && $(this).val().indexOf('@')!= -1) $('#subscribe').prop('disabled', false);
      else $('#subscribe').prop('disabled', true);

    })

    var flag_contactEmail = false;
    var flag_contactData = false;

    var flag_preRegisterEmail = false;
    var flag_preRegisterData = false;



    $('#contactEmail').on('input',function(e){
      if($(this).val().length-1 >= 0 && $(this).val().indexOf('@')!= -1){
        flag_contactEmail = true;
        if(flag_contactData) $('#submitContact').prop('disabled', false);
      }
      else $('#submitContact').prop('disabled', true);

    })

     $('#contactName, #contactSubject').on('input', function(e){

      if($(this).val().length-1 >= 0){
        flag_contactData = true;
        if (flag_contactEmail) $('#submitContact').prop('disabled', false);

      }
      else $('#submitContact').prop('disabled', true);
     })


     $('#preRegisterEmail').on('input',function(e){
      if($(this).val().length-1 >= 0 && $(this).val().indexOf('@')!= -1){
        flag_preRegisterEmail = true;
        if(flag_preRegisterData) $('#submitPreRegister').prop('disabled', false);
      }
      else $('#submitPreRegister').prop('disabled', true);

    })


      $(' #preRegisterFirstName,' +
        ' #preRegisterLastName,' +
        ' #preRegisterDNI,' +
        ' #preRegisterType,' +
        ' #preRegisterVoucher').on('input', function(e){
          //console.log('inputs',$(this));
          if($(this).val().length-1 >= 0){

            flag_preRegisterData = true;
            if (flag_preRegisterEmail) $('#submitPreRegister').prop('disabled', false);
          }
          else $('#submitPreRegister').prop('disabled', true);
      })


    $('#submitContact').click(function(e){
      var email = $('#contactEmail').val();
      var name = $('#contactName').val();
      var subject = $('#contactSubject').val();

      var contact_form = {
        'email' : email,
        'name': name,
        'subject': 'CIIS: '+subject
      }
      console.log(contact_form);
      if(email && name && subject){

        var myImage = document.createElement("img");
        myImage.src = "http://chatv2.velaro.com//Inline/Images/loading.gif";
        myImage.className = 'spiningAjax';
        var self = e.currentTarget;
        self.appendChild(myImage);
        self.disabled= true;

        $.ajax({
            url: '/contacto',
            type: "POST",
            data:JSON.stringify(contact_form),
            contentType:"application/json; charset=utf-8",
          success:(function(){
            $('.closebt').click();
            toastr.success("Te responderemos lo mas pronto posible  =)");
          }),
          error:(function(){
            toastr.error("Hubo un error");
          }),
          always:(function(){
            $('#contactEmail').val('');
            $('#contactName').val('');
            $('#contactSubject').val('');
            self.removeChild(myImage);
            self.disabled= false;
          })
        })
      }
    })


      $("#submitPreRegister").click(function(e){
        debugger;
      var email = $('#preRegisterEmail').val();
      var firstName = $('#preRegisterFirstName').val();
      var lastName = $('#preRegisterLastName').val();
      var dni = $('#preRegisterDNI').val();
      var type = $('#preRegisterType').val();
      var institution = $('#preRegisterInstitution').val();
      var city = $('#preRegisterCity').val();
      var cellphone = $('#preRegisterCellphone').val();
      var photo = $('#preRegisterVoucher')[0].files[0];
      var eventType = "CIIS";

      var emailValidated=false;
      var dniValidated=false;

      //var image = $('#preRegisterVoucher')[0].files[0]
      //var image_val = $('#preRegisterVoucher').val();
      //var files = $('#preRegisterVoucher').get(0).files[0];
     var formData = new FormData();

      //var photo = document.getElementById("preRegisterVoucher");
      //var image = photo.files[0];

      //var form = document.getElementById('preRegisterForm')
      //var form = $('preRegisterForm')[0];

      formData.append('email', email);
      formData.append('name', firstName);
      formData.append('lastname', lastName);
      formData.append('dni', dni);
      formData.append('type', type);
      formData.append('institution', institution);
      formData.append('city', city);
      formData.append('cellphone', cellphone);
      formData.append("photo", photo);

      //formData.append('image', new Blob([JSON.stringify(files)]),{type:'application/json'});



      var data = {
        'email': formData.get("email"),
        'name': formData.get("firstName"),
        'lastname': formData.get("lastName"),
        'dni': formData.get("dni"),
        'type': formData.get("type"),
        'city': formData.get("city"),
        'cellphone': formData.get("cellphone"),
        'eventType':eventType

      };

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
      if(email && firstName && photo && lastName && dni && type && city && emailValidated && dniValidated){
        var myImage = document.createElement("img");
        myImage.src = "http://chatv2.velaro.com//Inline/Images/loading.gif";
        myImage.className = 'spiningAjax';
        var self = e.currentTarget;
        self.appendChild(myImage);
        self.disabled= true;
        var preclose = document.getElementById('finpre');
        fetch("/preregistro",{
            method: "POST",
            body: formData,
            credentials: "same-origin"
        }).then(response => {
          $('.closebt').click();
          $('#preRegisterEmail').val('');
          $('#preRegisterFirstName').val('');
          $('#preRegisterLastName').val('');
          $('#preRegisterDNI').val('');
          $('#preRegisterCity').val('');
          $('#preRegisterCellphone').val('');
          $('#preRegisterInstitution').val('');
          $('#preRegisterVoucher').val('');
          self.removeChild(myImage);
          self.disabled= false;
          preclose.click();
          toastr.success("Gracias por preinscribirte =)");
        }).catch(function(){
          toastr.error("Hubo un error");
        });
          //
          // $.ajax({
          //   url: '/preregistro',
          //   type: "POST",
          //   data:JSON.stringify(data),
          //   contentType:"application/json; charset=utf-8",
          //
          // //}).success(function(){
          //   //console.log("EMAIL DE ENVIO",email)
          //     //return subscribeMailChimpEmail(email)
          //
          //   success:(function(){
          //     //-console.log('success')
          //     $('.closebt').click();
          //     $('#preRegisterEmail').val('');
          //     $('#preRegisterFirstName').val('');
          //     $('#preRegisterLastName').val('');
          //     $('#preRegisterDNI').val('');
          //     $('#preRegisterCity').val('');
          //     $('#preRegisterCellphone').val('');
          //   }),
          //   error:(function(){
          //
          //   }),
          //   always:(function(){
          //     $('#preRegisterEmail').val('');
          //     $('#preRegisterFirstName').val('');
          //     $('#preRegisterLastName').val('');
          //     $('#preRegisterDNI').val('');
          //     $('#preRegisterType').val('');
          //     $('#preRegisterCity').val('');
          //     $('#preRegisterCellphone').val('');
          //     self.removeChild(myImage);
          //     self.disabled= false;
          //   })
          // });

        }
        else{
          if (!(email && firstName && photo && lastName && dni && type && city)) {
            toastr.error("Llene todos los campos");
          }
        }
      })


    $("#submitPreRegisterTaller").click(function(e){
      debugger;
      var email = $('#tallerEmail').val();
      var name = $('#tallerName').val();
      var lastName = $('#tallerLastName').val();
      var dni = $('#tallerDNI').val();
      var type = $('#tallerType').val();
      var institution = $('#tallerInstitution').val();
      var city = $('#tallerCity').val();
      var cellphone = $('#tallerCellphone').val();
      var list = $('#talleres_cursos').val();

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
          url: '/checkemailTaller?email='+email,
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
          url: '/checkdniTaller?dni='+dni,
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
        'lastname': lastName,
        'dni': dni,
        'type': type,
        'city': city,
        'institution': institution,
        'cellphone': cellphone,
        'list' : list

      };
      console.log(data);
      if(email && name && lastName && dni && type && institution && city && emailValidated && dniValidated){
        var preclose = document.getElementById('fintaller');
        fetch("/taller",{
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
            $('.closebt').click();
            $('#tallerEmail').val('');
            $('#tallerName').val('');
            $('#tallerLastName').val('');
            $('#tallerDNI').val('');
            $('#tallerCity').val('');
            $('#tallerCellphone').val('');
            $('#tallerInstitution').val('');
            $('#talleres_cursos').select2('val','[]');
            preclose.click();
            toastr.success("Gracias por preinscribirte =)");
          }
          else {
            toastr.error("Hubo un error");
          }
          // self.removeChild(myImage);
          // self.disabled= false;
        }).catch(function(){
          toastr.error("Hubo un error");
        });

        }
        else{
          if (!(email && name && lastName && dni && type && city)) {
            toastr.error("Llene todos los campos");
          }
        }
      })



      function createPhoto(){
        debugger;
              const formData = new FormData();
              formData.append("photo", $('#photoUp')[0].files[0]);
              console.log($('#photoUp')[0].files[0]);

              fetch("/postmaster/photo",{
                  method: "POST",
                  body: formData,
                  credentials: "same-origin"
              }).then(response => {

              });
          }
    function subscribeMailChimp(e){
      var email = $('#email');
      if($(this).val().length-1 >= 0 && $(this).val().indexOf('@')!= -1) $('#subscribe').prop('disabled', false);
      $.post('/mailchimp/listas/ceef9aabad/suscribir',{email: email.val()})
        .done(function(data){
          toastr.success('Gracias por suscribirte, te informaremos por correo cualquier novedad', 'Genial!')

        })
        .fail(function(err){
          toastr.error('Hubo un error en la petición, intente nuevamente', 'Error!')
        })
      }

      function subscribeMailChimpEmail(email){

        return $.post('/mailchimp/listas/ceef9aabad/suscribir',{email: email});
      }

    //INIT MEDIA PLAYER
    $('video,audio').mediaelementplayer();

    function formatTens(n) {
      return (n < 10) ? '0'+n : ''+n;
    }

    var finalDate = new Date('11/13/2017 09:00')

    $('#countdown').countdown(finalDate,function(event){
      var seconds = formatTens(event.offset.seconds);
      var minutes = formatTens(event.offset.minutes);
      var hours = formatTens(event.offset.hours);
      var days = formatTens(event.offset.totalDays);

      $('#days').text(days);
      $('#hours').text(hours);
      $('#minutes').text(minutes);
      $('#seconds').text(seconds);

    })

    //INIT MAPS
    google.maps.event.addDomListener(window, 'load', init);
    var coordenadas=new google.maps.LatLng(-18.025352, -70.249157);


    function init() {

      var myOptions = {
          scrollwheel: false,
          zoom: 15,
          center: coordenadas,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          // styles:
          //       [
          //           {
          //               "featureType": "landscape",
          //               "stylers": [
          //                               {
          //                                   "saturation": -100
          //                               },
          //                               {
          //                                   "lightness": 65
          //                               },
          //                               {
          //                                   "visibility": "on"
          //                               }
          //                           ]
          //           },
          //           {
          //               "featureType": "poi",
          //               "stylers": [
          //                               {
          //                                   "saturation": -100
          //                               },
          //                               {
          //                                   "lightness": 51
          //                               },
          //                               {
          //                                   "visibility": "simplified"
          //                               }
          //                           ]
          //           },
          //           {
          //               "featureType": "road.highway",
          //               "stylers": [
          //                               {
          //                                   "saturation": -100
          //                               },
          //                               {
          //                                   "visibility": "simplified"
          //                               }
          //                           ]
          //           },
          //           {
          //               "featureType": "road.arterial",
          //               "stylers": [
          //                               {
          //                                   "saturation": -100
          //                               },
          //                               {
          //                                   "lightness": 30
          //                               },
          //                               {
          //                                   "visibility": "on"
          //                               }
          //                            ]
          //           },
          //           {
          //               "featureType": "road.local",
          //               "stylers": [
          //                               {
          //                                   "saturation": -100
          //                               },
          //                               {
          //                                   "lightness": 40
          //                               },
          //                               {
          //                                   "visibility": "on"
          //                               }
          //                           ]
          //           },
          //           {
          //               "featureType": "transit",
          //               "stylers": [
          //                               {
          //                                   "saturation": -100
          //                               },
          //                               {
          //                                   "visibility": "simplified"
          //                               }
          //                           ]
          //           },
          //           {
          //               "featureType": "administrative.province",
          //               "stylers": [
          //                               {
          //                                   "visibility": "off"
          //                               }
          //                           ]
          //           },
          //           {
          //               "featureType": "water",
          //               "elementType": "labels",
          //               "stylers": [
          //                               {
          //                                   "visibility": "on"
          //                               },
          //                               {
          //                                   "lightness": -25
          //                               },
          //                               {
          //                                   "saturation": -100
          //                               }
          //                           ]
          //           },
          //           {
          //               "featureType": "water",
          //               "elementType": "geometry",
          //               "stylers": [
          //                               {
          //                                   "hue": "#ffff00"
          //                               },
          //                               {
          //                                   "lightness": -25
          //                               },
          //                               {
          //                                   "saturation": -97
          //                               }
          //                           ]
          //           }
          //       ]
      };

      var map = new google.maps.Map(document.getElementById('map'), myOptions);

      var marker = new google.maps.Marker({
        position: coordenadas,
        map: map,
        //icon:'images/ciis.png',
        title:"CIIS",
        animation: google.maps.Animation.DROP
      });
    };
  })
