var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');
var postMasterController = require('../controllers/postMasterController');
var imagenController = require('../controllers/imagenController');
var assistController = require('../controllers/assistController');
var typeController = require('../controllers/typeController');
var paymentController = require('../controllers/paymentController');

var Type = require('../collections/type');
var User = require('../collections/user');

var mailController = require('../controllers/mail');

/* GET home page. */
router.get('/', function(req, res, next) {
  Type.find({})
  .exec(function (err,type) {
    if(err) return res.sendStatus(503);
    res.render('index', { types: type });
  });
});
router.get('/lista',function (req,res) {
  User.find({})
  .exec(function (err,user) {
    if(err) return res.sendStatus(503);
    res.render('test',{'user':user});
  });
});
router.get('/usertable',function (req,res) {
    res.render('asistencia/usertable');
});
router.route('/preregistro')
        .get(userController.createView)
        .post(userController.register);
//****JULIO*****//
router.route('/login')
        .get(userController.login);
router.route('/count_users')
        .get(userController.countUser);



//****JULIO*****/
// router.route('/postlogin')
//         .post(userController.postlogin);
// router.route('/logout')
//         .get(userController.logout);
// router.route('/dashboard')
//         .get(userController.dashboard);
// router.route('/addAdmin')
//         .post(userController.addAdmin);
router.route('/taller').post(userController.addUserWorkshop);
router.route('/lista-taller').get(userController.listUserTaller);
router.route('/taller-count').get(userController.listUserTallerCount);
router.route('/show-taller').get(userController.showWorshop);
router.route('/Dtaller').get(userController.deleteTaller);
router.route('/checkemail').get(userController.emailCheck);
router.route('/checkdni').get(userController.dniCheck);
router.route('/checkemailedit').get(userController.emailCheckEdit);
router.route('/checkdniedit').get(userController.dniCheckEdit);
router.route('/checkemailTaller').get(userController.emailCheckTaller);
router.route('/checkdniTaller').get(userController.dniCheckTaller);
router.route('/checkDate').get(userController.checkDate);
router.route('/addDelegation').post(userController.addDelegation);
router.route('/usuario/crear').post(userController.create);
router.route('/usuario/editar').post(userController.update);
router.route('/usuario').get(userController.getUserOne);


 router.route('/sistemadeasistencia')
         .get(assistController.index)
router.route('/asistencia')
          .get(assistController.create);

router.route('/usuario_asistencia')
        .get(assistController.getAssist);
router.route('/lista_asistencia')
        .get(assistController.getAssistAll);
router.route('/lista_principal')
        .get(assistController.getAssistMain);
router.route('/dias')
        .get(assistController.getDay);
router.route('/diasAll')
        .get(assistController.getDayAll);
router.route('/Dasist')
        .get(assistController.deleteAssist);

router.route('/pagos')
          .post(paymentController.create);
router.route('/Lpagos')
          .get(paymentController.getPayment);
router.route('/usuario/pagos')
          .get(paymentController.getPaymentUser);
router.route('/pago/delete')
        .get(paymentController.deletePaymentOne);
router.route('/Dpagos')
        .get(paymentController.deletePayment);

router.route('/type')
          .post(typeController.create);
router.route('/edit_type')
          .post(typeController.edit);
router.route('/types')
          .get(typeController.getTypes);
router.route('/Dtype')
          .get(typeController.deleteType);

router.route('/postmaster/photo').post(imagenController.create);
router.route('/getPhotos').get(imagenController.getPhotos);


router.route('/.well-known/acme-challenge/:zf2uIh7KIBEFFrKnxQY1jBGH5xEYlY2E6BAz0dMKx6s')
		.get(userController.sslController1)

router.route('/.well-known/acme-challenge/:ziWr--RAg3dYNucCUNNHMJt0nzN5KBueFLRBKI6_K84')
		.get(userController.sslController2)


router.route('/postmaster/preregistro')
          .post(postMasterController.register);
router.route('/postmaster/Dusuarios')
          .get(postMasterController.deleteUsers);
//
// router.route('/list')
//           .get(postMasterController.checkReniec);
router.route('/postmaster/usuarios')
          .get(postMasterController.getUsers);

router.post('/contacto', mailController.contact);

router.route('/pago')
        .get(paymentController.getTotalPayment);
router.route('/deuda')
        .get(userController.getTotalDebt);

router.route('/usuarios')
        .get(userController.getUsers);
router.route('/Dusuarios')
        .get(userController.deleteUsers);
router.route('/Duser')
        .post(userController.deleteOne);
router.route('/Duseremail')
        .post(userController.deleteOneEmail);

router.route('/postmaster')
		.get(postMasterController.createView)
module.exports = router;
