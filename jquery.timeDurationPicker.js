/*!
 * jQuery TimeDurationPicker Plugin v1.0.0
 *
 * https://github.com/digaev/jQuery-timeDurationPicker
 *
 * Copyright (c) 2015 Nikolay Digaev
 * Released under the MIT license
 */

(function($) {
  $.timeDurationPicker = function(options) {
    $.timeDurationPicker.defaults = $.extend($.timeDurationPicker.defaults, options);
  }

  $.timeDurationPicker.defaults = {
    lang: 'en',
    seconds: false,
    minutes: true,
    hours: true,
    days: true,
    months: true,
    years: true
  }
})(jQuery);

(function($) {
  var instances = [];

  $(document).focusin(function(e) {
    for (var i = 0, c = instances.length; i < c; ++i) {
      var inst = instances[i];
      for (var j = 0, l = inst.element.length; j < l; ++j) {
        if (inst.element[j] == e.target) {
          var offset = $(e.target).offset();
          offset.top += $(e.target).outerHeight();
          inst._content.div.css(offset).fadeIn();
          return;
        }
      }
    }
  }).focusout(function(e) {
    for (var i = 0, c = instances.length; i < c; ++i) {
      var inst = instances[i];
      if (!$.contains(inst._content.div[0], e.relatedTarget)) {
        inst._content.div.fadeOut();
      }
    }
  });

  $.widget('custom.timeDurationPicker', {
    options: {
    },
    _langs: {
      en: {
        seconds: 'Seconds',
        minutes: 'Minutes',
        hours: 'Hours',
        days: 'Days',
        months: 'Months',
        years: 'Years',
        human_years: 'years',
        human_months: 'months',
        human_days: 'days',
        human_hours: 'hours',
        human_minutes: 'minutes',
        human_seconds: 'seconds',
        button_ok: 'Done'
      },
      ru: {
        seconds: 'Секунды',
        minutes: 'Минуты',
        hours: 'Часы',
        days: 'Дни',
        months: 'Месяцы',
        years: 'Годы',
        human_years: 'лет',
        human_months: 'месяцев',
        human_days: 'дней',
        human_hours: 'часов',
        human_minutes: 'минут',
        human_seconds: 'секунд',
        button_ok: 'Выбрать'
      }
    },
    _create: function() {
        var self = this;

        this.options = $.extend($.timeDurationPicker.defaults, this.options);

        this._content = {};
        this._content.div = $('<div />');
        this._content.div.addClass('ui-widget ui-widget-content ui-helper-clearfix ui-corner-all');
        this._content.div.addClass('duration-picker-content');
        this._content.div.css({
            display: 'none',
            position: 'fixed',
            'z-index': 401
        });
        this._content.div.appendTo(document.body);

        this._content.table = $('<table style="width: 100%;"><tbody /></table>').appendTo(this._content.div);
        this._content.tableBody = $('tbody', this._content.table);

        this._content.button = $('<input type="button" />').val(this._tr('button_ok'));
        this._content.button.addClass('ui-button ui-widget ui-state-default ui-corner-all');
        this._content.button.css({
          display: 'block',
          margin: '0.5em auto',
          padding: '0.5em 1em'
        });
        this._content.button.hover(function() {
          $(this).addClass('ui-state-hover');
        }, function() {
          $(this).removeClass('ui-state-hover');
        });
        this._content.button.on('click', function(e) {
          self._content.div.fadeOut();
          if (self.options.onselect) {
            self.options.onselect(self.getDuration(), self.getHumanDuration());
          }
        });
        this._content.button.appendTo(this._content.div);

        this._initUnits();

        instances.push(this);
    },
    _initUnits: function() {
        var i;
        if (this.options.seconds) {
          this._content.seconds = this._createSelectWithOptions(0, 59);
          this._appendRow(this._tr('seconds'), this._content.seconds);
        }
        if (this.options.minutes) {
          this._content.minutes = this._createSelectWithOptions(0, 59);
          this._appendRow(this._tr('minutes'), this._content.minutes);
        }
        if (this.options.hours) {
          this._content.hours = this._createSelectWithOptions(0, 23);
          this._appendRow(this._tr('hours'), this._content.hours);
        }
        if (this.options.days) {
          this._content.days = this._createSelectWithOptions(0, 29);
          this._appendRow(this._tr('days'), this._content.days);
        }
        if (this.options.months) {
          this._content.months = this._createSelectWithOptions(0, 11);
          this._appendRow(this._tr('months'), this._content.months);
        }
        if (this.options.years) {
          this._content.years = this._createSelectWithOptions(0, 10);
          this._appendRow(this._tr('years'), this._content.years);
        }
        if (this.options.defaultValue) {
          this.setDuration(this.options.defaultValue);
        }
    },
    _createSelectWithOptions: function(min, max) {
        var select = $('<select />')
          .addClass('ui-widget ui-state-default ui-corner-all')
          .appendTo(this._content.tableBody);

        select.hover(function() {
          $(this).addClass('ui-state-hover');
        }, function() {
          $(this).removeClass('ui-state-hover');
        });

        this._createOptionsForSelect(select, min, max);
        return select;
    },
    _createOptionsForSelect: function(select, min, max) {
      for (var i = min; i <= max; ++i) {
        select.append($('<option />').val(i).text(i < 10 ? ('0' + i) : i));
      }
    },
    _appendRow: function(text, el) {
      var row = $('<tr />').appendTo(this._content.tableBody);
      $('<td />').css({
        width: '50%',
        padding: '.5em 1em',
        'text-align': 'right',
        'vertical-align': 'middle'
      }).append($('<strong />')
        .text(text))
        .appendTo(row);
      $('<td />').css({width: '50%',
        padding: '.5em 1em',
        'text-align': 'right',
        'vertical-align': 'middle'
      }).append(el)
        .appendTo(row);
    },
    _tr: function(key) {
      return this._langs[$.timeDurationPicker.defaults.lang][key];
    },
    getSeconds: function() {
      return parseInt(this._content.seconds.val());
    },
    getMinutes: function() {
      return parseInt(this._content.minutes.val());
    },
    getHours: function() {
      return parseInt(this._content.hours.val());
    },
    getDays: function() {
      return parseInt(this._content.days.val());
    },
    getMonths: function() {
      return parseInt(this._content.months.val());
    },
    getYears: function() {
      return parseInt(this._content.years.val());
    },
    setDuration: function(value) {
      value = parseInt(value);
      if (isNaN(value)) {
        return false;
      }

      var i;
      if (this.options.years) {
        i = Math.floor(value / (12 * 30 * 24 * 60 * 60));
        this._content.years.val(i);
      }
      if (this.options.months) {
        i = Math.floor(value / (30 * 24 * 60 * 60));
        if (i >= 12) {
          i = 0;
        }
        this._content.months.val(i);
      }
      if (this.options.days) {
        i = Math.floor(value / (24 * 60 * 60));
        if (i >= 30) {
          i = 0;
        }
        this._content.days.val(i);
      }
      if (this.options.hours) {
        i = Math.floor(value / (60 * 60));
        if (i >= 24) {
          i = 0;
        }
        this._content.hours.val(i);
      }
      if (this.options.minutes) {
        i = Math.floor(value / 60);
        if (i >= 60) {
          i = 0;
        }
        this._content.minutes.val(i);
      }
      if (this.options.seconds) {
        i = Math.floor(value);
        if (i >= 60) {
          i = 0;
        }
        this._content.seconds.val(i);
      }
      return value;
    },
    getDuration: function() {
      var seconds = 0;
      if (this.options.seconds) {
        seconds += this.getSeconds();
      }
      if (this.options.minutes) {
        seconds += this.getMinutes() * 60;
      }
      if (this.options.hours) {
        seconds += this.getHours() * 60 * 60;
      }
      if (this.options.days) {
        seconds += this.getDays() * 24 * 60 * 60;
      }
      if (this.options.months) {
        seconds += this.getMonths() * 30 * 24 * 60 * 60;
      }
      if (this.options.years) {
        seconds += this.getYears() * 12 * 30 * 24 * 60 * 60;
      }
      return seconds;
    },
    getHumanDuration: function() {
      var duration = '';
      if (this.options.years && this.getYears() > 0) {
        duration += this.getYears() + ' ' + this._tr('human_years');
      }
      if (this.options.months && this.getMonths() > 0) {
        if (duration) {
          duration += ', ';
        }
        duration += this.getMonths() + ' ' + this._tr('human_months');
      }
      if (this.options.days && this.getDays() > 0) {
        if (duration) {
          duration += ', ';
        }
        duration += this.getDays() + ' ' + this._tr('human_days');
      }
      if (this.options.hours && this.getHours() > 0) {
        if (duration) {
          duration += ', ';
        }
        duration += this.getHours() + ' ' + this._tr('human_hours');
      }
      if (this.options.minutes && this.getMinutes() > 0) {
        if (duration) {
          duration += ', ';
        }
        duration += this.getMinutes() + ' ' + this._tr('human_minutes');
      }
      if (this.options.seconds && this.getSeconds() > 0) {
        if (duration) {
          duration += ', ';
        }
        duration += this.getSeconds() + ' ' + this._tr('human_seconds');
      }
      return duration;
    }
  });
})(jQuery);
