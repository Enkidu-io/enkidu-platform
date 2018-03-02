$(document).ready(function(e){
	$.fn.modal.Constructor.prototype._enforceFocus = function () {};
	$("#basic_modal").modal('hide');
	$("#button_comment").on("click",function(){
		if($("#text_area_comment").val()=="" )
			alert("Comment isn't working. Press check again later");
	});

	$("#payment-gateway-button").on("click",function(){
			alert("Gateway under construction");
	});

    $('.search-panel .dropdown-menu').find('a').click(function(e) {
		e.preventDefault();
		var param = $(this).attr("href").replace("#","");
		var concept = $(this).text();
		$('.search-panel span#search_concept').text(concept);
		$('.input-group #search_param').val(param);
	});
	$(".btn-copy-project-id").on("click", function(){
		var project_id = $(this).data("project-id");
		$("#modal-project-id").attr("value", project_id);
	});

	  $("#file-tab").on("click",function(){
                var x=$("#file-upload").val();
                var y=$("#web-url").val();
                if(y!="" && y!=null)
                {

                  bootbox.confirm({
                    title: "Alert!!",
                    message: "Web Url is already entered.Do you want to add image?",
                    buttons: {
                        cancel: {
                            label: '<i class="fa fa-times"></i> Cancel'
                        },
                        confirm: {
                            label: '<i class="fa fa-check"></i> Confirm'
                        }
                    },
                    callback: function (result) {
                        if(result==true)
                        {

                        }
                        else if(result==false)
                        {
                          $("#file-tab").removeClass("active");
                            $("#tab2FollowUs").removeClass("active");
                            $("#url-tab").addClass("active");
                            $("#tab2hellowWorld").addClass("active");



                        }
                    }
                  });
                }
              });



});