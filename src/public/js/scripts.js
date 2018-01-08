$(document).ready(function() {    

    $('#contact_form').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            first_name: {
                validators: {
                        stringLength: {
                        min: 2,
                    },
                        notEmpty: {
                        message: 'Escriba sus nombres'
                    }
                }
            },
             last_name: {
                validators: {
                     stringLength: {
                        min: 2,
                    },
                    notEmpty: {
                        message: 'Escriba sus apellidos'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'Escriba su correo electrónico'
                    },
                    emailAddress: {
                        message: 'Ingrese un correo valido'
                    }
                }
            },
            phone: {
                validators: {
                    notEmpty: {
                        message: 'Inrese su número telefónico'
                    }
                }
            },
            city: {
                validators: {
                     stringLength: {
                        min: 4,
                    },
                    notEmpty: {
                        message: 'Ingrese su ciudad'
                    }
                }
            },
      nota: {
                validators: {
                     stringLength: {
                        min: 0,
                    }
                }
            },
      capcha: {
                validators: {
                     stringLength: {
                        min: 4,
                    }
                }
            }
        }
        })
        .on('success.form.bv', function(e) {
      $('#success_message').hide();
            // Prevent form submission
            e.preventDefault();
            // Get the form instance
            var $form = $(e.target);

            // Use Ajax to submit form data
            $.post($form.attr('action'), $form.serialize())
                .done(function(result){
                console.log('done')
                  $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
                  $('#contact_form').bootstrapValidator("resetForm",true);
                })
                .fail(function(){
                    console.log('fail')
                })
                .complete(function(){

                })
    })

    $('.fondos').tooltip()
});




function listar(){
    $('#lista').empty();
    $.ajax({
        type:"post",
        url:"php/inscritos.php",
        success:function(datos){
            inscritos = eval(datos);
            html = "";
            html += "<table class='table table-hover table-bordered'>";
            html += "<thead>";
            html += "<tr><th>Nro</th><th>Nombres</th><th>Apellidos</th><th>Tipo</th><th>Email</th><th>Telefono</th><th>Ciudad</th><th>Nota</th></tr>";
            html += "</thead>"
            html += "<tbody>";
            for(i=0; i<inscritos.length; i++){
                html += "<tr><td>"+i+"</td><td>"+inscritos[i].nombres+"</td><td>"+inscritos[i].apellidos+"</td><td>"+inscritos[i].tipo+"</td><td>"+inscritos[i].email+"</td><td>"+inscritos[i].telefono+"</td><td>"+inscritos[i].ciudad+"</td><td>"+inscritos[i].nota+"</td></tr>";
            }
            html += "</tbody>";
            html += "</table>";
            $('#lista').append(html);
        }
    })
}
