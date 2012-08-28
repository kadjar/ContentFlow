
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/collection/collection.html", { ready: ready, unload: unload, updateLayout: updateLayout });

    function ready(element, options) {
        // page initialization

        initListView(options);
    }

    function unload() {
        // unload page
    }

    function updateLayout(element, viewState, lastViewState) {
        // handle screen orientation changes.
    }

    function initListView(options) {
        var viewModel = Get("Ratio.ViewModel");
        var list = viewModel._getProductsByGroupTitle(options.home.title);
       
        var collectionListView = document.getElementById("collectionListView").winControl;

         WinJS.UI.setOptions(collectionListView, {
            layout: {
                type: WinJS.UI.ListLayout
            },
            itemDataSource: list.dataSource,
            itemTemplate: collectionRenderer
        });

    }

    function collectionRenderer(itemPromise) {
        var collectionTile = new Ratio.Tile();
        return {
            element: collectionTile._element,
            renderComplete: itemPromise.then(function (item) {
                var collection = {
                    title: item.data.title,
                    image: item.data.image
                }
                collectionTile.data = collection;

                collectionTile.onClick.add(function () {
                    //userScrollPosition = homeListView.scrollPosition;
                    WinJS.Navigation.navigate("/pages/detail/detail.html", { 'collection': collection });
                });
            })
        };
    }

})();
