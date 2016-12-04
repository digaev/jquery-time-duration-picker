$( function() {
  var input = $( "#duration" );
  var seconds = 36561906;
  var duration = "1 year, 2 months, 3 days, 4 hours, 5 minutes and 6 seconds";

  $( "#duration" ).timeDurationPicker( { seconds: true } );

  QUnit.test( "setSeconds()", function( assert ) {
    assert.notEqual( input.timeDurationPicker( "setSeconds", seconds ), false );
  } );

  QUnit.test( "getSeconds()", function( assert ) {
    assert.equal( input.timeDurationPicker( "getSeconds" ), seconds );
  } );

  QUnit.test( "getDuration()", function( assert ) {
    assert.equal( input.timeDurationPicker( "getDuration" ), duration );
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
} );
