$(function() {
    $('[data-toggle="popover"]').popover()
})

$('.carousel').carousel({
    interval: 3000
});

$('#contacto').on('show.bs.modal', function(e) {

    console.log('El modal se está mostrando');


    $('#contacto').removeClass('btn-primary');
    $('#contacto').addClass('btn-secondary');
    $('#contacto').prop('disabled', true);
});
$('#contacto').on('shown.bs.modal', function(e) {
    console.log('El modal se terminó de mostrar');
});
$('#contacto').on('hide.bs.modal', function(e) {
    console.log('El modal se está cerrando');

    $('.contacto').prop('disabled', false);
    $('#contacto').removeClass('btn-secondary');
    $('#contacto').addClass('btn-primary');
});
$('#contacto').on('hidden.bs.modal', function(e) {
    console.log('El modal se terminó de cerrar');
});