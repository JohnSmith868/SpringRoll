!function(){var a={};a.read=function(a){var b=localStorage[a];if(b)try{return JSON.parse(b)}catch(c){return null}return null},a.write=function(a,b){localStorage[a]=JSON.stringify(b)},namespace("springroll").Storage=a}(),function(){var a=include("springroll.Storage"),b={ENABLED:!0,TIME:{MIN:300,MAX:800}},c=.18,d={};d.init=function(){var b=a.read(h());b?i("#docs-",b):i("#docs-","index"),$(".docs-toggle").click({storageVar:"activeDocs"},g),$(".index-item").click(e),setTimeout(d.gotoLine,0)},d.gotoLine=function(){var a=$(location).attr("href");if(a.indexOf("src")>-1){var b=a.slice(a.lastIndexOf("#")+2),c=$(".file .code .linenums").children().eq(b);c.addClass("active");var d=$(c).offset().top-$("header").height();$("body").scrollTop(d)}};var e=function(a){i("#docs-","index",!1),hash=$(this).children("a")[0].hash;var c=hash.indexOf("_"),d=hash.slice(1,c);"property"===d?d="properties":d+="s";hash.slice(c+1);i("#docs-",d);var e=$(hash).offset().top-($("header").height()+20),g=Math.abs($(window).scrollTop()-e);g=Math.min(Math.max(parseInt(g),b.TIME.MIN),b.TIME.MAX),b.ENABLED&&(a.preventDefault(),$("html, body").delay(50).animate({scrollTop:e},g));var h=$(hash).offset().top-$("#classdocs").offset().top-10;f(h,g)},f=function(a,b){var d=0===a?0:c;b=0===a?0:b,$("#docs-highlight").animate({top:a,opacity:d},b)},g=function(){f(0,0);var b=this.id||this[0].id,c=b.slice(b.lastIndexOf("-")+1);a.write(h(),c)},h=function(){var a=window.location.pathname;return a.substring(a.indexOf("/classes/")+"/classes/".length,a.indexOf(".html"))},i=function(a,b,c){c===!1?($("#tab-"+b).removeClass("active"),$(a+b).removeClass("active")):($("#tab-"+b).addClass("active"),$(a+b).addClass("active"))};namespace("springroll").Navigation=d}(),function(){var a=include("springroll.Storage"),b=null,c={};c.init=function(){b=$("#classdocs .tab-content"),null===a.read("show_inherited")&&a.write("show_inherited",!0),a.read("show_inherited")&&e.call($("#toggle-inherited")),a.read("show_protected")&&e.call($("#toggle-protected")),a.read("show_private")&&e.call($("#toggle-private")),a.read("show_deprecated")&&e.call($("#toggle-deprecated")),$(".scope-toggle").change(d)};var d=function(){var c=this.id||this[0].id,d=c.slice(c.lastIndexOf("-")+1),e=a.read("show_"+d);a.write("show_"+d,!e),b.toggleClass("show-"+d)},e=function(){this.prop("checked",!0);var c=this.id||this[0].id,d=c.slice(c.lastIndexOf("-")+1);this.bootstrapToggle("on"),a.write("show_"+d,!0),b.addClass("show-"+d)};namespace("springroll").ScopeToggles=c}(),function(){var a=null,b=null,c=null,d=function(){b=$("#api-filter"),c=$("#sidebar .btn-close"),c.addClass("hidden"),b.keyup(function(){a=this.value,d.apply(a)}),c.click(function(){b[0].value=a=null,d.apply()})};d.apply=function(){var b=$("#sidebar .collapse.active ul").children();if(a){c.removeClass("hidden");var d=new RegExp(a,"i");b.each(function(){var a=$(this);a.removeClass("hidden");var b=a.text().replace(/ /g,"");d.test(b)||a.addClass("hidden")})}else b.removeClass("hidden"),c.addClass("hidden")},namespace("springroll").SearchBar=d}(),function(){var a=include("springroll.Storage"),b=["toggle-classes","toggle-modules"],c={};c.init=function(){if($(window).width()>764){var c="#"+(a.read("activeSidebar")||b[0]),e=$(c);e.addClass("active");var f=e.data("target");$(f).show().addClass("active")}$(".sidebar-toggle").click(d)};var d=function(){var c=$(this).data("target");a.write("activeSidebar",this.id);for(var d=0;d<b.length;d++)if(b[d]!=this.id){var e=$("#"+b[d]);if(e.hasClass("active"))return e.removeClass("active"),$(e.data("target")).hide().removeClass("active"),$(c).show().addClass("active"),$(this).addClass("active"),void springroll.SearchBar.apply()}$(this).hasClass("active")?$(window).width()<764&&($(this).removeClass("active"),$(c).slideUp().removeClass("active")):($(c).slideDown().addClass("active"),$(this).addClass("active"))};namespace("springroll").Sidebar=c}(),function(){var a=function(){var a=$("header");$(window).scroll(function(){$(this).scrollTop()>1?a.addClass("sticky"):a.removeClass("sticky")})};namespace("springroll").StickyHeader=a}(),$(function(){include("springroll.Navigation").init(),include("springroll.Sidebar").init(),include("springroll.ScopeToggles").init(),include("springroll.SearchBar")(),include("springroll.StickyHeader")()});