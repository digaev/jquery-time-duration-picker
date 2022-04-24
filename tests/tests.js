$( function() {
  var input = $( "#duration" );
  var seconds = 36561906;
  var duration = "1 year, 2 months, 3 days, 4 hours, 5 minutes and 6 seconds";

  input.timeDurationPicker( { seconds: true } );

  QUnit.test( "setSeconds()", function( assert ) {
    assert.throws( function() {
      input.timeDurationPicker( "setSeconds", "abc" );
    } );

    input.timeDurationPicker( "setSeconds", seconds );
  } );

  QUnit.test( "getSeconds()", function( assert ) {
    input.timeDurationPicker( "setSeconds", seconds );
    assert.equal( input.timeDurationPicker( "getSeconds" ), seconds );
  } );

  QUnit.test( "translate()", function( assert ) {
    assert.equal( input.timeDurationPicker( "translate" ), duration );
  } );

  QUnit.test( "years()", function( assert ) {
    input.timeDurationPicker( "years", 99 );
    assert.equal( input.timeDurationPicker( "years" ), 99 );
  } );

  QUnit.test( "month()", function( assert ) {
    input.timeDurationPicker( "months", 11 );
    assert.equal( input.timeDurationPicker( "months" ), 11 );
  } );

  QUnit.test( "days()", function( assert ) {
    input.timeDurationPicker( "days", 29 );
    assert.equal( input.timeDurationPicker( "days" ), 29 );
  } );

  QUnit.test( "hours()", function( assert ) {
    input.timeDurationPicker( "hours", 23 );
    assert.equal( input.timeDurationPicker( "hours" ), 23 );
  } );

  QUnit.test( "minutes()", function( assert ) {
    input.timeDurationPicker( "minutes", 59 );
    assert.equal( input.timeDurationPicker( "minutes" ), 59 );
  } );

  QUnit.test( "seconds()", function( assert ) {
    input.timeDurationPicker( "seconds", 59 );
    assert.equal( input.timeDurationPicker( "seconds" ), 59 );
  } );

  QUnit.test( "setDuration()", function( assert ) {
    assert.throws( function() {
      input.timeDurationPicker( "setDuration", "" );
    } );

    assert.throws( function() {
      input.timeDurationPicker( "setDuration", "ABC" );
    } );

    assert.throws( function() {
      input.timeDurationPicker( "setDuration", "PABC" );
    } );

    assert.throws( function() {
      input.timeDurationPicker( "setDuration", "P4X" );
    } );

    input.timeDurationPicker( "setDuration", "PT1S" );

    assert.equal( input.timeDurationPicker( "years" ), 0 );
    assert.equal( input.timeDurationPicker( "months" ), 0 );
    assert.equal( input.timeDurationPicker( "days" ), 0 );
    assert.equal( input.timeDurationPicker( "hours" ), 0 );
    assert.equal( input.timeDurationPicker( "minutes" ), 0 );
    assert.equal( input.timeDurationPicker( "seconds" ), 1 );

    input.timeDurationPicker( "setDuration", "P3Y6M4DT12H30M5S" );

    assert.equal( input.timeDurationPicker( "years" ), 3 );
    assert.equal( input.timeDurationPicker( "months" ), 6 );
    assert.equal( input.timeDurationPicker( "days" ), 4 );
    assert.equal( input.timeDurationPicker( "hours" ), 12 );
    assert.equal( input.timeDurationPicker( "minutes" ), 30 );
    assert.equal( input.timeDurationPicker( "seconds" ), 5 );

    input.timeDurationPicker( "setDuration", "P23DT23H" );

    assert.equal( input.timeDurationPicker( "years" ), 0 );
    assert.equal( input.timeDurationPicker( "months" ), 0 );
    assert.equal( input.timeDurationPicker( "days" ), 23 );
    assert.equal( input.timeDurationPicker( "hours" ), 23 );
    assert.equal( input.timeDurationPicker( "minutes" ), 0 );
    assert.equal( input.timeDurationPicker( "seconds" ), 0 );

    input.timeDurationPicker( "setDuration", "P4W" );

    assert.equal( input.timeDurationPicker( "years" ), 0 );
    assert.equal( input.timeDurationPicker( "months" ), 0 );
    assert.equal( input.timeDurationPicker( "days" ), 28 );
    assert.equal( input.timeDurationPicker( "hours" ), 0 );
    assert.equal( input.timeDurationPicker( "minutes" ), 0 );
    assert.equal( input.timeDurationPicker( "seconds" ), 0 );

    input.timeDurationPicker( "setDuration", "P0003-06-04T12:30:05" );

    assert.equal( input.timeDurationPicker( "years" ), 3 );
    assert.equal( input.timeDurationPicker( "months" ), 6 );
    assert.equal( input.timeDurationPicker( "days" ), 4 );
    assert.equal( input.timeDurationPicker( "hours" ), 12 );
    assert.equal( input.timeDurationPicker( "minutes" ), 30 );
    assert.equal( input.timeDurationPicker( "seconds" ), 5 );
  } );

  QUnit.test( "getDuration()", function( assert ) {
    input.timeDurationPicker( "setSeconds", 12345 );
    assert.equal( input.timeDurationPicker( "getDuration" ), "PT3H25M45S" );

    input.timeDurationPicker( "setDuration", "P0Y" );
    assert.equal( input.timeDurationPicker( "getDuration" ), "PT0S" );

    input.timeDurationPicker( "setDuration", "PT1S" );
    assert.equal( input.timeDurationPicker( "getDuration" ), "PT1S" );

    input.timeDurationPicker( "setDuration", "P3Y6M4DT12H30M5S" );
    assert.equal( input.timeDurationPicker( "getDuration" ), "P3Y6M4DT12H30M5S" );

    input.timeDurationPicker( "setDuration", "P23DT23H" );
    assert.equal( input.timeDurationPicker( "getDuration" ), "P23DT23H" );

    input.timeDurationPicker( "setDuration", "P4W" );
    assert.equal( input.timeDurationPicker( "getDuration" ), "P28D" );

    input.timeDurationPicker( "setDuration", "P0003-06-04T12:30:05" );
    assert.equal( input.timeDurationPicker( "getDuration" ), "P3Y6M4DT12H30M5S" );

    input.timeDurationPicker( "setDuration", "P0010-12-31T07:55:37" );
    assert.equal( input.timeDurationPicker( "getDuration" ), "P10Y12M31DT7H55M37S" );
  } );
} );
