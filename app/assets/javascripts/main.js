
$(document).ready(function(e){
$.fn.modal.Constructor.prototype._enforceFocus = function () {};
	
	$("#basic_modal").modal('hide');

	// $("#modal-project-index").modal('show');







    $('.search-panel .dropdown-menu').find('a').click(function(e) {
		e.preventDefault();
		var param = $(this).attr("href").replace("#","");
		var concept = $(this).text();
		$('.search-panel span#search_concept').text(concept);
		$('.input-group #search_param').val(param);
	});
});