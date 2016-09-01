(function(){
    var backToTop = {
        setting: {startline:100, scrollto: 0, scrollduration:1000, fadeduration:[500, 100]},
        controlHTML: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA/lJREFUeNrUWk1IVFEYvXMLGgiSpMBwMYI0EswwMIgDRSHMZiBahQStksCFixZFq/5zKW4SItrkNsKVBG4kIVA0DERXU4IGlhuzaTUGUuezc8c7rzejzdw38zxwcOb53ptz7r3v3u/77oucS19UDpAC02ASjIMxsA1s4f8L4Aa4BubBJfAjuFjvDx+t49oEmAOzYC8YrXLuKVKuucxjRXAanAInweVaRERq6IEM2AdeBTus44ts1SW28hpbXbE3YuydJHsrZV27Co6Db8C5oAy0g/3gDbCTx5bZelNszeIB7xVlr2XZiwkeXwHHwFfguksD8iOD4BV+n2NrjbP16kEHe7OPvSuYAJ+zcariyOkzsf3OGQCfgufZKs/Ah+Bb8IeDCUDuMQu+A3+yd7vBHvAXuFCPgbvgEIePtMZj8AW4pdxjiyY+gSfZG5fAHXCmFgNG/HHwJVt9VgUPmQA+gMfACzSxXclEJQMDlvhhiv+qGodN8L3oowEZTt/9hpOfgRzHfLvV8gXVeEirz4Ot7Iku8DNZgvaZKgc5X8uYH2mSeGWt4CPUEqe29moG+jlVrnMay6vmI08t69TWX8lAhouU4kIyocKDCWpS1JjxM9DHOXiOq2HYMEZtndRaZiDB1VBxhV0JoYEValPUmrAN5LikLzM8CCvGqbGDmksGsvw76SC2CRKrVnyUNQZSjAwVo0qX+E26hNEomlOasXmU8fy0Y/F+n+vFNLWK5rRmgqGYjBQDEO/aRJFaBUnNFU4xk3ItPkK6NmG0xjVTPeVo1fWK9/vswoTRGtPMVxVz2CDEB2HCaG3TVuljI0Dxrk0YrS06wGETtIlSKFGwSh9Bi3dlwmgtaKs7Yg0S78KE0bqhrQciXmMvRuoYAbVea7SuaWtKStbw4xEHz1At9zFa89paFExIEXZEqXV3QdNWCGEHdWFGL7XuhhTaE8RlD4GBrB3UaU+IahKbsKKUyBjN2pPI2KllGGFSyVJiYwzYqaRJ7sMGO5k3qWVZVcIk83Z5JUww5RQ7uS8zYJdTTIErLLALWqa88o8BpfYKWnaJsdmwS4p2gcvXgF1SlKf9jhVuNwMt1JBT5SXGEvyq01L9lZ0RKWtLVVhK3FIl3m6C+HvgLUbMUjF/7T2p0v6A1OF3aELYyhbYbOCweUTx0nBPwFG/E6vt0Mzw4h72xFn1dw8r34AHVvYkrrHlRfxwpZP32yMTE7Iz0qX29qxk/+qLcr9PJvP8bfA+g7U8h81otYsOsku5wOdCxmQ3TWT4/Zuqf6dSwoOb4APwOniCs82Q35j34qCvGkwy7J63FhSz4B2KjW4bh/ZVAy/+52UPPzTtZQ8/NO11mz8CDADoYQ8O6ZbX0AAAAABJRU5ErkJggg==" style="width:40px; height:40px" />', 
        controlattrs: {offsetx:10, offsety:10}, 
        anchorkeyword: '#top', 

        state: {isvisible:false, shouldvisible:false},

        scrollup:function(){
            if (!this.cssfixedsupport)
                this.$control.css({opacity:0})
            var dest=isNaN(this.setting.scrollto)? this.setting.scrollto : parseInt(this.setting.scrollto)
            if (typeof dest=="string" && jQuery('#'+dest).length==1)
                dest=jQuery('#'+dest).offset().top
            else
                dest=0
            this.$body.animate({scrollTop: dest}, this.setting.scrollduration);
        },

        keepfixed:function(){
            var $window=jQuery(window)
            var controlx=$window.scrollLeft() + $window.width() - this.$control.width() - this.controlattrs.offsetx
            var controly=$window.scrollTop() + $window.height() - this.$control.height() - this.controlattrs.offsety
            this.$control.css({left:controlx+'px', top:controly+'px'})
        },

        togglecontrol:function(){
            var scrolltop=jQuery(window).scrollTop()
            if (!this.cssfixedsupport)
                this.keepfixed()
            this.state.shouldvisible=(scrolltop>=this.setting.startline)? true : false
            if (this.state.shouldvisible && !this.state.isvisible){
                this.$control.stop().animate({opacity:1}, this.setting.fadeduration[0])
                this.state.isvisible=true
            }
            else if (this.state.shouldvisible==false && this.state.isvisible){
                this.$control.stop().animate({opacity:0}, this.setting.fadeduration[1])
                this.state.isvisible=false
            }
        },
        
        init:function(){
            jQuery(document).ready(function($){
                var mainobj=scrolltotop
                var iebrws=document.all
                mainobj.cssfixedsupport=!iebrws || iebrws && document.compatMode=="CSS1Compat" && window.XMLHttpRequest
                mainobj.$body=(window.opera)? (document.compatMode=="CSS1Compat"? $('html') : $('body')) : $('html,body')
                mainobj.$control=$('<div id="topcontrol">'+mainobj.controlHTML+'</div>')
                    .css({position:mainobj.cssfixedsupport? 'fixed' : 'absolute', bottom:mainobj.controlattrs.offsety, right:mainobj.controlattrs.offsetx, opacity:0, cursor:'pointer'})
                    .attr({title:'Scroll Back to Top'})
                    .click(function(){mainobj.scrollup(); return false})
                    .appendTo('body')
                if (document.all && !window.XMLHttpRequest && mainobj.$control.text()!='')
                    mainobj.$control.css({width:mainobj.$control.width()})
                mainobj.togglecontrol()
                $('a[href="' + mainobj.anchorkeyword +'"]').click(function(){
                    mainobj.scrollup()
                    return false
                })
                $(window).bind('scroll resize', function(e){
                    mainobj.togglecontrol()
                })
            })
        }
    }

    backToTop.init();
})();