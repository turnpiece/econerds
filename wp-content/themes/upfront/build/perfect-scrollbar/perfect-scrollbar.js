!function(e){define(["scripts/perfect-scrollbar/perfect-scrollbar-library"],function(n){return n.withDebounceUpdate=function(t,r,i,o){"undefined"==typeof o||e(t).hasClass("ps-container")||n.initialize(t,{suppressScrollX:!0});var c=_.debounce(function(){n.update(t)},500,r);"undefined"!=typeof i&&Upfront.Events.on(i,c),setTimeout(c)},n})}(jQuery);