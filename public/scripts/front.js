var is_basket = false;
var receipt = {
    //idx, name, count 순
    sum : 0
};

//장바구니
function basket(){
    if (is_basket){
        $('#basket').css('top', '820px');
        $('#curtain').css('background-color', 'rgba(255,255,255,0)');
        $('#basket_button_img').attr("src","images/option_up.png")
        is_basket = false;
    }
    else {
        $('#basket').css('top', '350px');
        $('#curtain').css('background-color', 'rgba(100,100,100,0.5)');
        $('#basket_button_img').attr("src","images/option_down.png")
        is_basket = true;
    }
};
//장바구니 추가 및 제거하기
var basket_num = 0;
function add_basket(link, img_link, name, price, idx){
    //장바구니
    $(".basket_card_slot:eq(" + basket_num + ")").css("display", "block");
    $(".basket_card_slot:eq(" + basket_num + ")").attr("href", link);
    $(".basket_card_slot:eq(" + basket_num + ") img").attr("src", img_link);
    $(".basket_card_slot:eq(" + basket_num + ") .basket_card_name").html(name);
    $(".basket_card_slot:eq(" + basket_num + ") .basket_card_price").html(price);
    //영수증
    //idx가 리스트 안에 있을 때
    if (receipt.index_list.includes(idx)){
        console.log("!");
        console.log(receipt.index_list);
    }
    //idx가 리스트 안에 없을 때
    else {
        console.log('?');
        receipt.index_list.push(idx)
        console.log(receipt.index_list);
    }
    basket_num += 1;
    
}
function remove_basket(i){
    for (var x = i; x <= basket_num - 1; x++){
        $(".basket_card_slot:eq(" + x + ") a").attr("href", $(".basket_card_slot:eq(" + (x + 1) + ")").attr("href"));
        $(".basket_card_slot:eq(" + x + ") img").attr("src", $(".basket_card_slot:eq(" + (x + 1) + ") img").attr("src"));
        $(".basket_card_slot:eq(" + x + ") .basket_card_name").html($(".basket_card_slot:eq(" + (x + 1) + ") .basket_card_name").html());
        $(".basket_card_slot:eq(" + x + ") .basket_card_price").html($(".basket_card_slot:eq(" + (x + 1) + ") .basket_card_price").html());
    }
    $(".basket_card_slot:eq(" + (basket_num) + ")").css("display", "none");
    basket_num -= 1;
}

//드롭다운 메뉴
$(function(){
    $("#sec_category").mouseover(function(){
        $("#category").css("width", "582px");
    });
    $("#fir_category > .cate_box_li").mouseover(function(){
        $("#fir_category > .cate_box_li").removeClass("cate_box_li_selected");
        $(this).addClass("cate_box_li_selected");
    });
    $("#sec_category > .cate_box_li").mouseover(function(){
        $("#sec_category > .cate_box_li").removeClass("cate_box_li_selected");
        $(this).addClass("cate_box_li_selected");
    });
    $("#thr_category > .cate_box_li").mouseover(function(){
        $("#thr_category > .cate_box_li").removeClass("cate_box_li_selected");
        $(this).addClass("cate_box_li_selected");
    });
})

function test(){
    var name = $("#name").val()
    var link = $("#link").val()
    var price = $("#price").val()
    var idx = $("#index").val()
    add_basket(link, "#", name, price, idx)
}

function reset(){
    $(".basket_card_slot").css("display", "none");
    $(".receipt_list_one").css("display", "none");
    basket_num = 0;
}