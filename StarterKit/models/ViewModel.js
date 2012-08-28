/* namespace */
var Ratio = Ratio || {};

/* definition */
Ratio.ViewModel = function () {

    var Signal = Ratio.Signal;
    var Delegate = Ratio.Delegate;

    /* constructor */
    var ViewModel = function () {
        // public api
        this.signal = new Signal();

        // initialization
        this.defineGroups();
        this.defineItems();

        var groupDataSelector = function (item) {
            return item.group;
        }

        var groupKeySelector = function (item) {
            return item.group.key;
        }

        this.groups = [this.fruit, this.veg, this.candy, this.drink];

        this._list = new WinJS.Binding.List(this.items);

        this.groupedItems = this._list.createGrouped(groupKeySelector, groupDataSelector);
        this.groupDataSource = this.groupedItems.groups;

        // get references to each group for use when getting random datasets
        this.fruitData = this._getProductsByKey(this.fruit.key);
        this.vegData = this._getProductsByKey(this.veg.key);
        this.candyData = this._getProductsByKey(this.candy.key);
        this.drinkData = this._getProductsByKey(this.drink.key);
        
    };

    /* prototype */

    /* getters/setters */
    ViewModel.prototype = {
        get todo() {
            return this._todo;
        }
    }

    /* public */
    //ViewModel.prototype.getHomeCollections = function (count) {
    //    var promise = Get("Ratio.Promise"),
    //        service = Get("Intel.WebService");

    //    var connectionState = Get("Ratio.ConnectionState");

    //    if (connectionState.state == "internet") {
    //        var count = typeof (count) == 'undefined' ? 5 : count;
    //        service.getHomeCollections(count).then(Delegate(this, function (items) {
    //            var _comicList = new WinJS.Binding.List(items);
    //            // push our create new tile in
    //            _comicList.push({
    //                group: { key: 'myComics', title: "My Comics" },
    //                subgroup: { key: 'createNew', title: 'Create New' }
    //            });
    //            // sort grouped, mycomics should be in front
    //            var comicList = _comicList.createGrouped(this._groupKey, this._groupData, this._groupSort);
    //            promise.resolve(comicList);
    //        }));
    //    }
    //    else {
    //        var _comicList = new WinJS.Binding.List([]);
    //        // push our create new tile in
    //        _comicList.push({
    //            group: { key: 'myComics', title: "My Comics" },
    //            subgroup: { key: 'createNew', title: 'Create New' }
    //        });
    //        // sort grouped, mycomics should be in front
    //        var comicList = _comicList.createGrouped(this._groupKey, this._groupData, this._groupSort);
    //        setTimeout(function () { promise.resolve(comicList) }, 0);
    //    }
    //    return promise;
    //}

    ViewModel.prototype.getHomeData = function () {

        //var fruit = { key: 'fruits', title: "Fruit", image: "/assets/images/smalllogo.png" }
        //var veg = { key: 'veg', title: "Veg", image: "/assets/images/smalllogo.png" }
        //var candy = { key: 'candy', title: "Candy", image: "/assets/images/smalllogo.png" }
        //var drink = { key: 'drink', title: "Drink", image: "/assets/images/smalllogo.png" }

        //var dataArray = [
        //    { title: "basic banana", image: "http://placekitten.com/g/310/150", group: fruit },
        //    { title: "banana blast", image: "http://placekitten.com/310/150", group: fruit },
        //    { title: "brilliant banana", image: "http://placekitten.com/g/310/150", group: fruit },
        //    { title: "Lettuce", image: "/assets/images/widelogo.png", group: veg },
        //    { title: "Carrot", image: "/assets/images/widelogo.png", group: veg },
        //    { title: "Broccoli", image: "/assets/images/widelogo.png", group: veg },
        //    { title: "milkyway", image: "/assets/images/widelogo.png", group: candy },
        //    { title: "skittles", image: "/assets/images/widelogo.png", group: candy },
        //    { title: "snickers", image: "/assets/images/widelogo.png", group: candy },
        //    { title: "coke", image: "/assets/images/widelogo.png", group: drink },
        //    { title: "ipa", image: "/assets/images/widelogo.png", group: drink },
        //    { title: "water", image: "/assets/images/widelogo.png", group: drink }
        //];

        //var homeData = new WinJS.Binding.List(dataArray).createGrouped(this._groupKey, this._groupData, this._groupSort);

        //return homeData;

        return this.groupedItems;
    }

    ViewModel.prototype._getProductsByKey = function (key) {
        var arr = this._list.filter(function (item) {
            return (item.group.key == key);
        });

        return arr;
    }

    ViewModel.prototype._getProductsByGroupTitle = function (title) {
        var group = this._list.filter(function (item) {
            return (item.group.title == title);
        });
        return new WinJS.Binding.List(group);
    }

    ViewModel.prototype._getProductByTitle = function (title) {
        var detail = this._list.filter(function (item) {
            return (item.title == title);
        });
        return detail;
    }

    /* private */
    //ViewModel.prototype._groupKey = function (item) {
    //    return item.group.key;
    //};

    //ViewModel.prototype._groupData = function (item) {
    //    return item.group;
    //};

    //ViewModel.prototype._groupSort = function (a, b) {
    //    if (a == 'fruits') {
    //        return -1;
    //    } else if (b == 'fruits') {
    //        return 1;
    //    }
    //    return 0;
    //};


    // === static members ===


    // define groupings and a large image for each in the zoomed out semantic view
    ViewModel.prototype.defineGroups = function () {
        this.fruit = { key: 'fruits', title: "Fruit", image: "/assets/images/smalllogo.png" };
        this.veg = { key: 'veg', title: "Veg", image: "/assets/images/smalllogo.png" };
        this.candy = { key: 'candy', title: "Candy", image: "/assets/images/smalllogo.png" };
        this.drink = { key: 'drink', title: "Drink", image: "/assets/images/smalllogo.png" };
    }

    ViewModel.prototype.defineItems = function () {
        this.items = [
            { title: "basic banana", image: "http://placekitten.com/g/310/150", group: this.fruit, description: "A description of the item goes here!" },
            { title: "banana blast", image: "http://placekitten.com/g/310/150", group: this.fruit, description: "A description of the item goes here!" },
            { title: "brilliant banana", image: "/assets/images/widelogo.png", group: this.fruit, description: "A description of the item goes here!" },
            { title: "Lettuce", image: "/assets/images/widelogo.png", group: this.veg, description: "A description of the item goes here!" },
            { title: "Carrot", image: "/assets/images/widelogo.png", group: this.veg, description: "A description of the item goes here!" },
            { title: "Broccoli", image: "/assets/images/widelogo.png", group: this.veg, description: "A description of the item goes here!" },
            { title: "milkyway", image: "/assets/images/widelogo.png", group: this.candy, description: "A description of the item goes here!" },
            { title: "skittles", image: "/assets/images/widelogo.png", group: this.candy, description: "A description of the item goes here!" },
            { title: "snickers", image: "/assets/images/widelogo.png", group: this.candy, description: "A description of the item goes here!" },
            { title: "coke", image: "/assets/images/widelogo.png", group: this.drink, description: "A description of the item goes here!" },
            { title: "ipa", image: "/assets/images/widelogo.png", group: this.drink, description: "A description of the item goes here!" },
            { title: "water", image: "/assets/images/widelogo.png", group: this.drink, description: "A description of the item goes here!" }
        ];
    }

    /* statics */
    ViewModel.TODO = "todo";

    /* exports */
    return ViewModel;
}();