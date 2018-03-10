$(document).ready(function(e) {
    $(window).on("load", function(){
        $("#loading-div").hide();
        $("#body-wrapper").removeClass("no-display");
    });
    
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
    $(".select-order-index").on("change", function(e){
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
        var utf=getUrlParameter("utf8");
        var q = getUrlParameter("q[title_or_description_cont]");
        var commit = getUrlParameter("commit");
        if(utf == null)
            utf = "";
        if(q == null)
            q = "";
        if(commit == null)
            commit = "";
        window.open("/projects?" + 
                        "utf8=" + utf + 
                        "&q%5Btitle_or_description_cont%5D=" + q + 
                        "&commit=" + commit + 
                        "&order=" + order_params, "_self");
    });
    rId = getUrlParameter("resolution_id");
    if(rId){
        $("#resolution-list-bids>li.active").removeClass("active");
        switch(rId){
            case "1": $("#li-add_c-bids").addClass("active"); 
            break
            case "2": $("#li-remove_c-bids").addClass("active");
            break;
            default: $("#li-vote_d-bids").addClass("active");
        }
    }

});
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};