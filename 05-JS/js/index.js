document.querySelector("h1").addEventListener("click",() => {
    //document.getElementsByTagName("p")[0].innerHTML = "U are an idiot";
    var oopsArray = document.getElementsByClassName("oops");
    oopsArray[0].innerHTML = "HOla";
    //oopsArray[0].classList.add("special")
    oopsArray[0].classList.toggle("special");
    for(i = 0; i < oopsArray.length; i++){
        oopsArray[i].textContent = "<b>Holapas</b>";
    }

    //Most of the times we use query selector
    var liArray = document.querySelectorAll(".nums li");
    for(i = 0; i < liArray.length; i++){
        liArray[i].style = "color: blue";
        liArray[i].style.fontSize = "2rem";
    }

    document.querySelector("a").setAttribute("href", "https://paletadecolores.online/colors/ffe59a/");
    $("li").css("color", "red");
    if($(".s_item").hasClass("super")){
        $(".s_item").removeClass("super");
    }
    else{
        $(".s_item").addClass("super");
    }

    //$("p").text($("p").text() + "hola");
    $(".nums").prepend("<li>Element "+ ($(".nums li").length + 1) +"</li>");

    $("p").before("<h3>Sub</h3>")
});