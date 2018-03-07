$(document).ready(function(e) {
    $.fn.modal.Constructor.prototype._enforceFocus = function() {};
    $("#basic_modal").modal('hide');
    $("#button_comment").on("click", function() {
        if ($("#text_area_comment").val() == "")
            alert("Comment isn't working. Press check again later");
    });

    $("#payment-gateway-button").on("click", function() {
        alert("Gateway under construction");
    });

    $('.search-panel .dropdown-menu').find('a').click(function(e) {
        e.preventDefault();
        var param = $(this).attr("href").replace("#", "");
        var concept = $(this).text();
        $('.search-panel span#search_concept').text(concept);
        $('.input-group #search_param').val(param);
    });
    $(".btn-copy-project-id").on("click", function() {
        var project_id = $(this).data("project-id");
        $(".modal-project-id").attr("value", project_id);
    });
    $(".select-order-index").on("change", function(){
        var filter_option = parseInt($(".select-order-index option:selected").val());
        var previous_params = window.location.search.substr(1);
        var order_params;
        switch(filter_option){
            case 1: order_params = "likes_count";
            break;
            case 2: order_params = "views_count";
            break;
            case 3: order_params = "ratings_count";
            break;
            default: order_params = "comments_count";
        }
        if(previous_params){
            window.open(window.location + "&order=" + order_params, "_self");
        }
        else
        {
            window.open(window.location + "?order=" + order_params, "_self");
        }
    });
});