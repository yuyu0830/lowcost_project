//이름 같은 카드 목록 불러오는 함수 작성
//메인 카드 정보 불러오는 함수 작성
//지금은 임시로 사용중

var mainCard = {
    name : "엑조디아",
    info : {},
    price : {},
    img : "#"
};

var cardList = {
    name : new Array(),
    imgLink : new Array(),
    code : new Array(),
    stock : new Array()
};

window.onload = function(){
    temp_card(7);
    same_card();
};

//임시 카드 선언
function temp_card(n){
    var temp = ['참치', '꽁치', '김치', '멸치', '삼치', '한치', '명치', '국치', '그치', '아치',
                '홍일동', '홍이동', '홍삼동', '홍사동', '홍오동', '홍육동', '홍칠동', '홍팔동', '홍구동', '홍영동',
                '박지성', '손흥민', '류현진', '사사키 로키', '오타니 쇼헤이', '임요환', '페이커', '이천수', '강백호', '끝나간다', '마지막'];
    for (var i = 0; i < n; i++){
        cardList.name.push(temp[i]);
        cardList.code.push(i);
        cardList.imgLink.push("");
        if (i % 2 == 0){
            cardList.stock.push(true)
        }
        else{
            cardList.stock.push(false)
        }
    }
}

function same_card(){
    for (var i = 0; i < cardList.name.length; i++){
        $(".same_name_card:eq(" + i + ")").css("display", "block");
        $(".same_name_card:eq(" + i + ") img").attr("src", cardList.imgLink[i]);
        $(".same_name_card:eq(" + i + ") #same_name_card_name").text(cardList.name[i]);
        $(".same_name_card:eq(" + i + ") #same_name_card_code").text(cardList.code[i]);
        $(".same_name_card:eq(" + i + ") #same_name_card_stock").text(cardList.stock[i]);
    }
}