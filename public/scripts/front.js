var is_basket = false;


// ========================================================
// ======================= 카테고리 =======================
// 카테고리 드롭다운
$(function(){
    $("#category2").mouseover(function(){
        $("#category").css("width", "582px");
    });
    $("#category1 > .cate_box_li").mouseover(function(){
        $("#category1 > .cate_box_li").removeClass("cate_box_li_selected");
        $(this).addClass("cate_box_li_selected");
        $("#category2 > .cate_box_li").removeClass("cate_box_li_selected");
    });
    $("#category2 > .cate_box_li").mouseover(function(){
        $("#category2 > .cate_box_li").removeClass("cate_box_li_selected");
        $(this).addClass("cate_box_li_selected");
        $("#category3 > .cate_box_li").removeClass("cate_box_li_selected");
    });
    $("#category3 > .cate_box_li").mouseover(function(){
        $("#category3 > .cate_box_li").removeClass("cate_box_li_selected");
        $(this).addClass("cate_box_li_selected");
    });
});

// 카테고리 초기화
function initCategory(){
    category = callCategory()
    for (var i = 0; i < 10; i++){
        var dir = "#category1 li:eq(" + i + ")";
        if (i < category[0].length){
            $(dir).html(category[0][i]);
        }
        else{
            $(dir).css("display", "none");
        };
    }
    for (var i = 0; i < 10; i++){
        var dir = "#category2 li:eq(" + i + ")";
        if (i < category[1][0].length){
            $(dir).html(category[1][0][i]);
        }
        else{
            $(dir).css("display", "none");
        };
    }
}

// 카테고리 바꾸기
function setCategory(a, b){
    if (a != -1){
        for (var i = 0; i < 10; i++){
            var dir = "#category2 li:eq(" + i + ")";
            if (i < category[1][a].length){
                $(dir).html(category[1][a][i]);
                $(dir).css("display", "block");
            }
            else{
                $(dir).css("display", "none");
            }
        }
        page2 = a;
    }
    if (b != -1){
        for (var i = 0; i < 10; i++){
            var dir = "#category3 li:eq(" + i + ")";
            if (i < category[2][page2][b].length){
                $(dir).html(category[2][page2][b][i]);
                $(dir).css("display", "block");
            }
            else{
                $(dir).css("display", "none");
            }
        }
    }
}

// 카테고리 임시
// 차후 이 함수로 카테고리 값 가져오기
function callCategory(){
    return {
        0 : ["ㄱ", "ㄴ", "ㄷ"],
        1 : {
            0 : ["가", "갸", "거", "겨"],
            1 : ["나", "냐", "너"],
            2 : ["다", "댜", "더", "뎌", "도"]
        },
        2 : {
            0 : {
                0 : ["각", "간", "갇", "갈", "감"],
                1 : ["갹", "갼", "갿", "걀"],
                2 : ["걱", "건", "걷", "걸", "검", "겁"],
                3 : ["격", "견", "겯", "결", "겸"]
            },
            1 : {
                0 : ["낙", "난", "낟", "날"],
                1 : ["냑", "냔"],
                2 : ["넉", "넌", "넏", "널", "넘"]
            },
            2 : {
                0 : ["다1"],
                1 : ["다2"],
                2 : ["다3"],
                3 : ["다4"],
                4 : ["다5"]
            }
        } 
    }
}

// ========================================================
// ====================== 로컬 저장소 ======================

// 로컬 스토리지 불러오기
function callLS(stgName){
    var localValue = localStorage.getItem(stgName);
    if (localValue == null){ return []; }
    else { return localValue.split(','); }
}

// 로컬 스토리지 값 추가
function addLS(stgName, value, num){
    // 최근 검색 목록, 최근 방문 목록, 장바구니 순
    var stgLong = [4, 6, 100];
    var localValue = localStorage.getItem(stgName);
    if (localValue == null) {localStorage.setItem(stgName, value); }
    else{
        localValue = localValue.split(',');
        if(localValue.includes(value)){
            localValue.splice(localValue.indexOf(value), 1);
            localValue.unshift(value);
        }
        else{
            localValue.unshift(value);
            if(localValue.length > stgLong[num]){
                localValue.pop();
            }
        }
        localStorage.setItem(stgName, arrToStr(localValue));
    }
}

// 로컬 스토리지 값 제거
function subLS(num){
    var localValue = localStorage.getItem(stgName).split(',');
    localValue.splice(num, 1);
    localStorage.setItem(stgName, arrToStr(localValue));
}

// 로컬 스토리지 초기화
function reset(stgName){
    // 전체 초기화용
    if (stgName == 'all'){
        localStorage.clear();
        location.reload();
    }
    else{
        localStorage.setItem(stgName, "");
    }
}

// ========================================================
// ======================= 장바구니 =======================

// 장바구니 열고닫기
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

function resetBasket(){
    var nameList = callLS('basket');
    var objName = [];
    var obj = callCardsMain(nameList);

}

// ========================================================
// ======================= 기능 함수 =======================

// 배열 => 문자열
function arrToStr(arr){
    if (arr.length == 0){
        return "";
    }
    else{
        var result = arr[0];
        for (var i = 1; i < arr.length; i++){
            result += ',' + arr[i];
        }
        return result;
    }
}

// 1000단위 콤마찍기
function addComma(value){
    temp = String(value)
    temp = temp.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return temp; 
}

// 임시 더미 불러오기
// 차후에는 이 시점에서 DB가 알아서 해줄 예정
function callCardsMain(list){
    var result = [];
    for (var i = 0; i < list.length; i++){
        result.push(callCard(list[i]));
    }
    return result;
}

// 임시 더미들
function callCard(value){
    if (value == "고추참치"){
        const res = {
            name : "고추참치",
            price : {
                '할머니닷컴' : 2800,
                '엄마손쇼핑' : 4700,
                '부전시장' : 2100,
                '이마트' : 2400
            },
            info : {
                "맵기" : "6단계",
                "짠 정도" : "3단계",
                "양" : "200g",
                "유통기한" : "20220623"
            },
            low : 2100,
            idx : 123,
            link : "/detail?idx=123",
            img : "/images/cards/123.png",
            pop : true,
            stock : false
        };
        return res
    }
    else if (value == "참치마요"){
        const res = {
            name : "참치마요",
            price : {
                '할머니닷컴' : 2800,
                '엄마손쇼핑' : 4700,
                '부전시장' : 2700,
                '이마트' : 2900
            },
            low : 2700,
            idx : 456,
            link : "/detail?idx=456",
            img : "/images/cards/456.png",
            pop : true,
            stock : true
        };
        return res
    }
    else if (value == "동원참치"){
        const res = {
            name : "동원참치",
            price : {
                '할머니닷컴' : 800,
                '엄마손쇼핑' : 1700,
                '부전시장' : 2100,
                '이마트' : 2000
            },
            low : 800,
            idx : 789,
            link : "/detail?idx=789",
            img : "/images/cards/789.png",
            pop : true,
            stock : true
        };
        return res
    }
    else if (value == "배추김치"){
        const res = {
            name : "배추김치",
            price : {
                '할머니닷컴' : 6800,
                '엄마손쇼핑' : 6000,
                '부전시장' : 6500,
                '이마트' : 6600
            },
            low : 6000,
            idx : 1,
            link : "/detail?idx=1",
            img : "/images/cards/1.png",
            pop : true,
            stock : true
        };
        return res
    }
    else if (value == "파김치"){
        const res = {
            name : "파김치",
            price : {
                '할머니닷컴' : 21800,
                '엄마손쇼핑' : 24700,
                '부전시장' : 21000,
                '이마트' : 21400
            },
            low : 21000,
            idx : 2,
            link : "/detail?idx=2",
            img : "/images/cards/2.png",
            pop : true,
            stock : true
        };
        return res
    }
    else if (value == "총각김치"){
        const res = {
            name : "총각김치",
            price : {
                '할머니닷컴' : 33000,
                '엄마손쇼핑' : 47000,
                '부전시장' : 37000,
                '이마트' : 34000
            },
            low : 33000,
            idx : 3,
            link : "/detail?idx=3",
            img : "/images/cards/3.png",
            pop : true,
            stock : true
        };
        return res
    }
    else if (value == "김치라면"){
        const res = {
            name : "김치라면",
            price : {
                '할머니닷컴' : 5300,
                '엄마손쇼핑' : 5300,
                '부전시장' : 5500,
                '이마트' : 5400
            },
            low : 5300,
            idx : 4,
            link : "/detail?idx=4",
            img : "/images/cards/4.png",
            pop : true,
            stock : true
        };
        return res
    }
    else if (value == "김치김밥"){
        const res = {
            name : "김치김밥",
            price : {
                '할머니닷컴' : 2800,
                '엄마손쇼핑' : 4000,
                '부전시장' : 3500,
                '이마트' : 3800
            },
            low : 2800,
            idx : 5,
            link : "/detail?idx=5",
            img : "/images/cards/5.png",
            pop : true,
            stock : true
        };
        return res
    }
    else if (value == "핵김치"){
        const res = {
            name : "핵김치",
            price : {
                '할머니닷컴' : 28000,
                '엄마손쇼핑' : 30000,
                '부전시장' : 29000,
                '이마트' : 29400
            },
            low : 28000,
            idx : 6,
            link : "/detail?value=핵김치",
            img : "/images/cards/6.png",
            pop : true,
            stock : true
        };
        return res
    }
}