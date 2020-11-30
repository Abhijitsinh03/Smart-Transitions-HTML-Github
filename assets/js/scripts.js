function onTouchStart( event ){
    document.addEventListener( "touchstart", function( e ){
        touchAvailable = true;
    }, { passive : true } );
}

try{
    document.getElementById( "navbarToggler" ).addEventListener( "click", function( e ){
        toggleClass( this, "active" );
        toggleClass( document.getElementsByTagName( "body" )[ 0 ], "navigation-open" );
    });

    document.getElementById( "closeIcon" ).addEventListener( "click", function( e ){
        removeClassTech( document.getElementById( "navbarToggler" ), 'active' );
        removeClassTech( document.getElementsByTagName( "body" )[ 0 ], 'navigation-open' );
    } );
}catch(error){

}

function removeClassTech( element, className ){
    element.classList.remove( className );
}

function addClassTech( element, className ){
    element.classList.add( className );
}

function toggleClass( element, className ){
    var hasClass = document.getElementsByClassName( className );
    if( hasClass.length > 0 ){
        removeClassTech( element, className );
    }
    else{
        addClassTech( element, className );
    }
}

function hasClassTech( el, className ){
    if( el.classList )
        return el.classList.contains( className );
    return !!el.className.match( new RegExp( '(\\s|^)' + className + '(\\s|$)' ) );
}

function addClassTech( el, className ){
    if( el.classList )
        el.classList.add( className );
    else if( !hasClassTech( el, className ) )
        el.className += " " + className;
}

function removeClassTech( el, className ){
    if( el.classList )
        el.classList.remove( className );
    else if( hasClassTech( el, className ) ){
        var reg = new RegExp( '(\\s|^)' + className + '(\\s|$)' );
        el.className = el.className.replace( reg, ' ' );
    }
}


function hideElement( element ){
    element.style.display = 'none';
}

var backToTop = document.getElementById( 'backTop' );
hideElement( backToTop );

backToTop.addEventListener( "click", function(){
    scrollToTop();
});

var timeOut;
function scrollToTop(){
    if( document.body.scrollTop != 0 || document.documentElement.scrollTop != 0 ){
        window.scrollBy( 0, -50 );
        timeOut = setTimeout( 'scrollToTop()', 10 );
    }
    else clearTimeout( timeOut );
}

window.onscroll = function( ev ){


    var scrollTop = window.pageYOffset || document.body.scrollTop;
    if( scrollTop > 150 ){

        backToTop.style.display = 'block';
    }
    else{
        backToTop.style.display = 'none';
    }
};
jQuery('.close').on('click', function(){
    jQuery(this).parent('.alert').slideUp(300, function(){
        jQuery(this).remove();
    });
});

let indexCount = 0;
function remove_selected_item(elem, e) {
    e.stopPropagation();
    var option_text = elem.parentElement.querySelector('.select7_content').innerHTML;
    var option_value = elem.parentElement.querySelector('.select7_content').dataset.optionValue;
    var selector = elem.parentElement.parentElement.parentElement.querySelector('.select7_select');

    selector.innerHTML += '<option value="'+option_value+'">'+ option_text+'</option>';

    if (selector.length > 1)
        selector.style.display = 'block';

    var selected_items = elem.parentElement.parentElement.parentElement.querySelectorAll('.select7_item');
    if (selected_items.length == 1) {
        var placeholder = elem.parentElement.parentElement.parentElement.querySelector('.select7_placeholder');
        placeholder.style.display = 'block';
    }



    elem.parentElement.remove();
    indexCount --;

    var selectedItem = document.getElementsByClassName("select7_item");
    let array = [];
    for(var i = 0; i < selectedItem.length; i++)
    {
        var item = selectedItem[i].children;
        array.push(item[0].getAttribute("data-option-value"));
    }
    var validationField = selector.getAttribute("data-validate-field");
    // elem.parentElement.querySelector([name='']).setAttribute("value", array.join());
    $('input[name="'+validationField+'"]').val(array.join());
}

function add_selected_item(elem, e) {
    e.stopPropagation();
    var option_text =  elem[elem.selectedIndex].text;
    var input_name =  elem.getAttribute("data-name");
    var option_value =  elem[elem.selectedIndex].value;
    var selected_items = elem.parentElement.querySelector('.select7_items');
    var placeholder = elem.parentElement.querySelector('.select7_placeholder');

    placeholder.style.display = 'none';
    selected_items.innerHTML += '<div class="select7_item">' +
        '<div data-option-value="'+option_value+'" class="select7_content">'+option_text+'</div>'+
        '<div class="select7_del" onclick="remove_selected_item(this, event);">&#10006;</div>' +
        '<input type="hidden" name="'+input_name+'['+indexCount+']'+'" value="'+option_value+'"></div>';

    // elem[elem.selectedIndex].parentNode.remove(elem[elem.selectedIndex]);
    // elem[elem.selectedIndex].remove();
    var theSelect = document.getElementById(elem.getAttribute('id'));
    theSelect.removeChild(elem[elem.selectedIndex]);
    if (elem.length == 1)
        elem.style.display = 'none';

    var selectedItem = document.getElementsByClassName("select7_item");
    let array = [];
    for(var i = 0; i < selectedItem.length; i++)
    {
        var item = selectedItem[i].children;
        array.push(item[0].getAttribute("data-option-value"));
    }
    var validationField = elem.getAttribute("data-validate-field");
    // elem.parentElement.querySelector('.'+validationField).setAttribute("value", array.join());
    $('input[name="'+validationField+'"]').val(array.join());
    indexCount ++;
}

function selectedItem(){
    if($('.select7_items').find('.select7_item').length > 0){
        $('.select7_items').find('.select7_item').each(function(){
             var value = $(this).find('.select7_content').attr('data-option-value');
             $('.select7_select').find('[value="'+value+'"]').remove();
            indexCount = $('.select7_items').find('.select7_item').length;
        });
        $('.select7_placeholder').hide();
    }
}
selectedItem();

Scrollbot = function(e, w) {
    // e - Element
    // w - scrollbar width
    this.orgPar = document.querySelector(e);

    // init function, Run on IE 9 and above

    if (!this.isIE() || (this.isIE() && this.isIE() > 9)){
        this.init(e,w);
    }
};

Scrollbot.prototype.init = function(e,w){
    var _this = this;
    if (w == undefined) {
        this.sbw = 8;
    } else {
        this.sbw = w;
    }
    // scrollspeed for scroll trackpad click event
    this.scrollSpeed = 200;
    // parent content
    this.parContent = this.orgPar.innerHTML;
    this.orgPar.innerHTML = "";
    this.newPar = document.createElement("div");
    this.sbContainer = document.createElement("div");
    this.scrollBarHolder = document.createElement("div");
    this.scrollBar = document.createElement("div");
    this.inP = document.createElement("div");
    this.newPar.className = "scrollbot-outer-parent";
    this.scrollBarHolder.className = "scrollbot-scrollbar-holder";
    this.scrollBar.className = "scrollbot-scrollbar";
    this.inP.className = "scrollbot-inner-parent";
    this.newPar.style.position = "relative";
    this.newPar.style.paddingRight = this.sbw + "px";
    this.newPar.style.zIndex = "9999999";
    this.newPar.style.height = "100%";
    this.newPar.style.overflow = "hidden";
    this.inPWidth = (this.orgPar.clientWidth - this.sbw) + "px";
    this.inP.style.cssText = "height:100%;overflow-y:auto;overflow-x:hidden;padding-right:" + (this.sbw + 20) + "px;width:100%;box-sizing:content-box;";
    this.inP.innerHTML = this.parContent;
    this.inP.style.height = "100%";
    this.newPar.appendChild(this.inP);
    this.scrollBarHolder.appendChild(this.scrollBar);
    this.newPar.appendChild(this.scrollBarHolder);
    this.orgPar.appendChild(this.newPar);
    this.sbHeight = this.inP.clientHeight * 100 / this.inP.scrollHeight;
    this.mdown = false;
    this.customHeight = false;
    this.scrollElement = this.inP;
    this.prevHeight = this.inP.scrollHeight;
    this.onScroll = function(f) {
        _this.onScrollF = f
    };
    this.sB = {
        width: _this.sbw + "px",
        height: _this.sbHeight + "%",
        position: "absolute",
        right: 0,
        top: 0,
        backgroundColor: "#444444",
        borderRadius: "15px"
    };

    this.sBH = {
        width: _this.sbw + "px",
        height: "100%",
        position: "absolute",
        right: 0,
        top: 0,
        backgroundColor: "#ADADAD",
        borderRadius: "15px"
    };


    for (var p in this.sB) {
        this.scrollBar.style[p] = this.sB[p]
    }
    for (var p in this.sBH) {
        this.scrollBarHolder.style[p] = this.sBH[p];
    }

    this.inP.addEventListener("scroll", function() {
        _this.scrollBar.style.top = _this.inP.scrollTop * 100 / _this.inP.scrollHeight + (_this.sbHeight - parseFloat(_this.sB.height)) * _this.inP.scrollTop / (_this.inP.scrollHeight - _this.inP.clientHeight) + "%";
        if ("onScrollF" in _this) {
            _this.onScrollF();
        }
    });

    this.scrollBarHolder.onmousedown = function(e) {
        if (e.target != this) return;
        var relPos = (e.pageY - _this.scrollBarHolder.getBoundingClientRect().top) * 100 / _this.scrollBarHolder.clientHeight;
        _this.setScroll(_this.inP.scrollHeight * relPos / 100, _this.scrollSpeed);
    };

    this.scrollBar.onmousedown = function(e) {
        _this.mdown = true;
        _this.posCorrection = e.pageY - _this.scrollBar.getBoundingClientRect().top;
        _this.btmCorrection = _this.scrollBar.clientHeight * 100 / _this.newPar.clientHeight;
        return false;
    };
    this.orgPar.onmouseup = function() {
        _this.mdown = false;
    };
    this.orgPar.onmousemove = function(e) {
        if (_this.mdown) {
            if (document.selection) {
                document.selection.empty();
            } else {
                window.getSelection().removeAllRanges();
            }
            _this.relY = e.pageY - _this.newPar.getBoundingClientRect().top;
            _this.pC = (_this.relY - _this.posCorrection) * 100 / _this.newPar.clientHeight;
            if (_this.pC >= 0 && (_this.pC + _this.btmCorrection) <= 100) {
                _this.scrollBar.style.top = _this.pC + "%";
                _this.inP.scrollTop = (parseFloat(_this.scrollBar.style.top) - (_this.sbHeight - parseFloat(_this.sB.height)) * _this.inP.scrollTop / (_this.inP.scrollHeight - _this.inP.clientHeight)) * _this.inP.scrollHeight / 100;
            } else {
                if (_this.pC < 0 && parseFloat(_this.scrollBar.style.top) > 0) {
                    _this.scrollBar.style.top = "0%";
                    _this.inP.scrollTop = 0;
                }
            }
            if ("onScrollF" in _this) {
                _this.onScrollF();
            }
        } else {
            return false;
        }
    };
    setInterval(function(){
        if(_this.inP.scrollHeight != _this.prevHeight)
            _this.refresh();
    },400);
};

Scrollbot.prototype.destroy = function(){
    this.orgPar.innerHTML = this.parContent;
    this.orgPar.style.overflow = "auto";
    this.init = null;
};

Scrollbot.prototype.isIE = function(){
    var nav = navigator.userAgent.toLowerCase();
    return (nav.indexOf('msie') != -1) ? parseInt(nav.split('msie')[1]) : false;
};

Scrollbot.prototype.setStyle = function(sb, sbh) {
    if (sb != undefined) {
        sb["width"] = this.sbw;
        if("height" in sb) {
            this.customHeight = true;
            sb["height"] = (parseFloat(sb["height"]) * 100 / this.newPar.clientHeight) + "%";
        }
        for (var x in sb) {
            this.sB[x] = sb[x];
            this.scrollBar.style[x] = sb[x];
        }
    }
    if (sbh != undefined) {
        sbh["width"] = this.sbw;
        for (var x in sbh) {
            this.sBH[x] = sbh[x];
            this.scrollBarHolder.style[x] = sbh[x];
        }
    }
    return this;
};

Scrollbot.prototype.refresh = function() {
    this.sbHeight = this.inP.clientHeight * 100 / this.inP.scrollHeight;
    if (this.sbHeight >= 100) {
        this.scrollBarHolder.style.display = "none";
    }else {
        this.scrollBarHolder.style.display = "block"
    }
    this.sbHeight = this.inP.clientHeight * 100 / this.inP.scrollHeight;
    this.sB["height"] = this.customHeight ? this.sB["height"] : this.sbHeight + "%";
    if (this.inP.scrollHeight > this.inP.clientHeight) {
        this.scrollBar.style.height = this.sB.height;
    }
};

Scrollbot.prototype.setScroll = function(p, d) {
    var _this = this;
    if (d == undefined || d <= 0) d = 500;
    if (p >= this.inP.scrollHeight - this.inP.clientHeight){p = this.inP.scrollHeight - this.inP.clientHeight;}

    var difference = p - this.inP.scrollTop;
    var perTick = difference / d * 10;

    setTimeout(function() {
        _this.inP.scrollTop += perTick;
        if (Math.abs(p - _this.inP.scrollTop) < 5) return;
        _this.setScroll(p, d - 10);
    }, 10);
};
