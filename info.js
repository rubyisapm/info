/**
 * Created by rubyisapm on 15/11/5.
 */
function Info(icon, ops) {
  var defautls = {
    info: icon + '的information',
    title:'infoTitle'
  }
  ops = $.extend({}, defautls, ops, true);
  this.ops = ops;
  this.icon = icon;
}

Info.prototype = {
  constructor: Info,
  init: function () {
    this.drawInfoContent();
    this.bindEvt();
  },
  position: function () {
    var $icon = $('#' + this.icon),
      left = $icon.offset().left + $icon.outerWidth(),
      top = $icon.offset().top + $icon.outerHeight() / 2,
      $infoContent = this.$infoContent,
      $infoContentHeight = $infoContent.outerHeight();

    var targetTop, targetLeft, arrowTop, arrowLeft;

    var style={
      padding:15,//infoContent的padding
      arrowWidth:8,//arrow的宽度
      gep:20//icon和infoContent的间隔
    }
    if (top < $infoContentHeight / 2) {
      targetTop = Math.max(top - style.padding, 0);
      targetLeft = left + style.gep;
      arrowTop = style.padding;
      arrowLeft = -(style.arrowWidth*2);
    } else {
      targetTop = top - $infoContentHeight/2;
      targetLeft = left + style.gep;
      arrowTop = $infoContentHeight/2 - 8;
      arrowLeft = -(style.arrowWidth*2);
    }
    $infoContent.css({
      top: targetTop + 'px',
      left: targetLeft + 'px'
    })
    $infoContent.find('.infoContent_arrow').css({
      top: arrowTop+'px',
      left: arrowLeft+'px'
    })


  },
  bindEvt: function () {
    var _this = this;
    $(document).delegate('#' + _this.icon, 'mouseenter', function (e) {
        _this.position();
        _this.$infoContent.show();
    })

    $(document).delegate('#' + _this.icon, 'mouseleave', function (e) {
      _this.$infoContent.hide();
    })

  },
  drawInfoContent: function () {
    var $infoContent = $('<div data-target="' + this.icon + '" class="infoContent">' +'<span class="infoContent_title">'+this.ops.title+': '+'</span>'+this.ops.info + '<b class="infoContent_arrow"></b></div>');
    $('body').append($infoContent);
    this.$infoContent = $infoContent;
  }
}

$.fn.extend({
  info:function(){
    $.each(this,function(i,v){
      var id=$(v).attr('id');
      var i = new Info(id);
      i.init();
    })

  }
})
$('#info1').info();