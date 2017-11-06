"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('stad-stat/adapters/application', ['exports', 'ember', 'ember-data'], function (exports, _ember, _emberData) {
  exports['default'] = _emberData['default'].JSONAPIAdapter.extend({

    query: function query(store, type, _query) {
      var url = this.buildURL(type.modelName, null, null, 'query', undefined);

      if (this.sortQueryParams && _ember['default'].typeOf(_query) !== 'string') {
        _query = this.sortQueryParams(_query);
      }

      return this.ajax(url, 'GET', { data: _query });
    }
  });
});
define('stad-stat/app', ['exports', 'ember', 'stad-stat/resolver', 'ember-load-initializers', 'stad-stat/config/environment'], function (exports, _ember, _stadStatResolver, _emberLoadInitializers, _stadStatConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _stadStatConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _stadStatConfigEnvironment['default'].podModulePrefix,
    Resolver: _stadStatResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _stadStatConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define("stad-stat/components/-lf-get-outlet-state", ["exports", "liquid-fire/components/-lf-get-outlet-state"], function (exports, _liquidFireComponentsLfGetOutletState) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLfGetOutletState["default"];
    }
  });
});
define('stad-stat/components/basic-dropdown', ['exports', 'ember-basic-dropdown/components/basic-dropdown'], function (exports, _emberBasicDropdownComponentsBasicDropdown) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBasicDropdownComponentsBasicDropdown['default'];
    }
  });
});
define('stad-stat/components/basic-dropdown/content', ['exports', 'ember-basic-dropdown/components/basic-dropdown/content'], function (exports, _emberBasicDropdownComponentsBasicDropdownContent) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBasicDropdownComponentsBasicDropdownContent['default'];
    }
  });
});
define('stad-stat/components/basic-dropdown/trigger', ['exports', 'ember-basic-dropdown/components/basic-dropdown/trigger'], function (exports, _emberBasicDropdownComponentsBasicDropdownTrigger) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBasicDropdownComponentsBasicDropdownTrigger['default'];
    }
  });
});
define('stad-stat/components/chart-single-value', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('stad-stat/components/chart-zoomed-value', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    chartType: "pie",
    actions: {
      makePie: function makePie() {
        if (!this.get('additional') || this.get('additional').length === 0) {
          this.set('chartType', 'pie');
        }
      },
      makeBar: function makeBar() {
        this.set('chartType', 'bar');
      }
    }
  });
});
define('stad-stat/components/default-chart', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    chartType: 'pie',
    classNames: ['pie-chart chart'],
    legend: true,

    additionalObserver: _ember['default'].observer('additional.@each.title', function () {
      var additional = this.get('additional');
      if (additional && additional.length > 0) {
        this.set('chartType', 'bar');
      }
    }).on('init'),

    title: "Test pie chart",
    hideTitle: false,
    chartOptions: _ember['default'].computed('regionTheme.title', 'legend', function () {
      return {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false
        },
        yAxis: {
          title: {
            text: false
          }
        },
        legend: {
          enabled: this.get('legend')
        },
        title: {
          text: !this.get('hideTitle') && (this.get('regionTheme.title') || this.get('chartData')[0].name || this.get('title'))
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.y}</b>'
        }
      };
    }),
    chartData: _ember['default'].computed('regionTheme.values.@each.value', 'regionTheme.values.@each.year', 'regionTheme.title', 'additional.@each.title', 'chartType', function () {
      var data = null;
      if (this.get('regionTheme') && this.get('regionTheme.values')) {
        data = [{
          type: this.get('chartType'),
          animation: true,
          name: this.get('regionTheme.title'),
          data: this.get('regionTheme.values').map(function (value) {
            return [value.get('year'), value.get('value')];
          })
        }];
      } else {
        data = [{
          type: this.get('chartType'),
          animation: true,
          name: this.get('title'),
          data: [["≤4", 1], ["5-13", 2], ["14-17", 3], ["18-24", 4], ["25-44", 5], ["45-64", 6], ["≥65", 7]]
        }];
      }
      var additional = this.get('additional');
      var self = this;
      if (additional) {
        additional.map(function (item) {
          data.push({
            name: _ember['default'].get(item, 'title'),
            data: self.randomNumbers(4, 75)
          });
        });
      }
      return data;
    }),
    randomNumbers: function randomNumbers(n, base) {
      var a = [];
      while (n > 0) {
        n--;
        a.push(Math.random() * (base || 10));
      }
      return a;
    },
    computedChartData: _ember['default'].computed(function () {
      return [{
        type: this.get('chartType'),
        name: this.get('title'),
        data: this.get('chartData')
      }];
    })

  });
});
define('stad-stat/components/default-line-chart', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['line-chart chart'],

    title: "Test line chart",
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    yTitle: false,
    chartData: [{
      name: 'Diefstal',
      data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    }, {
      name: 'Brandstichting',
      data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
    }, {
      name: 'Vandalisme',
      data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
    }, {
      name: 'Openbaar Dronkenschap',
      data: [22.3, 18.2, 15.7, 13.5, 11.9, 15.2, 17.0, 16.6, 14.2, 14.3, 18.6, 24.1]
    }],
    chartOptions: _ember['default'].computed(function () {
      return {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false
        },
        title: {
          text: this.get('title')
        },
        xAxis: {
          categories: this.get('categories')
        },
        yAxis: {
          title: {
            text: this.get('yTitle')
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.y}%</b>'
        }
      };
    })
  });
});
define('stad-stat/components/edit-has-many', ['exports', 'ember', 'ember-dynamic-alias'], function (exports, _ember, _emberDynamicAlias) {
  exports['default'] = _ember['default'].Component.extend({
    selectableItems: [],
    relationship: 'items',
    relationshipPath: _ember['default'].computed('relationship', function () {
      var relationship = this.get('relationship');
      if (relationship) {
        return 'model.' + relationship;
      }
    }),
    linkedModelType: 'item',
    shownAttribute: 'title',
    optionLabelPath: _ember['default'].computed('shownAttribute', function () {
      return 'content.' + this.get('shownAttribute');
    }),
    placeholder: _ember['default'].computed('relationship', function () {
      return 'Select some ' + this.get('relationship');
    }),
    store: _ember['default'].inject.service('store'),
    selectedItems: [],
    dynamicItemsAlias: (0, _emberDynamicAlias['default'])('relationshipPath', 'selectedItems'),
    selectizeItems: _ember['default'].computed('selectedItems.@each.title', 'selectableItems.@each.title', function () {
      var selectableItems = this.get('selectableItems') || [];
      var selectedItems = this.get('selectedItems') || [];
      var selectizeItems = _ember['default'].A();
      selectableItems.map(function (item) {
        return selectizeItems.push(item);
      });
      selectedItems.map(function (item) {
        return selectizeItems.push(item);
      });
      return selectizeItems;
    }),
    actions: {
      filterChanged: function filterChanged(searchString) {
        var _this = this;

        var type = this.get('linkedModelType');
        this.get('store').query(type, { filter: searchString }).then(function (items) {
          return _this.set('selectableItems', items);
        });
      },
      newItem: function newItem(string) {
        var _this2 = this;

        var type = this.get('linkedModelType');
        var attr = this.get('shownAttribute');
        var properties = {};
        properties[attr] = string;

        var record = this.get('store').createRecord(type, properties);

        record.save().then(function () {
          return _this2.get('selectedItems').pushObject(record);
        });
      }
    }
  });
});
define('stad-stat/components/ember-modal-dialog-positioned-container', ['exports', 'ember-modal-dialog/components/positioned-container'], function (exports, _emberModalDialogComponentsPositionedContainer) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModalDialogComponentsPositionedContainer['default'];
    }
  });
});
define('stad-stat/components/ember-selectize', ['exports', 'ember-cli-selectize/components/ember-selectize'], function (exports, _emberCliSelectizeComponentsEmberSelectize) {
  exports['default'] = _emberCliSelectizeComponentsEmberSelectize['default'];
});
define('stad-stat/components/ember-wormhole', ['exports', 'ember-wormhole/components/ember-wormhole'], function (exports, _emberWormholeComponentsEmberWormhole) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberWormholeComponentsEmberWormhole['default'];
    }
  });
});
define('stad-stat/components/fact-browser', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    topics: null,
    store: _ember['default'].inject.service(),

    init: function init() {
      this._super();
      this.generateTopics();
    },

    generateTopics: function generateTopics() {
      var count = Math.random() * 20;
      var topics = [];
      for (var i = 0; i < count; i++) {
        topics.push(this.get('store').createRecord("topic", { title: "topic" + i }));
      }
      this.set('topics', this.shuffleArray(topics));
    },

    // copied from http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    shuffleArray: function shuffleArray(array) {
      var currentIndex = array.length,
          temporaryValue,
          randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    },
    actions: {
      clickTopic: function clickTopic() {
        this.generateTopics();
      }
    }
  });
});
define('stad-stat/components/fact-selector', ['exports', 'ember'], function (exports, _ember) {
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  exports['default'] = _ember['default'].Component.extend({
    store: _ember['default'].inject.service(),
    selectedIds: [],
    currentTopics: _ember['default'].computed('selectedTopicIds', 'selectedRegionIds', function () {
      var _this = this;

      var topics = this.get('selectedTopicIds').map(function (id) {
        return _this.get('store').find('topic', id);
      });
      var regions = this.get('selectedRegionIds').map(function (id) {
        return _this.get('store').find('region', id);
      });
      return [].pushObjects(topics).pushObjects(regions);
    }),
    actions: {
      searchRepo: function searchRepo(string) {
        return _ember['default'].RSVP.all([this.get('store').query('topic', { filter: string }), this.get('store').query('region', { filter: string })]).then(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2);

          var topics = _ref2[0];
          var regions = _ref2[1];

          return [].pushObjects(topics.content).pushObjects(regions.content).map(function (item) {
            return item.getRecord();
          });
        });
      }
    }
  });
});
define('stad-stat/components/high-charts', ['exports', 'ember-highcharts/components/high-charts'], function (exports, _emberHighchartsComponentsHighCharts) {
  exports['default'] = _emberHighchartsComponentsHighCharts['default'];
});
define("stad-stat/components/illiquid-model", ["exports", "liquid-fire/components/illiquid-model"], function (exports, _liquidFireComponentsIlliquidModel) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsIlliquidModel["default"];
    }
  });
});
define('stad-stat/components/labeled-radio-button', ['exports', 'ember-radio-button/components/labeled-radio-button'], function (exports, _emberRadioButtonComponentsLabeledRadioButton) {
  exports['default'] = _emberRadioButtonComponentsLabeledRadioButton['default'];
});
define("stad-stat/components/liquid-bind", ["exports", "liquid-fire/components/liquid-bind"], function (exports, _liquidFireComponentsLiquidBind) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidBind["default"];
    }
  });
});
define("stad-stat/components/liquid-child", ["exports", "liquid-fire/components/liquid-child"], function (exports, _liquidFireComponentsLiquidChild) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidChild["default"];
    }
  });
});
define("stad-stat/components/liquid-container", ["exports", "liquid-fire/components/liquid-container"], function (exports, _liquidFireComponentsLiquidContainer) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidContainer["default"];
    }
  });
});
define("stad-stat/components/liquid-if", ["exports", "liquid-fire/components/liquid-if"], function (exports, _liquidFireComponentsLiquidIf) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidIf["default"];
    }
  });
});
define("stad-stat/components/liquid-measured", ["exports", "liquid-fire/components/liquid-measured"], function (exports, _liquidFireComponentsLiquidMeasured) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidMeasured["default"];
    }
  });
  Object.defineProperty(exports, "measure", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidMeasured.measure;
    }
  });
});
define("stad-stat/components/liquid-outlet", ["exports", "liquid-fire/components/liquid-outlet"], function (exports, _liquidFireComponentsLiquidOutlet) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidOutlet["default"];
    }
  });
});
define("stad-stat/components/liquid-spacer", ["exports", "liquid-fire/components/liquid-spacer"], function (exports, _liquidFireComponentsLiquidSpacer) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidSpacer["default"];
    }
  });
});
define('stad-stat/components/liquid-sync', ['exports', 'liquid-fire/components/liquid-sync'], function (exports, _liquidFireComponentsLiquidSync) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidSync['default'];
    }
  });
});
define("stad-stat/components/liquid-unless", ["exports", "liquid-fire/components/liquid-unless"], function (exports, _liquidFireComponentsLiquidUnless) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidUnless["default"];
    }
  });
});
define("stad-stat/components/liquid-versions", ["exports", "liquid-fire/components/liquid-versions"], function (exports, _liquidFireComponentsLiquidVersions) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidVersions["default"];
    }
  });
});
define('stad-stat/components/materialize-badge', ['exports', 'ember', 'stad-stat/components/md-badge'], function (exports, _ember, _stadStatComponentsMdBadge) {
  exports['default'] = _stadStatComponentsMdBadge['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      _ember['default'].deprecate("{{materialize-badge}} has been deprecated. Please use {{md-badge}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });
});
define('stad-stat/components/materialize-button-submit', ['exports', 'ember', 'stad-stat/components/md-btn-submit'], function (exports, _ember, _stadStatComponentsMdBtnSubmit) {
  exports['default'] = _stadStatComponentsMdBtnSubmit['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      _ember['default'].deprecate("{{materialize-button-submit}} has been deprecated. Please use {{md-btn-submit}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });
});
define('stad-stat/components/materialize-button', ['exports', 'ember', 'stad-stat/components/md-btn'], function (exports, _ember, _stadStatComponentsMdBtn) {
  exports['default'] = _stadStatComponentsMdBtn['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      _ember['default'].deprecate("{{materialize-button}} has been deprecated. Please use {{md-btn}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });
});
define('stad-stat/components/materialize-card-action', ['exports', 'ember', 'stad-stat/components/md-card-action'], function (exports, _ember, _stadStatComponentsMdCardAction) {
  exports['default'] = _stadStatComponentsMdCardAction['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      _ember['default'].deprecate("{{materialize-card-action}} has been deprecated. Please use {{md-card-action}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });
});
define('stad-stat/components/materialize-card-content', ['exports', 'ember', 'stad-stat/components/md-card-content'], function (exports, _ember, _stadStatComponentsMdCardContent) {
  exports['default'] = _stadStatComponentsMdCardContent['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      _ember['default'].deprecate("{{materialize-card-content}} has been deprecated. Please use {{md-card-content}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });
});
define('stad-stat/components/materialize-card-panel', ['exports', 'ember', 'stad-stat/components/md-card-panel'], function (exports, _ember, _stadStatComponentsMdCardPanel) {
  exports['default'] = _stadStatComponentsMdCardPanel['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      _ember['default'].deprecate("{{materialize-card-panel}} has been deprecated. Please use {{md-card-panel}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });
});
define('stad-stat/components/materialize-card-reveal', ['exports', 'ember', 'stad-stat/components/md-card-reveal'], function (exports, _ember, _stadStatComponentsMdCardReveal) {
  exports['default'] = _stadStatComponentsMdCardReveal['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      _ember['default'].deprecate("{{materialize-card-reveal}} has been deprecated. Please use {{md-card-reveal}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });
});
define('stad-stat/components/materialize-card', ['exports', 'ember', 'stad-stat/components/md-card'], function (exports, _ember, _stadStatComponentsMdCard) {
  exports['default'] = _stadStatComponentsMdCard['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      _ember['default'].deprecate("{{materialize-card}} has been deprecated. Please use {{md-card}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });
});
define('stad-stat/components/materialize-checkbox', ['exports', 'ember', 'stad-stat/components/md-check'], function (exports, _ember, _stadStatComponentsMdCheck) {
  exports['default'] = _stadStatComponentsMdCheck['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      _ember['default'].deprecate("{{materialize-checkbox}} has been deprecated. Please use {{md-check}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });
});
define('stad-stat/components/materialize-checkboxes', ['exports', 'ember', 'stad-stat/components/md-checks'], function (exports, _ember, _stadStatComponentsMdChecks) {
  exports['default'] = _stadStatComponentsMdChecks['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      _ember['default'].deprecate("{{materialize-checkboxes}} has been deprecated. Please use {{md-checks}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });
});
define('stad-stat/components/materialize-collapsible-card', ['exports', 'ember', 'stad-stat/components/md-card-collapsible'], function (exports, _ember, _stadStatComponentsMdCardCollapsible) {
  exports['default'] = _stadStatComponentsMdCardCollapsible['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      _ember['default'].deprecate("{{materialize-collapsible-card}} has been deprecated. Please use {{md-card-collapsible}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });
});
define('stad-stat/components/materialize-collapsible', ['exports', 'ember', 'stad-stat/components/md-collapsible'], function (exports, _ember, _stadStatComponentsMdCollapsible) {
  exports['default'] = _stadStatComponentsMdCollapsible['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      _ember['default'].deprecate("{{materialize-collapsible}} has been deprecated. Please use {{md-collapsible}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });
});
define('stad-stat/components/materialize-copyright', ['exports', 'ember', 'stad-stat/components/md-copyright'], function (exports, _ember, _stadStatComponentsMdCopyright) {
  exports['default'] = _stadStatComponentsMdCopyright['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      _ember['default'].deprecate("{{materialize-copyright}} has been deprecated. Please use {{md-copyright}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });
});
define('stad-stat/components/materialize-date-input', ['exports', 'ember', 'stad-stat/components/md-input-date'], function (exports, _ember, _stadStatComponentsMdInputDate) {
  exports['default'] = _stadStatComponentsMdInputDate['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      _ember['default'].deprecate("{{materialize-date-input}} has been deprecated. Please use {{md-input-date}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });
});
define('stad-stat/components/materialize-input-field', ['exports', 'ember', 'stad-stat/components/md-input-field'], function (exports, _ember, _stadStatComponentsMdInputField) {
  exports['default'] = _stadStatComponentsMdInputField['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      _ember['default'].deprecate("{{materialize-input-field}} has been deprecated. Please use {{md-input-field}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });
});
define('stad-stat/components/materialize-input', ['exports', 'ember', 'stad-stat/components/md-input'], function (exports, _ember, _stadStatComponentsMdInput) {
  exports['default'] = _stadStatComponentsMdInput['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      _ember['default'].deprecate("{{materialize-input}} has been deprecated. Please use {{md-input}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });
});
define('stad-stat/components/materialize-loader', ['exports', 'ember', 'stad-stat/components/md-loader'], function (exports, _ember, _stadStatComponentsMdLoader) {
  exports['default'] = _stadStatComponentsMdLoader['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      _ember['default'].deprecate("{{materialize-loader}} has been deprecated. Please use {{md-loader}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });
});
define('stad-stat/components/materialize-modal', ['exports', 'ember', 'stad-stat/components/md-modal'], function (exports, _ember, _stadStatComponentsMdModal) {
  exports['default'] = _stadStatComponentsMdModal['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      _ember['default'].deprecate("{{materialize-modal}} has been deprecated. Please use {{md-modal}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });
});
define('stad-stat/components/materialize-navbar', ['exports', 'ember', 'stad-stat/components/md-navbar'], function (exports, _ember, _stadStatComponentsMdNavbar) {
  exports['default'] = _stadStatComponentsMdNavbar['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      _ember['default'].deprecate("{{materialize-navbar}} has been deprecated. Please use {{md-navbar}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });
});
define('stad-stat/components/materialize-pagination', ['exports', 'ember', 'stad-stat/components/md-pagination'], function (exports, _ember, _stadStatComponentsMdPagination) {
  exports['default'] = _stadStatComponentsMdPagination['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      _ember['default'].deprecate("{{materialize-pagination}} has been deprecated. Please use {{md-pagination}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });
});
define('stad-stat/components/materialize-parallax', ['exports', 'ember', 'stad-stat/components/md-parallax'], function (exports, _ember, _stadStatComponentsMdParallax) {
  exports['default'] = _stadStatComponentsMdParallax['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      _ember['default'].deprecate("{{materialize-parallax}} has been deprecated. Please use {{md-parallax}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });
});
define('stad-stat/components/materialize-radio', ['exports', 'ember', 'stad-stat/components/md-radio'], function (exports, _ember, _stadStatComponentsMdRadio) {
  exports['default'] = _stadStatComponentsMdRadio['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      _ember['default'].deprecate("{{materialize-radio}} has been deprecated. Please use {{md-radio}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });
});
define('stad-stat/components/materialize-radios', ['exports', 'ember', 'stad-stat/components/md-radios'], function (exports, _ember, _stadStatComponentsMdRadios) {
  exports['default'] = _stadStatComponentsMdRadios['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      _ember['default'].deprecate("{{materialize-radios}} has been deprecated. Please use {{md-radios}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });
});
define('stad-stat/components/materialize-range', ['exports', 'ember', 'stad-stat/components/md-range'], function (exports, _ember, _stadStatComponentsMdRange) {
  exports['default'] = _stadStatComponentsMdRange['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      _ember['default'].deprecate("{{materialize-range}} has been deprecated. Please use {{md-range}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });
});
define('stad-stat/components/materialize-select', ['exports', 'ember', 'stad-stat/components/md-select'], function (exports, _ember, _stadStatComponentsMdSelect) {
  exports['default'] = _stadStatComponentsMdSelect['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      _ember['default'].deprecate("{{materialize-select}} has been deprecated. Please use {{md-select}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });
});
define('stad-stat/components/materialize-switch', ['exports', 'ember', 'stad-stat/components/md-switch'], function (exports, _ember, _stadStatComponentsMdSwitch) {
  exports['default'] = _stadStatComponentsMdSwitch['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      _ember['default'].deprecate("{{materialize-switch}} has been deprecated. Please use {{md-switch}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });
});
define('stad-stat/components/materialize-switches', ['exports', 'ember', 'stad-stat/components/md-switches'], function (exports, _ember, _stadStatComponentsMdSwitches) {
  exports['default'] = _stadStatComponentsMdSwitches['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      _ember['default'].deprecate("{{materialize-switches}} has been deprecated. Please use {{md-switches}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });
});
define('stad-stat/components/materialize-tabs-tab', ['exports', 'ember', 'stad-stat/components/md-tab'], function (exports, _ember, _stadStatComponentsMdTab) {
  exports['default'] = _stadStatComponentsMdTab['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      _ember['default'].deprecate("{{materialize-tabs-tab}} has been deprecated. Please use {{md-tab}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });
});
define('stad-stat/components/materialize-tabs', ['exports', 'ember', 'stad-stat/components/md-tabs'], function (exports, _ember, _stadStatComponentsMdTabs) {
  exports['default'] = _stadStatComponentsMdTabs['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      _ember['default'].deprecate("{{materialize-tabs}} has been deprecated. Please use {{md-tabs}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });
});
define('stad-stat/components/materialize-textarea', ['exports', 'ember', 'stad-stat/components/md-textarea'], function (exports, _ember, _stadStatComponentsMdTextarea) {
  exports['default'] = _stadStatComponentsMdTextarea['default'].extend({
    init: function init() {
      this._super.apply(this, arguments);
      _ember['default'].deprecate("{{materialize-textarea}} has been deprecated. Please use {{md-textarea}} instead", false, { url: "https://github.com/sgasser/ember-cli-materialize/issues/67" });
    }
  });
});
define('stad-stat/components/md-badge', ['exports', 'ember-cli-materialize/components/md-badge'], function (exports, _emberCliMaterializeComponentsMdBadge) {
  exports['default'] = _emberCliMaterializeComponentsMdBadge['default'];
});
define('stad-stat/components/md-btn-dropdown', ['exports', 'ember-cli-materialize/components/md-btn-dropdown'], function (exports, _emberCliMaterializeComponentsMdBtnDropdown) {
  exports['default'] = _emberCliMaterializeComponentsMdBtnDropdown['default'];
});
define('stad-stat/components/md-btn-submit', ['exports', 'ember-cli-materialize/components/md-btn-submit'], function (exports, _emberCliMaterializeComponentsMdBtnSubmit) {
  exports['default'] = _emberCliMaterializeComponentsMdBtnSubmit['default'];
});
define('stad-stat/components/md-btn', ['exports', 'ember-cli-materialize/components/md-btn'], function (exports, _emberCliMaterializeComponentsMdBtn) {
  exports['default'] = _emberCliMaterializeComponentsMdBtn['default'];
});
define('stad-stat/components/md-card-action', ['exports', 'ember-cli-materialize/components/md-card-action'], function (exports, _emberCliMaterializeComponentsMdCardAction) {
  exports['default'] = _emberCliMaterializeComponentsMdCardAction['default'];
});
define('stad-stat/components/md-card-collapsible', ['exports', 'ember-cli-materialize/components/md-card-collapsible'], function (exports, _emberCliMaterializeComponentsMdCardCollapsible) {
  exports['default'] = _emberCliMaterializeComponentsMdCardCollapsible['default'];
});
define('stad-stat/components/md-card-content', ['exports', 'ember-cli-materialize/components/md-card-content'], function (exports, _emberCliMaterializeComponentsMdCardContent) {
  exports['default'] = _emberCliMaterializeComponentsMdCardContent['default'];
});
define('stad-stat/components/md-card-panel', ['exports', 'ember-cli-materialize/components/md-card-panel'], function (exports, _emberCliMaterializeComponentsMdCardPanel) {
  exports['default'] = _emberCliMaterializeComponentsMdCardPanel['default'];
});
define('stad-stat/components/md-card-reveal', ['exports', 'ember-cli-materialize/components/md-card-reveal'], function (exports, _emberCliMaterializeComponentsMdCardReveal) {
  exports['default'] = _emberCliMaterializeComponentsMdCardReveal['default'];
});
define('stad-stat/components/md-card', ['exports', 'ember-cli-materialize/components/md-card'], function (exports, _emberCliMaterializeComponentsMdCard) {
  exports['default'] = _emberCliMaterializeComponentsMdCard['default'];
});
define('stad-stat/components/md-check', ['exports', 'ember-cli-materialize/components/md-check'], function (exports, _emberCliMaterializeComponentsMdCheck) {
  exports['default'] = _emberCliMaterializeComponentsMdCheck['default'];
});
define('stad-stat/components/md-checks-check', ['exports', 'ember-cli-materialize/components/md-checks-check'], function (exports, _emberCliMaterializeComponentsMdChecksCheck) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliMaterializeComponentsMdChecksCheck['default'];
    }
  });
});
define('stad-stat/components/md-checks', ['exports', 'ember-cli-materialize/components/md-checks'], function (exports, _emberCliMaterializeComponentsMdChecks) {
  exports['default'] = _emberCliMaterializeComponentsMdChecks['default'];
});
define('stad-stat/components/md-collapsible', ['exports', 'ember-cli-materialize/components/md-collapsible'], function (exports, _emberCliMaterializeComponentsMdCollapsible) {
  exports['default'] = _emberCliMaterializeComponentsMdCollapsible['default'];
});
define('stad-stat/components/md-collection', ['exports', 'ember-cli-materialize/components/md-collection'], function (exports, _emberCliMaterializeComponentsMdCollection) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliMaterializeComponentsMdCollection['default'];
    }
  });
});
define('stad-stat/components/md-copyright', ['exports', 'ember-cli-materialize/components/md-copyright'], function (exports, _emberCliMaterializeComponentsMdCopyright) {
  exports['default'] = _emberCliMaterializeComponentsMdCopyright['default'];
});
define('stad-stat/components/md-default-collection-header', ['exports', 'ember-cli-materialize/components/md-default-collection-header'], function (exports, _emberCliMaterializeComponentsMdDefaultCollectionHeader) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliMaterializeComponentsMdDefaultCollectionHeader['default'];
    }
  });
});
define('stad-stat/components/md-default-column-header', ['exports', 'ember-cli-materialize/components/md-default-column-header'], function (exports, _emberCliMaterializeComponentsMdDefaultColumnHeader) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliMaterializeComponentsMdDefaultColumnHeader['default'];
    }
  });
});
define('stad-stat/components/md-fixed-btn', ['exports', 'ember-cli-materialize/components/md-fixed-btn'], function (exports, _emberCliMaterializeComponentsMdFixedBtn) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliMaterializeComponentsMdFixedBtn['default'];
    }
  });
});
define('stad-stat/components/md-fixed-btns', ['exports', 'ember-cli-materialize/components/md-fixed-btns'], function (exports, _emberCliMaterializeComponentsMdFixedBtns) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliMaterializeComponentsMdFixedBtns['default'];
    }
  });
});
define('stad-stat/components/md-input-date', ['exports', 'ember-cli-materialize/components/md-input-date'], function (exports, _emberCliMaterializeComponentsMdInputDate) {
  exports['default'] = _emberCliMaterializeComponentsMdInputDate['default'];
});
define('stad-stat/components/md-input-field', ['exports', 'ember-cli-materialize/components/md-input-field'], function (exports, _emberCliMaterializeComponentsMdInputField) {
  exports['default'] = _emberCliMaterializeComponentsMdInputField['default'];
});
define('stad-stat/components/md-input', ['exports', 'ember-cli-materialize/components/md-input'], function (exports, _emberCliMaterializeComponentsMdInput) {
  exports['default'] = _emberCliMaterializeComponentsMdInput['default'];
});
define('stad-stat/components/md-loader', ['exports', 'ember-cli-materialize/components/md-loader'], function (exports, _emberCliMaterializeComponentsMdLoader) {
  exports['default'] = _emberCliMaterializeComponentsMdLoader['default'];
});
define('stad-stat/components/md-modal-container', ['exports', 'ember-cli-materialize/components/md-modal-container'], function (exports, _emberCliMaterializeComponentsMdModalContainer) {
  exports['default'] = _emberCliMaterializeComponentsMdModalContainer['default'];
});
define('stad-stat/components/md-modal', ['exports', 'ember-cli-materialize/components/md-modal'], function (exports, _emberCliMaterializeComponentsMdModal) {
  exports['default'] = _emberCliMaterializeComponentsMdModal['default'];
});
define('stad-stat/components/md-navbar', ['exports', 'ember-cli-materialize/components/md-navbar'], function (exports, _emberCliMaterializeComponentsMdNavbar) {
  exports['default'] = _emberCliMaterializeComponentsMdNavbar['default'];
});
define('stad-stat/components/md-pagination', ['exports', 'ember-cli-materialize/components/md-pagination'], function (exports, _emberCliMaterializeComponentsMdPagination) {
  exports['default'] = _emberCliMaterializeComponentsMdPagination['default'];
});
define('stad-stat/components/md-parallax', ['exports', 'ember-cli-materialize/components/md-parallax'], function (exports, _emberCliMaterializeComponentsMdParallax) {
  exports['default'] = _emberCliMaterializeComponentsMdParallax['default'];
});
define('stad-stat/components/md-radio', ['exports', 'ember-cli-materialize/components/md-radio'], function (exports, _emberCliMaterializeComponentsMdRadio) {
  exports['default'] = _emberCliMaterializeComponentsMdRadio['default'];
});
define('stad-stat/components/md-radios-radio', ['exports', 'ember-cli-materialize/components/md-radios-radio'], function (exports, _emberCliMaterializeComponentsMdRadiosRadio) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliMaterializeComponentsMdRadiosRadio['default'];
    }
  });
});
define('stad-stat/components/md-radios', ['exports', 'ember-cli-materialize/components/md-radios'], function (exports, _emberCliMaterializeComponentsMdRadios) {
  exports['default'] = _emberCliMaterializeComponentsMdRadios['default'];
});
define('stad-stat/components/md-range', ['exports', 'ember-cli-materialize/components/md-range'], function (exports, _emberCliMaterializeComponentsMdRange) {
  exports['default'] = _emberCliMaterializeComponentsMdRange['default'];
});
define('stad-stat/components/md-select', ['exports', 'ember-cli-materialize/components/md-select'], function (exports, _emberCliMaterializeComponentsMdSelect) {
  exports['default'] = _emberCliMaterializeComponentsMdSelect['default'];
});
define('stad-stat/components/md-switch', ['exports', 'ember-cli-materialize/components/md-switch'], function (exports, _emberCliMaterializeComponentsMdSwitch) {
  exports['default'] = _emberCliMaterializeComponentsMdSwitch['default'];
});
define('stad-stat/components/md-switches-switch', ['exports', 'ember-cli-materialize/components/md-switches-switch'], function (exports, _emberCliMaterializeComponentsMdSwitchesSwitch) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliMaterializeComponentsMdSwitchesSwitch['default'];
    }
  });
});
define('stad-stat/components/md-switches', ['exports', 'ember-cli-materialize/components/md-switches'], function (exports, _emberCliMaterializeComponentsMdSwitches) {
  exports['default'] = _emberCliMaterializeComponentsMdSwitches['default'];
});
define('stad-stat/components/md-tab', ['exports', 'ember-cli-materialize/components/md-tab'], function (exports, _emberCliMaterializeComponentsMdTab) {
  exports['default'] = _emberCliMaterializeComponentsMdTab['default'];
});
define('stad-stat/components/md-table-col', ['exports', 'ember-cli-materialize/components/md-table-col'], function (exports, _emberCliMaterializeComponentsMdTableCol) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliMaterializeComponentsMdTableCol['default'];
    }
  });
});
define('stad-stat/components/md-table', ['exports', 'ember-cli-materialize/components/md-table'], function (exports, _emberCliMaterializeComponentsMdTable) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliMaterializeComponentsMdTable['default'];
    }
  });
});
define('stad-stat/components/md-tabs', ['exports', 'ember-cli-materialize/components/md-tabs'], function (exports, _emberCliMaterializeComponentsMdTabs) {
  exports['default'] = _emberCliMaterializeComponentsMdTabs['default'];
});
define('stad-stat/components/md-textarea', ['exports', 'ember-cli-materialize/components/md-textarea'], function (exports, _emberCliMaterializeComponentsMdTextarea) {
  exports['default'] = _emberCliMaterializeComponentsMdTextarea['default'];
});
define('stad-stat/components/modal-dialog-overlay', ['exports', 'ember-modal-dialog/components/modal-dialog-overlay'], function (exports, _emberModalDialogComponentsModalDialogOverlay) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModalDialogComponentsModalDialogOverlay['default'];
    }
  });
});
define('stad-stat/components/modal-dialog', ['exports', 'ember-modal-dialog/components/modal-dialog'], function (exports, _emberModalDialogComponentsModalDialog) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModalDialogComponentsModalDialog['default'];
    }
  });
});
define("stad-stat/components/news-section", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    classNames: "news"
  });
});
define('stad-stat/components/power-select-multiple', ['exports', 'ember-power-select/components/power-select-multiple'], function (exports, _emberPowerSelectComponentsPowerSelectMultiple) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectMultiple['default'];
    }
  });
});
define('stad-stat/components/power-select-multiple/trigger', ['exports', 'ember-power-select/components/power-select-multiple/trigger'], function (exports, _emberPowerSelectComponentsPowerSelectMultipleTrigger) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectMultipleTrigger['default'];
    }
  });
});
define('stad-stat/components/power-select', ['exports', 'ember-power-select/components/power-select'], function (exports, _emberPowerSelectComponentsPowerSelect) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelect['default'];
    }
  });
});
define('stad-stat/components/power-select/before-options', ['exports', 'ember-power-select/components/power-select/before-options'], function (exports, _emberPowerSelectComponentsPowerSelectBeforeOptions) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectBeforeOptions['default'];
    }
  });
});
define('stad-stat/components/power-select/options', ['exports', 'ember-power-select/components/power-select/options'], function (exports, _emberPowerSelectComponentsPowerSelectOptions) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectOptions['default'];
    }
  });
});
define('stad-stat/components/power-select/placeholder', ['exports', 'ember-power-select/components/power-select/placeholder'], function (exports, _emberPowerSelectComponentsPowerSelectPlaceholder) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectPlaceholder['default'];
    }
  });
});
define('stad-stat/components/power-select/search-message', ['exports', 'ember-power-select/components/power-select/search-message'], function (exports, _emberPowerSelectComponentsPowerSelectSearchMessage) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectSearchMessage['default'];
    }
  });
});
define('stad-stat/components/power-select/trigger', ['exports', 'ember-power-select/components/power-select/trigger'], function (exports, _emberPowerSelectComponentsPowerSelectTrigger) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectTrigger['default'];
    }
  });
});
define('stad-stat/components/radio-button-input', ['exports', 'ember-radio-button/components/radio-button-input'], function (exports, _emberRadioButtonComponentsRadioButtonInput) {
  exports['default'] = _emberRadioButtonComponentsRadioButtonInput['default'];
});
define('stad-stat/components/radio-button', ['exports', 'ember-radio-button/components/radio-button'], function (exports, _emberRadioButtonComponentsRadioButton) {
  exports['default'] = _emberRadioButtonComponentsRadioButton['default'];
});
define('stad-stat/components/tether-dialog', ['exports', 'ember-modal-dialog/components/tether-dialog'], function (exports, _emberModalDialogComponentsTetherDialog) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModalDialogComponentsTetherDialog['default'];
    }
  });
});
define('stad-stat/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _emberWelcomePageComponentsWelcomePage) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberWelcomePageComponentsWelcomePage['default'];
    }
  });
});
define("stad-stat/controllers/drill", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Controller.extend({
    leftOffset: 0,
    chartSize: 400,
    additionalTopics: [{
      title: "Verdeling inkomen"
    }, {
      title: "Oppervlakte woningen"
    }, {
      title: "Levenskwaliteit"
    }, {
      title: "Leeftijd"
    }, {
      title: "Opleidingsniveau"
    }],
    init: function init() {
      this.set('oldAdditional', this.get('additionalTopics'));
      this._super();
    },
    selectedTopics: [],
    //faking stuff here
    renderedTopics: _ember["default"].computed('selectedTopics.@each.title', 'model.theme.topics', function () {
      var topics = this.get('model.theme.topics');
      var selected = this.get('selectedTopics');
      if (!topics) {
        return new _ember["default"].RSVP.Promise(function (resolve) {
          resolve(selected);
        });
      }
      return topics.then(function (result) {

        var res = [].addObjects(selected);
        result.map(function (item) {
          res.push(item);
        });
        return res;
      });
    }),

    actions: {
      selectTopic: function selectTopic(topic) {
        this.get('additionalTopics').removeObject(topic);
        this.set('selectedTopics', [].addObjects(this.get('selectedTopics')).addObject(topic));
      },
      rightClick: function rightClick() {
        var relatedSize = (this.get('model.related.length') - 1) * this.get('chartSize');
        this.set('leftOffset', Math.max(-relatedSize, this.get('leftOffset') - this.get('chartSize') / 2));
      },
      leftClick: function leftClick() {
        this.set('leftOffset', Math.min(0, this.get('leftOffset') + this.get('chartSize') / 2));
      }
    }
  });
});
define("stad-stat/controllers/search", ["exports", "ember"], function (exports, _ember) {
	exports["default"] = _ember["default"].Controller.extend({
		queryParams: ["topics", "regions"],
		topics: [],
		regions: [],

		actions: {
			updateSelected: function updateSelected(selected) {
				var regions = [];
				var topics = [];
				selected.forEach(function (sel) {
					var internalModel = sel;
					if (_ember["default"].get(internalModel, '_internalModel') !== undefined) {
						internalModel = _ember["default"].get(internalModel, '_internalModel');
					}
					var type = _ember["default"].get(internalModel, 'modelName');
					if (type === "region") {
						regions.pushObject(sel);
					} else {
						topics.pushObject(sel);
					}
				});
				this.set('topics', topics.mapBy('id'));
				this.set('regions', regions.mapBy('id'));
			}
		}
	});
});
define('stad-stat/helpers/and', ['exports', 'ember', 'ember-truth-helpers/helpers/and'], function (exports, _ember, _emberTruthHelpersHelpersAnd) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersAnd.andHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersAnd.andHelper);
  }

  exports['default'] = forExport;
});
define('stad-stat/helpers/app-version', ['exports', 'ember', 'stad-stat/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _ember, _stadStatConfigEnvironment, _emberCliAppVersionUtilsRegexp) {
  exports.appVersion = appVersion;
  var version = _stadStatConfigEnvironment['default'].APP.version;

  function appVersion(_) {
    var hash = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if (hash.hideSha) {
      return version.match(_emberCliAppVersionUtilsRegexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_emberCliAppVersionUtilsRegexp.shaRegExp)[0];
    }

    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('stad-stat/helpers/await', ['exports', 'ember-promise-helpers/helpers/await'], function (exports, _emberPromiseHelpersHelpersAwait) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPromiseHelpersHelpersAwait['default'];
    }
  });
  Object.defineProperty(exports, 'await', {
    enumerable: true,
    get: function get() {
      return _emberPromiseHelpersHelpersAwait.await;
    }
  });
});
define('stad-stat/helpers/bw-compat-icon', ['exports', 'ember-cli-materialize/helpers/bw-compat-icon'], function (exports, _emberCliMaterializeHelpersBwCompatIcon) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliMaterializeHelpersBwCompatIcon['default'];
    }
  });
  Object.defineProperty(exports, 'bwCompatIcon', {
    enumerable: true,
    get: function get() {
      return _emberCliMaterializeHelpersBwCompatIcon.bwCompatIcon;
    }
  });
});
define('stad-stat/helpers/cancel-all', ['exports', 'ember', 'ember-concurrency/-helpers'], function (exports, _ember, _emberConcurrencyHelpers) {
  exports.cancelHelper = cancelHelper;

  function cancelHelper(args) {
    var cancelable = args[0];
    if (!cancelable || typeof cancelable.cancelAll !== 'function') {
      _ember['default'].assert('The first argument passed to the `cancel-all` helper should be a Task or TaskGroup (without quotes); you passed ' + cancelable, false);
    }

    return (0, _emberConcurrencyHelpers.taskHelperClosure)('cancelAll', args);
  }

  exports['default'] = _ember['default'].Helper.helper(cancelHelper);
});
define('stad-stat/helpers/ember-power-select-is-group', ['exports', 'ember-power-select/helpers/ember-power-select-is-group'], function (exports, _emberPowerSelectHelpersEmberPowerSelectIsGroup) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectHelpersEmberPowerSelectIsGroup['default'];
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectIsGroup', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectHelpersEmberPowerSelectIsGroup.emberPowerSelectIsGroup;
    }
  });
});
define('stad-stat/helpers/ember-power-select-is-selected', ['exports', 'ember-power-select/helpers/ember-power-select-is-selected'], function (exports, _emberPowerSelectHelpersEmberPowerSelectIsSelected) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectHelpersEmberPowerSelectIsSelected['default'];
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectIsSelected', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectHelpersEmberPowerSelectIsSelected.emberPowerSelectIsSelected;
    }
  });
});
define('stad-stat/helpers/ember-power-select-true-string-if-present', ['exports', 'ember-power-select/helpers/ember-power-select-true-string-if-present'], function (exports, _emberPowerSelectHelpersEmberPowerSelectTrueStringIfPresent) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectHelpersEmberPowerSelectTrueStringIfPresent['default'];
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectTrueStringIfPresent', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectHelpersEmberPowerSelectTrueStringIfPresent.emberPowerSelectTrueStringIfPresent;
    }
  });
});
define('stad-stat/helpers/eq', ['exports', 'ember', 'ember-truth-helpers/helpers/equal'], function (exports, _ember, _emberTruthHelpersHelpersEqual) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersEqual.equalHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersEqual.equalHelper);
  }

  exports['default'] = forExport;
});
define('stad-stat/helpers/gt', ['exports', 'ember', 'ember-truth-helpers/helpers/gt'], function (exports, _ember, _emberTruthHelpersHelpersGt) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersGt.gtHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersGt.gtHelper);
  }

  exports['default'] = forExport;
});
define('stad-stat/helpers/gte', ['exports', 'ember', 'ember-truth-helpers/helpers/gte'], function (exports, _ember, _emberTruthHelpersHelpersGte) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersGte.gteHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersGte.gteHelper);
  }

  exports['default'] = forExport;
});
define('stad-stat/helpers/is-array', ['exports', 'ember', 'ember-truth-helpers/helpers/is-array'], function (exports, _ember, _emberTruthHelpersHelpersIsArray) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersIsArray.isArrayHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersIsArray.isArrayHelper);
  }

  exports['default'] = forExport;
});
define('stad-stat/helpers/is-equal', ['exports', 'ember-truth-helpers/helpers/is-equal'], function (exports, _emberTruthHelpersHelpersIsEqual) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersIsEqual['default'];
    }
  });
  Object.defineProperty(exports, 'isEqual', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersIsEqual.isEqual;
    }
  });
});
define('stad-stat/helpers/is-fulfilled', ['exports', 'ember-promise-helpers/helpers/is-fulfilled'], function (exports, _emberPromiseHelpersHelpersIsFulfilled) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPromiseHelpersHelpersIsFulfilled['default'];
    }
  });
  Object.defineProperty(exports, 'isFulfilled', {
    enumerable: true,
    get: function get() {
      return _emberPromiseHelpersHelpersIsFulfilled.isFulfilled;
    }
  });
});
define('stad-stat/helpers/is-pending', ['exports', 'ember-promise-helpers/helpers/is-pending'], function (exports, _emberPromiseHelpersHelpersIsPending) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPromiseHelpersHelpersIsPending['default'];
    }
  });
  Object.defineProperty(exports, 'isPending', {
    enumerable: true,
    get: function get() {
      return _emberPromiseHelpersHelpersIsPending.isPending;
    }
  });
});
define('stad-stat/helpers/is-rejected', ['exports', 'ember-promise-helpers/helpers/is-rejected'], function (exports, _emberPromiseHelpersHelpersIsRejected) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPromiseHelpersHelpersIsRejected['default'];
    }
  });
  Object.defineProperty(exports, 'isRejected', {
    enumerable: true,
    get: function get() {
      return _emberPromiseHelpersHelpersIsRejected.isRejected;
    }
  });
});
define('stad-stat/helpers/lf-lock-model', ['exports', 'liquid-fire/helpers/lf-lock-model'], function (exports, _liquidFireHelpersLfLockModel) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireHelpersLfLockModel['default'];
    }
  });
  Object.defineProperty(exports, 'lfLockModel', {
    enumerable: true,
    get: function get() {
      return _liquidFireHelpersLfLockModel.lfLockModel;
    }
  });
});
define('stad-stat/helpers/lf-or', ['exports', 'liquid-fire/helpers/lf-or'], function (exports, _liquidFireHelpersLfOr) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireHelpersLfOr['default'];
    }
  });
  Object.defineProperty(exports, 'lfOr', {
    enumerable: true,
    get: function get() {
      return _liquidFireHelpersLfOr.lfOr;
    }
  });
});
define('stad-stat/helpers/lt', ['exports', 'ember', 'ember-truth-helpers/helpers/lt'], function (exports, _ember, _emberTruthHelpersHelpersLt) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersLt.ltHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersLt.ltHelper);
  }

  exports['default'] = forExport;
});
define('stad-stat/helpers/lte', ['exports', 'ember', 'ember-truth-helpers/helpers/lte'], function (exports, _ember, _emberTruthHelpersHelpersLte) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersLte.lteHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersLte.lteHelper);
  }

  exports['default'] = forExport;
});
define('stad-stat/helpers/not-eq', ['exports', 'ember', 'ember-truth-helpers/helpers/not-equal'], function (exports, _ember, _emberTruthHelpersHelpersNotEqual) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersNotEqual.notEqualHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersNotEqual.notEqualHelper);
  }

  exports['default'] = forExport;
});
define('stad-stat/helpers/not', ['exports', 'ember', 'ember-truth-helpers/helpers/not'], function (exports, _ember, _emberTruthHelpersHelpersNot) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersNot.notHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersNot.notHelper);
  }

  exports['default'] = forExport;
});
define('stad-stat/helpers/or', ['exports', 'ember', 'ember-truth-helpers/helpers/or'], function (exports, _ember, _emberTruthHelpersHelpersOr) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersOr.orHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersOr.orHelper);
  }

  exports['default'] = forExport;
});
define('stad-stat/helpers/perform', ['exports', 'ember', 'ember-concurrency/-helpers'], function (exports, _ember, _emberConcurrencyHelpers) {
  exports.performHelper = performHelper;

  function performHelper(args, hash) {
    return (0, _emberConcurrencyHelpers.taskHelperClosure)('perform', args, hash);
  }

  exports['default'] = _ember['default'].Helper.helper(performHelper);
});
define('stad-stat/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('stad-stat/helpers/promise-rejected-reason', ['exports', 'ember-promise-helpers/helpers/promise-rejected-reason'], function (exports, _emberPromiseHelpersHelpersPromiseRejectedReason) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPromiseHelpersHelpersPromiseRejectedReason['default'];
    }
  });
});
define('stad-stat/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('stad-stat/helpers/task', ['exports', 'ember'], function (exports, _ember) {
  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

  function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

  function taskHelper(_ref) {
    var _ref2 = _toArray(_ref);

    var task = _ref2[0];

    var args = _ref2.slice(1);

    return task._curry.apply(task, _toConsumableArray(args));
  }

  exports['default'] = _ember['default'].Helper.helper(taskHelper);
});
define('stad-stat/helpers/xor', ['exports', 'ember', 'ember-truth-helpers/helpers/xor'], function (exports, _ember, _emberTruthHelpersHelpersXor) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersXor.xorHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersXor.xorHelper);
  }

  exports['default'] = forExport;
});
define('stad-stat/initializers/add-modals-container', ['exports', 'ember-modal-dialog/initializers/add-modals-container'], function (exports, _emberModalDialogInitializersAddModalsContainer) {
  exports['default'] = {
    name: 'add-modals-container',
    initialize: _emberModalDialogInitializersAddModalsContainer['default']
  };
});
define('stad-stat/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'stad-stat/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _stadStatConfigEnvironment) {
  var _config$APP = _stadStatConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('stad-stat/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('stad-stat/initializers/data-adapter', ['exports'], function (exports) {
  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('stad-stat/initializers/ember-concurrency', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  exports['default'] = {
    name: 'ember-concurrency',
    initialize: function initialize() {}
  };
});
// This initializer exists only to make sure that the following
// imports happen before the app boots.
define('stad-stat/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _emberDataSetupContainer, _emberData) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('stad-stat/initializers/ember-keyboard-first-responder-inputs', ['exports', 'ember-keyboard/initializers/ember-keyboard-first-responder-inputs'], function (exports, _emberKeyboardInitializersEmberKeyboardFirstResponderInputs) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberKeyboardInitializersEmberKeyboardFirstResponderInputs['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _emberKeyboardInitializersEmberKeyboardFirstResponderInputs.initialize;
    }
  });
});
define('stad-stat/initializers/export-application-global', ['exports', 'ember', 'stad-stat/config/environment'], function (exports, _ember, _stadStatConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_stadStatConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _stadStatConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_stadStatConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('stad-stat/initializers/injectStore', ['exports'], function (exports) {
  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("stad-stat/initializers/liquid-fire", ["exports", "liquid-fire/ember-internals"], function (exports, _liquidFireEmberInternals) {

  (0, _liquidFireEmberInternals.initialize)();

  exports["default"] = {
    name: 'liquid-fire',
    initialize: function initialize() {}
  };
});
define('stad-stat/initializers/md-settings', ['exports', 'stad-stat/config/environment', 'ember-cli-materialize/services/md-settings'], function (exports, _stadStatConfigEnvironment, _emberCliMaterializeServicesMdSettings) {
  exports.initialize = initialize;

  function initialize() {
    var materializeDefaults = _stadStatConfigEnvironment['default'].materializeDefaults;

    var application = arguments[1] || arguments[0];

    if (window && window.validate_field) {
      window.validate_field = function () {};
    }

    application.register('config:materialize', materializeDefaults, { instantiate: false });
    application.register('service:materialize-settings', _emberCliMaterializeServicesMdSettings['default']);
    application.inject('service:materialize-settings', 'materializeDefaults', 'config:materialize');
  }

  exports['default'] = {
    name: 'md-settings',
    initialize: initialize
  };
});
define('stad-stat/initializers/store', ['exports'], function (exports) {
  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('stad-stat/initializers/transforms', ['exports'], function (exports) {
  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('stad-stat/initializers/truth-helpers', ['exports', 'ember', 'ember-truth-helpers/utils/register-helper', 'ember-truth-helpers/helpers/and', 'ember-truth-helpers/helpers/or', 'ember-truth-helpers/helpers/equal', 'ember-truth-helpers/helpers/not', 'ember-truth-helpers/helpers/is-array', 'ember-truth-helpers/helpers/not-equal', 'ember-truth-helpers/helpers/gt', 'ember-truth-helpers/helpers/gte', 'ember-truth-helpers/helpers/lt', 'ember-truth-helpers/helpers/lte'], function (exports, _ember, _emberTruthHelpersUtilsRegisterHelper, _emberTruthHelpersHelpersAnd, _emberTruthHelpersHelpersOr, _emberTruthHelpersHelpersEqual, _emberTruthHelpersHelpersNot, _emberTruthHelpersHelpersIsArray, _emberTruthHelpersHelpersNotEqual, _emberTruthHelpersHelpersGt, _emberTruthHelpersHelpersGte, _emberTruthHelpersHelpersLt, _emberTruthHelpersHelpersLte) {
  exports.initialize = initialize;

  function initialize() /* container, application */{

    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (_ember['default'].Helper) {
      return;
    }

    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('and', _emberTruthHelpersHelpersAnd.andHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('or', _emberTruthHelpersHelpersOr.orHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('eq', _emberTruthHelpersHelpersEqual.equalHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('not', _emberTruthHelpersHelpersNot.notHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('is-array', _emberTruthHelpersHelpersIsArray.isArrayHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('not-eq', _emberTruthHelpersHelpersNotEqual.notEqualHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('gt', _emberTruthHelpersHelpersGt.gtHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('gte', _emberTruthHelpersHelpersGte.gteHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('lt', _emberTruthHelpersHelpersLt.ltHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('lte', _emberTruthHelpersHelpersLte.lteHelper);
  }

  exports['default'] = {
    name: 'truth-helpers',
    initialize: initialize
  };
});
define("stad-stat/instance-initializers/ember-data", ["exports", "ember-data/instance-initializers/initialize-store-service"], function (exports, _emberDataInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataInstanceInitializersInitializeStoreService["default"]
  };
});
define('stad-stat/locations/router-scroll', ['exports', 'ember-router-scroll/locations/router-scroll'], function (exports, _emberRouterScrollLocationsRouterScroll) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberRouterScrollLocationsRouterScroll['default'];
    }
  });
});
define('stad-stat/models/region-theme', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    title: _emberData['default'].attr('string'),
    values: _emberData['default'].hasMany('value', { inverse: 'regionTheme' }),
    theme: _emberData['default'].belongsTo('theme', { inverse: 'regionThemes' }),
    region: _emberData['default'].belongsTo('region', { inverse: 'regionThemes' })
  });
});
define('stad-stat/models/region', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    title: _emberData['default'].attr('string'),
    regionThemes: _emberData['default'].hasMany('region-theme', { inverse: 'region' })
  });
});
define('stad-stat/models/theme', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    title: _emberData['default'].attr('string'),
    topics: _emberData['default'].hasMany('topic'),
    regionThemes: _emberData['default'].hasMany('region-theme', { inverse: 'theme' })
  });
});
define('stad-stat/models/topic', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    title: _emberData['default'].attr('string'),
    themes: _emberData['default'].hasMany('theme', { inverse: 'topics' })
  });
});
define('stad-stat/models/value', ['exports', 'ember-data'], function (exports, _emberData) {
    exports['default'] = _emberData['default'].Model.extend({
        value: _emberData['default'].attr('number'),
        year: _emberData['default'].attr(),
        regionTheme: _emberData['default'].belongsTo('region-theme', { inverse: 'values' })
    });
});
define('stad-stat/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('stad-stat/router', ['exports', 'ember', 'stad-stat/config/environment'], function (exports, _ember, _stadStatConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _stadStatConfigEnvironment['default'].locationType,
    rootURL: _stadStatConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('search');
    this.route('drill', { path: "/drill/:id/" });
  });

  exports['default'] = Router;
});
define('stad-stat/routes/drill', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    randomNumbers: function randomNumbers(n, base, tuples) {
      var a = [];
      while (n > 0) {
        n--;
        if (tuples) {
          a.push(["" + n, Math.random() * (base || 10)]);
        } else {
          a.push(Math.random() * (base || 10));
        }
      }
      return a;
    },
    model: function model(params) {
      var self = this;
      return this.get('store').find('region-theme', params.id).then(function (regionTheme) {
        return _ember['default'].merge(regionTheme, { related: [[{
            name: 'Woning oppervlakte',
            type: 'bar',
            data: self.randomNumbers(4, 100)
          }], [{
            name: 'Opleidingsniveau',
            type: 'pie',
            data: self.randomNumbers(4, 60000, true)
          }], [{
            name: 'Percentage autogebruik',
            data: self.randomNumbers(12, 100)
          }], [{
            name: 'Levenskwaliteit',
            type: 'bar',
            data: self.randomNumbers(5, 60000)
          }], [{
            name: 'Verkeersongevallen',
            type: 'bar',
            data: self.randomNumbers(3, 100)
          }], [{
            name: 'Culturele activiteit',
            type: 'pie',
            data: self.randomNumbers(3, 100, true)
          }], [{
            name: 'Kinderen',
            type: 'bar',
            data: self.randomNumbers(4, 100)
          }], [{
            name: 'Huisdieren',
            type: 'bar',
            data: self.randomNumbers(2, 100)
          }]] });
      });
    }

  });
});
define('stad-stat/routes/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    activate: function activate() {
      this.transitionTo('search');
    }
  });
});
define("stad-stat/routes/search", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    queryParams: {
      topics: {
        refreshModel: true
      },
      regions: {
        refreshModel: true
      }
    },
    model: function model(params) {
      var hasTopics = params.topics && params.topics.length;
      var hasRegions = params.regions && params.regions.length;
      if (hasTopics || hasRegions) {
        var paramString = "";
        if (hasTopics) {
          paramString += params.topics.map(function (topicId) {
            return "filter[theme][topics][id]=" + encodeURIComponent(topicId);
          }).join('&');
        }
        if (hasRegions) {
          var joinedLocations = params.regions.join(",");
          if (paramString.length) {
            paramString += "&";
          }
          paramString += "&filter[region][id]=" + joinedLocations;
        }
        return this.get('store').query('region-theme', paramString);
      } else {
        return this.get('store').findAll('region-theme');
      }
    }
  });
});
define('stad-stat/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('stad-stat/services/keyboard', ['exports', 'ember-keyboard/services/keyboard'], function (exports, _emberKeyboardServicesKeyboard) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberKeyboardServicesKeyboard['default'];
    }
  });
});
define("stad-stat/services/liquid-fire-transitions", ["exports", "liquid-fire/transition-map"], function (exports, _liquidFireTransitionMap) {
  exports["default"] = _liquidFireTransitionMap["default"];
});
define('stad-stat/services/md-settings', ['exports', 'ember-cli-materialize/services/md-settings'], function (exports, _emberCliMaterializeServicesMdSettings) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliMaterializeServicesMdSettings['default'];
    }
  });
});
define('stad-stat/services/modal-dialog', ['exports', 'ember-modal-dialog/services/modal-dialog'], function (exports, _emberModalDialogServicesModalDialog) {
  exports['default'] = _emberModalDialogServicesModalDialog['default'];
});
define('stad-stat/services/router-scroll', ['exports', 'ember-router-scroll/services/router-scroll'], function (exports, _emberRouterScrollServicesRouterScroll) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberRouterScrollServicesRouterScroll['default'];
    }
  });
});
define('stad-stat/services/text-measurer', ['exports', 'ember-text-measurer/services/text-measurer'], function (exports, _emberTextMeasurerServicesTextMeasurer) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberTextMeasurerServicesTextMeasurer['default'];
    }
  });
});
define("stad-stat/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "q0sy7Mva", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "stad-stat/templates/application.hbs" } });
});
define("stad-stat/templates/components/chart-single-value", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "OuZkflt8", "block": "{\"symbols\":[],\"statements\":[[1,[25,\"default-chart\",null,[[\"regionTheme\"],[[19,0,[\"regionTheme\"]]]]],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "stad-stat/templates/components/chart-single-value.hbs" } });
});
define("stad-stat/templates/components/chart-zoomed-value", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "lOX3zPfw", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"class\",\"single-chart\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"controls\"],[7],[0,\"\\n    \"],[6,\"button\"],[9,\"class\",\"btn\"],[3,\"action\",[[19,0,[]],\"makePie\"]],[7],[6,\"i\"],[9,\"class\",\"fa fa-pie-chart\"],[9,\"aria-hidden\",\"true\"],[7],[8],[8],[0,\"\\n    \"],[6,\"button\"],[9,\"class\",\"btn\"],[3,\"action\",[[19,0,[]],\"makeBar\"]],[7],[6,\"i\"],[9,\"class\",\"fa fa-bar-chart\"],[9,\"aria-hidden\",\"true\"],[7],[8],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[1,[25,\"default-chart\",null,[[\"regionTheme\",\"chartType\",\"additional\",\"hideTitle\"],[[19,0,[\"regionTheme\"]],[19,0,[\"chartType\"]],[19,0,[\"additional\"]],true]]],false],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "stad-stat/templates/components/chart-zoomed-value.hbs" } });
});
define("stad-stat/templates/components/default-chart", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "ZbZt7QRa", "block": "{\"symbols\":[],\"statements\":[[1,[25,\"high-charts\",null,[[\"chartOptions\",\"content\"],[[19,0,[\"chartOptions\"]],[19,0,[\"chartData\"]]]]],false]],\"hasEval\":false}", "meta": { "moduleName": "stad-stat/templates/components/default-chart.hbs" } });
});
define("stad-stat/templates/components/default-line-chart", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "72t3oFnH", "block": "{\"symbols\":[],\"statements\":[[1,[25,\"high-charts\",null,[[\"chartOptions\",\"content\"],[[19,0,[\"chartOptions\"]],[19,0,[\"chartData\"]]]]],false]],\"hasEval\":false}", "meta": { "moduleName": "stad-stat/templates/components/default-line-chart.hbs" } });
});
define("stad-stat/templates/components/edit-has-many", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "y52Fo3lT", "block": "{\"symbols\":[],\"statements\":[[1,[25,\"ember-selectize\",null,[[\"content\",\"optionValuePath\",\"optionLabelPath\",\"selection\",\"multiple\",\"searchField\",\"update-filter\",\"create-item\",\"placeholder\"],[[19,0,[\"selectizeItems\"]],\"content.id\",[19,0,[\"optionLabelPath\"]],[19,0,[\"selectedItems\"]],true,[19,0,[\"\\\"body\\\", \\\"title\\\"\"]],[25,\"action\",[[19,0,[]],\"filterChanged\"],null],[25,\"action\",[[19,0,[]],\"newItem\"],null],[19,0,[\"placeholder\"]]]]],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "stad-stat/templates/components/edit-has-many.hbs" } });
});
define("stad-stat/templates/components/fact-browser", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "rPm/k5M1", "block": "{\"symbols\":[\"regionThemesVersion\",\"regionTheme\",\"index\"],\"statements\":[[6,\"div\"],[9,\"class\",\"filter\"],[7],[0,\"\\n  \"],[1,[25,\"fact-selector\",null,[[\"selectedTopicIds\",\"selectedRegionIds\",\"updateSelected\"],[[19,0,[\"selectedTopicIds\"]],[19,0,[\"selectedRegionIds\"]],[19,0,[\"updateSelectedTopics\"]]]]],false],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"results\"],[7],[0,\"\\n\"],[4,\"liquid-bind\",[[19,0,[\"regionThemes\"]]],null,{\"statements\":[[4,\"each\",[[19,0,[\"regionThemes\"]]],[[\"key\"],[\"id\"]],{\"statements\":[[4,\"link-to\",[\"drill\",[19,2,[\"id\"]]],[[\"value-id\",\"classNames\"],[[19,2,[\"id\"]],\"valuation\"]],{\"statements\":[[0,\"        \"],[1,[25,\"chart-single-value\",null,[[\"regionTheme\",\"value\",\"idx\"],[[19,2,[]],[19,2,[\"values\",\"firstObject\"]],[19,3,[]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[2,3]},null]],\"parameters\":[1]},null],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "stad-stat/templates/components/fact-browser.hbs" } });
});
define("stad-stat/templates/components/fact-selector", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "1GogkXtO", "block": "{\"symbols\":[\"topic\",\"topic\"],\"statements\":[[4,\"power-select-multiple\",null,[[\"search\",\"selected\",\"onchange\"],[[25,\"action\",[[19,0,[]],\"searchRepo\"],null],[19,0,[\"currentTopics\"]],[19,0,[\"updateSelected\"]]]],{\"statements\":[[0,\"  \"],[1,[19,2,[\"title\"]],false],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"\\n\"],[6,\"ul\"],[7],[0,\"\\n\"],[4,\"each\",[[19,0,[\"selected\"]]],null,{\"statements\":[[0,\"    \"],[6,\"li\"],[7],[1,[19,1,[\"title\"]],false],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "stad-stat/templates/components/fact-selector.hbs" } });
});
define("stad-stat/templates/components/labeled-radio-button", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "7N9vUnvk", "block": "{\"symbols\":[\"&default\"],\"statements\":[[1,[25,\"radio-button\",null,[[\"radioClass\",\"radioId\",\"changed\",\"disabled\",\"groupValue\",\"name\",\"required\",\"value\"],[[19,0,[\"radioClass\"]],[19,0,[\"radioId\"]],\"innerRadioChanged\",[19,0,[\"disabled\"]],[19,0,[\"groupValue\"]],[19,0,[\"name\"]],[19,0,[\"required\"]],[19,0,[\"value\"]]]]],false],[0,\"\\n\\n\"],[11,1],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "stad-stat/templates/components/labeled-radio-button.hbs" } });
});
define('stad-stat/templates/components/modal-dialog', ['exports', 'ember-modal-dialog/templates/components/modal-dialog'], function (exports, _emberModalDialogTemplatesComponentsModalDialog) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModalDialogTemplatesComponentsModalDialog['default'];
    }
  });
});
define("stad-stat/templates/components/news-section", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "DVZAcQ+r", "block": "{\"symbols\":[],\"statements\":[[1,[25,\"default-line-chart\",null,[[\"title\"],[\"Evolutie Misdaad\"]]],false],[0,\"\\n\"],[1,[25,\"default-chart\",null,[[\"title\"],[\"Verdeling Leeftijdscategorieën\"]]],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "stad-stat/templates/components/news-section.hbs" } });
});
define("stad-stat/templates/components/radio-button", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "UD/1uyun", "block": "{\"symbols\":[\"&default\"],\"statements\":[[4,\"if\",[[22,1]],null,{\"statements\":[[0,\"  \"],[6,\"label\"],[10,\"class\",[26,[\"ember-radio-button \",[25,\"if\",[[19,0,[\"checked\"]],\"checked\"],null],\" \",[18,\"joinedClassNames\"]]]],[10,\"for\",[18,\"radioId\"],null],[7],[0,\"\\n    \"],[1,[25,\"radio-button-input\",null,[[\"class\",\"id\",\"disabled\",\"name\",\"required\",\"groupValue\",\"value\",\"changed\"],[[19,0,[\"radioClass\"]],[19,0,[\"radioId\"]],[19,0,[\"disabled\"]],[19,0,[\"name\"]],[19,0,[\"required\"]],[19,0,[\"groupValue\"]],[19,0,[\"value\"]],\"changed\"]]],false],[0,\"\\n\\n    \"],[11,1],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[1,[25,\"radio-button-input\",null,[[\"class\",\"id\",\"disabled\",\"name\",\"required\",\"groupValue\",\"value\",\"changed\"],[[19,0,[\"radioClass\"]],[19,0,[\"radioId\"]],[19,0,[\"disabled\"]],[19,0,[\"name\"]],[19,0,[\"required\"]],[19,0,[\"groupValue\"]],[19,0,[\"value\"]],\"changed\"]]],false],[0,\"\\n\"]],\"parameters\":[]}]],\"hasEval\":false}", "meta": { "moduleName": "stad-stat/templates/components/radio-button.hbs" } });
});
define('stad-stat/templates/components/tether-dialog', ['exports', 'ember-modal-dialog/templates/components/tether-dialog'], function (exports, _emberModalDialogTemplatesComponentsTetherDialog) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberModalDialogTemplatesComponentsTetherDialog['default'];
    }
  });
});
define("stad-stat/templates/drill", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "snBP0rqv", "block": "{\"symbols\":[\"related\",\"topic\",\"topic\"],\"statements\":[[6,\"main\"],[9,\"class\",\"app\"],[7],[0,\"\\n  \"],[6,\"aside\"],[9,\"class\",\"app-aside\"],[7],[0,\"\\n    \"],[6,\"header\"],[9,\"class\",\"app-header\"],[7],[0,\"\\n      \"],[6,\"h1\"],[7],[6,\"a\"],[9,\"href\",\"/\"],[7],[6,\"img\"],[9,\"src\",\"../assets/img/logo.jpg\"],[9,\"alt\",\"logo\"],[7],[8],[8],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"section\"],[9,\"class\",\"news\"],[7],[0,\"\\n      \"],[6,\"h2\"],[7],[0,\"Nieuws\"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"news-section\"],[7],[0,\"\\n        \"],[1,[18,\"news-section\"],false],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"section\"],[9,\"class\",\"app-main\"],[7],[0,\"\\n    \"],[6,\"header\"],[9,\"class\",\"header\"],[7],[0,\"\\n      \"],[6,\"h2\"],[7],[1,[20,[\"model\",\"title\"]],false],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"share\"],[7],[0,\"\\n        \"],[6,\"i\"],[9,\"class\",\"fa fa-facebook\"],[9,\"aria-hidden\",\"true\"],[7],[8],[0,\"\\n        \"],[6,\"i\"],[9,\"class\",\"fa fa-twitter\"],[9,\"aria-hidden\",\"true\"],[7],[8],[0,\"\\n        \"],[6,\"i\"],[9,\"class\",\"fa fa-google-plus\"],[9,\"aria-hidden\",\"true\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[1,[25,\"chart-zoomed-value\",null,[[\"regionTheme\",\"value\",\"additional\"],[[19,0,[\"model\"]],[19,0,[\"model\",\"values\",\"firstObject\"]],[19,0,[\"selectedTopics\"]]]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"widgets\"],[7],[0,\"\\n      \"],[6,\"section\"],[9,\"class\",\"widget\"],[7],[0,\"\\n        \"],[6,\"header\"],[7],[0,\"\\n          \"],[6,\"h3\"],[7],[0,\"Topics\"],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"tags\"],[7],[0,\"\\n\"],[4,\"each\",[[25,\"await\",[[19,0,[\"renderedTopics\"]]],null]],null,{\"statements\":[[0,\"            \"],[6,\"span\"],[9,\"class\",\"tag\"],[7],[1,[19,3,[\"title\"]],false],[8],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"section\"],[9,\"class\",\"widget\"],[7],[0,\"\\n        \"],[6,\"header\"],[7],[0,\"\\n          \"],[6,\"h3\"],[7],[0,\"More\"],[8],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"tags clickable\"],[7],[0,\"\\n\"],[4,\"each\",[[19,0,[\"additionalTopics\"]]],null,{\"statements\":[[0,\"            \"],[6,\"span\"],[3,\"action\",[[19,0,[]],\"selectTopic\",[19,2,[]]]],[7],[1,[19,2,[\"title\"]],false],[8],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"section\"],[9,\"class\",\"widget widget--fluid\"],[7],[0,\"\\n        \"],[6,\"header\"],[7],[0,\"\\n          \"],[6,\"h3\"],[7],[0,\"People that watched this also looked at\"],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n        \"],[6,\"div\"],[9,\"class\",\"related-wrap\"],[7],[0,\"\\n          \"],[6,\"a\"],[9,\"href\",\"#\"],[9,\"class\",\"nav nav-left\"],[3,\"action\",[[19,0,[]],\"leftClick\"]],[7],[8],[0,\"\\n          \"],[6,\"a\"],[9,\"href\",\"#\"],[9,\"class\",\"nav nav-right\"],[3,\"action\",[[19,0,[]],\"rightClick\"]],[7],[8],[0,\"\\n\\n          \"],[6,\"div\"],[9,\"class\",\"related\"],[7],[0,\"\\n            \"],[6,\"ul\"],[9,\"class\",\"charts\"],[10,\"style\",[26,[\"left:\",[18,\"leftOffset\"],\"px;\"]]],[7],[0,\"\\n\"],[4,\"each\",[[19,0,[\"model\",\"related\"]]],null,{\"statements\":[[0,\"                \"],[6,\"li\"],[7],[1,[25,\"default-chart\",null,[[\"chartType\",\"legend\",\"chartData\"],[[19,0,[\"line\"]],false,[19,1,[]]]]],false],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "stad-stat/templates/drill.hbs" } });
});
define("stad-stat/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "yoUL4UlT", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "stad-stat/templates/index.hbs" } });
});
define("stad-stat/templates/search", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "nfkPLm1D", "block": "{\"symbols\":[],\"statements\":[[6,\"main\"],[9,\"class\",\"app\"],[7],[0,\"\\n  \"],[6,\"aside\"],[9,\"class\",\"app-aside\"],[7],[0,\"\\n    \"],[6,\"header\"],[9,\"class\",\"app-header\"],[7],[0,\"\\n      \"],[6,\"h1\"],[7],[6,\"a\"],[9,\"href\",\"/\"],[7],[6,\"img\"],[9,\"src\",\"../assets/img/logo.jpg\"],[9,\"alt\",\"logo\"],[7],[8],[8],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"section\"],[9,\"class\",\"news\"],[7],[0,\"\\n      \"],[6,\"h2\"],[7],[0,\"Nieuws\"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"news-section\"],[7],[0,\"\\n        \"],[1,[18,\"news-section\"],false],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"section\"],[9,\"class\",\"app-main\"],[7],[0,\"\\n    \"],[6,\"header\"],[9,\"class\",\"header\"],[7],[0,\"\\n      \"],[6,\"h2\"],[7],[0,\"Je weg rond de stad\"],[8],[0,\"\\n      \"],[6,\"p\"],[7],[0,\"Hier komt informatie met de feitelijke gegevens over de stad.  Deze staat buiten de div zodat we de gehele schermbreedte nog kunnen gebruiken indien nodig.\"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"content\"],[7],[0,\"\\n      \"],[1,[25,\"fact-browser\",null,[[\"updateSelectedTopics\",\"selectedTopicIds\",\"selectedRegionIds\",\"regionThemes\"],[[25,\"action\",[[19,0,[]],\"updateSelected\"],null],[19,0,[\"topics\"]],[19,0,[\"regions\"]],[19,0,[\"model\"]]]]],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"outlet\"],[7],[0,\"\\n      \"],[1,[18,\"outlet\"],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "stad-stat/templates/search.hbs" } });
});
define('stad-stat/transitions', ['exports'], function (exports) {
  var duration = 600;

  exports['default'] = function () {
    this.transition(this.childOf('.values'), this.use('explode', {
      matchBy: 'value-id', // matchBy will look for the same
      // HTML attribute value in both
      // the old and new elements, and
      // for each matching pair, it
      // runs the given transition.

      // fly-to is a built in transition that animate the element
      // moving from the position of oldElement to the position of
      // newElement.
      use: ['fly-to', { duration: duration, easing: 'ease-in-out' }]
    }, {
      use: ['cross-fade']
    }), this.debug());
  };
});
define('stad-stat/transitions/cross-fade', ['exports', 'liquid-fire/transitions/cross-fade'], function (exports, _liquidFireTransitionsCrossFade) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsCrossFade['default'];
    }
  });
});
define('stad-stat/transitions/default', ['exports', 'liquid-fire/transitions/default'], function (exports, _liquidFireTransitionsDefault) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsDefault['default'];
    }
  });
});
define('stad-stat/transitions/explode', ['exports', 'liquid-fire/transitions/explode'], function (exports, _liquidFireTransitionsExplode) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsExplode['default'];
    }
  });
});
define('stad-stat/transitions/fade', ['exports', 'liquid-fire/transitions/fade'], function (exports, _liquidFireTransitionsFade) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsFade['default'];
    }
  });
});
define('stad-stat/transitions/flex-grow', ['exports', 'liquid-fire/transitions/flex-grow'], function (exports, _liquidFireTransitionsFlexGrow) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsFlexGrow['default'];
    }
  });
});
define('stad-stat/transitions/fly-to', ['exports', 'liquid-fire/transitions/fly-to'], function (exports, _liquidFireTransitionsFlyTo) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsFlyTo['default'];
    }
  });
});
define('stad-stat/transitions/move-over', ['exports', 'liquid-fire/transitions/move-over'], function (exports, _liquidFireTransitionsMoveOver) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsMoveOver['default'];
    }
  });
});
define('stad-stat/transitions/scale', ['exports', 'liquid-fire/transitions/scale'], function (exports, _liquidFireTransitionsScale) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsScale['default'];
    }
  });
});
define('stad-stat/transitions/scroll-then', ['exports', 'liquid-fire/transitions/scroll-then'], function (exports, _liquidFireTransitionsScrollThen) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsScrollThen['default'];
    }
  });
});
define('stad-stat/transitions/to-down', ['exports', 'liquid-fire/transitions/to-down'], function (exports, _liquidFireTransitionsToDown) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsToDown['default'];
    }
  });
});
define('stad-stat/transitions/to-left', ['exports', 'liquid-fire/transitions/to-left'], function (exports, _liquidFireTransitionsToLeft) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsToLeft['default'];
    }
  });
});
define('stad-stat/transitions/to-right', ['exports', 'liquid-fire/transitions/to-right'], function (exports, _liquidFireTransitionsToRight) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsToRight['default'];
    }
  });
});
define('stad-stat/transitions/to-up', ['exports', 'liquid-fire/transitions/to-up'], function (exports, _liquidFireTransitionsToUp) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsToUp['default'];
    }
  });
});
define('stad-stat/transitions/wait', ['exports', 'liquid-fire/transitions/wait'], function (exports, _liquidFireTransitionsWait) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsWait['default'];
    }
  });
});
define('stad-stat/utils/listener-name', ['exports', 'ember-keyboard/utils/listener-name'], function (exports, _emberKeyboardUtilsListenerName) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberKeyboardUtilsListenerName['default'];
    }
  });
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('stad-stat/config/environment', ['ember'], function(Ember) {
  var prefix = 'stad-stat';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("stad-stat/app")["default"].create({"name":"stad-stat","version":"0.0.0+61fa18e8"});
}

/* jshint ignore:end */
//# sourceMappingURL=stad-stat.map
