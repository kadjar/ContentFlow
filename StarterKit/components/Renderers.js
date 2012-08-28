var Ratio = Ratio || {};

Ratio.Renderers = function () {
    "use strict";

    var Renderers = function () {}

    Renderers.ItemRenderer = function (itemPromise) {
        var element = document.createElement("div");
        return{
            element:element,
            renderComplete:itemPromise.then(function(item){
                if (item.data.title == 'comingSoon') {
                    element.className = "comingSoonItem";
                    element.innerHTML = "<div class='table full-height full-width'> \
                                            <div class='table-cell v-align-table-cell text-align-center'><h1>Coming Soon</h1></div> \
                                        </div>";
                } else {
                    element.className = "templateTile";
                    element.innerHTML = "<div class='templateTitle'></div> \
                                 <img class='templateImg' />";

                    element.querySelector('.templateTitle').innerText = item.data.title;

                    var src = document.createAttribute('src');
                    src.value = item.data.image;
                    element.querySelector('.templateImg').setAttributeNode(src);
                }
            })
        }
    }

    Renderers.HeaderRenderer = function(itemPromise) {
        var element = document.createElement("div");
        element.className = "headerItem";
        element.innerHTML = "<span class='headerItemLoading'>Loading...</span>";
        return {
            element: element,
            renderComplete: itemPromise.then(function (item) {
                WinJS.Utilities.addClass(element.querySelector(".headerItemLoading"), 'hidden');
                var id = document.createAttribute('id');
                id.value = item.data.key;
                element.setAttributeNode(id);
                element.innerText = item.data.title;
            })
        };
    }
    
    return Renderers;
}();