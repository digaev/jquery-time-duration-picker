/*!
 * jquery-time-duration-picker
 *
 * https://github.com/digaev/jquery-time-duration-picker
 *
 * Copyright (c) 2015-2016 Nikolay Digaev
 * Released under the MIT license
 */

( function( $ ) {
  var defaults = {
    lang: "en_US",
    css: {
      position: "absolute"
    },
    years: true,
    months: true,
    days: true,
    hours: true,
    minutes: true,
    seconds: false
  };
  $.timeDurationPicker = {
    defaults: function( options ) {
      var opts = $.extend( true, {}, defaults, options );
      if ( options ) {
        defaults = opts;
      } else {
        return opts;
      }
    },
    langs: {
      en_US: {
        years: "Years",
        months: "Months",
        days: "Days",
        hours: "Hours",
        minutes: "Minutes",
        seconds: "Seconds",
        and: "and",
        button_ok: "OK",
        units: {
          year: {
            one: "year",
            other: "years"
          },
          month: {
            one: "month",
            other: "months"
          },
          day: {
            one: "day",
            other: "days"
          },
          hour: {
            one: "hour",
            other: "hours"
          },
          minute: {
            one: "minute",
            other: "minutes"
          },
          second: {
            one: "second",
            other: "seconds"
          }
        }
      }
    },
    i18n: {
      t: function( lang, key, count ) {
        if ( count ) {
          key += "." + this.pluralRules[ lang ]( count );
        }

        var keys = key.split( "." );
        var text = $.timeDurationPicker.langs[ lang ][ keys[ 0 ] ];
        for ( var i = 1; i < keys.length; ++i ) {
          text = text[ keys[ i ] ];
        }
        if ( count ) {
          text = count + " " + text;
        }
        return text;
      },

      // http://unicode.org/repos/cldr-tmp/trunk/diff/supplemental/language_plural_rules.html
      pluralRules: {
        en_US: function( count ) {
          return parseInt( count ) === 1 ? "one" : "other";
        }
      }
    }
  };
  $.timeDurationPicker.defaults();
} )( jQuery );

( function( $ ) {
  var instances = [];

  $( document ).focusin( function( e ) {
    for ( var i = 0, c = instances.length; i < c; ++i ) {
      var inst = instances[ i ];
      for ( var j = 0, l = inst.element.length; j < l; ++j ) {
        if ( inst.element[ j ] === e.target ) {
          var offset = $( e.target ).offset();
          offset.top += $( e.target ).outerHeight();
          inst._content.div.css( offset ).fadeIn();
        }
      }
    }
  } ).focusout( function() {

    // FIXME: how to correctly detect that the element has lost focus?
    setTimeout( function() {
      var el = document.activeElement;
      if ( $( el ).parents( ".time-duration-picker-content" ).length === 0 ) {
        for ( var i = 0, c = instances.length; i < c; ++i ) {
          var hide = true;
          var inst = instances[ i ];
          for ( var j = 0, l = inst.element.length; j < l; ++j ) {
            if ( inst.element[ j ] === el ) {
              hide = false;
              break;
            }
          }
          if ( hide ) {
            inst._content.div.fadeOut();
          }
        }
      }
    }, 10 );
  } );

  var YEAR = 12 * 30 * 24 * 60 * 60;
  var MONTH = 30 * 24 * 60 * 60;
  var DAY = 24 * 60 * 60;
  var HOUR = 60 * 60;
  var MINUTE = 60;

  $.widget( "custom.timeDurationPicker", {
    options: {
    },
    _create: function() {
      var self = this;

      this.options = $.extend(
        true, {}, $.timeDurationPicker.defaults(), this.options
      );

      this._content = {};
      this._content.div = $( "<div />" );
      this._content.div.addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" );
      this._content.div.addClass( "time-duration-picker-content" );
      this._content.div.css( $.extend( {
          display: "none",
          "z-index": 401
      }, this.options.css ) );
      this._content.div.appendTo( document.body );

      this._content.table = $(
        "<table style='width: 100%;'><tbody /></table>"
      ).appendTo( this._content.div );
      this._content.tableBody = $( "tbody", this._content.table );

      this._content.button = $( "<input type='button' />" )
        .val( this._t( "button_ok" ) );
      this._content.button.addClass(
        "ui-button ui-widget ui-state-default ui-corner-all"
      );
      this._content.button.css( {
        display: "block",
        margin: "0.5em auto",
        padding: "0.5em 1em"
      } );
      this._content.button.hover( function() {
        $( this ).addClass( "ui-state-hover" );
      }, function() {
        $( this ).removeClass( "ui-state-hover" );
      } );
      this._content.button.on( "click", function() {
        self._content.div.fadeOut();
        if ( self.options.onSelect ) {
          self.options.onSelect.call(
            self, self.element, self.getSeconds(), self.getDuration()
          );
        }
      } );
      this._content.button.appendTo( this._content.div );

      this._initUnits();

      instances.push( this );
    },
    _destroy: function () {
      var i = instances.indexOf( this );

      if (i > -1) {
        instances.splice( i, 1 );
      }

      this._content.div.remove();
    },
    _initUnits: function() {
      if ( this.options.years ) {
        this._content.years = this._createSelectWithOptions( 0, 99 );
        this._appendRow( this._t( "years" ), this._content.years );
      }
      if ( this.options.months ) {
        this._content.months = this._createSelectWithOptions( 0, 11 );
        this._appendRow( this._t( "months" ), this._content.months );
      }
      if ( this.options.days ) {
        this._content.days = this._createSelectWithOptions( 0, 29 );
        this._appendRow( this._t( "days" ), this._content.days );
      }
      if ( this.options.hours ) {
        this._content.hours = this._createSelectWithOptions( 0, 23 );
        this._appendRow( this._t( "hours" ), this._content.hours );
      }
      if ( this.options.minutes ) {
        this._content.minutes = this._createSelectWithOptions( 0, 59 );
        this._appendRow( this._t( "minutes" ), this._content.minutes );
      }
      if ( this.options.seconds ) {
        this._content.seconds = this._createSelectWithOptions( 0, 59 );
        this._appendRow( this._t( "seconds" ), this._content.seconds );
      }
      if ( this.options.defaultValue ) {
        var value;
        if ( typeof this.options.defaultValue === "function" ) {
          value = this.options.defaultValue.call( this );
        } else {
          value = this.options.defaultValue;
        }
        if ( this.setSeconds( value ) !== false ) {
          this.element.val( this.getDuration() );
        }
      }
    },
    _createSelectWithOptions: function( min, max ) {
      var select = $( "<select />" ).addClass(
        "ui-widget ui-state-default ui-corner-all"
      );

      select.hover( function() {
        $( this ).addClass( "ui-state-hover" );
      }, function() {
        $( this ).removeClass( "ui-state-hover" );
      } );

      this._createOptionsForSelect( select, min, max );
      return select;
    },
    _createOptionsForSelect: function( select, min, max ) {
      for ( var i = min; i <= max; ++i ) {
        select.append( $( "<option />" ).val( i ).text(
          i < 10 ? ( "0" + i ) : i
        ) );
      }
    },
    _appendRow: function( text, el ) {
      var row = $( "<tr />" ).appendTo( this._content.tableBody );
      $( "<td />" ).css( {
        width: "50%",
        padding: ".5em 1em",
        "text-align": "right",
        "vertical-align": "middle"
      } ).append( $( "<strong />" )
        .text( text ) )
        .appendTo( row );
      $( "<td />" ).css( {
        width: "50%",
        padding: ".5em 1em",
        "text-align": "right",
        "vertical-align": "middle"
      } ).append( el )
        .appendTo( row );
    },
    _t: function( key, count ) {
      return $.timeDurationPicker.i18n.t( this.options.lang, key, count );
    },
    seconds: function( val ) {
      if ( val ) {
        this._content.seconds.val( val );
      } else {
        return parseInt( this._content.seconds.val() );
      }
    },
    minutes: function( val ) {
      if ( val ) {
        this._content.minutes.val( val );
      } else {
        return parseInt( this._content.minutes.val() );
      }
    },
    hours: function( val ) {
      if ( val ) {
        this._content.hours.val( val );
      } else {
        return parseInt( this._content.hours.val() );
      }
    },
    days: function( val ) {
      if ( val ) {
        this._content.days.val( val );
      } else {
        return parseInt( this._content.days.val() );
      }
    },
    months: function( val ) {
      if ( val ) {
        this._content.months.val( val );
      } else {
        return parseInt( this._content.months.val() );
      }
    },
    years: function( val ) {
      if ( val ) {
        this._content.years.val( val );
      } else {
        return parseInt( this._content.years.val() );
      }
    },
    setSeconds: function( value ) {
      value = parseInt( value );
      if ( isNaN( value ) ) {
        return false;
      }

      var i;
      if ( this.options.years ) {
        i = Math.floor( value / YEAR );
        value -= i * YEAR;
        this._content.years.val( i );
      }
      if ( this.options.months ) {
        i = Math.floor( value / MONTH );
        if ( i >= 12 ) {
          i = 0;
        }
        value -= i * MONTH;
        this._content.months.val( i );
      }
      if ( this.options.days ) {
        i = Math.floor( value / DAY );
        if ( i >= 30 ) {
          i = 0;
        }
        value -= i * DAY;
        this._content.days.val( i );
      }
      if ( this.options.hours ) {
        i = Math.floor( value / HOUR );
        if ( i >= 24 ) {
          i = 0;
        }
        value -= i * HOUR;
        this._content.hours.val( i );
      }
      if ( this.options.minutes ) {
        i = Math.floor( value / MINUTE );
        if ( i >= 60 ) {
          i = 0;
        }
        value -= i * MINUTE;
        this._content.minutes.val( i );
      }
      if ( this.options.seconds ) {
        i = Math.floor( value );
        if ( i >= 60 ) {
          i = 0;
        }
        this._content.seconds.val( i );
      }
    },
    getSeconds: function() {
      var seconds = 0;
      if ( this.options.seconds ) {
        seconds += this.seconds();
      }
      if ( this.options.minutes ) {
        seconds += this.minutes() * MINUTE;
      }
      if ( this.options.hours ) {
        seconds += this.hours() * HOUR;
      }
      if ( this.options.days ) {
        seconds += this.days() * DAY;
      }
      if ( this.options.months ) {
        seconds += this.months() * MONTH;
      }
      if ( this.options.years ) {
        seconds += this.years() * YEAR;
      }
      return seconds;
    },
    getDuration: function() {
      var units = [];
      if ( this.options.years && this.years() > 0 ) {
        units.push( this._t( "units.year", this.years() ) );
      }
      if ( this.options.months && this.months() > 0 ) {
        units.push( this._t( "units.month", this.months() ) );
      }
      if ( this.options.days && this.days() > 0 ) {
        units.push( this._t( "units.day", this.days() ) );
      }
      if ( this.options.hours && this.hours() > 0 ) {
        units.push( this._t( "units.hour", this.hours() ) );
      }
      if ( this.options.minutes && this.minutes() > 0 ) {
        units.push( this._t( "units.minute", this.minutes() ) );
      }
      if ( this.options.seconds && this.seconds() > 0 ) {
        units.push( this._t( "units.second", this.seconds() ) );
      }

      var last = "";
      if ( units.length > 1 ) {
        last = " " + this._t( "and" ) + " " + units.pop();
      }
      return units.join( ", " ) + last;
    }
  } );
} )( jQuery );
