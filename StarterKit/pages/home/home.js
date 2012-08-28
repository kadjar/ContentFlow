(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", { ready: ready, unload: unload, updateLayout: updateLayout });

    function ready(element, options) {
        // page initialization
        var cf = new ContentFlow('contentFlow', { });
        cf.init();
    }

    function unload() {
        // unload page
    }

    function updateLayout(element, viewState, lastViewState) {
        // handle screen orientation changes.
    }

    function init() {
        WinJS.Navigation.history.backStack = [];
        Get("AppBar").updateState("home");
    }

    function initListView() {
        var viewModel = Get("Ratio.ViewModel");
        var list = viewModel.getHomeData();

        var homeListView = document.getElementById("homeListView").winControl;
        WinJS.UI.setOptions(homeListView, {
            layout: {
                type: WinJS.UI.GridLayout,
                groupInfo: {
                    enableCellSpanning: true,
                    cellWidth: 350,
                    cellHeight: 175
                }
            },
            itemDataSource: list.dataSource,
            itemTemplate: homeRenderer,
            groupDataSource: list.groups.dataSource,
            groupHeaderTemplate: headerRenderer
        });

    }

    function homeRenderer(itemPromise) {
        var homeTile = new Ratio.Tile();
        return {
            element: homeTile._element,
            renderComplete: itemPromise.then(function (item) {
                var home = {
                    title: item.data.title,
                    image: item.data.image
                }
                homeTile.data = home;

                homeTile.onClick.add(function () {
                    //userScrollPosition = homeListView.scrollPosition;
                    WinJS.Navigation.navigate("/pages/detail/detail.html", { 'home': home });
                });
            })
        };
    }

    function headerRenderer(itemPromise) {
        var homeHeader = new Ratio.Header();
        return {
            element: homeHeader._element,
            renderComplete: itemPromise.then(function (item) {
                var home = {
                    title: item.data.title,
                    image: item.data.image
                }
                homeHeader.data = home;

                homeHeader.onClick.add(function () {
                    //userScrollPosition = homeListView.scrollPosition;
                    WinJS.Navigation.navigate("/pages/collection/collection.html", { 'home': home });
                });
            })
        };
    }

})();
