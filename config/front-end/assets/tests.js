'use strict';

define('stad-stat/tests/adapters/application.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | adapters/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass jshint.');
  });
});
define('stad-stat/tests/app.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('stad-stat/tests/components/chart-single-value.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/chart-single-value.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/chart-single-value.js should pass jshint.');
  });
});
define('stad-stat/tests/components/chart-zoomed-value.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/chart-zoomed-value.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/chart-zoomed-value.js should pass jshint.');
  });
});
define('stad-stat/tests/components/default-chart.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/default-chart.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/default-chart.js should pass jshint.');
  });
});
define('stad-stat/tests/components/default-line-chart.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/default-line-chart.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/default-line-chart.js should pass jshint.');
  });
});
define('stad-stat/tests/components/edit-has-many.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/edit-has-many.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/edit-has-many.js should pass jshint.');
  });
});
define('stad-stat/tests/components/fact-browser.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/fact-browser.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/fact-browser.js should pass jshint.');
  });
});
define('stad-stat/tests/components/fact-selector.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/fact-selector.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/fact-selector.js should pass jshint.');
  });
});
define('stad-stat/tests/components/news-section.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/news-section.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/news-section.js should pass jshint.');
  });
});
define('stad-stat/tests/controllers/drill.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/drill.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/drill.js should pass jshint.');
  });
});
define('stad-stat/tests/controllers/search.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/search.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/search.js should pass jshint.');
  });
});
define('stad-stat/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('stad-stat/tests/helpers/destroy-app.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('stad-stat/tests/helpers/ember-basic-dropdown', ['exports', 'ember', 'ember-runloop', 'jquery'], function (exports, _ember, _emberRunloop, _jquery) {
  exports.nativeClick = nativeClick;
  exports.clickTrigger = clickTrigger;
  exports.tapTrigger = tapTrigger;
  exports.fireKeydown = fireKeydown;

  // integration helpers
  function focus(el) {
    if (!el) {
      return;
    }
    var $el = (0, _jquery['default'])(el);
    if ($el.is(':input, [contenteditable=true]')) {
      var type = $el.prop('type');
      if (type !== 'checkbox' && type !== 'radio' && type !== 'hidden') {
        (0, _emberRunloop['default'])(null, function () {
          // Firefox does not trigger the `focusin` event if the window
          // does not have focus. If the document doesn't have focus just
          // use trigger('focusin') instead.

          if (!document.hasFocus || document.hasFocus()) {
            el.focus();
          } else {
            $el.trigger('focusin');
          }
        });
      }
    }
  }

  function nativeClick(selector) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var mousedown = new window.Event('mousedown', { bubbles: true, cancelable: true, view: window });
    var mouseup = new window.Event('mouseup', { bubbles: true, cancelable: true, view: window });
    var click = new window.Event('click', { bubbles: true, cancelable: true, view: window });
    Object.keys(options).forEach(function (key) {
      mousedown[key] = options[key];
      mouseup[key] = options[key];
      click[key] = options[key];
    });
    var element = document.querySelector(selector);
    (0, _emberRunloop['default'])(function () {
      return element.dispatchEvent(mousedown);
    });
    focus(element);
    (0, _emberRunloop['default'])(function () {
      return element.dispatchEvent(mouseup);
    });
    (0, _emberRunloop['default'])(function () {
      return element.dispatchEvent(click);
    });
  }

  function clickTrigger(scope) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var selector = '.ember-basic-dropdown-trigger';
    if (scope) {
      var $element = (0, _jquery['default'])(scope);
      if ($element.hasClass('ember-basic-dropdown-trigger')) {
        selector = scope;
      } else {
        selector = scope + ' ' + selector;
      }
    }
    nativeClick(selector, options);
  }

  function tapTrigger(scope) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var selector = '.ember-basic-dropdown-trigger';
    if (scope) {
      selector = scope + ' ' + selector;
    }
    var touchStartEvent = new window.Event('touchstart', { bubbles: true, cancelable: true, view: window });
    Object.keys(options).forEach(function (key) {
      return touchStartEvent[key] = options[key];
    });
    (0, _emberRunloop['default'])(function () {
      return document.querySelector(selector).dispatchEvent(touchStartEvent);
    });
    var touchEndEvent = new window.Event('touchend', { bubbles: true, cancelable: true, view: window });
    Object.keys(options).forEach(function (key) {
      return touchEndEvent[key] = options[key];
    });
    (0, _emberRunloop['default'])(function () {
      return document.querySelector(selector).dispatchEvent(touchEndEvent);
    });
  }

  function fireKeydown(selector, k) {
    var oEvent = document.createEvent('Events');
    oEvent.initEvent('keydown', true, true);
    _jquery['default'].extend(oEvent, {
      view: window,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
      keyCode: k,
      charCode: k
    });
    (0, _emberRunloop['default'])(function () {
      return document.querySelector(selector).dispatchEvent(oEvent);
    });
  }

  // acceptance helpers

  exports['default'] = function () {
    _ember['default'].Test.registerAsyncHelper('clickDropdown', function (app, cssPath) {
      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      clickTrigger(cssPath, options);
    });

    _ember['default'].Test.registerAsyncHelper('tapDropdown', function (app, cssPath) {
      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      tapTrigger(cssPath, options);
    });
  };
});
define('stad-stat/tests/helpers/ember-keyboard/register-test-helpers', ['exports', 'ember', 'ember-keyboard'], function (exports, _ember, _emberKeyboard) {

  var keyEvent = function keyEvent(app, attributes, type) {
    var event = attributes.split('+').reduce(function (event, attribute) {
      if (['ctrl', 'meta', 'alt', 'shift'].indexOf(attribute) > -1) {
        event[attribute + 'Key'] = true;
      } else {
        event.keyCode = (0, _emberKeyboard.getKeyCode)(attribute);
      }

      return event;
    }, {});

    return app.testHelpers.triggerEvent(document, type, event);
  };

  exports['default'] = function () {
    _ember['default'].Test.registerAsyncHelper('keyDown', function (app, attributes) {
      return keyEvent(app, attributes, 'keydown');
    });

    _ember['default'].Test.registerAsyncHelper('keyUp', function (app, attributes) {
      return keyEvent(app, attributes, 'keyup');
    });

    _ember['default'].Test.registerAsyncHelper('keyPress', function (app, attributes) {
      return keyEvent(app, attributes, 'keypress');
    });
  };
});
define('stad-stat/tests/helpers/ember-power-select', ['exports', 'jquery', 'ember-runloop', 'ember-test'], function (exports, _jquery, _emberRunloop, _emberTest) {
  exports.nativeMouseDown = nativeMouseDown;
  exports.nativeMouseUp = nativeMouseUp;
  exports.triggerKeydown = triggerKeydown;
  exports.typeInSearch = typeInSearch;
  exports.clickTrigger = clickTrigger;
  exports.nativeTouch = nativeTouch;
  exports.touchTrigger = touchTrigger;

  // Helpers for integration tests

  function typeText(selector, text) {
    var $selector = (0, _jquery['default'])((0, _jquery['default'])(selector).get(0)); // Only interact with the first result
    $selector.val(text);
    var event = document.createEvent('Events');
    event.initEvent('input', true, true);
    $selector[0].dispatchEvent(event);
  }

  function fireNativeMouseEvent(eventType, selectorOrDomElement) {
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var event = undefined;
    try {
      event = new window.Event(eventType, { bubbles: true, cancelable: true, view: window });
    } catch (e) {
      // fix IE11: "Object doesn't support this action"
      event = document.createEvent('Event');
      var bubbles = true;
      var cancelable = true;
      event.initEvent(eventType, bubbles, cancelable);
    }

    Object.keys(options).forEach(function (key) {
      return event[key] = options[key];
    });
    var target = undefined;
    if (typeof selectorOrDomElement === 'string') {
      target = (0, _jquery['default'])(selectorOrDomElement)[0];
    } else {
      target = selectorOrDomElement;
    }
    (0, _emberRunloop['default'])(function () {
      return target.dispatchEvent(event);
    });
  }

  function nativeMouseDown(selectorOrDomElement, options) {
    fireNativeMouseEvent('mousedown', selectorOrDomElement, options);
  }

  function nativeMouseUp(selectorOrDomElement, options) {
    fireNativeMouseEvent('mouseup', selectorOrDomElement, options);
  }

  function triggerKeydown(domElement, k) {
    var oEvent = document.createEvent('Events');
    oEvent.initEvent('keydown', true, true);
    _jquery['default'].extend(oEvent, {
      view: window,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
      keyCode: k,
      charCode: k
    });
    (0, _emberRunloop['default'])(function () {
      domElement.dispatchEvent(oEvent);
    });
  }

  function typeInSearch(text) {
    (0, _emberRunloop['default'])(function () {
      typeText('.ember-power-select-search-input, .ember-power-select-search input, .ember-power-select-trigger-multiple-input, input[type="search"]', text);
    });
  }

  function clickTrigger(scope) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var selector = '.ember-power-select-trigger';
    if (scope) {
      selector = scope + ' ' + selector;
    }
    nativeMouseDown(selector, options);
  }

  function nativeTouch(selectorOrDomElement) {
    var event = new window.Event('touchstart', { bubbles: true, cancelable: true, view: window });
    var target = undefined;

    if (typeof selectorOrDomElement === 'string') {
      target = (0, _jquery['default'])(selectorOrDomElement)[0];
    } else {
      target = selectorOrDomElement;
    }
    (0, _emberRunloop['default'])(function () {
      return target.dispatchEvent(event);
    });
    (0, _emberRunloop['default'])(function () {
      event = new window.Event('touchend', { bubbles: true, cancelable: true, view: window });
      target.dispatchEvent(event);
    });
  }

  function touchTrigger() {
    var selector = '.ember-power-select-trigger';
    nativeTouch(selector);
  }

  // Helpers for acceptance tests

  exports['default'] = function () {
    _emberTest['default'].registerAsyncHelper('selectChoose', function (app, cssPath, valueOrSelector) {
      var $trigger = find(cssPath + ' .ember-power-select-trigger');

      if ($trigger === undefined || $trigger.length === 0) {
        $trigger = find(cssPath);
      }

      if ($trigger.length === 0) {
        throw new Error('You called "selectChoose(\'' + cssPath + '\', \'' + valueOrSelector + '\')" but no select was found using selector "' + cssPath + '"');
      }

      var contentId = '' + $trigger.attr('aria-controls');
      var $content = find('#' + contentId);
      // If the dropdown is closed, open it
      if ($content.length === 0) {
        nativeMouseDown($trigger.get(0));
        wait();
      }

      // Select the option with the given text
      andThen(function () {
        var potentialTargets = (0, _jquery['default'])('#' + contentId + ' .ember-power-select-option:contains("' + valueOrSelector + '")').toArray();
        var target = undefined;
        if (potentialTargets.length === 0) {
          // If treating the value as text doesn't gave use any result, let's try if it's a css selector
          potentialTargets = (0, _jquery['default'])('#' + contentId + ' ' + valueOrSelector).toArray();
        }
        if (potentialTargets.length > 1) {
          target = potentialTargets.filter(function (t) {
            return t.textContent.trim() === valueOrSelector;
          })[0] || potentialTargets[0];
        } else {
          target = potentialTargets[0];
        }
        if (!target) {
          throw new Error('You called "selectChoose(\'' + cssPath + '\', \'' + valueOrSelector + '\')" but "' + valueOrSelector + '" didn\'t match any option');
        }
        nativeMouseUp(target);
      });
    });

    _emberTest['default'].registerAsyncHelper('selectSearch', function (app, cssPath, value) {
      var triggerPath = cssPath + ' .ember-power-select-trigger';
      var $trigger = find(triggerPath);
      if ($trigger === undefined || $trigger.length === 0) {
        triggerPath = cssPath;
        $trigger = find(triggerPath);
      }

      if ($trigger.length === 0) {
        throw new Error('You called "selectSearch(\'' + cssPath + '\', \'' + value + '\')" but no select was found using selector "' + cssPath + '"');
      }

      var contentId = '' + $trigger.attr('aria-controls');
      var isMultipleSelect = (0, _jquery['default'])(cssPath + ' .ember-power-select-trigger-multiple-input').length > 0;

      var dropdownIsClosed = (0, _jquery['default'])('#' + contentId).length === 0;
      if (dropdownIsClosed) {
        nativeMouseDown(triggerPath);
        wait();
      }
      var isDefaultSingleSelect = (0, _jquery['default'])('.ember-power-select-search-input').length > 0;

      if (isMultipleSelect) {
        fillIn(triggerPath + ' .ember-power-select-trigger-multiple-input', value);
      } else if (isDefaultSingleSelect) {
        fillIn('.ember-power-select-search-input', value);
      } else {
        // It's probably a customized version
        var inputIsInTrigger = !!find(cssPath + ' .ember-power-select-trigger input[type=search]')[0];
        if (inputIsInTrigger) {
          fillIn(triggerPath + ' input[type=search]', value);
        } else {
          fillIn('#' + contentId + ' .ember-power-select-search-input[type=search]', 'input');
        }
      }
    });

    _emberTest['default'].registerAsyncHelper('removeMultipleOption', function (app, cssPath, value) {
      var elem = find(cssPath + ' .ember-power-select-multiple-options > li:contains(' + value + ') > .ember-power-select-multiple-remove-btn').get(0);
      try {
        nativeMouseDown(elem);
        wait();
      } catch (e) {
        console.warn('css path to remove btn not found');
        throw e;
      }
    });

    _emberTest['default'].registerAsyncHelper('clearSelected', function (app, cssPath) {
      var elem = find(cssPath + ' .ember-power-select-clear-btn').get(0);
      try {
        nativeMouseDown(elem);
        wait();
      } catch (e) {
        console.warn('css path to clear btn not found');
        throw e;
      }
    });
  };
});
define('stad-stat/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'ember', 'stad-stat/tests/helpers/start-app', 'stad-stat/tests/helpers/destroy-app'], function (exports, _qunit, _ember, _stadStatTestsHelpersStartApp, _stadStatTestsHelpersDestroyApp) {
  var Promise = _ember['default'].RSVP.Promise;

  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _stadStatTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Promise.resolve(afterEach).then(function () {
          return (0, _stadStatTestsHelpersDestroyApp['default'])(_this.application);
        });
      }
    });
  };
});
define('stad-stat/tests/helpers/module-for-acceptance.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('stad-stat/tests/helpers/resolver', ['exports', 'stad-stat/resolver', 'stad-stat/config/environment'], function (exports, _stadStatResolver, _stadStatConfigEnvironment) {

  var resolver = _stadStatResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _stadStatConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _stadStatConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('stad-stat/tests/helpers/resolver.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('stad-stat/tests/helpers/start-app', ['exports', 'ember', 'stad-stat/app', 'stad-stat/config/environment'], function (exports, _ember, _stadStatApp, _stadStatConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _stadStatConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _stadStatApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('stad-stat/tests/helpers/start-app.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('stad-stat/tests/integration/components/chart-single-value-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('chart-single-value', 'Integration | Component | chart single value', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': '9MvJo52P',
      'block': '{"symbols":[],"statements":[[1,[18,"chart-single-value"],false]],"hasEval":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': 'NA1MJ3/X',
      'block': '{"symbols":[],"statements":[[0,"\\n"],[4,"chart-single-value",null,null,{"statements":[[0,"      template block text\\n"]],"parameters":[]},null],[0,"  "]],"hasEval":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('stad-stat/tests/integration/components/chart-single-value-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/chart-single-value-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/chart-single-value-test.js should pass jshint.');
  });
});
define('stad-stat/tests/integration/components/chart-zoomed-value-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('chart-zoomed-value', 'Integration | Component | chart zoomed value', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': '/HfY7lE4',
      'block': '{"symbols":[],"statements":[[1,[18,"chart-zoomed-value"],false]],"hasEval":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': 'WRIZIp9P',
      'block': '{"symbols":[],"statements":[[0,"\\n"],[4,"chart-zoomed-value",null,null,{"statements":[[0,"      template block text\\n"]],"parameters":[]},null],[0,"  "]],"hasEval":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('stad-stat/tests/integration/components/chart-zoomed-value-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/chart-zoomed-value-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/chart-zoomed-value-test.js should pass jshint.');
  });
});
define('stad-stat/tests/integration/components/default-linechart-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('default-linechart', 'Integration | Component | default linechart', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': 'xoQ1/wpn',
      'block': '{"symbols":[],"statements":[[1,[18,"default-linechart"],false]],"hasEval":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': 'poNd/81V',
      'block': '{"symbols":[],"statements":[[0,"\\n"],[4,"default-linechart",null,null,{"statements":[[0,"      template block text\\n"]],"parameters":[]},null],[0,"  "]],"hasEval":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('stad-stat/tests/integration/components/default-linechart-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/default-linechart-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/default-linechart-test.js should pass jshint.');
  });
});
define('stad-stat/tests/integration/components/default-piechart-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('default-piechart', 'Integration | Component | default piechart', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': 'XWMxwFA8',
      'block': '{"symbols":[],"statements":[[1,[18,"default-piechart"],false]],"hasEval":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': 'p35lahYu',
      'block': '{"symbols":[],"statements":[[0,"\\n"],[4,"default-piechart",null,null,{"statements":[[0,"      template block text\\n"]],"parameters":[]},null],[0,"  "]],"hasEval":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('stad-stat/tests/integration/components/default-piechart-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/default-piechart-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/default-piechart-test.js should pass jshint.');
  });
});
define('stad-stat/tests/integration/components/edit-has-many-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('edit-has-many', 'Integration | Component | edit has many', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': 'ORcbXmEr',
      'block': '{"symbols":[],"statements":[[1,[18,"edit-has-many"],false]],"hasEval":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': '99LGxGDt',
      'block': '{"symbols":[],"statements":[[0,"\\n"],[4,"edit-has-many",null,null,{"statements":[[0,"      template block text\\n"]],"parameters":[]},null],[0,"  "]],"hasEval":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('stad-stat/tests/integration/components/edit-has-many-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/edit-has-many-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/edit-has-many-test.js should pass jshint.');
  });
});
define('stad-stat/tests/integration/components/fact-browser-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('fact-browser', 'Integration | Component | fact browser', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': 'bNJWW+fM',
      'block': '{"symbols":[],"statements":[[1,[18,"fact-browser"],false]],"hasEval":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': 'y2nNRQFC',
      'block': '{"symbols":[],"statements":[[0,"\\n"],[4,"fact-browser",null,null,{"statements":[[0,"      template block text\\n"]],"parameters":[]},null],[0,"  "]],"hasEval":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('stad-stat/tests/integration/components/fact-browser-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/fact-browser-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/fact-browser-test.js should pass jshint.');
  });
});
define('stad-stat/tests/integration/components/fact-selector-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('fact-selector', 'Integration | Component | fact selector', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': '4k+DNeJ0',
      'block': '{"symbols":[],"statements":[[1,[18,"fact-selector"],false]],"hasEval":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': '6k/hdPqK',
      'block': '{"symbols":[],"statements":[[0,"\\n"],[4,"fact-selector",null,null,{"statements":[[0,"      template block text\\n"]],"parameters":[]},null],[0,"  "]],"hasEval":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('stad-stat/tests/integration/components/fact-selector-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/fact-selector-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/fact-selector-test.js should pass jshint.');
  });
});
define('stad-stat/tests/integration/components/news-section-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('news-section', 'Integration | Component | news section', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': 'BmsAqrwm',
      'block': '{"symbols":[],"statements":[[1,[18,"news-section"],false]],"hasEval":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': 'g8+A11+z',
      'block': '{"symbols":[],"statements":[[0,"\\n"],[4,"news-section",null,null,{"statements":[[0,"      template block text\\n"]],"parameters":[]},null],[0,"  "]],"hasEval":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('stad-stat/tests/integration/components/news-section-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/news-section-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/news-section-test.js should pass jshint.');
  });
});
define('stad-stat/tests/models/region-theme.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/region-theme.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/region-theme.js should pass jshint.');
  });
});
define('stad-stat/tests/models/region.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/region.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/region.js should pass jshint.');
  });
});
define('stad-stat/tests/models/theme.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/theme.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/theme.js should pass jshint.');
  });
});
define('stad-stat/tests/models/topic.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/topic.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/topic.js should pass jshint.');
  });
});
define('stad-stat/tests/models/value.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/value.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/value.js should pass jshint.');
  });
});
define('stad-stat/tests/resolver.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('stad-stat/tests/router.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('stad-stat/tests/routes/drill.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/drill.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/drill.js should pass jshint.');
  });
});
define('stad-stat/tests/routes/index.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass jshint.');
  });
});
define('stad-stat/tests/routes/search.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/search.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/search.js should pass jshint.');
  });
});
define('stad-stat/tests/test-helper', ['exports', 'stad-stat/tests/helpers/resolver', 'ember-qunit'], function (exports, _stadStatTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_stadStatTestsHelpersResolver['default']);
});
define('stad-stat/tests/test-helper.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('stad-stat/tests/transitions.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | transitions.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'transitions.js should pass jshint.');
  });
});
define('stad-stat/tests/unit/adapters/application-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('adapter:application', 'Unit | Adapter | application', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });
});
define('stad-stat/tests/unit/adapters/application-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/adapters/application-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/application-test.js should pass jshint.');
  });
});
define('stad-stat/tests/unit/controllers/drill-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:drill', 'Unit | Controller | drill', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('stad-stat/tests/unit/controllers/drill-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/drill-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/drill-test.js should pass jshint.');
  });
});
define('stad-stat/tests/unit/controllers/search-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:search', 'Unit | Controller | search', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('stad-stat/tests/unit/controllers/search-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/search-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/search-test.js should pass jshint.');
  });
});
define('stad-stat/tests/unit/models/region-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('region', 'Unit | Model | region', {
    // Specify the other units that are required for this test.
    needs: ['model:region-theme']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('stad-stat/tests/unit/models/region-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/region-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/region-test.js should pass jshint.');
  });
});
define('stad-stat/tests/unit/models/region-theme-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('region-theme', 'Unit | Model | region theme', {
    // Specify the other units that are required for this test.
    needs: ['model:value', 'model:theme', 'model:region']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('stad-stat/tests/unit/models/region-theme-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/region-theme-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/region-theme-test.js should pass jshint.');
  });
});
define('stad-stat/tests/unit/models/theme-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('theme', 'Unit | Model | theme', {
    // Specify the other units that are required for this test.
    needs: ['model:topic', 'model:region-theme']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('stad-stat/tests/unit/models/theme-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/theme-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/theme-test.js should pass jshint.');
  });
});
define('stad-stat/tests/unit/models/topic-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('topic', 'Unit | Model | topic', {
    // Specify the other units that are required for this test.
    needs: ['model:theme']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('stad-stat/tests/unit/models/topic-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/topic-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/topic-test.js should pass jshint.');
  });
});
define('stad-stat/tests/unit/models/value-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('value', 'Unit | Model | value', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('stad-stat/tests/unit/models/value-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/value-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/value-test.js should pass jshint.');
  });
});
define('stad-stat/tests/unit/routes/drill-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:drill', 'Unit | Route | drill', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('stad-stat/tests/unit/routes/drill-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/drill-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/drill-test.js should pass jshint.');
  });
});
define('stad-stat/tests/unit/routes/index-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:index', 'Unit | Route | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('stad-stat/tests/unit/routes/index-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/index-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/index-test.js should pass jshint.');
  });
});
define('stad-stat/tests/unit/routes/search-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:search', 'Unit | Route | search', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('stad-stat/tests/unit/routes/search-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/search-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/search-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('stad-stat/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map
